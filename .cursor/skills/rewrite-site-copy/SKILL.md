---
name: rewrite-site-copy
description: >-
  Rewrites SWG Audit on-site narrative copy (test hook/buildup, category
  intros, editable homepage intro) and on-page terminal step lines after
  mandatory attack/defense research and mechanism verification. Use when
  rewriting site text, narrative-copy.json, hook/buildup, terminal console
  messages, category pages, or when asked to apply SITE_TEXT_INSTRUCTIONS.
disable-model-invocation: true
---

# Rewrite SWG Audit site copy

Follow this skill end-to-end. Do not skip research for narrative copy. Do not edit titles.

## Authority

1. Read and obey [`SITE_TEXT_INSTRUCTIONS.md`](../../../SITE_TEXT_INSTRUCTIONS.md) in full before drafting.
2. Use [`CONTEXT.md`](../../../CONTEXT.md) for servers, plain layout, and locked homepage lines.
3. Voice, clarity, audience, intent, and locked lines in `SITE_TEXT_INSTRUCTIONS.md` win over any habit from other sites.

## Scope

| In scope | Out of scope |
| --- | --- |
| `scripts/narrative-copy.json` → `tests.<slug>.{hookHeading,hook,buildupHeading,buildup}` | Page titles / nav labels |
| `scripts/narrative-copy.json` → `categories.<Name>` (two paragraphs) | Pass/fail **condition cards** unless the user explicitly asks |
| Editable homepage intro in `plain/index.php` (and `home.intro` in JSON) | Locked homepage H1 / lead |
| Terminal step strings for the assigned test in `plain/js/*` | Redesigning run controls / buttons / dropdowns |
| Sync via `node scripts/sync-plain-copy.js` | Reintroducing Mintlify (`*.mdx`, `docs.json`, root `swg.js`) |
| | About us / Contribute page bodies |
| | Changing test mechanisms — strings only |

One assignment = one test slug **or** one category key **or** homepage intro. For a test slug, narrative + that test’s terminal lines are one assignment.

## Parallel / multitask rule

1. One agent per assignment (one slug, or one category, or homepage intro).
2. Each agent edits **only** its assigned `narrative-copy.json` keys and the terminal strings for that slug in `plain/js/*`.
3. Agents do **not** run `sync-plain-copy.js` in parallel.
4. After all assigned edits land, **one** parent run: `node scripts/sync-plain-copy.js`.
5. Do not ship to live (64) unless the user asks. Local / 167 preview only by default.

## Mandatory workflow

```
Rewrite progress:
- [ ] 1. Load instructions
- [ ] 2. Research attacks and defenses (narrative only)
- [ ] 3. Verify this test’s mechanism in code
- [ ] 4. Study reference sites (tone/structure only; narrative)
- [ ] 5. State the core problem in one sentence
- [ ] 6. Draft hook/buildup (or category/home copy)
- [ ] 7. Draft terminal step lines (tests only; no deep research)
- [ ] 8. Voice and accuracy checklist
- [ ] 9. Write narrative-copy.json + plain/js terminal strings
- [ ] 10. Sync plain PHP (only if sole agent or parent)
- [ ] 11. Spot-check plain PHP + terminal strings
```

### 1. Load instructions

Read `SITE_TEXT_INSTRUCTIONS.md` and the current copy in `scripts/narrative-copy.json`. Locate terminal helpers in `plain/js/*` for this test.

### 2. Research attacks and defenses (required for narrative)

Use live web research for the technique this page covers. Keep brief notes. Do not paste research into site copy.

**Skip deep research for terminal lines.**

### 3. Verify the mechanism in code (required)

Read `plain/**/index.php` controls and `plain/js/*` (plus PHP collectors under `plain/data-theft/` when relevant). Buildup and terminal steps must match real behavior.

### 4. Reference sites (required for narrative craft)

- [BrowserLeaks](https://browserleaks.com/)
- [browser.security](https://browser.security/)
- [Netskope Security Check](https://www.netskopesecuritycheck.com/)

Take patterns only. Do not copy wording.

### 5. Core problem (required gate)

`Core problem: …` — draft must serve that sentence.

### 6–7. Draft narrative + terminal

Same rules as `SITE_TEXT_INSTRUCTIONS.md`. Terminal: clear step sequence; malware/data-theft templates; phishing per-test. Keep `Your perimeter security has passed/failed.` prefixes from helpers.

### 8. Voice checklist

Narrative: no pronouns; no adjectives; active voice; no childish evaluative words; titles unchanged.

Terminal: steps match code; variation/channel named; room can follow the log.

### 9–11. Write and sync

1. Edit assigned keys in `scripts/narrative-copy.json`.
2. Edit terminal strings in `plain/js/*`.
3. Run `node scripts/sync-plain-copy.js` (sole agent or parent only).
4. Spot-check `plain/<slug>/index.php`.

## Anti-patterns

- Skipping research for narrative
- Over-researching terminal lines
- Reintroducing Mintlify
- Parallel `sync-plain-copy.js` runs
- Shipping to host 64 without an explicit user ask
