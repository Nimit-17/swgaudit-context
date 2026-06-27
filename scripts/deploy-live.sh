#!/usr/bin/env bash

set -euo pipefail

WORKING_REPO="${WORKING_REPO:-/root/codex-work/swgaudit-context}"
LIVE_REPO="${LIVE_REPO:-/var/www/swgaudit-v2}"
BRANCH="${BRANCH:-main}"
GIT_SSH_COMMAND_VALUE="${GIT_SSH_COMMAND_VALUE:-ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new}"

say() {
  printf '\n== %s ==\n' "$1"
}

fail() {
  printf 'ERROR: %s\n' "$1" >&2
  exit 1
}

require_repo() {
  local path="$1"
  [ -d "$path/.git" ] || fail "$path is not a Git repository"
}

branch_name() {
  git -C "$1" rev-parse --abbrev-ref HEAD
}

filtered_status() {
  git -C "$1" status --porcelain | while IFS= read -r line; do
    case "$line" in
      "?? data-theft/uploads/"*) ;;
      *) printf '%s\n' "$line" ;;
    esac
  done
}

require_clean_except_runtime_uploads() {
  local label="$1"
  local path="$2"
  local status
  status="$(filtered_status "$path")"
  if [ -n "$status" ]; then
    printf '%s\n' "$status" >&2
    fail "$label has local changes. Commit, stash, or inspect them before deploying."
  fi
}

short_head() {
  git -C "$1" rev-parse --short HEAD
}

say "Preflight"
require_repo "$WORKING_REPO"
require_repo "$LIVE_REPO"

working_branch="$(branch_name "$WORKING_REPO")"
[ "$working_branch" = "$BRANCH" ] || fail "working repo is on $working_branch, expected $BRANCH"
require_clean_except_runtime_uploads "working repo" "$WORKING_REPO"

live_branch="$(branch_name "$LIVE_REPO")"
[ "$live_branch" = "$BRANCH" ] || fail "live repo is on $live_branch, expected $BRANCH"
require_clean_except_runtime_uploads "live repo" "$LIVE_REPO"

printf 'Working HEAD before push: %s\n' "$(short_head "$WORKING_REPO")"
printf 'Live HEAD before pull:    %s\n' "$(short_head "$LIVE_REPO")"

say "Push Working Repo"
GIT_SSH_COMMAND="$GIT_SSH_COMMAND_VALUE" git -C "$WORKING_REPO" push origin "$BRANCH"

say "Pull Live Repo"
GIT_SSH_COMMAND="$GIT_SSH_COMMAND_VALUE" git -C "$LIVE_REPO" pull --ff-only origin "$BRANCH"

say "Smoke Checks"
curl --resolve www.swgaudit.com:443:127.0.0.1 -k -fsSI https://www.swgaudit.com/data-theft/ >/dev/null
printf 'Data Theft route: ok\n'

curl --resolve www.swgaudit.com:443:127.0.0.1 -k -fsS 'https://www.swgaudit.com/data-theft/path-tunnel.php?status=1&id=0123456789abcdef' >/dev/null
printf 'Path tunnel status endpoint: ok\n'

say "Final Alignment"
working_head="$(git -C "$WORKING_REPO" rev-parse HEAD)"
live_head="$(git -C "$LIVE_REPO" rev-parse HEAD)"

if [ "$working_head" != "$live_head" ]; then
  printf 'Working: %s\n' "$working_head" >&2
  printf 'Live:    %s\n' "$live_head" >&2
  fail "working and live checkouts do not match after deploy"
fi

printf 'Working/live match: %s\n' "$(printf '%s' "$working_head" | cut -c1-7)"
printf 'Deploy complete.\n'
