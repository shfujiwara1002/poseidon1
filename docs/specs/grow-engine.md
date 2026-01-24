# Feature: Grow Engine (Forecasting)

## Status
- [x] Spec Review
- [ ] Implementation
- [ ] Testing
- [ ] Deployed

## Overview
The Grow engine provides financial forecasting capabilities, predicting revenue, expenses, and cash flow trends. It uses historical transaction data to generate time-series projections and identifies growth opportunities.

## User Stories
- As a financial planner, I want to see revenue forecasts, so that I can plan budgets effectively
- As a business owner, I want to identify growth trends, so that I can make informed investment decisions
- As an analyst, I want to compare forecast accuracy, so that I can trust the predictions

## Acceptance Criteria
- [ ] Display 30/60/90 day revenue forecasts
- [ ] Show forecast confidence intervals
- [ ] Visualize historical vs predicted trends
- [ ] Highlight significant deviations from baseline
- [ ] Allow scenario modeling (optimistic/pessimistic)

## API Contract
Reference: `shared/routes.ts`

### Endpoints
| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | /api/dashboard | - | DashboardData | Includes forecasts array |
| GET | /api/engines | - | Engine[] | Engine status including Grow |
| GET | /api/forecasts | ?period=30\|60\|90 | Forecast[] | Detailed forecasts |

### Zod Schemas
```typescript
// From shared/schema.ts
export const forecasts = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "revenue", "expense", "cashflow"
  period: text("period").notNull(), // "30d", "60d", "90d"
  predictedValue: real("predicted_value").notNull(),
  confidenceLow: real("confidence_low"),
  confidenceHigh: real("confidence_high"),
  baselineValue: real("baseline_value"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Data Model
Reference: `shared/schema.ts`

### Tables Affected
| Table | Changes | Migration Required |
|-------|---------|-------------------|
| forecasts | Core table for predictions | No (exists) |
| transactions | Historical data source | No (exists) |
| engines | Grow engine status | No (exists) |

## UI Components
| Component | File Path | Description |
|-----------|-----------|-------------|
| ForecastChart | `client/src/components/ForecastChart.tsx` | Line chart with projections |
| NetWorthProjection | `client/src/components/NetWorthProjection.tsx` | Main projection display |
| EngineCard | `client/src/components/EngineCard.tsx` | Grow engine status |

## State Management
- React Query key: `["dashboard"]` includes forecasts
- React Query key: `["forecasts", period]` for detailed view
- Local state: Selected time period, scenario type

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data | Show message "Need 30+ days of data" |
| High variance | Widen confidence interval visually |
| Negative forecast | Display in red, show warning |
| Engine training | Show "Updating predictions..." |

## Error Handling
| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Model unavailable | "Forecasts temporarily unavailable" | Show cached data |
| Invalid period | "Invalid forecast period" | Reset to default (30d) |
| Stale predictions | "Last updated X hours ago" | Show refresh option |

## Dependencies
- **Depends on**: transactions table (historical data), engines table
- **Depended by**: Dashboard, Reports, Optimize engine (for recommendations)

## Security Considerations
- Authentication required: Yes
- Authorization rules: Read-only for standard users
- Data validation: Period must be valid enum value

## Performance Considerations
- Forecasts regenerated nightly (batch job)
- Cache results for 1 hour
- Lazy load detailed forecasts

## Implementation Notes
- Uses ARIMA model for time-series prediction
- Confidence intervals represent 80% prediction range
- Baseline is trailing 30-day average

## Testing Strategy
- Unit tests: Chart rendering, period selection
- Integration tests: Forecast fetch with different periods
- E2E tests: Full forecast viewing flow

## Changelog
| Date | Author | Changes |
|------|--------|---------|
| 2025-01-21 | Claude | Initial spec |
