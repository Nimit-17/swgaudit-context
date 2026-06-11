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
        GitHub
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
        <button class="card" id="phishing" type="button" aria-expanded="false" data-level-card>
          <div>
            <svg class="category-icon" viewBox="0 0 84 72" aria-hidden="true">
              <path class="hex" d="M24 5.5h36L78 36 60 66.5H24L6 36 24 5.5Z"/>
              <path class="mark" d="M40 19v23.5a8 8 0 1 1-12.2-6.8"/>
              <path class="mark" d="M40 19a5.5 5.5 0 1 1 6 5.5"/>
              <path class="mark" d="M46 24.5v8.2"/>
              <circle class="fill-mark" cx="46" cy="35.5" r="3.2"/>
              <path class="mark" d="M30.4 34.2 25 28.8"/>
            </svg>
            <h3>Phishing</h3>
            <p>Credential-theft simulations that test whether controls stop risky submissions, even when the domain looks trusted.</p>
          </div>
          <span class="card-cta">View phishing levels</span>
          <div class="card-levels">
            <span id="phishing-level-1"><strong>Level 1</strong>Bare Minimum</span>
            <span id="phishing-level-2"><strong>Level 2</strong>Evasion Resistance</span>
            <span id="phishing-level-3"><strong>Level 3</strong>Advanced Threat Simulation</span>
          </div>
        </button>

        <button class="card" id="malware" type="button" aria-expanded="false" data-level-card>
          <div>
            <svg class="category-icon" viewBox="0 0 84 72" aria-hidden="true">
              <path class="hex" d="M24 5.5h36L78 36 60 66.5H24L6 36 24 5.5Z"/>
              <circle class="mark" cx="42" cy="35.5" r="4.4"/>
              <path class="mark" d="M42 31c-.5-9.8 7.4-14.6 14.1-10.1"/>
              <path class="mark" d="M46 37.8c8.6 4.5 8.8 13.8 1.7 17.5"/>
              <path class="mark" d="M38 37.8c-8.6 4.5-8.8 13.8-1.7 17.5"/>
              <path class="mark" d="M37.9 33.3c-8.8-4.1-8.8-13.2-1.7-16.7"/>
              <path class="mark" d="M46.1 33.3c8.8-4.1 8.8-13.2 1.7-16.7"/>
            </svg>
            <h3>Malware</h3>
            <p>Safe malware-delivery checks that validate whether download controls, inspection, and detection policies respond.</p>
          </div>
          <span class="card-cta">View malware levels</span>
          <div class="card-levels">
            <span id="malware-level-1"><strong>Level 1</strong>Bare Minimum</span>
            <span id="malware-level-2"><strong>Level 2</strong>Evasion Resistance</span>
            <span id="malware-level-3"><strong>Level 3</strong>Advanced Threat Simulation</span>
          </div>
        </button>

        <button class="card" id="data-theft" type="button" aria-expanded="false" data-level-card>
          <div>
            <svg class="category-icon" viewBox="0 0 84 72" aria-hidden="true">
              <path class="hex" d="M24 5.5h36L78 36 60 66.5H24L6 36 24 5.5Z"/>
              <ellipse class="mark" cx="40" cy="23" rx="12" ry="5"/>
              <path class="mark" d="M28 23v20c0 2.8 5.4 5 12 5 2.1 0 4.1-.2 5.8-.7"/>
              <path class="mark" d="M52 23v12"/>
              <path class="mark" d="M28 33c0 2.8 5.4 5 12 5 2.1 0 4.1-.2 5.8-.7"/>
              <rect class="mark" x="50" y="42" width="13" height="12" rx="1.5"/>
              <path class="mark" d="M53 42v-3.2a3.5 3.5 0 0 1 7 0V42"/>
            </svg>
            <h3>Data Theft</h3>
            <p>DLP and egress validation for attempts to move sensitive data outside expected inspection paths.</p>
          </div>
          <span class="card-cta">View data theft levels</span>
          <div class="card-levels">
            <span id="data-theft-level-1"><strong>Level 1</strong>Bare Minimum</span>
            <span id="data-theft-level-2"><strong>Level 2</strong>Evasion Resistance</span>
            <span id="data-theft-level-3"><strong>Level 3</strong>Advanced Threat Simulation</span>
          </div>
        </button>

        <article class="card" id="cyberslacking">
          <div>
            <svg class="category-icon" viewBox="0 0 84 72" aria-hidden="true">
              <path class="hex" d="M24 5.5h36L78 36 60 66.5H24L6 36 24 5.5Z"/>
              <circle class="fill-mark" cx="42" cy="26" r="8"/>
              <path class="fill-mark" d="M26.5 53c1.6-9 7.5-14.2 15.5-14.2S55.9 44 57.5 53H26.5Z"/>
              <path class="mark" d="M58 19h7v7"/>
              <path class="mark" d="M65 19 56 28"/>
            </svg>
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
