<?php
$base = '../../';
$pageTitle = 'File encoding';
$pageDescription = 'Encoded exfiltration detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/file-encoding';
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
    <span class="swg-bc-cur swg-bc-current">File encoding</span>
  </nav>

  <h1>File encoding</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Encode before upload</div>
              <p class="swg-block-text">Encoding converts file bytes into Base64, hex, or URL text. Filters that match clear text miss the content. A collector still rebuilds the original file.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Pick encoding, then send</div>
              <p class="swg-block-text">Choose Base64, double Base64, hex, or URL encoding, then submit. The collector decodes and reports whether the original file returns.</p>
            </section>
          </div>

          <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" data-data-theft-encoding-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" name="source_file" /></label>
          <div class="swg-pick" data-pick="file-encoding">
            <button class="swg-chip is-active" type="button" data-chip data-mode="base64">Base64</button>
            <button class="swg-chip" type="button" data-chip data-mode="double-base64">Double Base64</button>
            <button class="swg-chip" type="button" data-chip data-mode="hex">Hex</button>
            <button class="swg-chip" type="button" data-chip data-mode="url">URL encoded</button>
          </div>
          <p class="swg-run-hint">Use dummy or public test files only. Reconstructed files are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The upload is blocked, or the original file cannot be reconstructed.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The server reconstructs the original file.</p>
              </div>
            </div>
          </div>
          <div class="swg-dl-row">
            <button class="swg-dl" type="submit">Submit</button>
          </div>
          <div class="swg-output" data-test-output hidden></div>
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
