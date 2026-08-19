<?php
$base = '../../';
$pageTitle = 'DNS tunneling';
$pageDescription = 'DNS exfiltration detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/dns-tunneling';
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
    <span class="swg-bc-cur swg-bc-current">DNS tunneling</span>
  </nav>

  <h1>DNS tunneling</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
    <section class="swg-block">
      <div class="swg-block-label">Move data through DNS</div>
      <p class="swg-block-text">DNS lookups often face less inspection than web uploads. File bytes can ride inside DNS names and rebuild at a collector.</p>
    </section>
    <section class="swg-block">
      <div class="swg-block-label">Send file bytes as DNS queries</div>
      <p class="swg-block-text">Choose a small dummy file and run the tunnel. The result shows whether the file can be rebuilt from DNS traffic.</p>
    </section>
  </div>

  <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" data-dns-tunnel-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" data-dns-tunnel-file /></label>
          <p class="swg-run-hint">Use a dummy file under 100 KB. Reconstructed files are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The DNS requests are blocked, or the file cannot be reconstructed.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The file is reconstructed from DNS-style requests.</p>
              </div>
            </div>
          </div>
          <div class="swg-dl-row">
            <button class="swg-dl" type="submit" data-dns-tunnel-submit>Run DNS tunnel</button>
            <button class="swg-dl swg-dl-alt" type="button" data-dns-tunnel-reset hidden>Reset</button>
          </div>
          <div class="swg-output" data-dns-tunnel-status hidden></div>
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
