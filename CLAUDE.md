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
Phase 0: CLAUDE.md Setup (Governance)
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

---

## Automatic Reflection Protocol

**CRITICAL**: Claude MUST automatically perform these checks during development. Do not wait for user to request them.

### On Session Start
1. Read `memory/context.md` for handoff notes
2. Read `memory/current-sprint.md` for task status
3. Read `memory/blockers.md` for known issues
4. Report current phase and progress to user

### During Development (Every 3-5 Significant Changes)
1. **Type Check**: Run `npm run check` after creating/modifying TypeScript files
2. **Spec Alignment**: Verify new code matches spec definitions in `specs/`
3. **Token Usage**: Confirm design tokens used (not hardcoded colors/spacing)
4. **Export Check**: Verify new components are exported from index.ts files

### Before Committing
1. Run `npm run check` - must pass with 0 errors
2. Run `npm run build` - must complete successfully
3. Update `memory/current-sprint.md` with progress
4. Update `memory/context.md` if significant decisions were made

### On Session End (or Context Compaction Warning)
1. **Update memory/context.md** with:
   - What was accomplished
   - Key decisions made
   - Handoff notes for next session
2. **Update memory/current-sprint.md** with:
   - Task completion status
   - Component implementation progress table
3. **Update memory/blockers.md** if:
   - New issues discovered
   - Issues resolved (move to Resolved section)
4. Commit all changes with descriptive message

### Reflection Triggers (Auto-execute)

| Trigger | Action |
|---------|--------|
| New component created | Verify export in index.ts, check spec exists |
| Schema modified | Check storage.ts seed data alignment |
| Type error encountered | Document in blockers.md if not immediately fixed |
| Build failure | Document root cause, fix, then update blockers.md |
| Session >50% context used | Update all memory files preemptively |

---

## Memory System

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

### Memory Update Frequency

| File | Update When |
|------|-------------|
| `context.md` | Every session, on significant decisions |
| `current-sprint.md` | When tasks complete, progress changes |
| `blockers.md` | When issues found or resolved |

---

## Implementation Checklist (Auto-verify)

When implementing a new component, Claude MUST:

```
□ Check spec exists in specs/components/features/{engine}/
□ Read the spec before writing any code
□ Use types from @shared/routes (not @shared/schema for frontend)
□ Import design tokens from @/tokens
□ Keep file under 150 lines
□ Add export to index.ts
□ Run npm run check after creation
□ Update memory/current-sprint.md progress table
```

When modifying shared/schema.ts:

```
□ Update server/storage.ts seed data
□ Update shared/routes.ts response schemas if needed
□ Run npm run check
□ Document schema changes in memory/context.md
```

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
- Committing without running `npm run check`

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@specs/*` → `specs/*`
- `@assets/*` → `attached_assets/*`

### Type Import Rules
- **Frontend components**: Use types from `@shared/routes` (EngineResponse, ActionResponse, etc.)
- **Backend/Database**: Use types from `@shared/schema` (Engine, Action, etc.)
- **Never mix**: Schema types have more fields than response types

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

## Quick Reference

### Current Component Status (Update in memory/current-sprint.md)

Track implementation progress with this format:
```markdown
| Component | Status | File |
|-----------|--------|------|
| ComponentName | Done/Pending | `path/to/file.tsx` or `-` |
```

### Commit Message Format
```
[Type] Brief description

- Detail 1
- Detail 2

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `refactor`, `docs`, `chore`

---

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required for backend)
- `PORT` - Server port (default: 5000)
