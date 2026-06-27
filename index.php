<?php
require_once __DIR__ . '/includes/tests.php';
$title = "SWG Audit | Web Threat Validation";
$description = "Validate your perimeter security against phishing, malware delivery, data exfiltration, and cyberslacking controls.";
$url = "https://www.swgaudit.com";
$activeCategory = '';
?>
<!doctype html>
<html lang="en">
<?php include __DIR__ . '/components/page-head.php'; ?>
<body>
<?php include __DIR__ . '/components/site-header.php'; ?>
<main class="page-shell" id="top">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-inner">
      <p class="eyebrow">Open-source initiative</p>
      <h1 id="hero-title">Validate real world effectiveness of your perimeter security</h1>
      <p class="hero-copy">Safely simulate modern web-based threats</p>
      <div class="hero-actions"><a class="primary-action hero-cta" href="/phishing/known-phishing-domains/">Test Your SWG Effectiveness</a></div>
      <div class="hero-rule" aria-hidden="true"></div>
      <div class="hero-meta" aria-label="What SWG Audit validates"><span>Phishing</span><span>Malware delivery</span><span>Data exfiltration</span><span>Cyberslacking</span></div>
    </div>
  </section>
  <section class="section" aria-labelledby="categories-title">
    <div class="section-head"><h2 id="categories-title">Four ways to challenge the perimeter</h2></div>
    <div class="category-grid">
      <?php foreach (swg_categories() as $categoryKey => $category): ?>
        <a class="card category-card" href="/<?php echo htmlspecialchars($categoryKey, ENT_QUOTES, 'UTF-8'); ?>/">
          <div><img class="category-icon" src="<?php echo htmlspecialchars($category['icon'], ENT_QUOTES, 'UTF-8'); ?>" alt="" width="92" height="92"><h3><?php echo htmlspecialchars($category['label'], ENT_QUOTES, 'UTF-8'); ?></h3><p><?php echo htmlspecialchars($category['intro'], ENT_QUOTES, 'UTF-8'); ?></p></div>
          <span class="category-card-action">View Test Catalog</span>
        </a>
      <?php endforeach; ?>
    </div>
  </section>
</main>
<?php include __DIR__ . '/components/site-footer.php'; ?>
<script src="/assets/js/site.js"></script>
</body>
</html>
