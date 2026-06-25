<?php
$title = "Cyberslacking Tests - SWG Audit";
$description = "Validate perimeter security against safe cyberslacking and streaming media access simulations.";
$url = "https://www.swgaudit.com/cyberslacking/";
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
        <div class="nav-item">
          <a class="nav-trigger" href="/cyberslacking/" aria-haspopup="true" aria-expanded="false" aria-current="page">Cyberslacking</a>
          <div class="dropdown" aria-label="Cyberslacking levels">
            <a href="/cyberslacking/#bare-minimum">Bare Minimum</a>
            <a href="/cyberslacking/#evasion-detection">Evasion Detection</a>
            <a href="/cyberslacking/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
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
        <div class="mobile-accordion">
          <button type="button" aria-expanded="false" aria-controls="mobile-cyberslacking">Cyberslacking</button>
          <div id="mobile-cyberslacking">
            <a href="/cyberslacking/">Overview</a>
            <a href="/cyberslacking/#bare-minimum">Bare Minimum</a>
            <a href="/cyberslacking/#evasion-detection">Evasion Detection</a>
            <a href="/cyberslacking/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell test-page" id="top">
    <section class="test-hero" aria-labelledby="page-title">
      <h1 id="page-title">Cyberslacking</h1>
      <p>Use these safe browsing and media tests to validate whether non-work content, streaming, and recreational categories are blocked by perimeter policy.</p>
    </section>

    <section class="test-category-section" id="bare-minimum" aria-labelledby="bare-minimum-title">
      <div class="test-section-head">
        <h2 id="bare-minimum-title">Bare Minimum</h2>
        <p>Baseline controls should prevent users from accessing clearly non-work or streaming media destinations when policy requires blocking them.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="cyberslacking-video-filtering-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Video content category simulation</h3>
              <p>Loads a safe YouTube video embed so you can check whether streaming media or non-work video content is blocked by the SWG.</p>
            </div>
          </div>
          <div class="test-card-detail" id="cyberslacking-video-filtering-detail" hidden>
            <p>If the video loads and plays, video streaming is allowed. If the SWG blocks, redirects, or breaks the player, the policy is enforcing this category.</p>
            <div class="test-picker">
              <label for="cyberslacking-video-category">Video category</label>
              <select id="cyberslacking-video-category" data-cyberslacking-video-select>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="film-animation">Film & Animation</option>
                <option value="autos-vehicles">Autos & Vehicles</option>
                <option value="music">Music</option>
                <option value="pets-animals">Pets & Animals</option>
                <option value="sports">Sports</option>
                <option value="travel-events">Travel & Events</option>
                <option value="gaming">Gaming</option>
                <option value="people-blogs">People & Blogs</option>
                <option value="news-politics">News & Politics</option>
                <option value="howto-style">Howto & Style</option>
                <option value="science-technology">Science & Technology</option>
                <option value="movies">Movies</option>
                <option value="action-adventure">Action/Adventure</option>
                <option value="drama">Drama</option>
                <option value="family">Family</option>
                <option value="foreign">Foreign</option>
                <option value="horror">Horror</option>
                <option value="thriller">Thriller</option>
                <option value="trailers">Trailers</option>
              </select>
            </div>
            <div class="cyberslacking-video-frame">
              <iframe
                title="SWG Audit cyberslacking video test"
                src="https://www.youtube.com/embed/YjlgahImVwI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                data-cyberslacking-video-frame></iframe>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="test-category-section" id="evasion-detection" aria-labelledby="evasion-detection-title">
      <div class="test-section-head">
        <h2 id="evasion-detection-title">Evasion Detection</h2>
        <p>Future tests can cover alternate video hosts, embedded players, redirects, and content-category evasion patterns.</p>
      </div>
    </section>

    <section class="test-category-section" id="advanced-threat-simulation" aria-labelledby="advanced-threat-simulation-title">
      <div class="test-section-head">
        <h2 id="advanced-threat-simulation-title">Advanced Threat Simulation</h2>
        <p>Future tests can simulate chained access paths and policy drift around streaming or recreational web applications.</p>
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
