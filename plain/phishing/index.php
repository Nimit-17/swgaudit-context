<?php
$base = '../';
$pageTitle = 'Phishing';
$pageDescription = 'Phishing security test overview.';
$appClass = 'swg-app--category';
$activeCategory = 'phishing';
require __DIR__ . '/../includes/layout-start.php';
?>
        <div class="swg-content swg-category-content">
          <nav class="swg-bc" aria-label="Breadcrumb">
            <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
            <span class="swg-bc-sep">/</span>
            <span class="swg-bc-cur swg-bc-category">Phishing</span>
          </nav>
          <h1>Phishing</h1>
          <div class="swg-divider"></div>
          <div class="swg-category-copy">
            <p>Phishing often bypasses host-name block lists. Attackers open login pages from lookalike URLs, saved HTML or MHTML files, canvas pixel drawings, and pages that swap content after a first check.</p>
            <p>These tests run those delivery paths in the browser. Watch whether the imitation login appears, whether filters still catch it, and whether a dummy password can leave the network.</p>
          </div>
        </div>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
