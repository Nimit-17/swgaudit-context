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
            <p>Blocking one streaming website is not enough. The same host can serve many kinds of video.</p>
            <p>This test loads different video categories through the same player path. Watch whether policy follows the content type, not only the website name.</p>
          </div>
        </div>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
