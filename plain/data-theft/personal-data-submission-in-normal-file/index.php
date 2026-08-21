<?php
$base = '../../';
$pageTitle = 'File submission';
$pageDescription = 'Outbound file upload detection';
$appClass = 'swg-app--test';
$activeCategory = 'data-theft';
$activeTest = 'data-theft/personal-data-submission-in-normal-file';
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
    <span class="swg-bc-cur swg-bc-current">File submission</span>
  </nav>

  <h1>File submission</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">Records leave as uploads</div>
              <p class="swg-block-text">Attackers move records outbound through file uploads that match work traffic. Filters that only watch for malware miss this path.</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">Upload a dummy file</div>
              <p class="swg-block-text">Choose a dummy file and upload. The collector reports whether the file arrives.</p>
            </section>
          </div>

          <div class="swg-run">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body">
      <div class="swg-run-controls">
        <form class="swg-form" method="post" action="/data-theft/upload.php" enctype="multipart/form-data" data-file-submission-form>
          <label class="swg-file-field"><span class="swg-file-button">Choose file</span><span class="swg-file-name" data-file-name>No file chosen</span><input class="swg-file-input" type="file" name="personal_data_file" /></label>
          <p class="swg-run-hint">Use dummy or public test files only. Temporary uploads are auto-deleted after 10 minutes.</p>
          <div class="swg-pf">
            <div class="swg-pf-card swg-pf-pass">
              <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
              <div>
                <div class="swg-pf-label">Test pass condition</div>
                <p class="swg-pf-text">The upload is blocked or intercepted before it reaches the server.</p>
              </div>
            </div>
            <div class="swg-pf-card swg-pf-fail">
              <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
              <div>
                <div class="swg-pf-label">Test fail condition</div>
                <p class="swg-pf-text">The file uploads successfully.</p>
              </div>
            </div>
          </div>
          <div class="swg-dl-row">
            <button class="swg-dl" type="submit">Upload file</button>
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
