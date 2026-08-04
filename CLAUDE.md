# CLAUDE.md
# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repository.

## Project

A Frontend AI Engineering capstone — a React-based UI that integrates with the Anthropic API, built using an AI-assisted development workflow throughout.

## Stack

- Language/runtime: TypeScript, Node.js (LTS)
- Framework: React + Vite, Tailwind CSS
- Database: none (calls the Anthropic API via a thin backend proxy — never exposes the API key client-side)
- Testing: Vitest + React Testing Library
- Package manager: npm

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). One logical change per commit.
- **Branching:** `main` is always deployable; work in short-lived feature branches.
- **Code style:** Prettier + ESLint.
- **File structure:** keep source in `src/`, tests colocated or in `tests/`.

## Working with the AI assistant

- Prefer small, reviewable diffs over large rewrites.
- Explain reasoning for non-trivial changes in the commit body, not just the subject line.
- Don't invent dependencies — check `package.json` / lockfile before assuming a library is available.
- Run tests/lints before committing when they exist.
- Ask before deleting files or rewriting git history.
- Never expose the Anthropic API key in client-side code — all model calls go through the backend proxy.

## Commands

```bash
# install
npm install

# dev
npm run dev

# test
npm run test

# lint
npm run lint
```
