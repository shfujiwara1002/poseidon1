# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

---

## Spec-Driven Development Framework

**Core Principle**: Specifications are not documentation of code; code is implementation of specifications.

### Phase Model

```
Phase 0: CLAUDE.md Setup (Governance)        ← You are here
    ↓
Phase 1: Domain Specification (Zod Schemas)
    ↓
Phase 2: Component Specification (Interfaces)
    ↓
Phase 3: Mock Data Generation (From Specs)
    ↓
Phase 4: Component Implementation (Against Specs)
    ↓
Phase 5: Composition and Polish
```

### SDD Rules (MUST FOLLOW)

1. **NEVER** generate component implementation before its interface spec exists
2. **ALL** data shapes must have Zod schema before mock data generation
3. **ALL** component props must be typed interfaces before implementation
4. **Mock data MUST** validate against Zod schemas at generation time
5. Before implementing: "Show me the spec for this component"
6. After generating: "Validate this against the spec"
7. If no spec exists: "Generate the spec first, then await approval"

### Memory System

**Long-term Memory** (persistent across sessions):
- `specs/domain/*.spec.ts` - Zod schemas (source of truth)
- `specs/components/*.spec.ts` - Component prop contracts
- `docs/specs/*.md` - Feature specifications (markdown)
- `docs/architecture/decisions.md` - Architecture Decision Records
- `CLAUDE.md` - Project rules and conventions

**Short-term Memory** (active development context):
- `memory/current-sprint.md` - Current sprint goals and task status
- `memory/context.md` - Session handoff notes and recent decisions
- `memory/blockers.md` - Known issues and workarounds

### Custom Commands

- `/spec [feature-name]` - Generate or update a feature specification

---

## Project Structure

```
poseidon1/
├── CLAUDE.md                    # Governance (Phase 0)
├── specs/
│   ├── domain/                  # Zod schemas (Phase 1)
│   │   ├── user.spec.ts
│   │   ├── transaction.spec.ts
│   │   ├── engine.spec.ts
│   │   └── index.ts
│   └── components/              # Component contracts (Phase 2)
│       ├── primitives/
│       ├── patterns/
│       └── features/
├── client/
│   └── src/
│       ├── tokens/              # Design system tokens
│       ├── mocks/
│       │   ├── generators/      # Factories (Phase 3)
│       │   └── fixtures/        # Demo data
│       ├── components/          # Implementation (Phase 4)
│       │   ├── ui/              # Shadcn primitives
│       │   └── features/
│       │       ├── protect/
│       │       ├── grow/
│       │       └── optimize/
│       └── pages/               # Composition (Phase 5)
├── server/                      # Express backend
├── shared/                      # Shared types & API contracts
├── docs/                        # Documentation
│   ├── specs/                   # Feature specs (markdown)
│   ├── architecture/            # ADRs, data flow
│   └── api/                     # API contracts
└── memory/                      # Session context
```

---

## Architecture Constraints

### File Size Limits
- Component files: **150 lines max**
- Spec files: No limit (completeness > brevity)
- If component exceeds limit, decompose into sub-components

### Forbidden Patterns
- `any` type (use `unknown` with type guards if needed)
- Inline styles (use Tailwind classes)
- Hardcoded colors/spacing (use design tokens)
- Data fetching inside presentational components
- Components without prop interface definitions
- Generating implementations without specs

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@specs/*` → `specs/*`
- `@assets/*` → `attached_assets/*`

---

## Design Tokens

Engine color identity:
- **Protect**: Blue (`#3B82F6`) - trust/security
- **Grow**: Green (`#10B981`) - growth/prosperity
- **Optimize**: Purple (`#8B5CF6`) - automation/intelligence

See `client/src/tokens/` for full design system.

---

## Commands

```bash
npm run dev       # Start development server (requires DATABASE_URL)
npm run build     # Build for production (outputs to dist/)
npm run start     # Run production build
npm run check     # TypeScript type checking
npm run db:push   # Push Drizzle schema changes to PostgreSQL
npx vite          # Run frontend-only dev server (no database required)
```

---

## Claude Code Execution Checklist

| Phase | Prompt Pattern | Human Gate |
|-------|---------------|------------|
| 0 | "Review CLAUDE.md constraints" | Review constraints |
| 1 | "Generate Zod schema for [Entity] with fields: [list]" | Validate domain model |
| 2 | "Generate component prop spec for [Component] referencing [Domain schemas]" | Validate UI contracts |
| 3 | "Generate mock factory for [Entity] using faker, validating against schema" | Run validation script |
| 4 | "Implement [Component] importing props from [spec path]" | Visual review |
| 5 | "Compose [Page] using [Component list] with [mock fixtures]" | Demo walkthrough |

---

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required for backend)
- `PORT` - Server port (default: 5000)
