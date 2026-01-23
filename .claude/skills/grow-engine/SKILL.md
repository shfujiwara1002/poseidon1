---
name: grow-engine
description: Domain knowledge for the Grow (forecasting) engine
---

# Grow Engine Domain Knowledge

The Grow engine handles **financial forecasting and goal tracking** in Poseidon.AI.

## Core Concepts

### Forecasting
- Time series projections with confidence intervals
- Multiple timeframes: daily, weekly, monthly, yearly
- Accuracy tracking for model improvement

### Financial Goals
- Target-based savings/investment objectives
- Progress tracking with milestone markers
- Projected completion dates based on current trajectory

### Trend Analysis
| Trend | Indicator | Meaning |
|-------|-----------|---------|
| `improving` | ↗ Green | Positive trajectory |
| `stable` | → Gray | Maintaining current level |
| `declining` | ↘ Red | Needs attention |

## Design Identity
- **Primary Color**: Green (`#10B981`)
- **Gradient**: `#22c55e` → `#16a34a`
- **Semantic**: Growth, prosperity, progress

## Key Metrics
- `forecastAccuracy` - Model prediction accuracy (%)
- `projectedSavings` - Expected savings over time
- `goalProgress` - Progress toward financial goals (%)
- `netWorthTrend` - Direction of net worth change

## Component Inventory

### Implemented (3/10)
- GoalProgressCard - Individual goal progress display
- TrendIndicator - Visual trend direction indicator
- ForecastSummaryCard - Forecast overview with confidence

### Pending (7/10)
- ForecastChart - Time series visualization (HIGH PRIORITY)
- NetWorthProjection - Net worth over time
- GoalsList - Container for goal cards
- SavingsProjectionChart - Savings trajectory chart
- GrowMetricsCard - Key metrics summary
- GoalsSummaryCard - Goals statistics overview
- GrowDashboard - Main dashboard view

## Forecast Data Structure

```typescript
// From @shared/routes
interface ForecastDataPoint {
  date: string;
  value: number;
  confidence: number; // 0-100
  upperBound: number;
  lowerBound: number;
}

interface GrowEngineResponse {
  forecastAccuracy: number;
  projectedSavings: number;
  trend: 'improving' | 'stable' | 'declining';
  forecasts: ForecastDataPoint[];
}
```

## Chart Requirements
- Use Recharts library (already installed)
- Show confidence intervals as shaded area
- Support zoom/pan for date range selection
- Responsive sizing

## Related Files
- **Plain English Spec**: `docs/specs/grow-engine.md` (edit this)
- **Component Specs**: `specs/components/features/grow/` (Claude generates)
- **Domain Schemas**: `specs/domain/forecast.spec.ts`, `specs/domain/financial-goal.spec.ts`
- **Implementation**: `client/src/components/features/grow/`

> Run `/sync-spec grow-engine` after editing plain English spec.
