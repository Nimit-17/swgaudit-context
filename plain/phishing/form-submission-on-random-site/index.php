<?php
$base = '../../';
$pageTitle = "Credential form submission";
$pageDescription = "Credential submission detection";
$appClass = 'swg-app--test';
$activeCategory = 'phishing';
$activeTest = 'phishing/form-submission-on-random-site';
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
            <span class="swg-bc-cur swg-bc-current">Credential form submission</span>
          </nav>

          <h1>Credential form submission</h1>
          <div class="swg-divider"></div>

          <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">The threat</div>
              <p class="swg-block-text">
                The landing page is only half of a phishing attack. The real damage happens when a credential form can deliver a username and password to the attacker-controlled server.
              </p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">How the test works</div>
              <p class="swg-block-text">
                The form sends a POST request containing only the prefilled dummy username and password to the SWG Audit simulation endpoint. The test fails only if that dummy credential payload reaches the server.
              </p>
            </section>
          </div>

          <div class="swg-run swg-run--form">
            <div class="swg-run-label">Try it yourself</div>
            <div class="swg-run-body">
              <div class="swg-run-controls">
                <div class="swg-pf">
                  <div class="swg-pf-card swg-pf-pass">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
                    <div>
                      <div class="swg-pf-label">Test pass condition</div>
                      <p class="swg-pf-text">The submission is blocked, stripped, interrupted, or cannot complete through the protected path.</p>
                    </div>
                  </div>
                  <div class="swg-pf-card swg-pf-fail">
                    <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
                    <div>
                      <div class="swg-pf-label">Test fail condition</div>
                      <p class="swg-pf-text">The dummy credential payload reaches the simulation endpoint.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swg-cred-panel" aria-label="Credential submission form">
                <div class="swg-cred-title">Credential submission form</div>
                <form
                  class="swg-form"
                  method="post"
                  action="/phishing/credential-submit.php"
                  autocomplete="off"
                  data-credential-form
                >
                  <label class="swg-field">
                    Username
                    <input
                      name="swg_audit_username"
                      value="user@example.com"
                      autocomplete="off"
                      data-lpignore="true"
                      data-1p-ignore
                      required
                    />
                  </label>
                  <label class="swg-field">
                    Password
                    <input
                      name="swg_audit_password"
                      type="password"
                      value="password"
                      autocomplete="off"
                      data-lpignore="true"
                      data-1p-ignore
                      required
                    />
                  </label>
                  <p class="swg-run-hint">Use dummy credentials only. Do not submit real usernames or passwords.</p>
                  <div class="swg-dl-row">
                    <button class="swg-dl" type="submit">Submit credentials</button>
                  </div>
                  <div class="swg-output" data-test-output hidden></div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <?php require __DIR__ . '/../../includes/layout-end.php'; ?>
