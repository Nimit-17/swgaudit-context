<?php
require_once __DIR__ . '/../includes/tests.php';
$currentSlug = $currentSlug ?? '';
?>
<aside class="test-sidebar" aria-label="All tests">
  <button class="test-sidebar-toggle" type="button" aria-expanded="false" aria-controls="test-sidebar-nav" data-test-nav-toggle>All tests</button>
  <nav class="test-sidebar-nav" id="test-sidebar-nav" data-open="false">
    <?php foreach (swg_categories() as $sidebarCategoryKey => $sidebarCategoryData): ?>
      <section class="test-sidebar-group" aria-labelledby="sidebar-<?php echo htmlspecialchars($sidebarCategoryKey, ENT_QUOTES, 'UTF-8'); ?>">
        <h2 id="sidebar-<?php echo htmlspecialchars($sidebarCategoryKey, ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars($sidebarCategoryData['label'], ENT_QUOTES, 'UTF-8'); ?></h2>
        <ul>
          <?php foreach (swg_tests_by_category($sidebarCategoryKey) as $sidebarNavTest): ?>
            <li><a href="<?php echo swg_test_url($sidebarNavTest); ?>"<?php echo $currentSlug === $sidebarNavTest['slug'] ? ' aria-current="page"' : ''; ?>><?php echo htmlspecialchars($sidebarNavTest['title'], ENT_QUOTES, 'UTF-8'); ?></a></li>
          <?php endforeach; ?>
        </ul>
      </section>
    <?php endforeach; ?>
  </nav>
</aside>
