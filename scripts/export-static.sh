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

if [ -d test-files ]; then
  mkdir -p "$OUTPUT_DIR/test-files"
  cp -a test-files/. "$OUTPUT_DIR/test-files/"
fi

bash scripts/check-static-export.sh "$OUTPUT_DIR"
