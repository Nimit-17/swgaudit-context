# SWGaudit Agent Guide

This repository is the SWGaudit v2 development site. Treat this file as the
first-stop operating guide for Codex and other coding agents.

## Working Agreement

- The user should not need to repeat stable project context. Read this file,
  then `readme.md`, then use Graphify or targeted source reads to orient.
- Do not reread the whole site for a small change. Use Graphify to narrow the
  relevant files and functions, then open only the exact source sections needed.
- Keep changes scoped to the requested behavior. Avoid broad refactors, visual
  redesigns, infrastructure changes, or unrelated cleanup unless the user asks.
- The live site is an educational security simulation site. Features should be
  authorized, safe, explainable, and useful for demonstrating SWG/DLP behavior
  without enabling real-world abuse.
- Preserve unknown local changes. Always inspect `git status --short --branch`
  before editing and work with existing modifications instead of reverting them.

## Important Locations

- Server working repo: `/root/codex-work/swgaudit-context`
- Live v2 path: `/var/www/swgaudit-v2`
- GitHub repo: `https://github.com/Nimit-17/swgaudit-context`
- Branch: `main`
- SSH server: `ssh -p 7575 root@167.71.228.73`
- Shared project memory: `readme.md`
- Workflow details: `docs/codex-workflow.md`
- Change log: `reports.md`

## Context Files

- `readme.md` holds durable project facts, current architecture, decisions,
  preferences, risks, and open questions.
- `docs/codex-workflow.md` explains the repeatable loop for future work:
  read memory, query Graphify, edit narrowly, verify, commit, update memory.
- `reports.md` is a concise log of meaningful changes. Do not turn it into a
  transcript of routine inspection.

Update these files when work creates a durable fact that future agents should
know. Keep updates short and useful.

## Graphify First

Graphify is installed on the server to reduce repeated broad source reads.

- Install location: `/opt/graphify`
- CLI symlink: `/usr/local/bin/graphify`
- Skill file: `/root/.codex/skills/graphify/SKILL.md`
- Graph output: `/root/codex-work/swgaudit-context/graphify-out/graph.json`
- `graphify-out/` is locally ignored with `.git/info/exclude`

Before targeted code changes, prefer:

```bash
cd /root/codex-work/swgaudit-context
swgaudit-graph-query "What files/functions handle <feature>?"
swgaudit-graph-explain "<file-or-function>"
swgaudit-graph-path "<node A>" "<node B>"
```

Then read only the files and ranges the graph points to. If the graph is stale,
run:

```bash
swgaudit-graph-update
```

## Key Application Files

- Data Theft page: `data-theft/index.php`
- Global JS and test-access gate: `assets/js/site.js`
- Main CSS: `assets/css/site.css`
- DNS tunneling JS: `assets/js/data-theft-dns.js`
- DNS endpoint: `data-theft/fetch_uploaded_data.php`
- HTTP path tunneling JS: `assets/js/data-theft-path-tunnel.js`
- HTTP path tunneling endpoint: `data-theft/path-tunnel.php`
- Data theft evasion upload endpoint: `data-theft/process_evasion_upload.php`
- Uploads and reconstructed files: `data-theft/uploads`
- Backend CAPTCHA endpoint: `test-access.php`
- Backend CAPTCHA config on server: `/etc/swgaudit-v2/recaptcha.php`

## UI Constraints

- Keep the dark catalog design consistent.
- Reuse existing classes where possible:
  `test-card`, `test-card-detail`, `credential-test-form`, `form-row`,
  `test-actions`, `primary-action`, `test-note`, `test-output`, `is-pass`,
  `is-fail`.
- Keep controls keyboard accessible.
- Do not add unrelated layout or design-system refactors while fixing a feature.

## Verification

Use targeted checks based on changed files. Common checks:

```bash
php -l data-theft/index.php
php -l data-theft/path-tunnel.php
node --check assets/js/data-theft-path-tunnel.js
node --check assets/js/site.js
curl --resolve www.swgaudit.com:443:127.0.0.1 -k -I https://www.swgaudit.com/data-theft/
curl --resolve www.swgaudit.com:443:127.0.0.1 -k 'https://www.swgaudit.com/data-theft/path-tunnel.php?status=1&id=0123456789abcdef'
```

For UI changes, verify in a browser when practical.

## Git And Deployment

Start work with:

```bash
cd /root/codex-work/swgaudit-context
git status --short --branch
```

Push from the working repo with:

```bash
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git push origin main
```

Pull live from `/var/www/swgaudit-v2` with:

```bash
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git pull --ff-only origin main
```

The live tree may have untracked runtime files under `data-theft/uploads/`.
Do not delete them unless intentionally cleaning test artifacts.

## Test Access Gate

The frontend gate is controlled in `assets/js/site.js`:

```js
const TEST_ACCESS_GATE_ENABLED = false;
```

It is currently disabled. Re-enable by setting it to `true` and deploying. The
backend endpoint and server config still exist.
