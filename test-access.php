<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

const CONFIG_FILE = '/etc/swgaudit-v2/recaptcha.php';
const SUBMISSION_FILE = '/var/lib/swgaudit-v2/work-email-submissions.csv';
const TOKEN_FILE = '/var/lib/swgaudit-v2/test-access-tokens.json';
const TOKEN_TTL = 43200;

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function loadConfig(): array
{
    if (!is_file(CONFIG_FILE)) {
        respond(['error' => 'reCAPTCHA is not configured.'], 503);
    }

    $config = require CONFIG_FILE;
    if (!is_array($config) || empty($config['site_key']) || empty($config['secret_key'])) {
        respond(['error' => 'reCAPTCHA is not configured.'], 503);
    }

    return $config;
}

function readActiveTokens($handle): array
{
    rewind($handle);
    $contents = stream_get_contents($handle);
    $records = $contents === '' ? [] : json_decode($contents, true);
    if (!is_array($records)) {
        $records = [];
    }

    return array_values(array_filter(
        $records,
        static fn ($record): bool => is_array($record)
            && isset($record['token_hash'], $record['email'], $record['expires_at'])
            && (int) $record['expires_at'] >= time()
    ));
}

function writeTokens($handle, array $records): void
{
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($records, JSON_UNESCAPED_SLASHES));
    fflush($handle);
}

function findRememberedEmail(string $token): ?string
{
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
        return null;
    }

    $handle = @fopen(TOKEN_FILE, 'c+b');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) fclose($handle);
        return null;
    }

    $records = readActiveTokens($handle);
    $tokenHash = hash('sha256', $token);
    $email = null;

    foreach ($records as $record) {
        if (hash_equals((string) $record['token_hash'], $tokenHash)) {
            $email = (string) $record['email'];
            break;
        }
    }

    writeTokens($handle, $records);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $email;
}

function rememberEmail(string $email): ?string
{
    $handle = @fopen(TOKEN_FILE, 'c+b');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) fclose($handle);
        return null;
    }

    $records = readActiveTokens($handle);
    $token = bin2hex(random_bytes(32));
    $records[] = [
        'token_hash' => hash('sha256', $token),
        'email' => $email,
        'expires_at' => time() + TOKEN_TTL,
    ];

    writeTokens($handle, $records);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $token;
}

function appendSubmission(string $email, string $page): bool
{
    $handle = @fopen(SUBMISSION_FILE, 'c+b');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) fclose($handle);
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

function verifyRecaptcha(string $secret, string $response, string $remoteIp): bool
{
    $curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
    if ($curl === false) {
        return false;
    }

    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $response,
            'remoteip' => $remoteIp,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);

    $body = curl_exec($curl);
    $curlError = curl_error($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    if (!is_string($body) || $status !== 200) {
        error_log('SWG Audit reCAPTCHA request failed: ' . json_encode([
            'http_status' => $status,
            'curl_error' => $curlError,
        ]));
        return false;
    }

    $result = json_decode($body, true);
    $hostname = strtolower((string) ($result['hostname'] ?? ''));
    $valid = !empty($result['success'])
        && in_array($hostname, ['www.swgaudit.com', 'swgaudit.com'], true);

    if (!$valid) {
        error_log('SWG Audit reCAPTCHA rejected: ' . json_encode([
            'error_codes' => $result['error-codes'] ?? [],
            'hostname' => $hostname,
        ]));
    }

    return $valid;
}

$config = loadConfig();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = trim((string) ($_GET['token'] ?? ''));
    respond([
        'site_key' => (string) $config['site_key'],
        'email_remembered' => $token !== '' && findRememberedEmail($token) !== null,
    ]);
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
    respond(['error' => 'Unable to verify this submission.'], 400);
}

$token = trim((string) ($payload['token'] ?? ''));
$email = $token === '' ? null : findRememberedEmail($token);
$isNewEmail = $email === null;

if ($isNewEmail) {
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        respond(['error' => 'Enter a valid work email address.', 'email_required' => true], 422);
    }
}

$recaptchaResponse = trim((string) ($payload['recaptcha_response'] ?? ''));
if ($recaptchaResponse === '') {
    respond(['error' => 'Complete the reCAPTCHA challenge.'], 422);
}

if (!verifyRecaptcha(
    (string) $config['secret_key'],
    $recaptchaResponse,
    (string) ($_SERVER['REMOTE_ADDR'] ?? '')
)) {
    respond(['error' => 'reCAPTCHA verification failed. Please try again.'], 422);
}

$page = substr((string) ($payload['page'] ?? '/'), 0, 255);

if ($isNewEmail) {
    if (!appendSubmission((string) $email, $page)) {
        respond(['error' => 'We could not save your submission. Please try again shortly.'], 503);
    }

    $token = rememberEmail((string) $email);
    if ($token === null) {
        respond(['error' => 'We could not remember this tab. Please try again shortly.'], 503);
    }
}

respond(['verified' => true, 'token' => $token]);
