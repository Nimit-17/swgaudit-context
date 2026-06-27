# Current Priorities

Keep this file short. It should capture what future agents should optimize for
right now, not a full roadmap.

## Active Focus

- Improve SWGaudit v2 as an educational, authorized SWG/DLP simulation site.
- Prioritize Data Theft simulations and the clarity of their pass/fail results.
- Keep the existing dark catalog UI consistent unless a redesign is requested.
- Use Graphify and targeted file reads to avoid rereading the whole site.

## Current Assumptions

- The test-access/CAPTCHA gate stays disabled during active development unless
  the user asks to re-enable it.
- The working repo is `/root/codex-work/swgaudit-context`.
- The live checkout is `/var/www/swgaudit-v2`.
- Runtime upload artifacts under `data-theft/uploads/` should not be deleted
  unless the user explicitly asks for cleanup.

## Later

- Add richer remediation hints to simulation results when the user wants the
  tests to teach more about SWG/DLP policy tuning.
- Expand feature-specific check scripts as new simulations become active.
