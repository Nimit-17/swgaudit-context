<?php
$base = './';
$pageTitle = 'SWG Audit';
$pageDescription = 'Open-source simulations that show what perimeter controls stop.';
$appClass = 'swg-app--home';
require __DIR__ . '/includes/layout-start.php';
?>
        <div class="swg-home-main">
          <section class="swg-hero" aria-labelledby="home-heading">
            <div class="swg-container swg-hero-copy">
              <!-- Locked homepage copy: do not change unless a human user explicitly asks. -->
              <h1 id="home-heading">Validate the real-world effectiveness of your perimeter security</h1>
              <p class="swg-hero-sub">
                SWG Audit is an open source initiative designed to safely simulate modern web-based cyber threats.
              </p>
              <div class="swg-home-intro">
                <p>
                  Pick a category, run a test, and compare what happens to the pass and fail conditions on that page.
                  Pass means the web filter or browser blocked or warned. Fail means the action completed with no block.
                  Use dummy credentials and disposable files only. Do not use live credentials or live business files.
                  One result is evidence for that technique, not a full security score.
                </p>
              </div>
            </div>
          </section>

          <section class="swg-section" aria-label="Test categories">
            <div class="swg-container">
              <div class="swg-card-grid">
                <a class="swg-card" href="phishing/">
                  <img class="swg-card-img" src="<?php echo swg_h(swg_asset('images/phishing-icon.png')); ?>" alt="" width="44" height="44" />
                  <div class="swg-card-body">
                    <h2>Phishing</h2>
                    <p class="swg-card-count">5 tests</p>
                  </div>
                  <span class="swg-card-arr" aria-hidden="true">&rarr;</span>
                </a>

                <a class="swg-card" href="malware/">
                  <img class="swg-card-img" src="<?php echo swg_h(swg_asset('images/malware-icon.png')); ?>" alt="" width="44" height="44" />
                  <div class="swg-card-body">
                    <h2>Malware</h2>
                    <p class="swg-card-count">15 tests</p>
                  </div>
                  <span class="swg-card-arr" aria-hidden="true">&rarr;</span>
                </a>

                <a class="swg-card" href="data-theft/">
                  <img class="swg-card-img" src="<?php echo swg_h(swg_asset('images/data-theft-icon.png')); ?>" alt="" width="44" height="44" />
                  <div class="swg-card-body">
                    <h2>Data Theft</h2>
                    <p class="swg-card-count">6 tests</p>
                  </div>
                  <span class="swg-card-arr" aria-hidden="true">&rarr;</span>
                </a>

                <a class="swg-card" href="cyberslacking/">
                  <img class="swg-card-img" src="<?php echo swg_h(swg_asset('images/cyberslacking-icon.png')); ?>" alt="" width="44" height="44" />
                  <div class="swg-card-body">
                    <h2>Facility Abuse</h2>
                    <p class="swg-card-count">1 test</p>
                  </div>
                  <span class="swg-card-arr" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </section>
        </div>
<?php require __DIR__ . '/includes/layout-end.php'; ?>
