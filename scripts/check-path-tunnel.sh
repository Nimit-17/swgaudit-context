#!/usr/bin/env bash

set -euo pipefail

ROOT="${ROOT:-/root/codex-work/swgaudit-context}"
HOST="${HOST:-www.swgaudit.com}"
TEST_ID="${TEST_ID:-0123456789abcdef}"

cd "$ROOT"

printf '== HTTP Path Tunneling Checks ==\n'

php -l data-theft/index.php >/dev/null
printf 'PHP syntax: data-theft/index.php ok\n'

php -l data-theft/path-tunnel.php >/dev/null
printf 'PHP syntax: data-theft/path-tunnel.php ok\n'

node --check assets/js/data-theft-path-tunnel.js >/dev/null
printf 'JS syntax: assets/js/data-theft-path-tunnel.js ok\n'

curl --resolve "$HOST:443:127.0.0.1" -k -fsSI "https://$HOST/data-theft/" >/dev/null
printf 'Route: https://%s/data-theft/ ok\n' "$HOST"

curl --resolve "$HOST:443:127.0.0.1" -k -fsS "https://$HOST/data-theft/path-tunnel.php?status=1&id=$TEST_ID" >/dev/null
printf 'Endpoint: path-tunnel status ok\n'

printf 'HTTP path tunneling checks passed.\n'
