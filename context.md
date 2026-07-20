# SWG Audit v3 Context

This folder is the Mintlify-based v3 rebuild of the SWG Audit site.

The goal of SWG Audit is to provide safe, non-malicious tests that help a user check whether their Secure Web Gateway (SWG), browser security, DLP, and related perimeter controls actually block realistic web-based threat patterns. The tests should preserve the core behavior and mechanisms from the v2 PHP site while moving the UI into a cleaner Mintlify/MDX-based structure.

## Current Architecture

- `docs.json` is the Mintlify navigation/config file.
- `index.mdx` is the custom homepage.
- Category pages live under:
  - `phishing/`
  - `malware/`
  - `data-theft/`
  - `cyberslacking/`
- `style.css` contains the custom SWG Audit UI. The site intentionally does not rely on the default Mintlify docs layout for the actual test pages.
- `swg.js` contains the shared client-side behavior for test controls, downloads, dropdowns, chip selection, payload reconstruction, and form/test submission flows.
- `test-access.php` provides the v3 reCAPTCHA gate. It stores each verified work email, IP address, IP-derived location, and unique completed test pages in one visitor record at `/var/lib/swgaudit-v3/visitor-submissions.csv`, and sends the same fields to the configured Google Sheets webhook when available.
- `test-files/` contains static test assets used by the pages.
- `scripts/generate-pages.js` is the page generator. If many pages need structural changes, update this generator and regenerate the MDX pages instead of hand-editing every page.

Mintlify is mainly being used to turn MDX into a hosted/static site. The visual layout is custom and should remain custom. Do not assume the site should look like Mintlify's default documentation theme.

## Current Test Coverage

The current v3 navigation contains:

- Phishing: 5 working tests
- Malware: 11 working tests
- Data theft: 6 working tests
- Cyberslacking: 1 working test

Tests from v2 that did not have a real working mechanism should not be added just to fill the menu. Placeholder-only v2 tests were intentionally excluded.

Excluded placeholder/no-working-test examples:

- `known-phishing-domains`
- `misclassified-domains`
- `unknown-domains-zero-hour`
- `browser-fingerprinting`
- `websocket`
- `sent-by-malware`
- `browser-session-or-credential-theft`

## Behavior Expectations

Preserve the v2 test mechanisms where they were intentional. For example:

- Some phishing tests intentionally open in a new tab.
- URL manipulation should keep the manipulated/redirect/homograph URL behavior.
- Malware download tests should use real anchor/download navigation where that better matches browser/SWG behavior.
- Encoded, encrypted, chunked, and smuggled malware tests rebuild or extract payloads client-side where that was the point of the test.
- Data-theft tests should keep the same broad mechanism as v2: file upload, encoding, encryption, chunking, DNS tunnelling, and HTTP path tunnelling.
- Cyberslacking uses a dropdown of video categories and should update both the embedded video and its description when a category is selected.

The data-theft tests depend on the old SWG Audit backend/PHP endpoints. They can be represented in the Mintlify UI, but the full end-to-end behavior only works when the v3 UI is served with access to the SWG Audit backend/proxy routes.

The Apache vhost excludes `/test-access.php` from the Mintlify proxy so Apache/PHP serves the v3 verification endpoint directly. The reCAPTCHA secret remains in `/etc/swgaudit-v2/recaptcha.php`; do not commit it into this repository.

## UI Expectations

The test-page layout should stay consistent:

- Pass/fail criteria are side by side on normal desktop widths.
- The run-test box appears below pass/fail.
- Run-test boxes should be medium width, not huge full-width panels and not cramped.
- If a test has multiple selectable options, each option should have an inline description inside the run-test box.
- Descriptions should be plain text inside the run-test box, not boxed cards inside the run-test box.
- The selected option description should update when the user selects a different chip/dropdown option.

## Mintlify Notes

Use `npm run dev` from this folder to run the Mintlify local preview.

Use `npm run check` to run Mintlify's broken-link check.

If `npm install` fails because Puppeteer cannot download or repair its Chrome cache, retry with:

```powershell
$env:PUPPETEER_SKIP_DOWNLOAD='true'; npm install
```

That skips Puppeteer's browser download. It is acceptable for this project because Mintlify local preview does not need Puppeteer's bundled Chrome to serve the site.

## Important Maintenance Rule

Update this `context.md` whenever there is a major functional change to how the site works, what tests exist, how tests are generated, or how test mechanisms are preserved.

Do not update this file for small visual/design-only tweaks unless they change the expected structure or behavior of the site.

The purpose of this file is to let Codex, Claude, or another assistant start a new chat with enough context to continue from the current state without rediscovering the project from scratch.
