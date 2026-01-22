# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Context

**MIT CTO Program Capstone** - Poseidon.AI Money Platform
Three-engine architecture: **Protect** (fraud detection), **Grow** (forecasting), **Optimize** (automated actions)

## Tech Stack (Non-negotiable)

- **Framework**: React 18 + TypeScript 5.x (strict mode)
- **Build**: Vite 5.x
- **Styling**: Tailwind CSS 3.x with custom design tokens
- **Components**: Shadcn/ui (Radix primitives)
- **Icons**: Lucide React
- **Validation**: Zod for ALL data shapes
- **State**: React Query for server state, React state for local
- **Routing**: Wouter
- **Backend**: Express + Drizzle ORM + PostgreSQL

## Commands

```bash
npm run dev       # Full-stack dev server (requires DATABASE_URL)
npm run build     # Build for production
npm run check     # TypeScript type checking (MUST pass before commits)
npx vite          # Frontend-only dev server (no database required)
```

---

## Core Rules (Always Follow)

### Spec-Driven Development
> "Specifications are not documentation of code; code is implementation of specifications."

1. **NEVER** implement before spec exists - check `specs/components/features/{engine}/`
2. **ALL** data shapes require Zod schema in `specs/domain/`
3. Mock data **MUST** validate against Zod schemas

### Type Import Rules (Critical)
- **Frontend**: Use `@shared/routes` (EngineResponse, ActionResponse, etc.)
- **Backend**: Use `@shared/schema` (Engine, Action, etc.)
- **Never mix** - Schema types have more fields than response types

### File Constraints
- Component files: **150 lines max** (decompose if larger)
- Use design tokens from `@/tokens` (never hardcode colors)
- Export all components from `index.ts`

### Forbidden Patterns
- `any` type
- Inline styles
- Hardcoded colors/spacing
- Data fetching in presentational components
- Generating implementations without specs

---

## Memory System

### On Session Start
Read these files for context:
- `memory/context.md` - Handoff notes
- `memory/current-sprint.md` - Task status
- `memory/blockers.md` - Known issues

### On Session End (or >50% context used)
Update memory files with:
- What was accomplished
- Key decisions made
- Handoff notes for next session

---

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@specs/*` → `specs/*`

---

## Context Management

### Within a Session
- `/clear` between unrelated tasks
- `/compact Focus on [current task]` when context fills
- Use subagents for research that reads many files

### Plan Mode
For complex features (multi-file changes), use Plan Mode:
1. `Shift+Tab` twice to enter Plan Mode
2. Explore codebase, create implementation plan
3. Review plan, then exit and implement

---

## Available Extensions

### Skills (Auto-loaded when relevant)
- `sdd-implementation` - Component implementation guidelines
- `protect-engine` - Protect domain knowledge
- `grow-engine` - Grow domain knowledge
- `optimize-engine` - Optimize domain knowledge

### Subagents (Delegate with isolated context)
- `spec-reviewer` - Check implementations against specs
- `type-checker` - Run TypeScript checks with fix suggestions
- `codebase-explorer` - Investigate codebase without changes

### Custom Commands
- `/spec [feature-name]` - Generate or update feature specification

---

## Verification Hooks (Automatic)

Hooks run automatically:
- **After .ts/.tsx edits**: TypeScript check
- **Before commits**: TypeScript check + build verification

---

## Commit Message Format

```
[Type] Brief description

- Detail 1
- Detail 2

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `refactor`, `docs`, `chore`

---

## Quick Reference

### Engine Colors
- **Protect**: Blue `#3B82F6`
- **Grow**: Green `#10B981`
- **Optimize**: Purple `#8B5CF6`

### Key Directories
- Specs: `specs/domain/`, `specs/components/features/`
- Implementation: `client/src/components/features/`
- Design tokens: `client/src/tokens/`
- Memory: `memory/`

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection (required for backend)
- `PORT` - Server port (default: 5000)
