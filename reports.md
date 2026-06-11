# Change Reports

This file is the running change log for work performed from `/root/nimit`.
Use it for concise records of meaningful changes, not routine read-only
inspection.

## 2026-06-11

- Added the `/phishing/` catalog page for SWG Audit v2 with three visible
  sections: Bare Minimum, Evasion Detection, and Advanced Threat Simulation.
- Added six placeholder phishing test cards that expand inline and expose a
  direct `Run Test` action for future simulation flows.
- Added a top collapsible test navigation bar for the phishing page instead of
  a side navigation panel.
- Updated homepage and about-page phishing level links to point to the new
  `/phishing/#...` section anchors.
- Removed the separate phishing test navigation bar after folding its card-like
  styling into the primary header dropdowns.
- Tightened the phishing hero and category section layout so the first viewport
  shows only the page heading and description on desktop.
- Changed phishing test cards to open from a card click, with only the selected
  card expanding.

## 2026-05-20

- Verified that `/root/nimit` is a Git repository for SWG Audit context files.
- Confirmed `AGENTS.md` and `readme.md` were tracked locally but had not been
  pushed to GitHub yet.
- Verified GitHub deploy key `/root/.ssh/swgaudit_context_github` authenticates
  as `Nimit-17/swgaudit-context`.
- Found that system SSH client config sets port `7575` globally, requiring
  GitHub SSH commands to use port `22`.
- Pushed the context repository to
  `git@github.com:Nimit-17/swgaudit-context.git`.
- Configured `/root/nimit` `origin` to use the SSH remote and set local
  `core.sshCommand` to use the deploy key on GitHub port `22`.
- Updated `readme.md` with durable GitHub/deploy-key context.
- Recorded the long-term product direction: SWG Audit should use authorized,
  educational simulations to demonstrate how easily common attacks can succeed
  and why defenses can fail in practice.
