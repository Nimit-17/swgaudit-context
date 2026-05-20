# SWG Audit Dev Server Context

This workspace is a coordination area for understanding and safely working on the
SWG Audit dev server. It is not currently the application repository. The live
application code appears to live separately under `/var/www/swgaudit`.

The project goal is to improve the SWG Audit website and make the changes the
user wants over time. The user is still learning how the site and server are
set up, so the current phase is exploratory and cautious: understand the system,
document findings, and make only minor, well-scoped website changes unless the
user explicitly approves a larger step.

At this stage, avoid significant infrastructure work such as fixing HTTPS,
changing DNS, restructuring deployment, or restarting services unless the user
specifically asks for it and approves the exact action.

A second goal is to keep the user and Codex in sync. This README should be
updated as new facts, preferences, goals, risks, and decisions are discovered so
future sessions can understand the user's intent without requiring extremely
specific instructions every time.

## Current Situation

- The user has access to the Linux dev server behind `https://www.swgaudit.com/`.
- Codex is launched from `/root/nimit` on that server.
- This `/root/nimit` directory currently contains only agent/context files.
- The actual deployed site is a traditional Apache/PHP application.
- The dev server is not confirmed to be the canonical production host.
- The server configuration is only partially understood, so inspection should
  come before changes.
- The current focus is small website improvements and learning the codebase, not
  major server repair or deployment cleanup.

## Operating Context

`AGENTS.md` contains the general operating rules for agents, including the
permission model for read-only inspection and server changes. This README should
focus on project context: what we know, what we are trying to do, important
risks, decisions, and open questions.

## Known Server Details

- Hostname: `swgaudit-dev`
- Observed public IP on the box: `167.71.228.73`
- SSH port: `7575`
- Web server: Apache on ports `80` and `443`
- PHP integration: Apache `mod_php`
- Observed PHP CLI version: `8.4.5`

## Known Application Layout

- Main web root: `/var/www/swgaudit`
- Image/static host root: `/var/www/images.swgaudit.com`
- Main Apache config: `/etc/apache2/sites-available/swgaudit.com.conf`
- Image Apache config: `/etc/apache2/sites-available/images.swgaudit.com.conf`

`swgaudit.com` and wildcard subdomains route through `/var/www/swgaudit`.
Subdomains are rewritten to matching directories, with fallback to
`/var/www/swgaudit/wildcard`.

The deployed application directory at `/var/www/swgaudit` is a Git repository
with origin:

```text
https://github.com/swgauditor/swgaudit.git
```

Because the repo is owned outside this workspace, read-only Git inspection may
need an ephemeral safe-directory override, for example:

```bash
git -c safe.directory=/var/www/swgaudit -C /var/www/swgaudit status --short --branch
```

At last inspection, the live tree had broad local modifications relative to
`origin/main`. Treat those local changes as important until they are understood.

## Data-Theft Simulation Notes

BIND/named is installed and authoritative DNS configuration exists under
`/etc/bind`.

The app's data-theft simulation reads:

```text
/var/log/named/query.log
```

It reconstructs uploaded files into:

```text
/var/www/swgaudit/data-theft/uploads
```

A root cron job runs this cleanup script every 10 minutes:

```text
/usr/local/bin/delete_old_uploads.sh
```

The script deletes old upload files. Inspect before changing anything in this
path because it may affect demos or active testing.

## Known Caveats And Risks

- Public DNS for `swgaudit.com`, `www.swgaudit.com`, and
  `data-theft.swgaudit.com` resolved to `139.59.64.233`, while the dev server's
  observed public IP was `167.71.228.73`.
- BIND zone/config files also referenced `139.59.64.233`.
- Apache was configured to use `/etc/letsencrypt/live/swgaudit.com/...`, which
  was an expired wildcard certificate at last inspection.
- A separate `swgaudit.com-0001` certificate existed for `swgaudit.com` and
  `www.swgaudit.com`.
- Apache rewrite logging was very verbose through
  `LogLevel alert rewrite:trace6`.
- `/etc/apache2/sites-enabled/swgaudit_dev.com.conf` appeared to be a broken
  symlink to a missing available config.

## Recommended First Inspection Steps

These are read-only commands that help establish current state before proposing
changes:

```bash
hostname
ip addr
apache2ctl -S
php -v
systemctl status apache2 --no-pager
systemctl status named --no-pager
git -c safe.directory=/var/www/swgaudit -C /var/www/swgaudit status --short --branch
git -c safe.directory=/var/www/swgaudit -C /var/www/swgaudit remote -v
```

Useful targeted file reads:

```bash
sed -n '1,220p' /etc/apache2/sites-available/swgaudit.com.conf
sed -n '1,220p' /etc/apache2/sites-available/images.swgaudit.com.conf
ls -la /var/www/swgaudit
ls -la /etc/bind
crontab -l
```

Use care with logs. Prefer narrow reads with `tail`, `journalctl -n`, or
specific time windows instead of dumping large files.

## Open Questions

- Which specific minor website change should be attempted first?
- Is `167.71.228.73` intended to become the live host, or is it only a dev copy?
- Should DNS point to this server, or should this server be configured to match
  the existing public DNS target at `139.59.64.233`?
- Which local modifications in `/var/www/swgaudit` are intentional and should be
  preserved?
- Are the certificates supposed to cover only `swgaudit.com` and
  `www.swgaudit.com`, or also wildcard subdomains?
- What user-facing flows are most important to validate after any change?

## Context To Keep Current

This README should stay focused on durable project context. Useful updates
include:

- The user's goals, preferences, or recurring terminology.
- Important application routes, files, modules, or workflows.
- Decisions the user has made about what to change or avoid.
- Server or deployment facts that affect future work.
- Safe commands, risky commands, and known verification steps.
- Open questions that need the user's input later.

The goal is shared understanding, not a full activity log.
