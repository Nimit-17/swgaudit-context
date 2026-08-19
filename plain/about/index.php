<?php
$base = '../';
$pageTitle = 'About';
$pageDescription = 'Why SWG Audit exists.';
$appClass = 'swg-about-page';
$mainClass = 'swg-main swg-about-body';
$activeNav = 'about';
require __DIR__ . '/../includes/layout-start.php';
?>
<div class="swg-about-main">
  <div class="swg-container swg-about-wrap">
    <div class="swg-about-intro-section">
      <div class="swg-about-text">Security claims are easy to make and hard to verify.</div>
    </div>

    <div class="swg-about-warning-section">
      <div class="swg-about-warning-item">
        <div class="swg-about-warning-icon" aria-hidden="true">!</div>
        <div class="swg-about-text">SWG Audit gives users safe, browser-based simulations they can run through their own perimeter controls.</div>
      </div>
      <div class="swg-about-warning-item">
        <div class="swg-about-warning-icon" aria-hidden="true">!</div>
        <div class="swg-about-text">The project is open source so the mechanisms are visible: redirects, local rendering, encoding, encryption, chunking, and last-mile reconstruction.</div>
      </div>
    </div>

    <div class="swg-about-hero">
      <h1>See what actually gets through.</h1>
      <div class="swg-about-text">The goal is simple: let security buyers and engineers test real control behavior without using real malware, real credentials, or sensitive files.</div>
    </div>

    <div class="swg-about-feature-section">
      <div class="swg-about-feature-card">
        <div class="swg-about-lock" aria-hidden="true">
          <div class="swg-about-lock-shackle"></div>
          <div class="swg-about-lock-body"></div>
        </div>
        <div class="swg-about-text">Every test is meant to be understandable: what the threat is, how the simulation works, and what pass or fail means.</div>
      </div>
    </div>

    <div class="swg-about-cta">
      <div class="swg-about-text">Use dummy data. Run the tests. Trust evidence over jargon.</div>
    </div>
  </div>
</div>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
