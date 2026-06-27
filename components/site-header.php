<?php
require_once __DIR__ . '/../includes/tests.php';
$activeCategory = $activeCategory ?? '';
$activePage = $activePage ?? '';
$navItems = [
  'phishing' => '/phishing/',
  'malware' => '/malware/',
  'data-theft' => '/data-theft/',
  'cyberslacking' => '/cyberslacking/',
];
?>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="SWG Audit home">
      <img src="/assets/icons/logo_swg_audit.png" alt="" width="34" height="34">
      <span>SWG Audit</span>
    </a>
    <nav class="desktop-nav" aria-label="Primary">
      <?php foreach ($navItems as $navCategoryKey => $navHref): ?>
        <a class="nav-link" href="<?php echo $navHref; ?>"<?php echo $activeCategory === $navCategoryKey ? ' aria-current="page"' : ''; ?>><?php echo htmlspecialchars(swg_category_label($navCategoryKey), ENT_QUOTES, 'UTF-8'); ?></a>
      <?php endforeach; ?>
      <a class="nav-link" href="/about/"<?php echo $activePage === 'about' ? ' aria-current="page"' : ''; ?>>About</a>
    </nav>
    <a class="github-link" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">
      <img src="/assets/images/github-mark.svg" alt="" width="18" height="18">
      <span class="sr-only">GitHub</span>
    </a>
    <button class="mobile-toggle" type="button" aria-label="Open menu" aria-controls="mobile-panel" aria-expanded="false"><span aria-hidden="true"></span></button>
  </div>
  <nav class="mobile-panel" id="mobile-panel" data-open="false" aria-label="Mobile primary">
    <div class="mobile-panel-inner">
      <?php foreach ($navItems as $navCategoryKey => $navHref): ?>
        <a class="mobile-direct" href="<?php echo $navHref; ?>"<?php echo $activeCategory === $navCategoryKey ? ' aria-current="page"' : ''; ?>><?php echo htmlspecialchars(swg_category_label($navCategoryKey), ENT_QUOTES, 'UTF-8'); ?></a>
      <?php endforeach; ?>
      <a class="mobile-direct" href="/about/"<?php echo $activePage === 'about' ? ' aria-current="page"' : ''; ?>>About</a>
      <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
    </div>
  </nav>
</header>
