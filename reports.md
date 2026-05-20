# Change Reports

This file is the running change log for work performed from `/root/nimit`.
Use it for concise records of meaningful changes, not routine read-only
inspection.

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
