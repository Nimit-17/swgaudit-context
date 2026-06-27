<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && ($_POST["swg_audit_test"] ?? "") === "credential-form-submission") {
  header("Content-Type: application/json");
  header("Cache-Control: no-store");
  echo json_encode(["ok" => true]);
  exit;
}
require_once __DIR__ . '/../components/category-page.php';
render_swg_category_page('phishing');
