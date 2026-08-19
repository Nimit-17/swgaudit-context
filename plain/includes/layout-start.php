<?php
require_once __DIR__ . '/helpers.php';

if (!isset($pageTitle)) {
    $pageTitle = 'SWG Audit';
}
if (!isset($pageDescription)) {
    $pageDescription = 'Open-source simulations that show what perimeter controls stop.';
}
if (!isset($base)) {
    $base = './';
}
if (!isset($appClass)) {
    $appClass = 'swg-app--home';
}
if (!isset($activeCategory)) {
    $activeCategory = '';
}
if (!isset($activeTest)) {
    $activeTest = '';
}
if (!isset($mainClass)) {
    $mainClass = ($appClass === 'swg-app--home') ? 'swg-main' : 'swg-main swg-main-col';
}
if (!isset($pageScripts)) {
    $pageScripts = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?php echo swg_h($pageTitle); ?></title>
  <meta name="description" content="<?php echo swg_h($pageDescription); ?>" />
  <link rel="icon" type="image/png" href="<?php echo swg_h(swg_asset('favicon.png')); ?>" sizes="48x48" />
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo swg_h(swg_asset('favicon.ico')); ?>" />
  <link rel="apple-touch-icon" href="<?php echo swg_h(swg_asset('apple-touch-icon.png')); ?>" />
  <link rel="stylesheet" href="<?php echo swg_h(swg_asset('css/site.css')); ?>" />
</head>
<body>
  <div
    class="swg-app <?php echo swg_h($appClass); ?>"
    data-base="<?php echo swg_h($base); ?>"
<?php if ($activeCategory !== ''): ?>
    data-active-category="<?php echo swg_h($activeCategory); ?>"
<?php endif; ?>
<?php if ($activeTest !== ''): ?>
    data-active-test="<?php echo swg_h($activeTest); ?>"
<?php endif; ?>
  >
    <?php require __DIR__ . '/nav.php'; ?>

    <div class="swg-shell">
      <?php require __DIR__ . '/sidebar.php'; ?>

      <main class="<?php echo swg_h($mainClass); ?>" id="main">
