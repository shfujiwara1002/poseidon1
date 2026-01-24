# Architecture Decision Records (ADRs)

This document tracks significant architectural decisions made in the Poseidon.AI project.

---

## ADR-001: Full-Stack TypeScript Monorepo

**Date**: 2025-01-19
**Status**: Accepted

### Context
Need to build a financial intelligence dashboard with real-time data, complex visualizations, and AI-powered features.

### Decision
Use a full-stack TypeScript monorepo with:
- React + Vite for frontend
- Express for backend
- Shared types between client and server

### Consequences
- **Positive**: Type safety across the entire stack, single language for all developers
- **Positive**: Shared Zod schemas ensure API contract consistency
- **Negative**: Larger initial setup complexity
- **Negative**: Build times may increase as codebase grows

---

## ADR-002: Zod for Runtime Validation

**Date**: 2025-01-19
**Status**: Accepted

### Context
Need runtime validation for API requests/responses, not just compile-time TypeScript checks.

### Decision
Use Zod schemas in `shared/routes.ts` for:
- API request validation
- Response type inference
- Client-side form validation

### Consequences
- **Positive**: Single source of truth for types and validation
- **Positive**: Runtime safety prevents invalid data
- **Negative**: Additional bundle size (~12KB gzipped)
- **Negative**: Learning curve for team

---

## ADR-003: React Query for Server State

**Date**: 2025-01-19
**Status**: Accepted

### Context
Need efficient data fetching with caching, background updates, and optimistic mutations.

### Decision
Use TanStack React Query for all API calls with:
- Automatic caching and deduplication
- Background refetching
- Optimistic updates for mutations

### Consequences
- **Positive**: Simplified data fetching code
- **Positive**: Built-in loading/error states
- **Positive**: Automatic cache invalidation
- **Negative**: Additional complexity for simple fetches

---

## ADR-004: Mock Data Fallback for Development

**Date**: 2025-01-19
**Status**: Accepted

### Context
Developers need to work on frontend without database setup.

### Decision
Implement mock data fallback in `use-dashboard.ts`:
- Return mock data when API fails
- Enable frontend-only development with `npx vite`

### Consequences
- **Positive**: Faster onboarding for frontend developers
- **Positive**: UI development decoupled from backend
- **Negative**: Mock data may drift from real schema
- **Negative**: Bugs may hide if only testing with mocks

---

## ADR-005: Three-Engine AI Architecture

**Date**: 2025-01-19
**Status**: Accepted

### Context
Need to organize AI capabilities into distinct, understandable categories.

### Decision
Split AI functionality into three engines:
1. **Protect**: Fraud detection and security
2. **Grow**: Forecasting and predictions
3. **Optimize**: Automated actions and recommendations

### Consequences
- **Positive**: Clear mental model for users
- **Positive**: Independent scaling and development
- **Positive**: Easier to explain and market
- **Negative**: Some features may span multiple engines
- **Negative**: Coordination needed between engines

---

## ADR-006: Spec Driven Development

**Date**: 2025-01-21
**Status**: Accepted

### Context
Need consistent development process that scales with team and maintains quality.

### Decision
Adopt Spec Driven Development with:
- Feature specs in `docs/specs/`
- Architecture decisions in `docs/architecture/`
- Short-term memory in `memory/`

### Consequences
- **Positive**: Clear requirements before coding
- **Positive**: AI assistants have context for better help
- **Positive**: Onboarding is faster with documentation
- **Negative**: Overhead of maintaining specs
- **Negative**: Specs can become stale if not updated

---

## Template for New ADRs

```markdown
## ADR-XXX: [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded

### Context
[What is the issue that we're seeing that motivates this decision?]

### Decision
[What is the change that we're proposing and/or doing?]

### Consequences
- **Positive**: [Benefit]
- **Negative**: [Drawback]
```
