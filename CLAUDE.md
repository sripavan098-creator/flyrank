# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repository.

## Project

_One paragraph: what this project is, who uses it, and the current phase._

## Stack

- Language/runtime: TBD
- Framework: TBD
- Database: TBD
- Testing: TBD
- Package manager: TBD

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). One logical change per commit.
- **Branching:** `main` is always deployable; work in short-lived feature branches.
- **Code style:** _formatter/linter to be added (e.g. Prettier + ESLint / Black + Ruff)_.
- **File structure:** keep source in `src/`, tests colocated or in `tests/`.

## Working with the AI assistant

- Prefer small, reviewable diffs over large rewrites.
- Explain reasoning for non-trivial changes in the commit body, not just the subject line.
- Don't invent dependencies — check `package.json` / lockfile before assuming a library is available.
- Run tests/lints before committing when they exist.
- Ask before deleting files or rewriting git history.

## Commands

```bash
# install
<fill in>

# dev
<fill in>

# test
<fill in>

# lint
<fill in>
```
