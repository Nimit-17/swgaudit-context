<?php
/**
 * Shared helpers for the plain site.
 * Each page sets $base (relative path to plain/), then includes layout pieces.
 */

function swg_h($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function swg_asset($path)
{
    global $base;
    $basePath = isset($base) ? $base : './';
    if ($path === '' || $path === null) {
        return $basePath;
    }
    if (preg_match('#^(https?:)?//#', $path) || substr($path, 0, 1) === '/') {
        return $path;
    }
    return rtrim($basePath, '/') . '/' . ltrim($path, '/');
}

function swg_nav_groups()
{
    static $groups = null;
    if ($groups !== null) {
        return $groups;
    }

    $groups = require __DIR__ . '/nav-data.php';
    return $groups;
}
