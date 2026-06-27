# Codex Workflow For SWGaudit v2

This workflow exists so future Codex sessions can make changes without rereading
the full site or asking the user to paste context repeatedly.

## Start Every Task

Run:

```bash
cd /root/codex-work/swgaudit-context
git status --short --branch
```

Read:

```text
AGENTS.md
readme.md
```

If the task touches a known feature, use Graphify before opening source files:

```bash
swgaudit-graph-query "What files/functions handle <feature>?"
swgaudit-graph-explain "<file-or-function>"
```

Only read the source sections that Graphify and the task point to.

## Choosing What To Read

For Data Theft UI changes, start with:

```text
data-theft/index.php
assets/css/site.css
assets/js/site.js
```

For HTTP path tunneling:

```text
data-theft/index.php
assets/js/data-theft-path-tunnel.js
data-theft/path-tunnel.php
assets/css/site.css
```

For DNS tunneling:

```text
data-theft/index.php
assets/js/data-theft-dns.js
data-theft/fetch_uploaded_data.php
assets/css/site.css
```

For test-access gating:

```text
assets/js/site.js
test-access.php
/etc/swgaudit-v2/recaptcha.php
```

For broad navigation/catalog changes:

```text
index.php
about/index.php
phishing/index.php
malware/index.php
data-theft/index.php
cyberslacking/index.php
assets/css/site.css
assets/js/site.js
```

Broaden only when the code proves it is necessary.

## Editing Rules

- Keep edits narrow and consistent with existing PHP, JS, and CSS style.
- Reuse existing classes before introducing new ones.
- Keep controls keyboard accessible.
- Do not delete or move runtime upload files.
- Do not modify server config, services, packages, DNS, or certificates unless
  the user explicitly asks for that kind of work.
- If local changes exist, inspect them and preserve them.

## Verification Matrix

Use checks based on changed files:

```bash
php -l <changed-php-file>
node --check <changed-js-file>
curl --resolve www.swgaudit.com:443:127.0.0.1 -k -I https://www.swgaudit.com/<route>/
```

Known path tunneling checks:

```bash
php -l data-theft/index.php
php -l data-theft/path-tunnel.php
node --check assets/js/data-theft-path-tunnel.js
curl --resolve www.swgaudit.com:443:127.0.0.1 -k 'https://www.swgaudit.com/data-theft/path-tunnel.php?status=1&id=0123456789abcdef'
```

For frontend behavior, use a browser check when the change affects interaction
or layout.

## Commit And Deploy

When the task is complete:

```bash
git status --short
git add <changed-files>
git commit -m "<concise imperative message>"
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git push origin main
```

Deploy when intended:

```bash
cd /var/www/swgaudit-v2
GIT_SSH_COMMAND='ssh -p 443 -i /root/.ssh/swgaudit_context_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new' git pull --ff-only origin main
```

Then run live verification for the touched route.

## Updating Memory

Update `readme.md` when a durable fact changes, such as:

- New important feature behavior.
- New endpoint, route, or file ownership.
- New deployment or verification command.
- A user preference that should guide future work.
- A recurring risk or gotcha.

Update `reports.md` for meaningful completed changes. Keep entries concise.

Do not add routine command output or long activity logs.
