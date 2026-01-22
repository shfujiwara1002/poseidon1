---
name: sdd-implementation
description: Guidelines for implementing components following Spec-Driven Development principles
---

# SDD Implementation Guidelines

When implementing any component in the Poseidon.AI codebase, follow these steps:

## Pre-Implementation Checklist

1. **Read the spec first** - Check `specs/components/features/{engine}/` for the component spec
2. **Verify domain schema** - Reference `specs/domain/` for entity schemas
3. **Check existing patterns** - Look at implemented components in the same engine

## Implementation Rules

### Type Imports
- **Frontend components**: Use types from `@shared/routes` (EngineResponse, ActionResponse, etc.)
- **Backend/Database**: Use types from `@shared/schema` (Engine, Action, etc.)
- **Never mix**: Schema types have more fields than response types

### Design Tokens
Import from `@/tokens`:
```typescript
import { colors, spacing, typography } from '@/tokens';
```

Engine color identity:
- **Protect**: Blue (`#3B82F6`) - trust/security
- **Grow**: Green (`#10B981`) - growth/prosperity
- **Optimize**: Purple (`#8B5CF6`) - automation/intelligence

### File Constraints
- Maximum **150 lines** per component file
- If exceeding, decompose into sub-components
- Each component must be exported from its `index.ts`

### Forbidden Patterns
- `any` type (use `unknown` with type guards)
- Inline styles (use Tailwind classes)
- Hardcoded colors/spacing (use design tokens)
- Data fetching inside presentational components
- Components without prop interface definitions

## Post-Implementation Checklist

```
□ Props match spec exactly
□ Types imported from @shared/routes
□ Design tokens used (not hardcoded)
□ File under 150 lines
□ Exported from index.ts
□ npm run check passes
□ Update memory/current-sprint.md
```

## Example Component Structure

```typescript
import { type ComponentProps } from '@specs/components/features/{engine}';
import { colors } from '@/tokens';

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Implementation following spec
  return (
    <div className={/* Tailwind classes */}>
      {/* UI matching spec requirements */}
    </div>
  );
}
```
