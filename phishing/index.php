<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && ($_POST["swg_audit_test"] ?? "") === "credential-form-submission") {
  header("Content-Type: application/json");
  header("Cache-Control: no-store");
  echo json_encode(["ok" => true]);
  exit;
}

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
        <a class="nav-link" href="/cyberslacking/">Cyberslacking</a>
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
        <a class="mobile-direct" href="/cyberslacking/">Cyberslacking</a>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell test-page" id="top">
    <section class="test-hero" aria-labelledby="page-title">
      <h1 id="page-title">Phishing</h1>
      <p>Use these safe phishing tests to validate how perimeter controls handle credential collection, deceptive pages, and common evasion techniques used to deliver them.</p>
    </section>

    <section class="test-category-section" id="bare-minimum" aria-labelledby="bare-minimum-title">
      <div class="test-section-head">
        <h2 id="bare-minimum-title">Bare Minimum</h2>
        <p>This level of security is a must. Baseline controls should stop known phishing infrastructure and obvious credential-theft attempts.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-bare-minimum-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Known phishing domains</h3>
              <p>Checks whether known phishing destinations are blocked by reputation, category, or threat-intelligence controls.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-bare-minimum-test-1-detail" hidden>
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
        <p>If attackers use better techniques, this level of security is needed. These tests cover manipulation in URLs and file formats</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-evasion-detection-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>URL manipulation</h3>
              <p>Covers hiding in subdomains, extra words, misspellings, shorteners, redirects, fake paths, and homograph-style lookalikes.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-evasion-detection-test-1-detail" hidden>
            <div class="test-picker">
              <label for="phishing-url-manipulation-case">URL manipulation case</label>
              <select id="phishing-url-manipulation-case" data-url-manipulation-select>
                <option value="/phishing/rnicrosoft-Iogin/" data-description="Lookalike path using rn for m and uppercase i in place of lowercase L. Opens the controlled Microsoft-style page directly.">Lookalike path - rnicrosoft-Iogin</option>
                <option value="/phishing/micrоsoft-Iogin/" data-description="Homograph path using a Cyrillic o in micrоsoft. Opens the same controlled Microsoft-style page directly.">Homograph path - micrоsoft-Iogin</option>
                <option value="/phishing/redirect/?url=/phishing/rnicrosoft-Iogin/" data-description="Redirect parameter test. The first URL contains a url parameter, then the server redirects to the controlled Microsoft-style page.">Redirect parameter - url=</option>
                <option value="/go/ms-login/" data-description="Shortener-style test. A short same-site URL redirects to the controlled Microsoft-style page.">Short URL - /go/ms-login</option>
              </select>
            </div>
            <p class="test-note" data-url-manipulation-description>Lookalike path using rn for m and uppercase I for l. Opens the controlled Microsoft-style page directly.</p>
            <div class="test-actions">
              <a class="primary-action" href="/phishing/rnicrosoft-Iogin/" target="_blank" rel="noopener" data-url-manipulation-run>Run Test</a>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-evasion-detection-test-2-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Misclassified domains</h3>
              <p>Uses domains that are not initially classified as phishing but later host phishing behavior.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-evasion-detection-test-2-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-evasion-detection-test-3-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Cached content mutation</h3>
              <p>Primes a cache with harmless content, then changes the same URL to a dummy Microsoft-style login page.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-evasion-detection-test-3-detail" hidden>
            <p>Open the harmless page in a new tab, then refresh that tab once. If the request reaches the origin, the same URL changes to the dummy login page.</p>
            <div class="test-actions">
              <button class="primary-action" type="button" data-phishing-cache-test-launch>Open Cache Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-evasion-detection-test-4-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>File spoofing</h3>
              <p>Checks whether disguised or misleading files can lead users into getting phished.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-evasion-detection-test-4-detail" hidden>
            <p>This safe file uses a misleading double extension to test whether controls flag executable-looking downloads that pretend to be documents.</p>
            <div class="test-actions">
              <a class="primary-action" href="/assets/test-files/phishing/file-spoofing/dummy.pdf.exe" download>Download dummy.pdf.exe</a>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>
    <section class="test-category-section" id="advanced-threat-simulation" aria-labelledby="advanced-threat-simulation-title">
      <div class="test-section-head">
        <h2 id="advanced-threat-simulation-title">Advanced Threat Simulation</h2>
        <p>Advanced security should handle realistic phishing paths that combine unknown infrastructure, rendering tricks, and techniques designed to slip past inspection.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-advanced-threat-simulation-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Site stored as MHTML or raw HTML</h3>
              <p>Tests whether saved-page formats can hide a phishing page from static request and response inspection.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-advanced-threat-simulation-test-1-detail" hidden>
            <div class="test-picker">
              <label for="phishing-stored-site-format">Stored page format</label>
              <select id="phishing-stored-site-format" data-stored-site-format>
                <option value="html">Raw HTML - dummy Microsoft-style login</option>
                <option value="mhtml">MHTML - dummy Microsoft-style login</option>
              </select>
            </div>
            <div class="test-actions">
              <button class="primary-action" type="button" data-phishing-stored-site-launch>Open Dummy Test Page</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-advanced-threat-simulation-test-2-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Unknown domains - zero hour</h3>
              <p>Models phishing on newly seen domains before reputation systems catch up.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-advanced-threat-simulation-test-2-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-advanced-threat-simulation-test-3-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Canvas engine</h3>
              <p>Uses canvas-rendered page elements to reduce normal DOM-based inspection visibility.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-advanced-threat-simulation-test-3-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-phishing-canvas-launch>Open Dummy Canvas Page</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-advanced-threat-simulation-test-4-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Browser fingerprinting</h3>
              <p>Checks whether phishing content can adapt based on browser, device, or inspection signals.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-advanced-threat-simulation-test-4-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="phishing-advanced-threat-simulation-test-5-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Form submission on random site</h3>
              <p>Represents the current SWG Audit style test: credential-style form submission on an unexpected site.</p>
            </div>
          </div>
          <div class="test-card-detail" id="phishing-advanced-threat-simulation-test-5-detail" hidden>
            <form class="credential-test-form" method="post" action="/phishing/" data-credential-form>
              <input type="hidden" name="swg_audit_test" value="credential-form-submission">
              <div class="form-row">
                <label for="phishing-credential-username">Username or email</label>
                <input id="phishing-credential-username" name="username" type="text" autocomplete="username" value="test.user@example.com" required>
              </div>
              <div class="form-row">
                <label for="phishing-credential-password">Password</label>
                <input id="phishing-credential-password" name="password" type="password" autocomplete="current-password" value="SWGAudit-Test-Password" required>
              </div>
              <p class="test-note">Submitted data is immediately discarded and is not stored.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit">Submit Credentials</button>
              </div>
            </form>
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
