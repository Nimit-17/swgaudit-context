# SWG Audit — agent context

Single condensed context for this project. Keep `README.md` and `SITE_TEXT_INSTRUCTIONS.md` separate; do not duplicate their full content here.

## What it is
SWG Audit is an open-source educational site of safe, controlled simulations. Visitors run tests in their own browser/session to see whether SWG, browser, DLP, and related perimeter controls stop realistic web threat patterns. It is not a full security score and not a commercial pitch.

## Servers and source of truth

**167 is DEV only. 64 is LIVE. Do not treat 167 as the public site.**

| Host | Role |
|------|------|
| `167.71.228.73:7575` | **DEV only.** Mintlify source: `/var/www/swgaudit-v3` (git: `Nimit-17/swgaudit-context`). Apache serves `/var/www/swgaudit-v3/dist-static` for preview. Not production. |
| `64.227.129.152` | **LIVE.** Public site root (often `/var/www/swgaudit-v4`). Serves `swgaudit.com`. No durable git; ship static from 167 (or org repo) manually. |

### Intended end state (ops)
- Live HTTP(S) for `swgaudit.com` / `www` / needed subdomains → **64 only**.
- **Same 64 box also resolves DNS** for the zone (authoritative DNS on 64; nameservers move off Surebrowse to 64).
- Apex/www A records must not dual-point at other IPs (e.g. stray `103.x` breaks “live = 64”).
- TLS for live (including wildcards) is issued/installed for **64**, not for 167. Dev may have its own certs; they are unrelated to production. Visiting `https://167…` by IP may show a cert warning (cert is for `swgaudit.com`).

Edits on 167 **do not** update public `swgaudit.com` until static files are copied to 64. MDX/CSS/`swg.js` changes on 167 are invisible on the IP until `npm run export:static` (or an intentional copy of those assets into `dist-static`).

Org static handoff repo: `https://github.com/swgauditor/SWG_Audit` (default `dev`). `/root/codex-work/` on 167 is archive/old worktrees — prefer `swgaudit-v3`.

## v3 layout (Mintlify + custom UI)
- `docs.json` — nav/config
- `index.mdx` — homepage (generated)
- Categories: `phishing/`, `malware/`, `data-theft/`, `cyberslacking/` (UI label may be Facility Abuse; route often stays `/cyberslacking`)
- `style.css`, `swg.js` — custom UI and test behavior
- `scripts/generate-pages.js` + `scripts/narrative-copy.json` — regenerate MDX instead of hand-editing every page
- `scripts/export-static.sh` + `scripts/check-static-export.sh` — Mintlify zip → `dist-static`, plus required assets/checks
- `test-access.php` — reCAPTCHA gate; secrets stay off-repo
- `test-files/` — static test assets (payloads, chunk manifests, sample files)
- `data-theft/*.php` — upload / reconstruct / tunnel collector endpoints used by live tests

## Locked homepage copy
Do **not** change unless a human user explicitly asks (also commented in `indexHtml()`):
1. **H1:** Validate the real-world effectiveness of your perimeter security
2. **Lead:** SWG Audit is an open source initiative designed to safely simulate modern web-based cyber threats.

Getting-started guidance under the lead is editable. No “Open phishing tests” CTA on the home page.

## Working rules
- Prefer generator + regenerate + `npm run export:static` for **dev** checks on 167; public verification is on 64 / `swgaudit.com`.
- **Do not hand-edit** Mintlify-generated `dist-static/**/index.html`. Surgical HTML edits break hydration and can blank the page. Change source (`*.mdx` via generator / `narrative-copy.json`, `swg.js`, `style.css`), then re-export.
- Do not treat generated `dist-static` as the durable source of truth.
- After export, confirm: full `test-files/` (including `payloads/*.json` and chunk `manifest.json`), needed PHP under `data-theft/`, and `data-theft/uploads` writable by the web user (`www-data`, typically `770`).
- Preserve intentional v2 test mechanisms (new-tab phishing, client-side rebuild/smuggle, data-theft backend routes, etc.).
- Do not rewrite About/Contribute bodies unless asked; side nav may omit them while top nav keeps links.
- Site text voice: see `SITE_TEXT_INSTRUCTIONS.md`.
- Ops / setup: see `README.md`.

## Dev-only test notes (167)
- **DNS tunneling over raw IP:** public NS is not this box. `swg.js` uses `<ip>.sslip.io` + HTTPS and also hits `/data-theft/dns-query.php` so the collector log works on IP preview.
- **Browser resource abuse:** single intense freeze control (confirm checkbox → run). Terminal logs allocated MB and lock progress; lock ~30s; memory auto-frees ~10s after release. No Standard/Stop/meter card in the current UI.

## Test coverage note
Only ship tests with real working mechanisms. Placeholder-only legacy ideas stay out of nav.
