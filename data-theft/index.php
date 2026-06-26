<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && ($_POST["swg_audit_test"] ?? "") === "normal-file-submission") {
  header("Content-Type: application/json");

  $hasFile = isset($_FILES["personal_data_file"]) && $_FILES["personal_data_file"]["error"] === UPLOAD_ERR_OK;
  $stored = false;

  if ($hasFile) {
    $uploadDir = __DIR__ . "/uploads";

    if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0750, true);
    }

    $extension = pathinfo($_FILES["personal_data_file"]["name"], PATHINFO_EXTENSION);
    $safeExtension = $extension !== "" ? "." . preg_replace("/[^a-zA-Z0-9]/", "", $extension) : "";
    $uploadPath = $uploadDir . "/normal-file-submission-" . gmdate("YmdHis") . "-" . bin2hex(random_bytes(6)) . $safeExtension;
    $stored = move_uploaded_file($_FILES["personal_data_file"]["tmp_name"], $uploadPath);
  }

  echo json_encode([
    "received" => $hasFile,
    "stored" => $stored,
    "delete_after_minutes" => 10,
  ]);
  exit;
}

$title = "Data Theft Tests - SWG Audit";
$description = "Validate perimeter security against safe data-theft and exfiltration test structures across baseline, evasion, and advanced scenarios.";
$url = "https://www.swgaudit.com/data-theft/";
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
          <a class="nav-trigger" href="/data-theft/" aria-haspopup="true" aria-expanded="false" aria-current="page">Data Theft</a>
          <div class="dropdown" aria-label="Data Theft levels">
            <a href="/data-theft/#bare-minimum">Bare Minimum</a>
            <a href="/data-theft/#evasion-detection">Evasion Detection</a>
            <a href="/data-theft/#advanced-threat-simulation">Advanced Threat Simulation</a>
          </div>
        </div>
        <a class="nav-link" href="/cyberslacking/">Cyberslacking</a>
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
        <a class="mobile-direct" href="/cyberslacking/">Cyberslacking</a>
        <a class="mobile-direct" href="/about/">About</a>
        <a class="mobile-direct" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>
  </header>

  <main class="page-shell test-page" id="top">
    <section class="test-hero" aria-labelledby="page-title">
      <h1 id="page-title">Data Theft</h1>
      <p>Safe data-exfiltration simulations that test whether the SWG can detect and block sensitive data leaving the network through uploads, alternate transfer channels, and covert delivery methods.</p>
    </section>

    <section class="test-category-section" id="bare-minimum" aria-labelledby="bare-minimum-title">
      <div class="test-section-head">
        <h2 id="bare-minimum-title">Bare Minimum</h2>
        <p>This level of security is a must. Baseline controls should stop straightforward sensitive-data submission.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-bare-minimum-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Personal data submission in normal file</h3>
              <p>Checks whether common sensitive data inside a normal file is detected before upload or submission.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-bare-minimum-test-1-detail" hidden>
            <form class="credential-test-form" method="post" action="/data-theft/" enctype="multipart/form-data" data-file-submission-form>
              <input type="hidden" name="swg_audit_test" value="normal-file-submission">
              <div class="form-row">
                <label class="sr-only" for="data-theft-normal-file">Choose file</label>
                <input id="data-theft-normal-file" name="personal_data_file" type="file" required>
              </div>
              <p class="test-note">Submitted files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit">Submit File</button>
              </div>
            </form>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>
    <section class="test-category-section" id="evasion-detection" aria-labelledby="evasion-detection-title">
      <div class="test-section-head">
        <h2 id="evasion-detection-title">Evasion Detection</h2>
        <p>If attackers use better techniques, this level of security is needed. These tests cover transformed files and alternate transfer channels.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-evasion-detection-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>File encoding</h3>
              <p>Checks whether encoded sensitive data is still detected during upload or egress.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-evasion-detection-test-1-detail" hidden>
            <form class="credential-test-form" data-data-theft-encoding-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-encoding-file">Choose file to encode</label>
                <input id="data-theft-encoding-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-encoding-mode">Choose encoding</label>
              <select id="data-theft-encoding-mode" name="encoding_mode">
                <option value="base64">Base64</option>
                <option value="double-base64">Double Base64</option>
                <option value="hex">Hex</option>
                <option value="url">URL Encoded</option>
              </select>
            </div>
              <p class="test-note">The browser encodes your selected file, uploads the encoded form, and the server decodes it back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Run Test</button>
            </div>
            </form>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-evasion-detection-test-2-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>File encrypting</h3>
              <p>Tests whether encrypted sensitive-data files are blocked, warned, or controlled.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-evasion-detection-test-2-detail" hidden>
            <form class="credential-test-form" data-data-theft-encryption-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-encryption-file">Choose file to encrypt</label>
                <input id="data-theft-encryption-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-encryption-mode">Choose encryption</label>
              <select id="data-theft-encryption-mode" name="encryption_mode">
                <option value="aes-gcm">AES-256 GCM</option>
                <option value="aes-gcm-password">AES-256 GCM with password</option>
              </select>
            </div>
              <p class="test-note">The browser encrypts your selected file, uploads ciphertext and metadata, and the server decrypts it back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Run Test</button>
            </div>
            </form>
            <p class="test-output">Password for password mode: <code>123456</code></p>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-evasion-detection-test-3-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>File chunking</h3>
              <p>Models splitting sensitive data into pieces to avoid single-file inspection.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-evasion-detection-test-3-detail" hidden>
            <form class="credential-test-form" data-data-theft-chunking-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-chunking-file">Choose file to chunk</label>
                <input id="data-theft-chunking-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-chunking-mode">Choose chunking</label>
              <select id="data-theft-chunking-mode" name="chunking_mode">
                <option value="straight-split" data-description="Splits your file into equal pieces and uploads them in normal order.">Straight Split</option>
                <option value="reverse-order" data-description="Splits your file into equal pieces and uploads them in reverse request order.">Reverse Order Split</option>
                <option value="randomized-size" data-description="Splits your file into uneven chunk sizes before upload.">Randomized Size Chunks</option>
                <option value="mixed-noise" data-description="Uploads your file chunks mixed with benign decoy chunks that the server ignores during reassembly.">Mixed Noise Chunks</option>
                <option value="parallel-burst" data-description="Prepares all chunks together and uploads them as a burst in one multipart request.">Parallel Burst Upload</option>
              </select>
              <p class="test-output" data-data-theft-chunk-description>Fetches sensitive-data fragments one by one in normal order, then joins them in the browser before upload.</p>
            </div>
              <p class="test-note">The browser chunks your selected file, uploads the chunks, and the server reassembles them back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Run Test</button>
            </div>
            </form>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-evasion-detection-test-4-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>WebSocket</h3>
              <p>Checks whether sensitive data movement over WebSocket channels is inspected or controlled.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-evasion-detection-test-4-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>
    <section class="test-category-section" id="advanced-threat-simulation" aria-labelledby="advanced-threat-simulation-title">
      <div class="test-section-head">
        <h2 id="advanced-threat-simulation-title">Advanced Threat Simulation</h2>
        <p>Advanced security should handle realistic exfiltration paths that use malware, tunneling, or session compromise.</p>
      </div>

      <div class="test-card-grid">
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-advanced-threat-simulation-test-1-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Sent by malware</h3>
              <p>Models sensitive data leaving through malware-driven exfiltration behavior.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-1-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-advanced-threat-simulation-test-2-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>DNS tunnelling</h3>
              <p>Checks whether sensitive data can be encoded and sent through DNS channels.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-2-detail" hidden>
            <form class="credential-test-form" data-dns-tunnel-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-dns-file">Choose file for DNS tunnelling</label>
                <input id="data-theft-dns-file" name="dns_tunnel_file" type="file" accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx" required data-dns-tunnel-file>
              </div>
              <p class="test-note">Maximum file size: 100 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit" data-dns-tunnel-submit>Run Test</button>
                <button class="primary-action" type="button" hidden data-dns-tunnel-reset>Reset Test</button>
              </div>
            </form>
            <p class="test-output" data-dns-tunnel-status hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-advanced-threat-simulation-test-3-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>HTTP path tunneling</h3>
              <p>Checks whether sensitive data can be encoded and sent through ordinary HTTPS URL path segments.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-3-detail" hidden>
            <form class="credential-test-form" data-path-tunnel-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-path-tunnel-file">Choose file for HTTP path tunneling</label>
                <input id="data-theft-path-tunnel-file" name="path_tunnel_file" type="file" required data-path-tunnel-file>
              </div>
              <p class="test-note">Maximum file size: 256 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit" data-path-tunnel-submit>Run Test</button>
                <button class="primary-action" type="button" hidden data-path-tunnel-reset>Reset Test</button>
              </div>
            </form>
            <p class="test-output" data-path-tunnel-status hidden></p>
          </div>
        </article>
        <article class="test-card" role="button" tabindex="0" aria-expanded="false" aria-controls="data-theft-advanced-threat-simulation-test-4-detail" data-test-card>
          <div class="test-card-summary">
            <div>
              <h3>Browser session or credential theft</h3>
              <p>Represents theft of browser sessions or credentials that can enable downstream data access.</p>
            </div>
          </div>
          <div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-4-detail" hidden>
            <div class="test-actions">
              <button class="primary-action" type="button" data-run-test>Run Test</button>
            </div>
            <p class="test-output" data-test-output hidden></p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>
      All tests are intended to be non-malicious and safe for production environments. No real threats are delivered.
    </p>
  </footer>
  <script src="/assets/js/site.js"></script>
  <script src="/assets/js/data-theft-evasion.js"></script>
  <script src="/assets/js/data-theft-dns.js"></script>
  <script src="/assets/js/data-theft-path-tunnel.js"></script>
</body>
</html>
