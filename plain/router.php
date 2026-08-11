<?php
/**
 * Local PHP built-in server router.
 * Serves /test-files/* from the repo root while keeping plain/ as the site root.
 *
 * Usage: php -S localhost:5173 -t plain plain/router.php
 */
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = $path === null ? '/' : $path;

if (strpos($path, '/test-files/') === 0) {
    $repoRoot = dirname(__DIR__);
    $file = realpath($repoRoot . $path);

    if ($file === false || strpos($file, realpath($repoRoot . DIRECTORY_SEPARATOR . 'test-files')) !== 0 || !is_file($file)) {
        http_response_code(404);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Not found';
        return true;
    }

    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    $types = [
        'txt' => 'text/plain; charset=utf-8',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'pdf' => 'application/pdf',
        'zip' => 'application/zip',
        'json' => 'application/json; charset=utf-8',
        'html' => 'text/html; charset=utf-8',
        'js' => 'text/javascript; charset=utf-8',
        'css' => 'text/css; charset=utf-8',
    ];
    header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    readfile($file);
    return true;
}

return false;
