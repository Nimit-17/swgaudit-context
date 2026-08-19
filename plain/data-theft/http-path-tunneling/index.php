<?php
$base = '../../';
$pageTitle = 'HTTP path tunneling';
$pageDescription = 'HTTP path exfiltration detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/http-path-tunneling';
$pageScripts = [
  'js/data-theft-tests.js',
];
require __DIR__ . '/../../includes/layout-start.php';
?>
<div class="swg-content">
  <nav class="swg-bc" aria-label="Breadcrumb">
    <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
    <span class="swg-bc-sep">/</span>
    <a class="swg-bc-category" href="<?php echo swg_h(swg_asset('data-theft/')); ?>">Data Theft</a>
    <span class="swg-bc-sep">/</span>
    <span class="swg-bc-cur swg-bc-current">HTTP path tunneling</span>
  </nav>

  <h1>HTTP path tunneling</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
    <section class="swg-block">
      <div class="swg-block-label">Move data in the URL path</div>
      <p class="swg-block-text">File data can move inside long URL paths without a normal upload form. Filters that only watch POST uploads can miss this.</p>
    </section>
    <section class="swg-block">
      <div class="swg-block-label">Send pieces in GET paths</div>
      <p class="swg-block-text">Choose a file under the size limit and run. Path pieces hit the tunnel endpoint. Status shows whether rebuild succeeds.</p>
    </section>
  </div>

  <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" data-path-tunnel-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" data-path-tunnel-file /></label>
          <p class="swg-run-hint">Use a dummy file under 200 KB. Reconstructed files are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The requests are blocked, or the file cannot be reconstructed.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The file is reconstructed from URL path chunks.</p>
              </div>
            </div>
          </div>
          <div class="swg-dl-row">
            <button class="swg-dl" type="submit" data-path-tunnel-submit>Run path tunnel</button>
            <button class="swg-dl swg-dl-alt" type="button" data-path-tunnel-reset hidden>Reset</button>
          </div>
          <div class="swg-output" data-path-tunnel-status hidden></div>
        </form>
        <div class="swg-dl-row">
          <button class="swg-dl swg-dl-alt" type="button" data-open-server-file hidden>Open reconstructed file</button>
        </div>
      </div>
      <div class="swg-console" data-test-console></div>
    </div>
  </div>
</div>
<?php require __DIR__ . '/../../includes/layout-end.php'; ?>
