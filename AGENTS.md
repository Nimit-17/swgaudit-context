# Repository Guidelines

## Project Structure & Module Organization

This repository is currently empty aside from agent metadata. When adding code, keep the layout predictable.

- `src/`: application or library source code.
- `tests/`: automated tests that mirror `src/` structure where practical.
- `assets/`: static images, fixtures, sample data, or other non-code files.
- `docs/`: longer design notes, architecture decisions, and contributor references.

Prefer small, cohesive modules. Keep generated files out of source directories unless required for development or release.

## Build, Test, and Development Commands

No build system or package manifest is present yet. Add project-specific commands as soon as tooling is introduced:

- `npm test`, `pytest`, `cargo test`, or equivalent: run the full test suite.
- `npm run build`, `make build`, or equivalent: produce distributable artifacts.
- `npm run dev`, `make dev`, or equivalent: start a local development server or watcher.
- `npm run lint`, `ruff check .`, or equivalent: run static analysis.

Keep commands reproducible from the repository root.

## Coding Style & Naming Conventions

Follow the formatter and linter configured for the language in use. Until tooling exists, use clear names, small functions, and consistent indentation within each file. Prefer descriptive module names such as `user-service.ts`, `data_loader.py`, or `auth_handler.go`.

Add comments only for non-obvious behavior, invariants, or integration constraints.

## Testing Guidelines

Add tests with every behavioral change once a test framework is available. Name tests after the behavior under test, for example `test_loads_missing_config_defaults` or `auth-handler.test.ts`. Keep shared fixtures under `tests/fixtures/` or the framework’s conventional location.

Before opening a pull request, run the full test suite and relevant linters.

## Commit & Pull Request Guidelines

Readable Git history is not available in this checkout, so no repository-specific commit convention can be inferred. Use concise, imperative commit messages such as `Add config loader tests` or `Fix retry timeout handling`.

Pull requests should include a short summary, reason for the change, verification steps, and linked issues when applicable. Include screenshots for UI changes, and call out migrations, new environment variables, or compatibility concerns.

## Security & Configuration Tips

Do not commit secrets, API keys, or local credentials. Provide `.env.example` when environment variables are required. Keep dependency and tooling updates intentional and tested.

## External Server Access

The user has access to the Linux dev server for `https://www.swgaudit.com/` but does not yet know how the server is configured. Codex is launched from the `/root/nimit` folder on that server.

Read-only inspection actions are allowed without asking first. This includes listing files, navigating directories, reading configuration and source files, checking service status, inspecting processes, viewing logs carefully, checking versions, and making read-only HTTP/DNS probes. The user prefers agents to freely perform non-mutating exploration instead of asking for permission for routine inspection.

Do not make changes on the server without explicit user approval. This includes editing files, installing packages, pulling code, restarting services, changing permissions, running migrations, deleting files, or modifying configuration. Start with inspection and explain the purpose of commands before any action that could alter server state.

## Context Maintenance

Use `readme.md` as the shared project context file. Keep it current with durable facts, goals, preferences, risks, decisions, important paths, safe commands, verification steps, and open questions discovered during work.

Prefer concise context updates over activity logs. The goal is for future agents to understand where the project stands and what the user is trying to accomplish without requiring the user to repeat background information.

When editing application code, work in `/var/www/swgaudit` only after confirming the intended target branch/state and checking for local modifications. Do not overwrite unknown local changes.

## Current Project Context

For current SWG Audit server state, known caveats, project goals, decisions, and open questions, read `readme.md` before taking action. Treat `readme.md` as the source of truth for evolving project context.
