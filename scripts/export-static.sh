#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${1:-dist-static}"
EXPORT_ZIP="${2:-/tmp/swgaudit-mintlify-export.zip}"

cd "$ROOT"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"
rm -f "$EXPORT_ZIP"

npm exec -- mint export --output "$EXPORT_ZIP"

python3 - "$EXPORT_ZIP" "$OUTPUT_DIR" <<'PY'
import pathlib
import sys
import zipfile

archive = pathlib.Path(sys.argv[1])
dest = pathlib.Path(sys.argv[2]).resolve()

with zipfile.ZipFile(archive) as exported:
    for member in exported.infolist():
        target = (dest / member.filename).resolve()
        if not str(target).startswith(str(dest)):
            raise SystemExit(f"Refusing unsafe zip path: {member.filename}")
    exported.extractall(dest)
PY

# Mintlify's zip omits some static test assets (JSON payloads/manifests).
# Reconcile from source so encoded/encrypted/chunk malware tests keep working.
if [[ -d "$ROOT/test-files" ]]; then
  mkdir -p "$OUTPUT_DIR/test-files"
  rsync -a --delete "$ROOT/test-files/" "$OUTPUT_DIR/test-files/"
fi

# PHP endpoints and upload storage live beside the static export.
for php_src in \
  "$ROOT/data-theft/upload.php" \
  "$ROOT/data-theft/process_evasion_upload.php" \
  "$ROOT/data-theft/path-tunnel.php" \
  "$ROOT/data-theft/fetch_uploaded_data.php" \
  "$ROOT/phishing/credential-submit.php" \
  "$ROOT/phishing/cache-test.php" \
  "$ROOT/test-access.php" \
  "$ROOT/data-theft/dns-query.php"
do
  if [[ -f "$php_src" ]]; then
    rel="${php_src#"$ROOT"/}"
    mkdir -p "$OUTPUT_DIR/$(dirname "$rel")"
    cp -a "$php_src" "$OUTPUT_DIR/$rel"
  fi
done

# Apache (www-data) must be able to create/reconstruct uploads for data-theft tests.
install -d -m 0770 -o www-data -g www-data "$OUTPUT_DIR/data-theft/uploads"
# Keep a writable marker so exports don't ship stale private uploads.
find "$OUTPUT_DIR/data-theft/uploads" -mindepth 1 -delete 2>/dev/null || true
chown www-data:www-data "$OUTPUT_DIR/data-theft/uploads"
chmod 0770 "$OUTPUT_DIR/data-theft/uploads"

# Prefer packaged custom UI assets from source when present.
[[ -f "$ROOT/style.css" ]] && cp -a "$ROOT/style.css" "$OUTPUT_DIR/style.css"
[[ -f "$ROOT/swg.js" ]] && cp -a "$ROOT/swg.js" "$OUTPUT_DIR/swg.js"

bash scripts/check-static-export.sh "$OUTPUT_DIR"

# Never publish generator tooling or agent notes as site routes/assets.
rm -rf "$OUTPUT_DIR/scripts"
rm -f "$OUTPUT_DIR/CONTEXT.md" "$OUTPUT_DIR/SITE_TEXT_INSTRUCTIONS.md" "$OUTPUT_DIR/README.md"
