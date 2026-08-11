#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-dist-static}"
cd "$ROOT"

fail() {
  printf 'ERROR: %s\n' "$1" >&2
  exit 1
}

required_paths=(
  "index.html"
  "_next"
  "style.css"
  "swg.js"
  "images/logo.png"
  "data-theft/index.html"
  "data-theft/dns-tunneling/index.html"
  "data-theft/path-tunnel.php"
  "data-theft/upload.php"
  "data-theft/process_evasion_upload.php"
  "data-theft/fetch_uploaded_data.php"
  "data-theft/uploads"
  "phishing/index.html"
  "phishing/credential-submit.php"
  "go/ms-login/index.php"
  "test-access.php"
  "test-files/malware/payloads/decode-eicar-docm.json"
  "test-files/malware/payloads/decode-eicar-docm-base32.json"
  "test-files/malware/payloads/decrypt-eicar-docm.json"
  "test-files/malware/payloads/decrypt-eicar-txt.json"
  "test-files/malware/chunk-attacks/straight-split/manifest.json"
  "test-files/malware/chunk-attacks/reverse-order/manifest.json"
  "test-files/malware/chunk-attacks/randomized-size/manifest.json"
  "test-files/malware/chunk-attacks/parallel-burst/manifest.json"
  "test-files/malware/chunk-attacks/mixed-noise/manifest.json"
)

for path in "${required_paths[@]}"; do
  [ -e "$path" ] || fail "missing required path: $path"
done

# uploads must be writable by the web server user for live data-theft tests
if [ ! -w "data-theft/uploads" ]; then
  fail "data-theft/uploads is not writable"
fi

route_count="$(find . -type f -name index.html -not -path './.git/*' | wc -l | tr -d ' ')"
[ "$route_count" -ge 35 ] || fail "expected at least 35 rendered routes, found $route_count"

if find . -type f -name '*.mdx' -not -path './.git/*' | grep -q .; then
  find . -type f -name '*.mdx' -not -path './.git/*' >&2
  fail "static export should not contain Mintlify .mdx source"
fi

[ ! -f docs.json ] || fail "docs.json belongs in Mintlify source, not the static export"

grep -q 'name="generator" content="Mintlify"' index.html || fail "index.html does not look like the Mintlify export"
grep -q '/_next/static/' index.html || fail "index.html does not reference exported _next assets"

if command -v php >/dev/null 2>&1; then
  while IFS= read -r php_file; do
    php -l "$php_file" >/dev/null
  done < <(find . -type f -name '*.php' -not -path './.git/*' | sort)
fi

printf 'Static export check passed: %s routes\n' "$route_count"
