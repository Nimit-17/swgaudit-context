#!/usr/bin/env bash

set -u

WORKING_REPO="${WORKING_REPO:-/root/codex-work/swgaudit-context}"
LIVE_REPO="${LIVE_REPO:-/var/www/swgaudit-v2}"
GRAPHIFY_LOG="${GRAPHIFY_LOG:-/root/.cache/graphify-rebuild.log}"

print_header() {
  printf '\n== %s ==\n' "$1"
}

repo_summary() {
  local label="$1"
  local path="$2"

  print_header "$label"
  printf 'Path: %s\n' "$path"

  if [ ! -d "$path/.git" ]; then
    printf 'Git: not a repository\n'
    return
  fi

  git -C "$path" status --short --branch 2>/dev/null || {
    printf 'Git: unable to read status\n'
    return
  }

  local commit
  commit="$(git -C "$path" rev-parse --short HEAD 2>/dev/null || true)"
  local subject
  subject="$(git -C "$path" log -1 --pretty=%s 2>/dev/null || true)"
  if [ -n "$commit" ]; then
    printf 'HEAD: %s %s\n' "$commit" "$subject"
  fi
}

commit_hash() {
  local path="$1"
  if [ -d "$path/.git" ]; then
    git -C "$path" rev-parse HEAD 2>/dev/null || true
  fi
}

print_header "SWGaudit v2 Preflight"
printf 'Generated: %s\n' "$(date -Is)"

repo_summary "Working Repo" "$WORKING_REPO"
repo_summary "Live Repo" "$LIVE_REPO"

print_header "Repo Alignment"
working_hash="$(commit_hash "$WORKING_REPO")"
live_hash="$(commit_hash "$LIVE_REPO")"

if [ -z "$working_hash" ] || [ -z "$live_hash" ]; then
  printf 'Working/live comparison: unavailable\n'
elif [ "$working_hash" = "$live_hash" ]; then
  printf 'Working/live comparison: match (%s)\n' "$(printf '%s' "$working_hash" | cut -c1-7)"
else
  printf 'Working/live comparison: differ\n'
  printf 'Working: %s\n' "$(printf '%s' "$working_hash" | cut -c1-12)"
  printf 'Live:    %s\n' "$(printf '%s' "$live_hash" | cut -c1-12)"
fi

print_header "Graphify"
if command -v graphify >/dev/null 2>&1; then
  printf 'CLI: %s\n' "$(command -v graphify)"
else
  printf 'CLI: not found\n'
fi

graph_json="$WORKING_REPO/graphify-out/graph.json"
if [ -f "$graph_json" ]; then
  printf 'Graph: present (%s)\n' "$graph_json"
  if command -v stat >/dev/null 2>&1; then
    printf 'Graph modified: %s\n' "$(stat -c '%y' "$graph_json" 2>/dev/null || echo 'unknown')"
  fi
else
  printf 'Graph: missing (%s)\n' "$graph_json"
fi

if [ -f "$GRAPHIFY_LOG" ]; then
  printf 'Recent rebuild log:\n'
  tail -n 5 "$GRAPHIFY_LOG" | sed 's/^/  /'
else
  printf 'Recent rebuild log: missing (%s)\n' "$GRAPHIFY_LOG"
fi

print_header "Helpful Next Commands"
printf 'Read memory: sed -n '\''1,220p'\'' AGENTS.md && sed -n '\''1,260p'\'' readme.md\n'
printf 'Query graph: swgaudit-graph-query "What files/functions handle <feature>?"\n'
