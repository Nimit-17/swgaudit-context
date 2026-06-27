#!/usr/bin/env bash

set -euo pipefail

ROOT="${ROOT:-/root/codex-work/swgaudit-context}"
HOST="${HOST:-www.swgaudit.com}"

cd "$ROOT"

printf '== Data Theft Checks ==\n'

php -l data-theft/index.php >/dev/null
printf 'PHP syntax: data-theft/index.php ok\n'

if [ -f assets/js/data-theft-dns.js ]; then
  node --check assets/js/data-theft-dns.js >/dev/null
  printf 'JS syntax: assets/js/data-theft-dns.js ok\n'
fi

if [ -f assets/js/data-theft-path-tunnel.js ]; then
  node --check assets/js/data-theft-path-tunnel.js >/dev/null
  printf 'JS syntax: assets/js/data-theft-path-tunnel.js ok\n'
fi

curl --resolve "$HOST:443:127.0.0.1" -k -fsSI "https://$HOST/data-theft/" >/dev/null
printf 'Route: https://%s/data-theft/ ok\n' "$HOST"

printf 'Data Theft checks passed.\n'
