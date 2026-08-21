# SWG Audit

**Prove what your perimeter actually stops.**

Live site: [swgaudit.com](https://swgaudit.com)

## Why this exists

Security claims are cheap. Verification is not.

Most people have no practical way to confirm that their Secure Web Gateway, browser controls, or DLP do what the datasheet says. SWG Audit closes that gap: safe, controlled tests you run yourself, with outcomes you can see.

Defenses that lean on URL reputation alone age poorly. Attackers shift into the browser and the last mile—reassembling payloads on the endpoint, mutating content after a first “safe” look, and using other patterns that never look like a known-bad link. This site makes those realities observable in your environment, without asking you to take anyone’s word for it.

## What you can test

| Area | Focus |
| --- | --- |
| **Phishing** | Lookalike and redirected URLs, client-assembled pages, canvas UIs, content mutation, credential submission |
| **Malware** | Delivery and evasion: formats, nesting, encoding, encryption, chunking, smuggling, related browser behavior |
| **Data theft** | Outbound movement via uploads and evasion channels, including DNS and HTTP path tunneling |
| **Facility abuse** | Whether category and content policy holds under real use |

Every test includes explicit pass and fail criteria.

## How to use

1. Pick a category.
2. Run a test.
3. Read the result against the pass/fail conditions for *your* controls.

Designed to stay simple: one scenario, one action, one clear outcome.

## Safety

Educational and controlled. Use only where you are authorized. Use dummy data. Do not submit real credentials or sensitive files.

## Repository

Plain PHP/HTML/CSS/JS site for SWG Audit (`plain/`). Narrative source: `scripts/narrative-copy.json` (sync with `node scripts/sync-plain-copy.js`). Dev preview on 167 is `/var/www/swgaudit-v5/plain`. Live site: [swgaudit.com](https://swgaudit.com).
