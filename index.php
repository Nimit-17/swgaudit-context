<?php
$title = "SWG Audit | Web Threat Validation";
$description = "Validate your perimeter security against phishing, malware delivery, data exfiltration, and cyberslacking controls.";
$url = "https://www.swgaudit.com";
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
          <a class="nav-trigger" href="#phishing" aria-haspopup="true" aria-expanded="false">Phishing</a>
          <div class="dropdown" aria-label="Phishing levels">
            <a href="#phishing-level-1">Bare Minimum <span>Level 1</span></a>
            <a href="#phishing-level-2">Evasion Resistance <span>Level 2</span></a>
            <a href="#phishing-level-3">Advanced Threat Simulation <span>Level 3</span></a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="#malware" aria-haspopup="true" aria-expanded="false">Malware</a>
          <div class="dropdown" aria-label="Malware levels">
            <a href="#malware-level-1">Bare Minimum <span>Level 1</span></a>
            <a href="#malware-level-2">Evasion Resistance <span>Level 2</span></a>
            <a href="#malware-level-3">Advanced Threat Simulation <span>Level 3</span></a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="#data-theft" aria-haspopup="true" aria-expanded="false">Data Theft</a>
          <div class="dropdown" aria-label="Data Theft levels">
            <a href="#data-theft-level-1">Bare Minimum <span>Level 1</span></a>
            <a href="#data-theft-level-2">Evasion Resistance <span>Level 2</span></a>
            <a href="#data-theft-level-3">Advanced Threat Simulation <span>Level 3</span></a>
          </div>
        </div>
        <a class="nav-link" href="#cyberslacking">Cyberslacking</a>
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
            <a href="#phishing">Overview</a>
            <a href="#phishing-level-1">Level 1: Bare Minimum</a>
            <a href="#phishing-level-2">Level 2: Evasion Resistance</a>
            <a href="#phishing-level-3">Level 3: Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-malware">Malware</button>
          <div id="mobile-malware">
            <a href="#malware">Overview</a>
            <a href="#malware-level-1">Level 1: Bare Minimum</a>
            <a href="#malware-level-2">Level 2: Evasion Resistance</a>
            <a href="#malware-level-3">Level 3: Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-data-theft">Data Theft</button>
          <div id="mobile-data-theft">
            <a href="#data-theft">Overview</a>
            <a href="#data-theft-level-1">Level 1: Bare Minimum</a>
            <a href="#data-theft-level-2">Level 2: Evasion Resistance</a>
            <a href="#data-theft-level-3">Level 3: Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="mobile-direct" href="#cyberslacking">Cyberslacking</a>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell" id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-inner">
        <p class="eyebrow">Open-source initiative</p>
        <h1 id="hero-title">Validate real world effectiveness of your perimeter security</h1>
        <p class="hero-copy">
          Safely simulate modern web-based threats
        </p>
        <div class="hero-rule" aria-hidden="true"></div>
        <div class="hero-meta" aria-label="What SWG Audit validates">
          <span>Phishing</span>
          <span>Malware delivery</span>
          <span>Data exfiltration</span>
          <span>Cyberslacking</span>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="categories-title">
      <div class="section-head">
        <h2 id="categories-title">Four ways to challenge the perimeter.</h2>
      </div>

      <div class="category-grid">
        <article class="card" id="phishing" role="button" tabindex="0" aria-expanded="false" data-level-card>
          <div>
            <img class="category-icon" src="/assets/images/phishing-icon.png" alt="" width="92" height="92">
            <h3>Phishing</h3>
            <p>Credential-theft simulations that test whether controls stop risky submissions, even when the domain looks trusted.</p>
          </div>
          <div class="card-levels">
            <a id="phishing-level-1" href="/phishing/bare-minimum/"><strong>Bare Minimum</strong></a>
            <a id="phishing-level-2" href="/phishing/evasion-resistance/"><strong>Evasion Resistance</strong></a>
            <a id="phishing-level-3" href="/phishing/advanced-threat-simulation/"><strong>Advanced Threat Simulation</strong></a>
          </div>
          <span class="card-toggle">View tests</span>
        </article>

        <article class="card" id="malware" role="button" tabindex="0" aria-expanded="false" data-level-card>
          <div>
            <img class="category-icon" src="/assets/images/malware-icon.png" alt="" width="92" height="92">
            <h3>Malware</h3>
            <p>Safe malware-delivery checks that validate whether download controls, inspection, and detection policies respond.</p>
          </div>
          <div class="card-levels">
            <a id="malware-level-1" href="/malware/bare-minimum/"><strong>Bare Minimum</strong></a>
            <a id="malware-level-2" href="/malware/evasion-resistance/"><strong>Evasion Resistance</strong></a>
            <a id="malware-level-3" href="/malware/advanced-threat-simulation/"><strong>Advanced Threat Simulation</strong></a>
          </div>
          <span class="card-toggle">View tests</span>
        </article>

        <article class="card" id="data-theft" role="button" tabindex="0" aria-expanded="false" data-level-card>
          <div>
            <img class="category-icon" src="/assets/images/data-theft-icon.png" alt="" width="92" height="92">
            <h3>Data Theft</h3>
            <p>DLP and egress validation for attempts to move sensitive data outside expected inspection paths.</p>
          </div>
          <div class="card-levels">
            <a id="data-theft-level-1" href="/data-theft/bare-minimum/"><strong>Bare Minimum</strong></a>
            <a id="data-theft-level-2" href="/data-theft/evasion-resistance/"><strong>Evasion Resistance</strong></a>
            <a id="data-theft-level-3" href="/data-theft/advanced-threat-simulation/"><strong>Advanced Threat Simulation</strong></a>
          </div>
          <span class="card-toggle">View tests</span>
        </article>

        <article class="card" id="cyberslacking">
          <div>
            <img class="category-icon" src="/assets/images/cyberslacking-icon.png" alt="" width="92" height="92">
            <h3>Cyberslacking</h3>
            <p>Acceptable-use and content-filtering validation for non-work web activity and media-category enforcement.</p>
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
