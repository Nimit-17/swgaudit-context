<?php
$base = '../../';
$pageTitle = 'File chunking';
$pageDescription = 'Chunked exfiltration detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/file-chunking';
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
    <span class="swg-bc-cur swg-bc-current">File chunking</span>
  </nav>

  <h1>File chunking</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Split across uploads</div>
              <p class="swg-block-text">Sending a file as many uploads bypasses rules that look for one file in one request.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Pick a chunk pattern</div>
              <p class="swg-block-text">Choose a chunk pattern and submit. The collector joins the pieces and reports whether the file returns.</p>
            </section>
          </div>

          <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" data-data-theft-chunking-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" name="source_file" /></label>
          <div class="swg-dd" data-dd data-dd-dl="file-chunking">
            <button class="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Straight split</span><span class="swg-caret" aria-hidden="true"></span></button>
            <div class="swg-dd-menu" data-dd-menu hidden>
              <button class="swg-dd-opt is-active" type="button" data-dd-opt data-mode="straight-split" data-desc="Splits the selected file into ordered chunks and submits a manifest for reconstruction.">straight split</button>
              <button class="swg-dd-opt" type="button" data-dd-opt data-mode="reverse-order" data-desc="Submits the chunks in reverse order while preserving manifest order for reconstruction.">reverse order</button>
              <button class="swg-dd-opt" type="button" data-dd-opt data-mode="randomized-size" data-desc="Uses uneven chunk sizes to avoid a simple fixed-size split pattern.">randomized size</button>
              <button class="swg-dd-opt" type="button" data-dd-opt data-mode="mixed-noise" data-desc="Adds decoy chunks before and after the real data to test whether reconstruction ignores noise.">mixed noise</button>
              <button class="swg-dd-opt" type="button" data-dd-opt data-mode="parallel-burst" data-desc="Submits a burst-style chunk set using the same reconstruction mechanism.">parallel burst</button>
            </div>
          </div>
          <p class="swg-pick-desc" data-pick-desc>Splits the selected file into ordered chunks and submits a manifest for reconstruction.</p>
          <p class="swg-run-hint">Use dummy or public test files only. Reconstructed files are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The transfer is blocked, or the complete file cannot be reassembled.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The server reassembles the original file.</p>
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
