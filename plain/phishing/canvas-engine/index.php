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
              <div class="swg-block-label">Login drawn as pixels</div>
              <p class="swg-block-text">Attackers draw a login screen on an HTML canvas, a drawing surface in the browser. The page shows a sign-in form as pixels, so scanners that search page text for words such as password find none.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Open the canvas login</div>
              <p class="swg-block-text">Open the canvas login. The page draws a GitHub sign-in screen as an image and captures clicks and keystrokes on that drawing instead of HTML form fields.</p>
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
