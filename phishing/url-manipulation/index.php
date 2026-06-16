<?php
$title = "URL Manipulation Test - SWG Audit";
$description = "Safe homograph and lookalike URL manipulation tests for SWG inspection.";
$url = "https://www.swgaudit.com/phishing/url-manipulation/";

$case = $_GET["case"] ?? "homograph-overview";
$caseNames = [
  "homograph-overview" => "Homograph overview",
  "punycode-lookalike" => "Punycode-style brand lookalike",
  "unicode-lookalike" => "Unicode homograph display text",
  "redirect-param-homograph" => "Redirect parameter with lookalike target",
  "display-href-mismatch" => "Visible text differs from actual href",
];
$caseName = $caseNames[$case] ?? "Custom URL manipulation case";
$requestUri = $_SERVER["REQUEST_URI"] ?? "";
$host = $_SERVER["HTTP_HOST"] ?? "www.swgaudit.com";
$query = $_SERVER["QUERY_STRING"] ?? "";

function e($value) {
  return htmlspecialchars((string) $value, ENT_QUOTES, "UTF-8");
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo e($title); ?></title>
  <meta name="description" content="<?php echo e($description); ?>">
  <meta name="author" content="SWG Audit">
  <meta property="og:title" content="<?php echo e($title); ?>">
  <meta property="og:description" content="<?php echo e($description); ?>">
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo e($url); ?>">
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
        <a class="nav-link" href="/phishing/" aria-current="page">Phishing</a>
        <a class="nav-link" href="/malware/">Malware</a>
        <a class="nav-link" href="/data-theft/">Data Theft</a>
        <a class="nav-link" href="/about/">About</a>
      </nav>
    </div>
  </header>

  <main class="page-shell article-page">
    <section class="article-hero">
      <h1>URL Manipulation</h1>
      <p>This benign test keeps navigation on SWG Audit while exposing homograph, punycode, display-mismatch, and redirect-parameter patterns for URL inspection.</p>
    </section>

    <section class="url-result" aria-labelledby="case-title">
      <h2 id="case-title"><?php echo e($caseName); ?></h2>
      <p>No redirect, credential capture, or external navigation is performed. Any lookalike domain value on this page is inert test data.</p>
      <dl>
        <div>
          <dt>Observed host</dt>
          <dd><code><?php echo e($host); ?></code></dd>
        </div>
        <div>
          <dt>Observed path and query</dt>
          <dd><code><?php echo e($requestUri); ?></code></dd>
        </div>
        <div>
          <dt>Raw query string</dt>
          <dd><code><?php echo e($query ?: "none"); ?></code></dd>
        </div>
      </dl>
      <div class="test-actions">
        <a class="primary-action" href="/phishing/#evasion-detection">Back to Phishing Tests</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>All tests are intended to be non-malicious and safe for production environments. No real threats are delivered.</p>
  </footer>
</body>
</html>
