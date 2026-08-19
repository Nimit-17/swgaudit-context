<?php
$base = '../../';
$pageTitle = 'File encrypting';
$pageDescription = 'Encrypted exfiltration detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/file-encrypting';
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
    <span class="swg-bc-cur swg-bc-current">File encrypting</span>
  </nav>

  <h1>File encrypting</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
    <section class="swg-block">
      <div class="swg-block-label">Upload after encryption</div>
      <p class="swg-block-text">Encrypting a file in the browser can hide contents from inspection. The receiver with the key can restore the file.</p>
    </section>
    <section class="swg-block">
      <div class="swg-block-label">Encrypt, then send</div>
      <p class="swg-block-text">Choose a mode and submit. The collector decrypts with the known test key and reports whether rebuild works.</p>
    </section>
  </div>

  <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" data-data-theft-encryption-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" name="source_file" /></label>
          <div class="swg-pick" data-pick="file-encrypting">
            <button class="swg-chip is-active" type="button" data-chip data-mode="aes-gcm">AES-GCM</button>
            <button class="swg-chip" type="button" data-chip data-mode="aes-gcm-password">AES-GCM with password</button>
          </div>
          <p class="swg-run-hint">Password: 123456. Use dummy files only. Reconstructed files are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The upload is blocked, or the file cannot be decrypted and reconstructed.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The server decrypts and reconstructs the original file.</p>
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
