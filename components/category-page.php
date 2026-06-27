<?php
require_once __DIR__ . '/../includes/tests.php';

function render_swg_category_page(string $categoryKey): void
{
    $categories = swg_categories();
    if (!isset($categories[$categoryKey])) {
        http_response_code(404);
        echo 'Category not found';
        return;
    }
    $categoryData = $categories[$categoryKey];
    $tests = swg_tests_by_category($categoryKey);
    $title = $categoryData['title'];
    $description = $categoryData['description'];
    $url = 'https://www.swgaudit.com/' . $categoryKey . '/';
    $activeCategory = $categoryKey;
    ?><!doctype html>
<html lang="en">
<?php include __DIR__ . '/page-head.php'; ?>
<body>
<?php include __DIR__ . '/site-header.php'; ?>
<main class="page-shell test-page category-overview-page" id="top">
  <section class="test-hero" aria-labelledby="page-title">
    <h1 id="page-title"><?php echo htmlspecialchars($categoryData['label'], ENT_QUOTES, 'UTF-8'); ?></h1>
    <p><?php echo htmlspecialchars($categoryData['intro'], ENT_QUOTES, 'UTF-8'); ?></p>
  </section>
  <section class="overview-test-section" aria-labelledby="overview-tests-title">
    <div class="test-section-head"><h2 id="overview-tests-title">Choose a test</h2></div>
    <div class="overview-test-grid">
      <?php foreach ($tests as $test): ?>
        <a class="overview-test-card" href="<?php echo swg_test_url($test); ?>">
          <span class="overview-test-difficulty"><?php echo htmlspecialchars($test['difficulty'], ENT_QUOTES, 'UTF-8'); ?></span>
          <h3><?php echo htmlspecialchars($test['title'], ENT_QUOTES, 'UTF-8'); ?></h3>
        </a>
      <?php endforeach; ?>
    </div>
  </section>
</main>
<?php include __DIR__ . '/site-footer.php'; ?>
<script src="/assets/js/site.js"></script>
</body>
</html><?php
}
