<?php
$base = '../';
$pageTitle = 'Data Theft';
$pageDescription = 'Data Theft security test overview.';
$appClass = 'swg-app--category';
$activeCategory = 'data-theft';
require __DIR__ . '/../includes/layout-start.php';
?>
        <div class="swg-content swg-category-content">
          <nav class="swg-bc" aria-label="Breadcrumb">
            <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
            <span class="swg-bc-sep">/</span>
            <span class="swg-bc-cur swg-bc-category">Data Theft</span>
          </nav>
          <h1>Data Theft</h1>
          <div class="swg-divider"></div>
          <div class="swg-category-copy">
            <p>Data theft can look like normal work: file uploads, encoded traffic, small pieces, or channels that policy already allows.</p>
            <p>Each test sends a dummy file to a controlled collector. Encoding, encryption, chunking, DNS queries, and URL paths either stop before rebuild or arrive whole on the other side.</p>
          </div>
        </div>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
