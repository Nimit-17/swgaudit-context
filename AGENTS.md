# AGENTS.md

This file is the operating guide for AI coding agents working on SWGAudit v4.

## First Principles

- Read `context.md` and `README.md` before making changes.
- Treat GitHub `main` as the production static/PHP v4 source of truth.
- Treat GitHub `v3` as the Mintlify backup branch.
- Do not reintroduce Mintlify into production `main`.
- Do not make broad visual, routing, deployment, or architecture changes unless the user asks.
- Preserve unknown local changes. Check `git status --short --branch` before editing.
- Keep edits tightly scoped and verify them.

## Current Server And Repo

```bash
ssh -p 7575 root@167.71.228.73
cd /root/codex-work/swgaudit-v4-static
```

Live web root:

```text
/var/www/swgaudit-v4
```

Production deploy helper:

```text
/usr/local/sbin/deploy-swgaudit-main
```

## Product Language

Use `Facility Abuse` for the category formerly known as `Cyberslacking`.

Current technical route:

```text
/cyberslacking
```

Do not bulk-rewrite this route inside the static export. Keep the visible label as `Facility Abuse`; migrate the URL only through a deliberate, tested route migration.

## Expected Work Loop

1. `git status --short --branch`
2. Confirm you are on or branched from current `origin/main`.
3. Inspect the smallest relevant files.
4. Make the smallest safe change.
5. Run relevant checks.
6. Commit and push to a branch.
7. Open a PR to `main`.
8. Wait for required CI.
9. Merge only when checks pass and the user has asked you to proceed.
10. Deploy only when the user asks for production deployment.

## Verification Commands

Use these from `/root/codex-work/swgaudit-v4-static`:

```bash
npm ci
npm run check
python3 -m http.server 3333
BASE_URL=http://127.0.0.1:3333 npm run smoke
BASE_URL=http://127.0.0.1:3333 npm run selenium
```

For a one-shot local verification with a background server, use a shell-safe equivalent that kills the server afterward.

Production deploy verification is built into:

```bash
/usr/local/sbin/deploy-swgaudit-main
```

This command deploys current GitHub `main` to production. Do not run it casually.

## What Not To Change Randomly

- Do not delete `_next/static`.
- Do not delete PHP endpoints.
- Do not delete `data-theft/uploads` or runtime uploads.
- Do not rename or delete `/cyberslacking` unless requested.
- Do not change Apache vhosts unless the task is infrastructure.
- Do not alter GitHub branch meaning: `main` is v4, `v3` is Mintlify backup.
- Do not commit private keys, deploy secrets, `.env` files, or server-only credentials.

## CI Details

The required check is named `Mintlify broken-link check` only for branch protection compatibility.

Despite the name, the check validates static v4:

- locked npm install
- static export structure
- PHP syntax
- curl route smoke
- Selenium browser smoke

If this check fails, inspect the GitHub Actions log before guessing.

## Public Key Note

SSH public keys are not secrets. GitHub must know a deploy key's public half to authenticate the private half. Never expose the private key. Avoid committing `.pub` files unless they are intentionally documented.
