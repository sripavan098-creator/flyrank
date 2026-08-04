# Capstone Project

> Frontend AI Engineering — a React-based interface for interacting with an LLM (Anthropic API), built with an AI-assisted development workflow.

## Status

🚧 In progress — Phase: Setup

## Overview

This project explores frontend AI engineering: building a polished, responsive UI that integrates with the Anthropic API through a thin backend proxy (API keys never exposed client-side). Development is assisted throughout by Claude Code for scaffolding, review, and iteration.

## Tech Stack

- **Language:** TypeScript
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Database:** None — stateless, calls the Anthropic API via a backend proxy
- **Tooling:** ESLint, Prettier

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# lint
npm run lint

# build for production
npm run build
```

## Project Structure

```
.
├── src/          # application source
├── public/       # static assets
├── CLAUDE.md     # AI assistant conventions
└── README.md
```

## Roadmap

- [ ] Define architecture
- [ ] Build core feature(s)
- [ ] Add tests
- [ ] Deploy

## License

MIT — see [LICENSE](./LICENSE).
