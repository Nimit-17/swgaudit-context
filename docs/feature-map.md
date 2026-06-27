# Feature Map

This file gives product intent and verification shortcuts for major SWGaudit v2
features. Use Graphify for code relationships, then use this file to understand
what correct behavior should mean.

## Site Catalog

Purpose: present SWGaudit simulations by risk category and guide users into
specific tests.

Key files:

- `index.php`
- `about/index.php`
- `phishing/index.php`
- `malware/index.php`
- `data-theft/index.php`
- `cyberslacking/index.php`
- `assets/css/site.css`
- `assets/js/site.js`

Verification:

- Run syntax checks for changed PHP files.
- Use browser checks for navigation, expansion behavior, and responsive layout.

## Data Theft Catalog

Purpose: demonstrate data movement and exfiltration paths that SWG/DLP products
may allow or block.

Key files:

- `data-theft/index.php`
- `assets/css/site.css`
- `assets/js/site.js`

Verification:

```bash
./scripts/check-data-theft.sh
```

## HTTP Path Tunneling

Purpose: demonstrate that data can be sent through URL path chunks without a
POST body or multipart upload body.

Key files:

- `data-theft/index.php`
- `assets/js/data-theft-path-tunnel.js`
- `data-theft/path-tunnel.php`
- `assets/css/site.css`

User flow:

- User selects a file.
- The test auto-runs immediately.
- The browser Base64URL-encodes the file without padding.
- The browser sends metadata and content chunks through GET URL paths.
- The endpoint reconstructs directly from received chunks.
- A manual Run Test button remains as fallback.
- Reset Test appears after a run.

Expected result language:

- Failed when the server reconstructs the file from URL path chunks.
- Passed when the full file does not reach the server through URL path chunks.

Verification:

```bash
./scripts/check-path-tunnel.sh
```

SWG/DLP angle: controls that focus on uploads, POST bodies, MIME inspection, or
multipart form data may miss this. Detection likely requires URL/path inspection
for the path-tunnel endpoint or suspicious long Base64URL-like path segments.

## DNS Tunneling

Purpose: demonstrate data exfiltration through DNS-style request patterns.

Key files:

- `data-theft/index.php`
- `assets/js/data-theft-dns.js`
- `data-theft/fetch_uploaded_data.php`

Verification:

- Inspect current code before changing this flow.
- Extend `scripts/check-data-theft.sh` if DNS-specific checks become frequent.

## Test Access Gate

Purpose: optionally gate test access with the frontend CAPTCHA/test-access flow.

Key files:

- `assets/js/site.js`
- `test-access.php`
- `/etc/swgaudit-v2/recaptcha.php`

Current state:

```js
const TEST_ACCESS_GATE_ENABLED = false;
```

Verification:

- `node --check assets/js/site.js`
- `php -l test-access.php`
- Browser-check the gate flow if re-enabled.
