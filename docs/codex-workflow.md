# Codex Workflow For SWGaudit v2

This workflow exists so future Codex sessions can make changes without rereading
the full site or asking the user to paste context repeatedly.

## Start Every Task

Run:

```bash
cd /root/codex-work/swgaudit-context
./scripts/codex-preflight.sh
```

Read:

```text
AGENTS.md
readme.md
docs/current-priorities.md
docs/feature-map.md for the feature being changed
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
./scripts/check-path-tunnel.sh
```

Known Data Theft checks:

```bash
./scripts/check-data-theft.sh
```

For frontend behavior, use a browser check when the change affects interaction
or layout.

## Commit And Deploy

When the task is complete:

```bash
git status --short
git add <changed-files>
git commit -m "<concise imperative message>"
```

Deploy when intended:

```bash
cd /root/codex-work/swgaudit-context
./scripts/deploy-live.sh
```

The deploy helper pushes `main`, fast-forwards `/var/www/swgaudit-v2`, runs
basic smoke checks, and confirms working/live alignment. If the changed feature
needs deeper verification, run that after the helper completes.

## Updating Memory

Update `readme.md` when a durable fact changes, such as:

- New important feature behavior.
- New endpoint, route, or file ownership.
- New deployment or verification command.
- A user preference that should guide future work.
- A recurring risk or gotcha.

Do not add routine command output or long activity logs.
