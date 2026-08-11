<?php
$base = '../../';
$pageTitle = "Canvas page";
$pageDescription = "Canvas-rendered page detection";
$appClass = 'swg-app--test';
$activeCategory = 'phishing';
$activeTest = 'phishing/canvas-engine';
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
            <span class="swg-bc-cur swg-bc-current">Canvas page</span>
          </nav>

          <h1>Canvas page</h1>
          <div class="swg-divider"></div>

          <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">The threat</div>
              <p class="swg-block-text">
                Canvas is a browser drawing surface, similar to a blank sheet that JavaScript can paint on. A phishing kit can paint a fake login screen as pixels instead of using readable HTML text, labels, and input fields.
              </p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">How the test works</div>
              <p class="swg-block-text">
                The test opens a GitHub-style dummy login page rendered entirely on canvas. The page looks like a normal login screen, but simple scanners looking at the page structure do not see normal form fields or text such as 'password'.
              </p>
            </section>
          </div>

          <div class="swg-run">
            <div class="swg-run-label">Try it yourself</div>
            <div class="swg-run-body">
              <div class="swg-run-controls">
                <div class="swg-pf">
                  <div class="swg-pf-card swg-pf-pass">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
                    <div>
                      <div class="swg-pf-label">Test pass condition</div>
                      <p class="swg-pf-text">The gateway blocks or warns on the canvas-rendered page.</p>
                    </div>
                  </div>
                  <div class="swg-pf-card swg-pf-fail">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
                    <div>
                      <div class="swg-pf-label">Test fail condition</div>
                      <p class="swg-pf-text">The canvas-rendered login page opens normally.</p>
                    </div>
                  </div>
                </div>

                <div class="swg-dl-row">
                  <button class="swg-dl" type="button" data-canvas-launch>Open canvas-rendered page</button>
                </div>
              </div>

              <div class="swg-console" data-test-console></div>
            </div>
          </div>
        </div>

        <?php require __DIR__ . '/../../includes/layout-end.php'; ?>
