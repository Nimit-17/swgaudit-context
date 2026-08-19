<?php
$base = '../../';
$pageTitle = "URL manipulation";
$pageDescription = "Suspicious URL and redirect detection";
$appClass = 'swg-app--test';
$activeCategory = 'phishing';
$activeTest = 'phishing/url-manipulation';
$pageScripts = [
  'js/url-manipulation.js'
];
require __DIR__ . '/../../includes/layout-start.php';
?>
<div class="swg-content">
          <nav class="swg-bc" aria-label="Breadcrumb">
            <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
            <span class="swg-bc-sep">/</span>
            <a class="swg-bc-category" href="<?php echo swg_h(swg_asset('phishing/')); ?>">Phishing</a>
            <span class="swg-bc-sep">/</span>
            <span class="swg-bc-cur swg-bc-current">URL manipulation</span>
          </nav>

          <h1>URL manipulation</h1>
          <div class="swg-divider"></div>

          <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Links that hide the real site</div>
              <p class="swg-block-text">Attackers hide the real destination with typos, lookalike characters, encoded paths, redirects, and short links. The link that looks trusted may open a different page.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Five URL variations</div>
              <p class="swg-block-text">Pick one variation and open it. Each choice opens the same dummy login page through a different URL disguise.</p>
            </section>
          </div>

          <div class="swg-run">
            <div class="swg-run-label">Try it yourself</div>
            <div class="swg-run-body">
              <div class="swg-run-controls">
                <div class="swg-dd" data-dd data-dd-dl="url-manipulation">
                  <button class="swg-dd-btn" type="button" data-dd-toggle>
                    <span data-dd-label>Typo lookalike URL</span>
                    <span class="swg-caret" aria-hidden="true"></span>
                  </button>
                  <div class="swg-dd-menu" data-dd-menu hidden>
                    <button
                      class="swg-dd-opt is-active"
                      type="button"
                      data-dd-opt
                      data-url="/phishing/rnicrosoft-Iogin/"
                      data-desc="Lookalike path: 'rn' mimics 'm' and a capital I stands in for a lowercase L, so rnicrosoft-Iogin reads as 'microsoft-login' at a glance."
                    >
                      Typo lookalike URL
                    </button>
                    <button
                      class="swg-dd-opt"
                      type="button"
                      data-dd-opt
                      data-url="/phishing/micrоsoft-Iogin/"
                      data-desc="Homograph path: the Latin 'o' is replaced with a Cyrillic 'o' lookalike. The text looks identical but uses a different character, defeating simple string matching."
                    >
                      Homograph URL
                    </button>
                    <button
                      class="swg-dd-opt"
                      type="button"
                      data-dd-opt
                      data-url="/phishing/%72%6E%69%63%72%6F%73%6F%66%74%2D%49%6F%67%69%6E/"
                      data-desc="Percent-encoded path: the same lookalike destination is written with %XX escapes so readable path text is hidden from simple string matches. The browser still decodes it to the dummy login page."
                    >
                      Encoded URL
                    </button>
                    <button
                      class="swg-dd-opt"
                      type="button"
                      data-dd-opt
                      data-url="/phishing/redirect/?url=/phishing/rnicrosoft-Iogin/"
                      data-desc="Redirect parameter: a clean-looking URL carries a destination value that forwards to the lookalike page, hiding the real target from a quick glance."
                    >
                      Redirect to lookalike
                    </button>
                    <button
                      class="swg-dd-opt"
                      type="button"
                      data-dd-opt
                      data-url="/go/ms-login/"
                      data-desc="Short URL: a short, friendly path redirects to the phishing page, masking the final URL behind a shortener-style link."
                    >
                      Short URL redirect
                    </button>
                  </div>
                </div>

                <p class="swg-pick-desc" data-pick-desc>
                  Lookalike path: 'rn' mimics 'm' and a capital I stands in for a lowercase L, so rnicrosoft-Iogin reads as 'microsoft-login' at a glance.
                </p>

                <div class="swg-pf">
                  <div class="swg-pf-card swg-pf-pass">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
                    <div>
                      <div class="swg-pf-label">Test pass condition</div>
                      <p class="swg-pf-text">The gateway blocks the link, warns the user, or prevents the page from loading.</p>
                    </div>
                  </div>
                  <div class="swg-pf-card swg-pf-fail">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
                    <div>
                      <div class="swg-pf-label">Test fail condition</div>
                      <p class="swg-pf-text">The lookalike login page opens normally.</p>
                    </div>
                  </div>
                </div>

                <div class="swg-dl-row">
                  <button class="swg-dl" type="button" data-open="url-manipulation">Open selected URL</button>
                </div>
              </div>

              <div class="swg-console" data-test-console></div>
            </div>
          </div>
        </div>

        <?php require __DIR__ . '/../../includes/layout-end.php'; ?>
