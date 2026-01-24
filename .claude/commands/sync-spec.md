# Sync Plain English Spec to Technical Files

When invoked with `/sync-spec [feature-name]`:

## Purpose
Translates plain English specifications from `docs/specs/[feature-name].md` into technical specification files in `specs/`.

## Workflow

### 1. Read the plain English spec
- Location: `docs/specs/[feature-name].md`
- If not found, show available specs and ask which to sync

### 2. Analyze what technical specs are needed
Based on the plain English spec, determine:
- **Domain schemas** needed in `specs/domain/`
- **Component specs** needed in `specs/components/features/`
- **Page specs** needed in `specs/pages/`

### 3. Check existing technical specs
- Read relevant files in `specs/` directory
- Identify what needs to be created vs updated

### 4. Generate/Update technical specifications

#### For Domain Schemas (`specs/domain/`)
Convert "What data does it need?" into:
```typescript
import { z } from "zod";

export const FeatureSchema = z.object({
  // fields based on plain English description
});

export type Feature = z.infer<typeof FeatureSchema>;
```

#### For Component Specs (`specs/components/features/[engine]/`)
Convert "What does the UI look like?" into:
```typescript
import { z } from "zod";

export const ComponentNamePropsSchema = z.object({
  // props based on plain English description
});

export type ComponentNameProps = z.infer<typeof ComponentNamePropsSchema>;
```

#### For Page Specs (`specs/pages/`)
Convert overall feature into page-level state and composition specs

### 5. Update barrel exports
- Add new exports to `specs/domain/index.ts`
- Add new exports to `specs/components/index.ts`
- Add new exports to `specs/index.ts`

### 6. Validate consistency
- Ensure all referenced types exist
- Run TypeScript check on generated specs
- Report any inconsistencies

### 7. Update the plain English spec status
Mark checkbox: `[x] Technical spec generated`

### 8. Summary report
Output:
```
## Sync Complete: [feature-name]

### Created/Updated Files:
- specs/domain/[name].spec.ts (created/updated)
- specs/components/features/[engine]/[name].spec.ts (created/updated)

### Next Steps:
1. Review generated specs
2. Run `/spec-review [feature-name]` to validate
3. Begin implementation when ready
```

## Translation Rules

### Plain English → Zod Types
| Plain English | Zod Type |
|---------------|----------|
| "a number" | `z.number()` |
| "text", "name", "description" | `z.string()` |
| "yes/no", "true/false", "enabled" | `z.boolean()` |
| "date", "timestamp", "when" | `z.date()` or `z.string().datetime()` |
| "list of", "multiple" | `z.array()` |
| "one of: a, b, c" | `z.enum(["a", "b", "c"])` |
| "optional" | `.optional()` |
| "required" | (default, no modifier) |
| "percentage", "0-100" | `z.number().min(0).max(100)` |
| "positive number" | `z.number().positive()` |
| "email" | `z.string().email()` |
| "URL" | `z.string().url()` |

### UI Description → Component Props
| UI Description | Prop Pattern |
|----------------|--------------|
| "shows a list of X" | `items: z.array(XSchema)` |
| "displays X status" | `status: StatusSchema` |
| "click to do X" | `onAction: z.function()` |
| "loading state" | `isLoading: z.boolean().optional()` |
| "error message" | `error: z.string().optional()` |
| "empty state" | `emptyMessage: z.string().optional()` |

## Example

**Plain English** (`docs/specs/notifications.md`):
```markdown
## What data does it need?
- Notification has: title, message, type (info/warning/error), read status, timestamp
- Users can have many notifications
```

**Generated Technical Spec** (`specs/domain/notification.spec.ts`):
```typescript
import { z } from "zod";

export const NotificationTypeSchema = z.enum(["info", "warning", "error"]);

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: NotificationTypeSchema,
  isRead: z.boolean().default(false),
  createdAt: z.date(),
});

export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
```

## Error Handling
- If plain English spec is ambiguous, ask clarifying questions
- If technical spec already exists with different structure, show diff and ask to confirm
- If referenced types don't exist, create them or warn about dependencies
