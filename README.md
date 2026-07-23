# SWGAudit v4 Operations Context

This repository is the current production source of truth for SWGAudit.

SWGAudit is an educational security simulation site for validating Secure Web Gateway, browser security, DLP, and perimeter control behavior against safe, controlled web-based threat patterns.

## Current Architecture

- GitHub repository: `Nimit-17/swgaudit-context`
- Production branch: `main`
- Mintlify backup branch: `v3`
- Current server: `167.71.228.73`
- SSH: `ssh -p 7575 root@167.71.228.73`
- Current server worktree: `/root/codex-work/swgaudit-v4-static`
- Production web root: `/var/www/swgaudit-v4`
- Legacy Mintlify source backup on server: `/var/www/swgaudit-v3`
- Production domain: `https://swgaudit.com/`
- Production Apache serves `/var/www/swgaudit-v4` for `swgaudit.com`, `www.swgaudit.com`, wildcard subdomains, and the default IP HTTPS vhost.

`main` is not a Mintlify source tree anymore. It is the exported static/PHP v4 site generated from Mintlify, with regular `html`, `css`, `js`, assets, and PHP endpoints checked in.

The old Mintlify source is preserved on the `v3` Git branch and in `/var/www/swgaudit-v3`. Do not edit `v3` unless the user explicitly asks to restore or regenerate from Mintlify.

## Important Files And Directories

- Root static pages: `index.html`, `about/index.html`, `getting-started/index.html`, `contribute/index.html`, `terms/index.html`, `privacy/index.html`
- Categories:
  - `/phishing`
  - `/malware`
  - `/data-theft`
  - `/cyberslacking` currently remains the technical route for the visible `Facility Abuse` category.
- Mintlify export assets: `_next/static/`
- Custom UI CSS: `style.css`
- Custom UI JS: `swg.js`
- Runtime PHP endpoints:
  - `test-access.php`
  - `data-theft/fetch_uploaded_data.php`
  - `data-theft/path-tunnel.php`
  - `data-theft/process_evasion_upload.php`
  - `data-theft/upload.php`
  - `phishing/cache-test.php`
  - `phishing/credential-submit.php`
  - `go/ms-login/index.php`
- Runtime upload directory on production: `/var/www/swgaudit-v4/data-theft/uploads`

`data-theft/uploads` is runtime state. Do not delete it during ordinary code work. The deploy helper preserves it.

## CI And Verification

CI runs on pull requests to `main`, pushes to `main`, and manual workflow dispatch.

The required GitHub check is still named `Mintlify broken-link check` for branch protection compatibility, but it now validates the static v4 architecture.

CI currently does:

1. `npm ci`
2. `bash scripts/check-static-export.sh`
3. Start `python3 -m http.server 3333`
4. `BASE_URL=http://127.0.0.1:3333 bash scripts/smoke-test.sh`
5. `BASE_URL=http://127.0.0.1:3333 npm run selenium`

Selenium opens the site in headless Chrome and verifies that the core pages render, expected text appears, category navigation exists, images are not broken, and unexpected severe browser console errors fail the run.

Known allowed static-export console noise includes Mintlify background calls to `/_mintlify/api/user`, `/socket.io`, and intentional security-demo snippets such as `require` or `WScript`.

## Manual Deploy Workflow

GitHub Actions has a manual workflow named `Deploy SWGAudit`.

When manually run, it:

1. Checks out `main`
2. Runs `npm ci`
3. Runs the static export check
4. Starts a local static server
5. Runs curl smoke tests
6. Runs Selenium browser smoke tests
7. SSHes to `167.71.228.73:7575`
8. Runs `/usr/local/sbin/deploy-swgaudit-main`

The server deploy helper then:

1. Clones current GitHub `main` into a temporary staging directory
2. Runs `scripts/check-static-export.sh`
3. Rsyncs the candidate into `/var/www/swgaudit-v4`
4. Preserves `data-theft/uploads`
5. Reloads Apache after `apachectl configtest`
6. Runs production smoke checks against `https://swgaudit.com`

The deploy helper uses the repo deploy key explicitly:

```bash
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new'
```

The private key is secret. The public key is not secret, but do not commit key files into the repo.

## Local Server Verification

From the 167 server worktree:

```bash
cd /root/codex-work/swgaudit-v4-static
npm ci
npm run check
python3 -m http.server 3333
BASE_URL=http://127.0.0.1:3333 npm run smoke
BASE_URL=http://127.0.0.1:3333 npm run selenium
```

Production smoke:

```bash
/usr/local/sbin/deploy-swgaudit-main
```

Run that only when deploying current `main` to production is intended.

## Maintenance Rules

- Do not randomly edit generated export internals.
- Keep changes scoped and explainable.
- Preserve the static v4 architecture unless the user explicitly asks for a different architecture.
- Do not reintroduce Mintlify as the production source on `main`.
- Keep `v3` as the Mintlify backup.
- Keep public user-facing language aligned with current product naming.
- Use `Facility Abuse` for the former `Cyberslacking` category.
- Keep `/cyberslacking` as the technical route until a deliberate route migration is requested and regenerated safely.
- Update `README.md`, `context.md`, and `AGENTS.md` whenever deployment, architecture, branch policy, server paths, or test strategy changes.
