<?php
$title = "Phishing Tests - SWG Audit";
$description = "Validate perimeter security against safe phishing simulations across baseline, evasion, and advanced attack scenarios.";
$url = "https://www.swgaudit.com/phishing/";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $title; ?></title>
  <meta name="description" content="<?php echo $description; ?>">
  <meta name="author" content="SWG Audit">
  <meta property="og:title" content="<?php echo $title; ?>">
  <meta property="og:description" content="<?php echo $description; ?>">
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo $url; ?>">
  <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="SWG Audit home">
        <img src="/assets/icons/logo_swg_audit.png" alt="" width="34" height="34">
        <span>SWG Audit</span>
      </a>

      <nav class="desktop-nav" aria-label="Primary">
        <div class="nav-item">
          <a class="nav-trigger" href="/phishing/" aria-haspopup="true" aria-expanded="false" aria-current="page">Phishing</a>
          <div class="dropdown" aria-label="Phishing levels">
            <a href="/phishing/#bare-minimum">Bare Minimum</a>
            <a href="/phishing/#evasion-detection">Evasion Detection</a>
            <a href="/phishing/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="/malware/" aria-haspopup="true" aria-expanded="false">Malware</a>
          <div class="dropdown" aria-label="Malware levels">
            <a href="/malware/#bare-minimum">Bare Minimum</a>
            <a href="/malware/#evasion-detection">Evasion Detection</a>
            <a href="/malware/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="/data-theft/" aria-haspopup="true" aria-expanded="false">Data Theft</a>
          <div class="dropdown" aria-label="Data Theft levels">
            <a href="/data-theft/#bare-minimum">Bare Minimum</a>
            <a href="/data-theft/#evasion-detection">Evasion Detection</a>
            <a href="/data-theft/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="nav-link" href="/#cyberslacking">Cyberslacking</a>
        <a class="nav-link" href="/about/">About</a>
      </nav>

      <a class="github-link" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">
        <img src="/assets/images/github-mark.svg" alt="" width="18" height="18">
        <span class="sr-only">GitHub</span>
      </a>

      <button class="mobile-toggle" type="button" aria-label="Open menu" aria-controls="mobile-panel" aria-expanded="false">
        <span aria-hidden="true"></span>
      </button>
    </div>

    <nav class="mobile-panel" id="mobile-panel" data-open="false" aria-label="Mobile primary">
      <div class="mobile-panel-inner">
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-phishing">Phishing</button>
          <div id="mobile-phishing">
            <a href="/phishing/">Overview</a>
            <a href="/phishing/#bare-minimum">Bare Minimum</a>
            <a href="/phishing/#evasion-detection">Evasion Detection</a>
            <a href="/phishing/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-malware">Malware</button>
          <div id="mobile-malware">
            <a href="/malware/">Overview</a>
            <a href="/malware/#bare-minimum">Bare Minimum</a>
            <a href="/malware/#evasion-detection">Evasion Detection</a>
            <a href="/malware/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-data-theft">Data Theft</button>
          <div id="mobile-data-theft">
            <a href="/data-theft/">Overview</a>
            <a href="/data-theft/#bare-minimum">Bare Minimum</a>
            <a href="/data-theft/#evasion-detection">Evasion Detection</a>
            <a href="/data-theft/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="mobile-direct" href="/#cyberslacking">Cyberslacking</a>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell test-page" id="top">
    <section class="test-hero" aria-labelledby="phishing-title">
      <h1 id="phishing-title">Phishing</h1>
      <p>Use these safe phishing test structures to validate how perimeter controls handle credential collection, deceptive navigation, and realistic social engineering flows.</p>
    </section>

    <section class="test-category-section" id="bare-minimum" aria-labelledby="bare-minimum-title">
      <div class="test-section-head">
        <h2 id="bare-minimum-title">Bare Minimum</h2>
        <p>This level of security is a must. Baseline controls should stop straightforward phishing attempts before a user can submit sensitive information.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="credential-submission-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Credential Submission Check</h3>
              <p>Validates whether controls interrupt a simple credential capture flow hosted on an untrusted page.</p>
            </div>
          </div>
          <div class="test-card-detail" id="credential-submission-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a safe form-submission flow that can later collect dummy credentials and record whether the security stack blocks or warns.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Confirm whether the page is blocked, the form submission is interrupted, or the user reaches the final step without friction.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>

        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="suspicious-login-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Suspicious Login Page Link</h3>
              <p>Checks whether a direct link to a deceptive login page is categorized, warned, or blocked.</p>
            </div>
          </div>
          <div class="test-card-detail" id="suspicious-login-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a controlled landing page or new-tab launch that resembles a common credential prompt without collecting real secrets.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Check whether URL filtering, browser isolation, or safe-browsing controls engage before the user can interact with the page.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>

    <section class="test-category-section" id="evasion-detection" aria-labelledby="evasion-detection-title">
      <div class="test-section-head">
        <h2 id="evasion-detection-title">Evasion Detection</h2>
        <p>If attackers use better techniques, this level of security is needed. These tests are for redirects, reputation tricks, and better-crafted phishing flows.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="redirect-chain-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Redirect Chain Landing Page</h3>
              <p>Models a phishing flow that reaches the final page through intermediate redirects instead of a single obvious URL.</p>
            </div>
          </div>
          <div class="test-card-detail" id="redirect-chain-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a future redirect path or new-tab sequence that can validate inspection across each navigation step.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Look for blocks or warnings at the first URL, during the redirect, or only after the final landing page loads.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>

        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="lookalike-domain-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Lookalike Domain Prompt</h3>
              <p>Tests how defenses respond when a phishing page uses brand-like language and a plausible-looking destination.</p>
            </div>
          </div>
          <div class="test-card-detail" id="lookalike-domain-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a controlled page that can later simulate visual deception, copy similarity, and user decision points.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Confirm whether the defense classifies the destination by content, reputation, or form behavior instead of name matching alone.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>

    <section class="test-category-section" id="advanced-threat-simulation" aria-labelledby="advanced-threat-simulation-title">
      <div class="test-section-head">
        <h2 id="advanced-threat-simulation-title">Advanced Threat Simulation</h2>
        <p>Advanced security should handle realistic, multi-step phishing paths where attackers combine timing, user prompts, and layered deception.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="multi-step-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Multi-step Credential Flow</h3>
              <p>Represents a more realistic phishing path with staged prompts instead of a single landing page.</p>
            </div>
          </div>
          <div class="test-card-detail" id="multi-step-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a future sequence that can move through awareness prompt, login prompt, and confirmation step using only dummy data.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Watch whether controls evaluate the whole journey or only react to a single URL, page title, or form field.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>

        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="attachment-login-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Attachment-to-Login Scenario</h3>
              <p>Frames a phishing journey that begins from a document or notification and ends at a credential prompt.</p>
            </div>
          </div>
          <div class="test-card-detail" id="attachment-login-detail" hidden>
            <div class="test-detail-grid">
              <div>
                <h4>Test surface</h4>
                <p>Reserved for a safe launch path that can later use a document-style prompt, new tab, or guided manual step.</p>
              </div>
              <div>
                <h4>What to observe</h4>
                <p>Confirm whether policy enforcement follows the user across files, tabs, and final destinations.</p>
              </div>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>
      All tests are intended to be non-malicious and safe for production environments. No real threats are delivered.
    </p>
  </footer>
  <script src="/assets/js/site.js"></script>
</body>
</html>
