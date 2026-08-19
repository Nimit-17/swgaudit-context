<?php
$base = '../';
$pageTitle = 'Contributing to SWG Audit';
$pageDescription = 'How to contribute to SWG Audit.';
$appClass = 'swg-article-page';
$mainClass = 'swg-main swg-article-body';
$activeNav = 'contribute';
require __DIR__ . '/../includes/layout-start.php';
?>
<article class="swg-article">
  <h1 class="swg-article-title">Contributing to SWG Audit</h1>
  <p>SWG Audit is open source because the tests should be inspectable. If a simulation is unclear, unsafe, inaccurate, or missing an important bypass pattern, contributions are welcome.</p>
  <h2>How to contribute</h2>
  <h3>Report an issue</h3>
  <p>Open an issue with the affected page, expected behavior, actual behavior, browser/SWG context, and screenshots or logs when useful. Do not include secrets or sensitive data.</p>
  <h3>Submit a change</h3>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a focused branch.</li>
    <li>Keep the simulation safe, transparent, and scoped.</li>
    <li>Test the affected page or mechanism.</li>
    <li>Open a pull request with a short explanation.</li>
  </ol>
  <h3>Add or improve a test</h3>
  <p>Every test should explain the threat, the mechanism, pass criteria, fail criteria, and safe-use limits. Do not add real malware, credential theft, or uncontrolled exfiltration.</p>
  <h2>Safety standard</h2>
  <p>Good contributions make attacker techniques understandable without making the site harmful. Prefer dummy data, EICAR, controlled endpoints, and visible source code.</p>
</article>
<?php require __DIR__ . '/../includes/layout-end.php'; ?>
