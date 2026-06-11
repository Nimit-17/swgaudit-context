<?php
$title = "About - SWG Audit";
$description = "An open-source initiative to help buyers validate the real-world effectiveness of their perimeter security solutions.";
$url = "https://www.swgaudit.com/about/";
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
          <a class="nav-trigger" href="/phishing/" aria-haspopup="true" aria-expanded="false">Phishing</a>
          <div class="dropdown" aria-label="Phishing levels">
            <a href="/phishing/#bare-minimum">Bare Minimum</a>
            <a href="/phishing/#evasion-detection">Evasion Detection</a>
            <a href="/phishing/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="/#malware" aria-haspopup="true" aria-expanded="false">Malware</a>
          <div class="dropdown" aria-label="Malware levels">
            <a href="/#malware-level-1">Bare Minimum <span>Level 1</span></a>
            <a href="/#malware-level-2">Evasion Detection</a>
            <a href="/#malware-level-3">Advanced Threat Simulation <span>Level 3</span></a>
          </div>
        </div>
        <div class="nav-item">
          <a class="nav-trigger" href="/#data-theft" aria-haspopup="true" aria-expanded="false">Data Theft</a>
          <div class="dropdown" aria-label="Data Theft levels">
            <a href="/#data-theft-level-1">Bare Minimum <span>Level 1</span></a>
            <a href="/#data-theft-level-2">Evasion Detection</a>
            <a href="/#data-theft-level-3">Advanced Threat Simulation <span>Level 3</span></a>
          </div>
        </div>
        <a class="nav-link" href="/#cyberslacking">Cyberslacking</a>
        <a class="nav-link" href="/about/" aria-current="page">About</a>
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
            <a href="/phishing/">Overview</a>
            <a href="/phishing/#bare-minimum">Bare Minimum</a>
            <a href="/phishing/#evasion-detection">Evasion Detection</a>
            <a href="/phishing/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-malware">Malware</button>
          <div id="mobile-malware">
            <a href="/#malware">Overview</a>
            <a href="/#malware-level-1">Level 1: Bare Minimum</a>
            <a href="/#malware-level-2">Evasion Detection</a>
            <a href="/#malware-level-3">Level 3: Advanced Threat Simulation</a>
          </div>
        </div>
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-data-theft">Data Theft</button>
          <div id="mobile-data-theft">
            <a href="/#data-theft">Overview</a>
            <a href="/#data-theft-level-1">Level 1: Bare Minimum</a>
            <a href="/#data-theft-level-2">Evasion Detection</a>
            <a href="/#data-theft-level-3">Level 3: Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="mobile-direct" href="/#cyberslacking">Cyberslacking</a>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell article-page about-original">
    <section class="intro-section">
      <p>In today's cybersecurity landscape, attackers have significantly outpaced traditional security tools.</p>
    </section>

    <section class="warning-section" aria-label="Problems">
      <article class="warning-item">
        <div class="warning-icon" aria-hidden="true">!</div>
        <p>Many vendors continue to promote outdated solutions with bold marketing claims&mdash;offering little transparency or proof of actual protection.</p>
      </article>
      <article class="warning-item">
        <div class="warning-icon" aria-hidden="true">!</div>
        <p>Buyers are often left in the dark, relying solely on vendor promises without any means of independent verification.</p>
      </article>
    </section>

    <section class="article-hero" aria-labelledby="about-title">
      <h1 id="about-title">SWG Audit was created to change that.</h1>
      <p>We are an open-source initiative to help buyers validate the real-world effectiveness of their perimeter security solutions against web-based threats.</p>
    </section>

    <section class="feature-section" aria-labelledby="mission-title">
      <div class="feature-container">
        <div class="feature-icon" aria-hidden="true">
          <svg width="64" height="84" viewBox="0 0 92 126" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M73.6 54.001C83.761 54.001 92 62.06 92 71.999V107.999C92 117.941 83.761 126 73.6 126H18.4C8.239 126 0 117.941 0 107.999V71.999C0 62.06 8.239 54.001 18.4 54.001H73.6ZM46 71.999C38.379 71.999 32.2 78.045 32.2 85.501C32.2 92.956 38.379 99 46 99C53.621 99 59.8 92.956 59.8 85.501C59.8 78.045 53.621 71.999 46 71.999ZM46 0C61.243 0 73.6 12.089 73.6 27V44.999H59.8V27C59.8 19.545 53.621 13.499 46 13.499C38.379 13.499 32.2 19.545 32.2 27V44.999H18.4V27C18.4 12.089 30.757 0 46 0Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="feature-text">
          <h2 id="mission-title">Our Mission</h2>
          <p>Empower cybersecurity professionals and buyers to independently assess whether a solution can truly defend against modern threats&mdash;before investing in it.</p>
        </div>
      </div>
    </section>

    <section class="cta" aria-label="Call to action">
      <p>Join the community. Test honestly. Buy confidently.</p>
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
