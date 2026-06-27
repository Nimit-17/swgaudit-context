# SWGaudit v2 Project Memory

This file is the durable memory for the SWGaudit v2 development site. It should
help future Codex sessions understand the project without requiring the user to
paste the same context again.

## Project Goal

SWGaudit is an educational security simulation site. Its purpose is to make
common web, malware, data theft, phishing, cyberslacking, and policy-bypass
scenarios tangible so users can see how SWG/DLP controls behave in practice.

The site should demonstrate risk clearly and convincingly while staying
authorized, controlled, and safe. Simulations should focus on defensive testing,
policy validation, and explainable outcomes.

## Current Repo And Server

- GitHub: `https://github.com/Nimit-17/swgaudit-context`
- Server working repo: `/root/codex-work/swgaudit-context`
- Live v2 path: `/var/www/swgaudit-v2`
- Branch: `main`
- SSH server: `ssh -p 7575 root@167.71.228.73`
- Web domain used for verification: `https://www.swgaudit.com/`

The working repo is the source of truth for SWGaudit v2 development. The live
path should be updated by pulling from `origin/main` after changes are committed
and pushed.

## User Preferences

- The user does not want to keep repeating stable context.
- Agents should read this memory, use Graphify, and inspect only relevant files
  for each task.
- Prefer proactive implementation once the request is clear.
- Keep the site visually consistent with the existing dark catalog design.
- Avoid unrelated redesigns, infrastructure changes, or broad refactors.
- Preserve runtime artifacts and unknown local changes unless the user asks for
  cleanup.

## Repeatable Work Loop

For ordinary site changes:

1. Read `AGENTS.md`, this file, and any task-specific notes.
2. Run `./scripts/codex-preflight.sh`.
3. Use Graphify to find relevant files and functions.
4. Open only the exact source sections needed.
5. Make a narrow change.
6. Run targeted syntax checks and smoke tests.
7. Commit and push when the work is complete.
8. Pull into `/var/www/swgaudit-v2` when deployment is intended.
9. Update this memory only when a durable fact changed.

More detail lives in `docs/codex-workflow.md`.

Additional context files:

- `docs/current-priorities.md` captures the active focus and assumptions.
- `docs/feature-map.md` maps major features to purpose, files, flow, and checks.
- `docs/graphify-queries.md` provides reusable Graphify query templates.

## Graphify Codebase Memory

Graphify is installed on the server to reduce repeated broad code reading.

- Install location: `/opt/graphify`
- CLI symlink: `/usr/local/bin/graphify`
- Codex skill: `/root/.codex/skills/graphify/SKILL.md`
- Repo graph: `/root/codex-work/swgaudit-context/graphify-out/graph.json`
- Generated output is locally ignored through `.git/info/exclude`.
- Git hooks refresh the graph after commits and checkouts.

Preferred commands:

```bash
cd /root/codex-work/swgaudit-context
swgaudit-graph-query "What files/functions handle <feature>?"
swgaudit-graph-explain "<file-or-function>"
swgaudit-graph-path "<node A>" "<node B>"
swgaudit-graph-update
```

Use Graphify as an index, not as a replacement for reading code. After it
identifies likely files, inspect the relevant source ranges before editing.

## Important Files

- Homepage: `index.php`
- About page: `about/index.php`
- Phishing catalog: `phishing/index.php`
- Malware catalog: `malware/index.php`
- Data Theft catalog: `data-theft/index.php`
- Cyberslacking catalog: `cyberslacking/index.php`
- Global JS and CAPTCHA/test-access gate: `assets/js/site.js`
- Main CSS: `assets/css/site.css`
- DNS tunneling JS: `assets/js/data-theft-dns.js`
- DNS tunneling endpoint: `data-theft/fetch_uploaded_data.php`
- HTTP path tunneling JS: `assets/js/data-theft-path-tunnel.js`
- HTTP path tunneling endpoint: `data-theft/path-tunnel.php`
- Data theft evasion upload endpoint: `data-theft/process_evasion_upload.php`
- Backend test-access endpoint: `test-access.php`
- Server CAPTCHA config: `/etc/swgaudit-v2/recaptcha.php`
- Uploads and reconstructed files: `data-theft/uploads`

## Data Theft: HTTP Path Tunneling

Current behavior:

- The card appears under Data Theft -> Advanced Threat Simulation.
- Selecting a file auto-runs the test immediately.
- The Run Test button remains as a manual fallback.
- A Reset Test button appears after a run.
- Max file size is 200 KB.
- The browser reads the file locally.
- The browser Base64URL-encodes the file without padding.
- The browser chunks encoded content into about 1500-character path chunks.
- Requests look like:

```text
/data-theft/path-tunnel.php/{testId}/0/{metadata}
/data-theft/path-tunnel.php/{testId}/1/{chunk}
```

- Metadata chunk `0` includes filename, MIME type, size, total chunks, and
  encoded length.
- The endpoint reconstructs directly from received path chunks. It does not use
  Apache access logs.
- Status polling uses:

```text
/data-theft/path-tunnel.php?status=1&id={testId}
```

- If reconstructed, the UI reports:

```text
Test Failed: the file was reconstructed from URL path chunks.
```

- If not reconstructed, the UI reports:

```text
Pass: the full file did not reach the server through URL path chunks.
```

- The reconstructed-file link is shown only when the returned URL matches
  `/data-theft/uploads/...`.
- Final reconstructed files are saved under `data-theft/uploads/`, so the
  existing cleanup removes them.

SWG/DLP testing note: this flow uses GET URL path chunks, no POST body and no
multipart upload body. Blocking or detecting it likely requires URL/path
inspection for `/data-theft/path-tunnel.php/` or suspicious long Base64URL-like
path segments. Browser choice matters if only one browser is routed through the
SWG.

## Data Theft: DNS Tunneling

The DNS tunneling simulation uses frontend JavaScript and the endpoint at
`data-theft/fetch_uploaded_data.php`. Historical server notes indicate BIND
query logs may be involved for DNS reconstruction. Inspect current code before
changing this flow.

## Test Access Gate

The frontend gate is controlled in `assets/js/site.js`:

```js
const TEST_ACCESS_GATE_ENABLED = false;
```

It is currently disabled. The backend endpoint still exists at
`test-access.php`, and backend configuration exists at
`/etc/swgaudit-v2/recaptcha.php`.

To re-enable, set `TEST_ACCESS_GATE_ENABLED = true`, run checks, commit, push,
deploy, and verify the user flow.

## Runtime Cleanup

Uploads and reconstructed files live under:

```text
data-theft/uploads
```

Server cron deletes uploads after 10 minutes. The live path may contain
untracked runtime files here. Do not delete them unless intentionally cleaning
test artifacts.

## Verification Commands

Use only the checks relevant to changed files:

```bash
php -l data-theft/index.php
php -l data-theft/path-tunnel.php
node --check assets/js/data-theft-path-tunnel.js
node --check assets/js/site.js
curl --resolve www.swgaudit.com:443:127.0.0.1 -k -I https://www.swgaudit.com/data-theft/
curl --resolve www.swgaudit.com:443:127.0.0.1 -k 'https://www.swgaudit.com/data-theft/path-tunnel.php?status=1&id=0123456789abcdef'
```

For frontend changes, use a browser or screenshot check when practical.

Feature-specific check helpers:

```bash
./scripts/check-data-theft.sh
./scripts/check-path-tunnel.sh
```

## Preflight Command

Use this read-only helper at the start of a task:

```bash
cd /root/codex-work/swgaudit-context
./scripts/codex-preflight.sh
```

It summarizes the working repo, live checkout, commit alignment, Graphify
availability, graph timestamp, and recent rebuild log. It does not fetch, pull,
restart services, or modify the site.

## Deployment Commands

For the standard safe deploy path, use:

```bash
cd /root/codex-work/swgaudit-context
./scripts/deploy-live.sh
```

The helper refuses unexpected local changes, pushes `main`, fast-forwards
`/var/www/swgaudit-v2`, runs basic smoke checks, and confirms working/live commit
alignment. It does not force-push, reset, delete uploads, restart services, or
change server configuration.

Manual commands:

From the working repo:

```bash
cd /root/codex-work/swgaudit-context
git status --short --branch
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git push origin main
```

From the live path:

```bash
cd /var/www/swgaudit-v2
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git pull --ff-only origin main
```

Then verify live with curl and browser checks appropriate to the change.

## Recent Relevant Commits

- `a939a92` Run path tunneling test on file selection
- `7c8ad3a` Enable test access captcha gate
- `6de6f29` Disable test access captcha popup
- `c71edc3` Document Graphify codebase memory workflow
- `f6cfec2` Show path tunnel reconstructed file link

## Open Questions

- Which simulations should be prioritized next for realism and defensive value?
- Should the CAPTCHA/test-access gate remain disabled during development?
- Which browser is routed through the SWG during demos: Firefox, Chrome, or both?
- Should future simulation result pages include more explicit SWG/DLP
  remediation hints?
