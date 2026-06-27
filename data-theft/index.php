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
  echo json_encode(["received" => $hasFile, "stored" => $stored, "delete_after_minutes" => 10]);
  exit;
}
require_once __DIR__ . '/../components/category-page.php';
render_swg_category_page('data-theft');
