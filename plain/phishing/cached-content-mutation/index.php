<?php
$base = '../../';
$pageTitle = "Content mutation";
$pageDescription = "Same URL content change detection";
$appClass = 'swg-app--test';
$activeCategory = 'phishing';
$activeTest = 'phishing/cached-content-mutation';
$pageScripts = [
  'js/phishing-tests.js'
];
require __DIR__ . '/../../includes/layout-start.php';
?>
<div class="swg-content">
          <nav class="swg-bc" aria-label="Breadcrumb">
            <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
            <span class="swg-bc-sep">/</span>
            <a class="swg-bc-category" href="<?php echo swg_h(swg_asset('phishing/')); ?>">Phishing</a>
            <span class="swg-bc-sep">/</span>
            <span class="swg-bc-cur swg-bc-current">Content mutation</span>
          </nav>

          <h1>Content mutation</h1>
          <div class="swg-divider"></div>

          <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Same URL, second page</div>
              <p class="swg-block-text">Attackers serve a holding page on the first visit so scanners mark the URL safe. A later visit to the same URL returns a login page instead.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Open once, then refresh</div>
              <p class="swg-block-text">Open the link. The first response is a holding page. Refresh once; the same URL returns a dummy Microsoft login.</p>
            </section>
          </div>

          <div class="swg-run swg-run--compact">
            <div class="swg-run-label">Try it yourself</div>
            <div class="swg-run-body">
              <div class="swg-run-controls">
                <div class="swg-pf">
                  <div class="swg-pf-card swg-pf-pass">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
                    <div>
                      <div class="swg-pf-label">Test pass condition</div>
                      <p class="swg-pf-text">The changed page is blocked or warned on after refresh.</p>
                    </div>
                  </div>
                  <div class="swg-pf-card swg-pf-fail">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
                    <div>
                      <div class="swg-pf-label">Test fail condition</div>
                      <p class="swg-pf-text">The changed login page loads normally.</p>
                    </div>
                  </div>
                </div>

                <div class="swg-dl-row">
                  <button class="swg-dl" type="button" data-cache-launch>Open content-change test</button>
                </div>
              </div>

              <div class="swg-console" data-test-console></div>
            </div>
          </div>
        </div>

        <?php require __DIR__ . '/../../includes/layout-end.php'; ?>
