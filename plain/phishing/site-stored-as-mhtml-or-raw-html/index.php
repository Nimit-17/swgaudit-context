<?php
$base = '../../';
$pageTitle = "Page assembled on browser";
$pageDescription = "Locally stored phishing page detection";
$appClass = 'swg-app--test';
$activeCategory = 'phishing';
$activeTest = 'phishing/site-stored-as-mhtml-or-raw-html';
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
            <span class="swg-bc-cur swg-bc-current">Page assembled on browser</span>
          </nav>

          <h1>Page assembled on browser</h1>
          <div class="swg-divider"></div>

          <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Login page as a local file</div>
              <p class="swg-block-text">Attackers deliver a login page as an HTML or MHTML file. The browser opens the file on the device. Filters that only inspect website fetches never see that page on the wire.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Assemble and open locally</div>
              <p class="swg-block-text">Pick HTML or MHTML. The browser builds a dummy Microsoft login page in memory, wraps the page in the chosen format, and opens the page in a new tab the way a saved phishing file would open.</p>
            </section>
          </div>

          <div class="swg-run">
            <div class="swg-run-label">Try it yourself</div>
            <div class="swg-run-body">
              <div class="swg-run-controls">
                <div class="swg-pick" data-pick="stored-site">
                  <button class="swg-chip is-active" type="button" data-chip data-format="raw-html">Raw HTML</button>
                  <button class="swg-chip" type="button" data-chip data-format="mhtml">MHTML</button>
                </div>

                <div class="swg-pf">
                  <div class="swg-pf-card swg-pf-pass">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
                    <div>
                      <div class="swg-pf-label">Test pass condition</div>
                      <p class="swg-pf-text">The gateway or browser blocks or warns before the local page is shown.</p>
                    </div>
                  </div>
                  <div class="swg-pf-card swg-pf-fail">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
                    <div>
                      <div class="swg-pf-label">Test fail condition</div>
                      <p class="swg-pf-text">The fake login page renders normally.</p>
                    </div>
                  </div>
                </div>

                <div class="swg-dl-row">
                  <button class="swg-dl" type="button" data-stored-launch="stored-site">Open stored page</button>
                </div>
              </div>

              <div class="swg-console" data-test-console></div>
            </div>
          </div>
        </div>

        <?php require __DIR__ . '/../../includes/layout-end.php'; ?>
