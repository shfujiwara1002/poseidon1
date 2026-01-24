# Feature: Optimize Engine (Automated Actions)

## Status
- [x] Spec Review
- [ ] Implementation
- [ ] Testing
- [ ] Deployed

## Overview
The Optimize engine analyzes financial patterns and recommends automated actions to improve financial health. It suggests actions like bill payments, investment rebalancing, and expense optimization, which users can approve for automatic execution.

## User Stories
- As a user, I want AI-recommended actions, so that I can optimize my finances without manual analysis
- As a business owner, I want to automate routine financial tasks, so that I can focus on strategic decisions
- As a risk-averse user, I want to review actions before execution, so that I maintain control

## Acceptance Criteria
- [ ] Display pending actions with clear descriptions
- [ ] Show potential savings/impact for each action
- [ ] Allow one-click execution of approved actions
- [ ] Provide execution history with outcomes
- [ ] Support action scheduling (execute at specific time)

## API Contract
Reference: `shared/routes.ts`

### Endpoints
| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | /api/dashboard | - | DashboardData | Includes actions array |
| GET | /api/engines | - | Engine[] | Engine status including Optimize |
| POST | /api/actions/:id/execute | - | Action | Execute pending action |
| GET | /api/actions/history | - | Action[] | Completed actions |

### Zod Schemas
```typescript
// From shared/schema.ts
export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "payment", "transfer", "rebalance", "optimize"
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("pending"), // "pending", "executing", "completed", "failed"
  impact: real("impact"), // Estimated savings/benefit
  priority: text("priority").default("medium"), // "low", "medium", "high"
  scheduledFor: timestamp("scheduled_for"),
  executedAt: timestamp("executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Data Model
Reference: `shared/schema.ts`

### Tables Affected
| Table | Changes | Migration Required |
|-------|---------|-------------------|
| actions | Core table for recommendations | No (exists) |
| transactions | Created when action executes | No (exists) |
| engines | Optimize engine status | No (exists) |

## UI Components
| Component | File Path | Description |
|-----------|-----------|-------------|
| ActionsPanel | `client/src/components/ActionsPanel.tsx` | List of pending actions |
| ActionCard | `client/src/components/ActionCard.tsx` | Individual action with execute button |
| ExecuteModal | `client/src/components/ExecuteModal.tsx` | Confirmation dialog |
| EngineCard | `client/src/components/EngineCard.tsx` | Optimize engine status |

## State Management
- React Query key: `["dashboard"]` includes actions
- Mutation: `useExecuteAction` for execution
- Optimistic update: Mark as "executing" immediately

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| No pending actions | Show "All optimized" message |
| Execution fails | Revert to pending, show error |
| Concurrent execution | Queue actions, execute sequentially |
| Stale action | Validate before execution |

## Error Handling
| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Execution failed | "Action could not be completed" | Show reason, allow retry |
| Insufficient funds | "Insufficient balance for action" | Show balance, suggest alternative |
| Timeout | "Action timed out" | Auto-retry once, then fail |

## Dependencies
- **Depends on**: transactions table, Grow engine (for impact prediction)
- **Depended by**: Dashboard, Notifications, Audit logs

## Security Considerations
- Authentication required: Yes
- Authorization rules: Only owner can execute actions
- Data validation: Action must exist and be in "pending" status
- Confirmation required: Modal confirmation before execution

## Performance Considerations
- Actions generated in batch (hourly)
- Execute endpoint is idempotent
- Long-running actions use background jobs

## Implementation Notes
- Actions are suggestions, never auto-executed without user consent
- Impact is estimated and may differ from actual outcome
- Failed actions retained for debugging (30 days)

## Testing Strategy
- Unit tests: Action display, status transitions
- Integration tests: Execute flow, error handling
- E2E tests: Full action lifecycle from display to completion

## Changelog
| Date | Author | Changes |
|------|--------|---------|
| 2025-01-21 | Claude | Initial spec |
