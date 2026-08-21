# SWG Audit — agent context

Single condensed context for this project. Keep `README.md` and `SITE_TEXT_INSTRUCTIONS.md` separate; do not duplicate their full content here.

## What it is
SWG Audit is an open-source educational site of safe, controlled simulations. Visitors run tests in their own browser/session to see whether SWG, browser, DLP, and related perimeter controls stop realistic web threat patterns. It is not a full security score and not a commercial pitch.

## Servers and source of truth

**167 is DEV only. 64 is LIVE. Do not treat 167 as the public site.**

| Host | Role |
|------|------|
| `167.71.228.73` | **DEV only.** Plain PHP site: `/var/www/swgaudit-v5` (git: `Nimit-17/swgaudit-context`). Apache `DocumentRoot` is `/var/www/swgaudit-v5/plain`. Alias `/test-files` → `/var/www/swgaudit-v5/test-files`. Not production. |
| `64.227.129.152` | **LIVE.** Public site root (often `/var/www/swgaudit-v4`). Serves `swgaudit.com`. No durable git; ship static/plain from 167 (or org repo) manually. |

### Intended end state (ops)
- Live HTTP(S) for `swgaudit.com` / `www` / needed subdomains → **64 only**.
- **Same 64 box also resolves DNS** for the zone (authoritative DNS on 64; nameservers move off Surebrowse to 64).
- Apex/www A records must not dual-point at other IPs (e.g. stray `103.x` breaks “live = 64”).
- TLS for live (including wildcards) is issued/installed for **64**, not for 167. Dev may have its own certs; they are unrelated to production.

Edits on 167 **do not** update public `swgaudit.com` until files are copied to 64.

Org static handoff repo: `https://github.com/swgauditor/SWG_Audit` (default `dev`). Prefer `swgaudit-v5` on 167 for current plain work. Older `swgaudit-v3` / Mintlify trees on disk are legacy — do not deploy Mintlify to the IP.

## v5 layout (plain PHP)
- `plain/` — site DocumentRoot (pages, `css/`, `js/`, category/test PHP)
- `test-files/` — static test assets (payloads, chunk manifests, sample files); Apache Alias `/test-files`
- `scripts/narrative-copy.json` — narrative source of truth for hook/buildup + category intros
- `scripts/sync-plain-copy.js` — writes narrative into `plain/**/index.php`
- `plain/data-theft/*.php` — upload / reconstruct / tunnel collector endpoints
- `.cursor/skills/rewrite-site-copy/` — agent skill for research-backed copy rewrites

**Do not add Mintlify back** (`*.mdx`, `docs.json`, root `swg.js` / `style.css`, `package.json` mint toolchain, `dist-static`).

## Locked homepage copy
Do **not** change unless a human user explicitly asks:
1. **H1:** Validate the real-world effectiveness of your perimeter security
2. **Lead:** SWG Audit is an open source initiative designed to safely simulate modern web-based cyber threats.

Getting-started guidance under the lead is editable. No “Open phishing tests” CTA on the home page.

## Working rules
- Prefer `narrative-copy.json` + `node scripts/sync-plain-copy.js` for narrative edits; terminal strings live in `plain/js/*`.
- After copy edits on 167, `git pull` / reset on `/var/www/swgaudit-v5` and confirm `plain/data-theft/uploads` is writable by `www-data` (typically `770`).
- Preserve intentional test mechanisms (new-tab phishing, client-side rebuild/smuggle, data-theft backend routes, etc.).
- Do not rewrite About/Contribute bodies unless asked; side nav may omit them while top nav keeps links.
- Site text voice: see `SITE_TEXT_INSTRUCTIONS.md`.
- Ops / overview: see `README.md`.

## Dev-only test notes (167)
- **DNS tunneling over raw IP:** public NS is not this box. Plain JS uses IP-friendly host patterns where needed; collector endpoints live under `plain/data-theft/`.
- **Browser resource abuse:** single intense freeze control (confirm checkbox → run). Terminal logs allocated MB and lock progress; lock ~30s; memory auto-frees ~10s after release.

## Test coverage note
Only ship tests with real working mechanisms. Placeholder-only legacy ideas stay out of nav.
