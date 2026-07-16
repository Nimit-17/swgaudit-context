#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
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
  "phishing/index.html"
  "phishing/credential-submit.php"
  "go/ms-login/index.php"
  "test-access.php"
)

for path in "${required_paths[@]}"; do
  [ -e "$path" ] || fail "missing required path: $path"
done

route_count="$(find . -type f -name index.html -not -path './.git/*' | wc -l | tr -d ' ')"
[ "$route_count" -ge 35 ] || fail "expected at least 35 rendered routes, found $route_count"

if find . -type f -name '*.mdx' -not -path './.git/*' | grep -q .; then
  find . -type f -name '*.mdx' -not -path './.git/*' >&2
  fail "main should contain the exported static site, not Mintlify .mdx source"
fi

[ ! -f docs.json ] || fail "docs.json belongs on the Mintlify backup branch, not static main"
[ -f package-lock.json ] || fail "package-lock.json is required for locked Selenium verification dependencies"

grep -q 'name="generator" content="Mintlify"' index.html || fail "index.html does not look like the Mintlify export"
grep -q '/_next/static/' index.html || fail "index.html does not reference exported _next assets"

if command -v php >/dev/null 2>&1; then
  while IFS= read -r php_file; do
    php -l "$php_file" >/dev/null
  done < <(find . -type f -name '*.php' -not -path './.git/*' | sort)
fi

printf 'Static export check passed: %s routes\n' "$route_count"
