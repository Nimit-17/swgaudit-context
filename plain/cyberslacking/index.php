<?php
$base = '../';
$pageTitle = 'Facility Abuse';
$pageDescription = 'Facility Abuse security test overview.';
$appClass = 'swg-app--category';
$activeCategory = 'cyberslacking';
require __DIR__ . '/../includes/layout-start.php';
?>
        <div class="swg-content swg-category-content">
          <nav class="swg-bc" aria-label="Breadcrumb">
            <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
            <span class="swg-bc-sep">/</span>
            <span class="swg-bc-cur swg-bc-category">Facility Abuse</span>
          </nav>
          <h1>Facility Abuse</h1>
          <div class="swg-divider"></div>
          <div class="swg-category-copy">
            <p>Blocking one streaming host does not prove every media category on that host is blocked. The same player path can serve many video types.</p>
            <p>This test loads different video categories through one player path. Watch whether policy follows the content category, not only the website name.</p>
          </div>
        </div>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
