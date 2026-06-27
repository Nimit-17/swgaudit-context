<?php
require_once __DIR__ . '/../includes/tests.php';

function render_swg_test_page(string $slug): void
{
    $test = swg_find_test($slug);
    if (!$test) {
        http_response_code(404);
        echo 'Test not found';
        return;
    }
    $category = swg_categories()[$test['category']];
    $title = $test['title'] . ' - SWG Audit';
    $description = $test['summary'];
    $url = 'https://www.swgaudit.com' . swg_test_url($test);
    $activeCategory = $test['category'];
    $currentSlug = $test['slug'];
    $relatedTests = swg_find_related_tests($test);
    $scripts = ['/assets/js/site.js'];
    if (in_array($test['slug'], ['file-encoding', 'file-encrypting', 'file-chunking'], true)) $scripts[] = '/assets/js/data-theft-evasion.js';
    if ($test['slug'] === 'dns-tunnelling') $scripts[] = '/assets/js/data-theft-dns.js';
    if ($test['slug'] === 'http-path-tunneling') $scripts[] = '/assets/js/data-theft-path-tunnel.js';
    ?><!doctype html>
<html lang="en">
<?php include __DIR__ . '/page-head.php'; ?>
<body>
<?php include __DIR__ . '/site-header.php'; ?>
<main class="page-shell individual-test-page" id="top">
  <?php include __DIR__ . '/test-sidebar.php'; ?>
  <article class="test-detail-page" aria-labelledby="test-title">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span>
      <a href="/<?php echo htmlspecialchars($test['category'], ENT_QUOTES, 'UTF-8'); ?>/"><?php echo htmlspecialchars($category['label'], ENT_QUOTES, 'UTF-8'); ?></a><span aria-hidden="true">/</span>
      <span><?php echo htmlspecialchars($test['title'], ENT_QUOTES, 'UTF-8'); ?></span>
    </nav>
    <header class="test-detail-hero">
      <h1 id="test-title"><?php echo htmlspecialchars($test['title'], ENT_QUOTES, 'UTF-8'); ?></h1>
      <p><?php echo htmlspecialchars($test['explanation'], ENT_QUOTES, 'UTF-8'); ?></p>
      <dl class="test-meta-badges" aria-label="Test metadata">
        <div><dt>Category</dt><dd><?php echo htmlspecialchars($category['label'], ENT_QUOTES, 'UTF-8'); ?></dd></div>
        <div><dt>Difficulty</dt><dd><?php echo htmlspecialchars($test['difficulty'], ENT_QUOTES, 'UTF-8'); ?></dd></div>
        <div><dt>Action</dt><dd><?php echo htmlspecialchars($test['action'], ENT_QUOTES, 'UTF-8'); ?></dd></div>
        <div><dt>Control Tested</dt><dd><?php echo htmlspecialchars($test['control'], ENT_QUOTES, 'UTF-8'); ?></dd></div>
      </dl>
    </header>
    <section class="test-explain-grid" aria-label="Test explanation">
      <div><h2>What this test does</h2><p><?php echo htmlspecialchars($test['does'], ENT_QUOTES, 'UTF-8'); ?></p></div>
      <div><h2>What pass means</h2><p><?php echo htmlspecialchars($test['pass'], ENT_QUOTES, 'UTF-8'); ?></p></div>
      <div><h2>What fail means</h2><p><?php echo htmlspecialchars($test['fail'], ENT_QUOTES, 'UTF-8'); ?></p></div>
    </section>
    <section class="test-run-section" aria-labelledby="run-area-title">
      <div class="test-section-head compact"><h2 id="run-area-title">Run area</h2></div>
      <div class="test-card is-open test-run-card" data-test-card data-static-open aria-controls="<?php echo htmlspecialchars($test['detail_id'], ENT_QUOTES, 'UTF-8'); ?>">
        <?php include __DIR__ . '/../' . $test['run_area']; ?>
      </div>
    </section>
    <section class="related-tests" aria-labelledby="related-tests-title">
      <h2 id="related-tests-title">Related tests</h2>
      <div class="related-test-list">
        <?php foreach (array_slice($relatedTests, 0, 3) as $related): ?>
          <a href="<?php echo swg_test_url($related); ?>"><span><?php echo htmlspecialchars(swg_category_label($related['category']), ENT_QUOTES, 'UTF-8'); ?></span><strong><?php echo htmlspecialchars($related['title'], ENT_QUOTES, 'UTF-8'); ?></strong></a>
        <?php endforeach; ?>
      </div>
    </section>
  </article>
</main>
<?php include __DIR__ . '/site-footer.php'; ?>
<?php foreach (array_unique($scripts) as $script): ?><script src="<?php echo htmlspecialchars($script, ENT_QUOTES, 'UTF-8'); ?>"></script>
<?php endforeach; ?>
</body>
</html><?php
}
