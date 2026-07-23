# SWGAudit Current Context For AI Agents

Read this file and `AGENTS.md` before working on SWGAudit.

## State As Of 2026-07-23

SWGAudit production is v4. GitHub `main` contains the static/PHP export. GitHub `v3` preserves the old Mintlify source.

The current live server is:

```text
167.71.228.73:7575
```

Important paths:

```text
/root/codex-work/swgaudit-v4-static  current Git worktree for v4 main
/var/www/swgaudit-v4                  live Apache web root
/var/www/swgaudit-v3                  Mintlify v3 backup/source
/usr/local/sbin/deploy-swgaudit-main  production deploy helper
```

The 64 server (`64.227.129.152`) is not the current source of truth. It may contain an older or copied `/var/www/swgaudit-v4`; see `/root/SWGAUDIT_CONTEXT.md` there for the short pointer.

## What Main Means Now

`main` is the production static/PHP site. It is not the editable Mintlify MDX source.

The static export contains rendered HTML routes, `_next/static` assets, shared `style.css`, shared `swg.js`, and PHP endpoints required by the simulations.

Do not remove PHP endpoints just because the site is mostly static. Data theft and phishing simulations depend on them.

## Current Category Naming

The old `Cyberslacking` category has been renamed to `Facility Abuse`.

Use this naming in UI, tests, and documentation:

```text
Facility Abuse
```

The technical route remains:

```text
/cyberslacking
```

Do not rename this route by bulk-editing the static export. The Mintlify/Next export embeds route metadata, and broad path rewrites can cause browser-side 500/404 hydration failures. If the user asks for a route migration, regenerate from the Mintlify source or make a tested Apache/static redirect plan.

## Deployment Model

Normal work should happen on a branch from `main`, then a PR into `main`.

After merge:

- GitHub `main` is the source of truth.
- GitHub CI must pass.
- Manual deploy uses the `Deploy SWGAudit` workflow.
- The workflow SSHes to the 167 server and runs `/usr/local/sbin/deploy-swgaudit-main`.
- The helper clones GitHub `main`, validates it, syncs it to `/var/www/swgaudit-v4`, reloads Apache, and smoke-tests production.

Do not manually rsync arbitrary local edits into production unless the user is explicitly asking for emergency live surgery.

## Test Architecture

`package.json` scripts:

```bash
npm run check     # static export structure and PHP syntax check
npm run smoke     # curl smoke tests for core pages
npm run selenium  # browser-level smoke tests in headless Chrome
npm run serve     # local Node server helper if needed
```

CI and manual deploy verification run:

```bash
npm ci
npm run check
python3 -m http.server 3333
BASE_URL=http://127.0.0.1:3333 npm run smoke
BASE_URL=http://127.0.0.1:3333 npm run selenium
```

Selenium verifies the core pages in Chrome, expected text, category navigation, broken images, and unexpected severe console errors.

## Apache Notes

On the 167 server, Apache has vhosts that serve `/var/www/swgaudit-v4` for:

- `swgaudit.com`
- `www.swgaudit.com`
- wildcard `*.swgaudit.com`
- default HTTPS access by IP

Use `apachectl configtest` before reloads. The existing deploy helper already does this.

## Safety Rules

- This is a defensive/educational test site. Preserve safe simulation behavior.
- Do not add real malware, credential theft, or uncontrolled exfiltration.
- Keep demonstrations controlled, transparent, and explainable.
- Do not commit secrets, private keys, environment files, or server-only credentials.
- Public SSH keys are not secrets, but key files still do not belong in the repo unless explicitly intended documentation.
- Preserve runtime uploads under `data-theft/uploads`.

## If You Are A New Agent

Start with:

```bash
ssh -p 7575 root@167.71.228.73
cd /root/codex-work/swgaudit-v4-static
git status --short --branch
git log --oneline -5
sed -n '1,220p' AGENTS.md
sed -n '1,220p' README.md
```

Then inspect only the files relevant to the task. Do not rediscover the whole server unless the task is specifically about infrastructure.
