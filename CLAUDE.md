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

### Spec-Driven Development (Two-Layer System)
> "Specifications are not documentation of code; code is implementation of specifications."

**Layer 1: Plain English Specs** (User writes)
- Location: `docs/specs/[feature-name].md`
- Template: `docs/specs/_simple-template.md`
- Purpose: Describe WHAT in plain language

**Layer 2: Technical Specs** (Claude generates)
- Location: `specs/domain/`, `specs/components/features/`
- Purpose: Zod schemas defining exact data shapes

**Workflow:**
1. User writes/edits plain English spec in `docs/specs/`
2. User runs `/sync-spec [feature-name]`
3. Claude translates to technical Zod specs
4. Implementation follows technical specs

**Rules:**
- **NEVER** implement before spec exists - check `specs/components/features/{engine}/`
- **ALL** data shapes require Zod schema in `specs/domain/`
- Mock data **MUST** validate against Zod schemas

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

### Skills vs Subagents
- **Skills**: Domain knowledge that auto-loads during implementation (passive guidance)
- **Subagents**: Isolated tasks you delegate (active investigation/validation)

### Skills (Auto-loaded when relevant)
| Skill | When It Loads | What It Provides |
|-------|---------------|------------------|
| `sdd-implementation` | Implementing any component | Rules, checklist, type imports |
| `protect-engine` | Working on fraud detection | Domain terms, component list, data flow |
| `grow-engine` | Working on forecasting | Domain terms, component list, data flow |
| `optimize-engine` | Working on automation | Domain terms, component list, data flow |

### Subagents (Delegate with isolated context)
| Subagent | When To Use | What It Does |
|----------|-------------|--------------|
| `spec-reviewer` | After implementation | Validates code matches specs |
| `type-checker` | After TypeScript errors | Analyzes errors, suggests fixes |
| `codebase-explorer` | Before implementation | Investigates without changes |

### Custom Commands
| Command | Purpose | Details |
|---------|---------|---------|
| `/spec [name]` | Create/edit plain English spec | See `.claude/commands/spec.md` |
| `/sync-spec [name]` | Translate to technical Zod specs | See `.claude/commands/sync-spec.md` |

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

### Directory Structure
```
poseidon1/
├── docs/specs/              # Layer 1: Plain English specs (YOU edit)
│   ├── _simple-template.md  # Template for new specs
│   ├── dashboard.md
│   ├── protect-engine.md
│   ├── grow-engine.md
│   └── optimize-engine.md
│
├── specs/                   # Layer 2: Technical Zod specs (Claude generates)
│   ├── domain/              # Data models (Alert, Forecast, etc.)
│   ├── components/features/ # Component props by engine
│   │   ├── protect/
│   │   ├── grow/
│   │   └── optimize/
│   └── pages/               # Page-level specs
│
├── client/src/components/   # Implementation (follows specs/)
│   └── features/
│       ├── protect/
│       ├── grow/
│       └── optimize/
│
├── memory/                  # Session continuity
└── .claude/                 # AI automation (commands, skills, agents)
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection (required for backend)
- `PORT` - Server port (default: 5000)
