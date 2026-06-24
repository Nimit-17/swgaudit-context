<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$isHttps = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

const SUBMISSION_FILE = '/var/lib/swgaudit-v2/work-email-submissions.csv';
const CAPTCHA_TTL = 600;
const VERIFIED_TTL = 31536000;

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function isVerified(): bool
{
    $verifiedAt = (int) ($_SESSION['test_access_verified_at'] ?? 0);
    return $verifiedAt > 0 && $verifiedAt >= time() - VERIFIED_TTL;
}

function newChallenge(): array
{
    $left = random_int(3, 12);
    $right = random_int(2, 9);
    $nonce = bin2hex(random_bytes(16));

    $_SESSION['test_access_captcha'] = [
        'answer' => $left + $right,
        'created_at' => time(),
        'nonce' => $nonce,
    ];

    return [
        'question' => "What is {$left} + {$right}?",
        'nonce' => $nonce,
    ];
}

function appendSubmission(string $email, string $page): bool
{
    $handle = @fopen(SUBMISSION_FILE, 'c+b');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return false;
    }

    fseek($handle, 0, SEEK_END);
    if (ftell($handle) === 0) {
        fputcsv($handle, ['submitted_at_utc', 'work_email', 'page']);
    }

    $written = fputcsv($handle, [gmdate('c'), $email, $page]) !== false;
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $written;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isVerified()) {
        respond(['verified' => true]);
    }

    respond(['verified' => false, 'challenge' => newChallenge()]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST');
    respond(['error' => 'Method not allowed.'], 405);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$payload = str_contains($contentType, 'application/json')
    ? json_decode((string) file_get_contents('php://input'), true)
    : $_POST;

if (!is_array($payload)) {
    respond(['error' => 'Invalid submission.'], 400);
}

if (!empty($payload['company'])) {
    respond(['error' => 'Unable to verify this submission.', 'challenge' => newChallenge()], 400);
}

$attempts = array_values(array_filter(
    $_SESSION['test_access_attempts'] ?? [],
    static fn ($timestamp): bool => is_int($timestamp) && $timestamp >= time() - 600
));

if (count($attempts) >= 10) {
    respond(['error' => 'Too many attempts. Please wait a few minutes and try again.'], 429);
}

$attempts[] = time();
$_SESSION['test_access_attempts'] = $attempts;

$email = strtolower(trim((string) ($payload['email'] ?? '')));
$answer = trim((string) ($payload['captcha_answer'] ?? ''));
$nonce = (string) ($payload['captcha_nonce'] ?? '');
$page = substr((string) ($payload['page'] ?? '/'), 0, 255);
$challenge = $_SESSION['test_access_captcha'] ?? null;

if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond([
        'error' => 'Enter a valid work email address.',
        'challenge' => newChallenge(),
    ], 422);
}

$challengeValid = is_array($challenge)
    && isset($challenge['answer'], $challenge['created_at'], $challenge['nonce'])
    && (int) $challenge['created_at'] >= time() - CAPTCHA_TTL
    && hash_equals((string) $challenge['nonce'], $nonce)
    && ctype_digit($answer)
    && (int) $answer === (int) $challenge['answer'];

if (!$challengeValid) {
    respond([
        'error' => 'That CAPTCHA answer was not correct. Try the new question.',
        'challenge' => newChallenge(),
    ], 422);
}

if (!appendSubmission($email, $page)) {
    respond([
        'error' => 'We could not save your submission. Please try again shortly.',
        'challenge' => newChallenge(),
    ], 503);
}

session_regenerate_id(true);
$_SESSION['test_access_verified_at'] = time();
$_SESSION['test_access_email'] = $email;
unset($_SESSION['test_access_captcha'], $_SESSION['test_access_attempts']);

respond(['verified' => true]);
