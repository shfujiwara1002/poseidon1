---
name: protect-engine
description: Domain knowledge for the Protect (fraud detection) engine
---

# Protect Engine Domain Knowledge

The Protect engine handles **fraud detection and risk assessment** in Poseidon.AI.

## Core Concepts

### Risk Score (0-100)
- Composite metric calculated from multiple factors
- Higher score = higher risk
- Displayed with trend indicator (improving/stable/declining)

### Alert Severity Levels
| Severity | Color | Use Case |
|----------|-------|----------|
| `critical` | Red | Immediate action required, potential fraud |
| `high` | Orange | Significant risk, review within 24h |
| `medium` | Yellow | Moderate concern, monitor closely |
| `low` | Blue | Informational, no immediate action |

### Transaction Risk Flags
- `suspicious` - Flagged for review
- `verified` - Cleared after review
- `pending` - Awaiting analysis
- `blocked` - Transaction prevented

## Design Identity
- **Primary Color**: Blue (`#3B82F6`)
- **Gradient**: `#3b82f6` → `#1d4ed8`
- **Semantic**: Trust, security, vigilance

## Key Metrics
- `threatScore` - Overall risk assessment
- `alertsCount` - Active alerts requiring attention
- `blockedTransactions` - Prevented suspicious activity
- `falsePositiveRate` - Accuracy of detection

## Component Inventory

### Implemented (5/10)
- RiskScoreCard - Displays composite risk score with trend
- AlertsList - Container for alert cards
- AlertCard - Individual alert display
- AlertSeverityBadge - Severity indicator badge
- RiskBadge - Risk level indicator

### Pending (5/10)
- ProtectMetricsCard - Key metrics summary
- AlertSummaryCard - Alert statistics overview
- SuspiciousTransactionRow - Transaction list item
- SuspiciousTransactionsList - List of flagged transactions
- ProtectDashboard - Main dashboard view

## API Response Types

```typescript
// From @shared/routes
interface ProtectEngineResponse {
  threatScore: number;
  trend: 'improving' | 'stable' | 'declining';
  alertsCount: number;
  recentAlerts: AlertResponse[];
}
```

## Related Files
- Spec: `specs/components/features/protect/protect-components.spec.ts`
- Domain: `specs/domain/alert.spec.ts`
- Implementation: `client/src/components/features/protect/`
