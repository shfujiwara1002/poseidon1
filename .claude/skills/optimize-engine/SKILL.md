---
name: optimize-engine
description: Domain knowledge for the Optimize (automated actions) engine
---

# Optimize Engine Domain Knowledge

The Optimize engine handles **automated savings and action recommendations** in Poseidon.AI.

## Core Concepts

### Optimizations
- AI-recommended actions to improve financial health
- Require user approval before execution
- Track estimated vs actual savings

### Automation Workflow
```
Detected → Pending → Approved → Executed → Completed
                  ↘ Rejected
```

### Priority Levels
| Priority | Color | Action Timeline |
|----------|-------|-----------------|
| `critical` | Red | Immediate - potential loss |
| `high` | Orange | Within 24 hours |
| `medium` | Yellow | Within 1 week |
| `low` | Green | When convenient |

### Optimization Types
- `subscription` - Cancel/downgrade subscriptions
- `transfer` - Move money to higher-yield accounts
- `bill_negotiation` - Reduce recurring bills
- `investment` - Rebalance portfolio
- `savings_rule` - Automated savings triggers

## Design Identity
- **Primary Color**: Purple (`#8B5CF6`)
- **Gradient**: `#a855f7` → `#7c3aed`
- **Semantic**: Automation, intelligence, efficiency

## Key Metrics
- `pendingSavings` - Potential savings from pending actions
- `capturedSavings` - Realized savings from executed actions
- `automationRate` - % of actions auto-executed
- `pendingActions` - Count of actions awaiting approval

## Component Inventory

### Implemented (8/12)
- OptimizationCard - Individual optimization display
- PendingOptimizationsList - List of pending actions
- SavingsCapturedMetric - Total savings display
- AutomationLog - History of automated actions
- AutomationLogEntry - Individual log entry
- PriorityBadge - Priority level indicator
- SavingsBadge - Savings amount badge
- OptimizationTypeIcon - Type-specific icon

### Pending (4/12)
- OptimizeMetricsCard - Key metrics summary
- OptimizationSummaryCard - Actions statistics overview
- ExecuteModal - Action approval dialog (HIGH PRIORITY)
- OptimizeDashboard - Main dashboard view

## ExecuteModal Requirements
The ExecuteModal is critical for the approval workflow:
- Display optimization details
- Show estimated savings
- Confirm/Cancel buttons
- Loading state during execution
- Success/Error feedback
- Update parent list on completion

## API Response Types

```typescript
// From @shared/routes
interface OptimizationResponse {
  id: string;
  type: OptimizationType;
  title: string;
  description: string;
  estimatedSavings: number;
  priority: Priority;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
}

interface OptimizeEngineResponse {
  pendingSavings: number;
  capturedSavings: number;
  automationRate: number;
  pendingActions: OptimizationResponse[];
}
```

## Related Files
- Spec: `specs/components/features/optimize/optimize-components.spec.ts`
- Domain: `specs/domain/optimization.spec.ts`
- Implementation: `client/src/components/features/optimize/`
