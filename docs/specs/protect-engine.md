# Feature: Protect Engine (Fraud Detection)

## Status
- [x] Spec Review
- [ ] Implementation
- [ ] Testing
- [ ] Deployed

## Overview
The Protect engine is Poseidon.AI's fraud detection system that monitors transactions in real-time, identifies suspicious patterns, and generates alerts for potential fraudulent activity. It provides a risk score and confidence level for each analyzed transaction.

## User Stories
- As a financial analyst, I want to see real-time fraud alerts, so that I can take immediate action on suspicious transactions
- As a system administrator, I want to configure fraud detection thresholds, so that I can balance security with user experience
- As an auditor, I want to view historical fraud patterns, so that I can identify systemic vulnerabilities

## Acceptance Criteria
- [ ] Display fraud alerts in real-time on the dashboard
- [ ] Show risk score (0-100) for each transaction
- [ ] Provide confidence percentage for fraud predictions
- [ ] Allow filtering alerts by severity (low, medium, high, critical)
- [ ] Enable dismissing false positives with audit trail

## API Contract
Reference: `shared/routes.ts`

### Endpoints
| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | /api/dashboard | - | DashboardData | Includes alerts array |
| GET | /api/engines | - | Engine[] | Engine status including Protect |
| POST | /api/alerts/:id/dismiss | { reason: string } | Alert | Dismiss false positive |

### Zod Schemas
```typescript
// From shared/schema.ts
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "fraud", "anomaly", "threshold"
  severity: text("severity").notNull(), // "low", "medium", "high", "critical"
  message: text("message").notNull(),
  transactionId: integer("transaction_id"),
  riskScore: integer("risk_score"), // 0-100
  confidence: real("confidence"), // 0.0-1.0
  status: text("status").default("active"), // "active", "dismissed", "resolved"
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Data Model
Reference: `shared/schema.ts`

### Tables Affected
| Table | Changes | Migration Required |
|-------|---------|-------------------|
| alerts | Core table for fraud alerts | No (exists) |
| transactions | Links to flagged transactions | No (exists) |
| engines | Protect engine status | No (exists) |

## UI Components
| Component | File Path | Description |
|-----------|-----------|-------------|
| AlertsPanel | `client/src/components/AlertsPanel.tsx` | Displays active alerts |
| RiskBadge | `client/src/components/ui/RiskBadge.tsx` | Shows risk score visually |
| EngineCard | `client/src/components/EngineCard.tsx` | Protect engine status |

## State Management
- React Query key: `["dashboard"]` includes alerts
- Local state: Alert filter preferences
- Optimistic updates for dismiss action

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| No alerts | Show "All clear" message with checkmark |
| 100+ alerts | Paginate, show most critical first |
| Engine offline | Show warning badge on engine card |
| Stale data | Auto-refresh every 30 seconds |

## Error Handling
| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Fetch failed | "Unable to load alerts" | Retry button |
| Dismiss failed | "Could not dismiss alert" | Retry action |
| Engine error | "Fraud detection unavailable" | Show last known state |

## Dependencies
- **Depends on**: transactions table, engines table
- **Depended by**: Dashboard, Reports, Notifications

## Security Considerations
- Authentication required: Yes
- Authorization rules: Only authenticated users can view/dismiss alerts
- Data validation: Alert IDs must exist, dismiss reason required

## Performance Considerations
- Cache dashboard data for 30 seconds
- Paginate alerts (20 per page)
- WebSocket for real-time updates (future)

## Implementation Notes
- Risk score calculation uses ML model (external service)
- Confidence represents model certainty, not fraud likelihood
- Historical alerts retained for 90 days

## Testing Strategy
- Unit tests: Risk score display, severity filtering
- Integration tests: Alert fetch, dismiss flow
- E2E tests: Full alert lifecycle

## Changelog
| Date | Author | Changes |
|------|--------|---------|
| 2025-01-21 | Claude | Initial spec |
