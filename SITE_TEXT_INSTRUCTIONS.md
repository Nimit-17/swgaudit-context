# SWG Audit site text instructions

Rules for rewriting on-site copy (homepage intro, categories, test hook/buildup, and on-page terminal lines). Pass/fail condition cards and run controls stay out of scope unless noted.

## Locked homepage lines (do not change)

Unless a human user explicitly asks to change them, these two lines stay exactly as written:

1. Heading: `Validate the real-world effectiveness of your perimeter security`
2. Lead: `SWG Audit is an open source initiative designed to safely simulate modern web-based cyber threats.`

They are hardcoded in `scripts/generate-pages.js` (`HOME_H1`, `HOME_LEAD`) with comments that agents must not edit them. Do not “improve,” shorten, or regenerate these lines.

## Audience and use
- Readers range from CISOs and senior security leaders to cybersecurity interns.
- Typical use: a live demo on the company’s own network, with the security team watching together.
- Everyone in that room must understand the text on first read.
- Write so a non-specialist can follow the idea, and a specialist still trusts the accuracy.

## Clarity (required)
- Prefer plain language over dense phrasing.
- Avoid jargon. If a technical term is required, pair it with a short plain explanation in the same sentence.
- Do not invent clever labels that hide meaning.
- When density and clarity conflict, choose clarity.
- Test hook and buildup must accurately describe what that test does. Do not overclaim, underclaim, or blur the mechanism.
- Stay professional. Avoid childish or casual evaluative words (for example “bad”, “fake”, “tricks”, “secrets”). Prefer precise security language that a CISO and an intern can both take seriously.

## Voice and grammar
- No pronouns.
- No adjectives.
- No passive voice.
- Active voice only.
- Narrative, cohesive flow.
- Short and dense; do not stretch; do not drop required points.
- Professional.
- Do not pitch a commercial product (do not say this explicitly on the site).
- Do not bash SWG vendors to promote a product; frame evidence gaps and evolving techniques.
- Do not blindly paste layman phrasing from briefs; keep the meaning, elevate the language.
- Clarity for the full audience still applies under these constraints: short plain sentences beat ornate compression.

## Site experience
- Moving through the site should feel like one continuous experience.
- Each test follows a movie arc: **hook → buildup → climax → end**.
  - Climax = the run control (already built; do not redesign).
  - End = on-page terminal result (rewrite the **step lines** so a watcher can follow what happens in real time).
  - Narrative rewrite targets **hook** and **buildup**. Terminal rewrite targets the runtime strings in `swg.js` / `plain/js/*` (keep both in sync when a test has both).

## Terminal lines (real-time log)
- Goal: anyone in the room can see what the test is doing while it runs.
- Prefer a clear step sequence over clever wording. No deep research required for terminal copy.
- Keep the fixed pass/fail prefixes (`Your perimeter security has passed/failed.`) — rewrite only the detail text passed into those helpers, plus interim `terminalLine` steps.
- Do not invent steps the code does not perform.
- **Malware (typical template):** name the action → fetch/open from server or carrier → assemble/decode when that happens → download or block outcome.
- **Data theft (typical template):** prepare/transform file → send over the channel under test → report chunk/progress when real → collector rebuild result.
- **Phishing:** steps vary by test (open URL, assemble local page, canvas draw, mutation refresh, credential POST). Name the variation and each real stage.
- Buildup may mention one short outcome cue; do not paste full terminal scripts into the buildup paragraph.

## Structure / IA
- Getting started lives on the homepage (intro under the locked lead). No separate Getting started page.
- Remove About us and Contribute from the **side nav only** (keep top-nav links and page bodies).
- Do not rewrite About us or Contribute page content.

## Test page sections
- Replace generic labels **The threat** and **How the test works**.
- Use short, per-test headings that name what the paragraph below actually says.
- Hook paragraph = attack idea in plain words.
- Buildup paragraph = what the run will do, matching the real mechanism. One short outcome cue is fine (for example “try to right-click” or “terminal shows allocated memory”); do not script terminal lines word-for-word.

## Intent (must come through)
- Security claims are easy to make and hard to verify.
- Visitors need to see for themselves whether perimeter controls stop realistic web threats.
- Site provides controlled tests people run in their own environment; belief comes from evidence.
- Easy to use.
- Market SWGs claim broad protection while attackers keep advancing—especially last-mile / browser-side reassembly and patterns that beat simple URL filtering.
- Frame as verification and evolving threats, not vendor bashing.

## Homepage getting-started intro (editable)
Under the locked lead, keep clear guidance covering:
- Pick a category, run a test, compare to that page’s pass/fail conditions.
- Pass = blocked/warned; fail = action completed with no interruption.
- Dummy credentials and disposable files only; do not use live credentials or live business files.
- One result = evidence for that technique, not a full security score.

## Source of truth
- **167 is DEV only; 64 is LIVE** (see `CONTEXT.md`). Copy edits do not go live until files are shipped to 64.
- Edit the plain site: `plain/` (Apache DocumentRoot on 167 is `/var/www/swgaudit-v5/plain`).
- Prefer `scripts/narrative-copy.json` + `node scripts/sync-plain-copy.js` for test/category narrative.
- Homepage H1/lead are locked in `plain/index.php`. Intro under the lead is editable.
- Terminal step lines live in `plain/js/*`. Keep wording aligned with the real mechanism.
- Do not reintroduce Mintlify (`*.mdx`, `docs.json`, root `swg.js` / `style.css`, mint `package.json`).
