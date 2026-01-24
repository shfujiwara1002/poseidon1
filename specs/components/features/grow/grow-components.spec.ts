/**
 * Grow Engine Component Specifications
 *
 * Defines component props and states for forecasting UI.
 */

import { z } from 'zod';
import {
  ForecastSchema,
  ForecastTypeSchema,
  ForecastPeriodSchema,
  ForecastTrendSchema,
  ForecastChartDataSchema,
  GoalForecastSchema,
  ScenarioTypeSchema,
} from '../../../domain/forecast.spec';
import {
  FinancialGoalSchema,
  GoalsSummarySchema,
  GoalStatusSchema,
  GoalPrioritySchema,
} from '../../../domain/financial-goal.spec';
import { GrowMetricsSchema } from '../../../domain/engine.spec';

// =============================================================================
// FORECAST CHART
// =============================================================================

export const ForecastChartPropsSchema = z.object({
  data: ForecastChartDataSchema,
  height: z.number().default(300),
  showConfidenceInterval: z.boolean().default(true),
  showActualVsPredicted: z.boolean().default(true),
  onPeriodChange: z.function().args(ForecastPeriodSchema).returns(z.void()).optional(),
  selectedPeriod: ForecastPeriodSchema.default('30d'),
  isLoading: z.boolean().default(false),
});

export type ForecastChartProps = z.infer<typeof ForecastChartPropsSchema>;

// =============================================================================
// NET WORTH PROJECTION
// =============================================================================

export const NetWorthProjectionPropsSchema = z.object({
  currentNetWorth: z.number(),
  projectedNetWorth: z.number(),
  projectionDate: z.string().datetime(),
  trend: ForecastTrendSchema,
  percentChange: z.number(),
  confidenceLevel: z.number().min(0).max(100),
  chartData: ForecastChartDataSchema.optional(),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
});

export type NetWorthProjectionProps = z.infer<typeof NetWorthProjectionPropsSchema>;

// =============================================================================
// GOAL PROGRESS CARD
// =============================================================================

export const GoalProgressCardPropsSchema = z.object({
  goal: FinancialGoalSchema,
  forecast: GoalForecastSchema.optional(),
  onEdit: z.function().args().returns(z.void()).optional(),
  onDelete: z.function().args().returns(z.void()).optional(),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  showForecast: z.boolean().default(true),
  compact: z.boolean().default(false),
});

export type GoalProgressCardProps = z.infer<typeof GoalProgressCardPropsSchema>;

// =============================================================================
// GOALS LIST
// =============================================================================

export const GoalsListPropsSchema = z.object({
  goals: z.array(FinancialGoalSchema),
  forecasts: z.record(z.string(), GoalForecastSchema).optional(),
  onEdit: z.function().args(z.string()).returns(z.void()).optional(),
  onDelete: z.function().args(z.string()).returns(z.void()).optional(),
  onViewDetails: z.function().args(z.string()).returns(z.void()).optional(),
  onAddGoal: z.function().args().returns(z.void()).optional(),
  filterStatus: z.enum(['all', ...GoalStatusSchema.options]).default('all'),
  sortBy: z.enum(['priority', 'progress', 'targetDate', 'name']).default('priority'),
  isLoading: z.boolean().default(false),
  emptyMessage: z.string().default('No goals yet. Create your first goal!'),
});

export type GoalsListProps = z.infer<typeof GoalsListPropsSchema>;

// =============================================================================
// SAVINGS PROJECTION CHART
// =============================================================================

export const SavingsProjectionChartPropsSchema = z.object({
  currentSavings: z.number(),
  projectedSavings: z.number(),
  monthlyContribution: z.number(),
  chartData: ForecastChartDataSchema,
  scenarios: z.object({
    pessimistic: z.number(),
    baseline: z.number(),
    optimistic: z.number(),
  }).optional(),
  selectedScenario: ScenarioTypeSchema.default('baseline'),
  onScenarioChange: z.function().args(ScenarioTypeSchema).returns(z.void()).optional(),
  height: z.number().default(250),
  isLoading: z.boolean().default(false),
});

export type SavingsProjectionChartProps = z.infer<typeof SavingsProjectionChartPropsSchema>;

// =============================================================================
// TREND INDICATOR
// =============================================================================

export const TrendIndicatorPropsSchema = z.object({
  trend: ForecastTrendSchema,
  percentChange: z.number(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showLabel: z.boolean().default(true),
});

export type TrendIndicatorProps = z.infer<typeof TrendIndicatorPropsSchema>;

// =============================================================================
// FORECAST SUMMARY CARD
// =============================================================================

export const ForecastSummaryCardPropsSchema = z.object({
  type: ForecastTypeSchema,
  forecast: ForecastSchema,
  previousValue: z.number().optional(),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  compact: z.boolean().default(false),
  isLoading: z.boolean().default(false),
});

export type ForecastSummaryCardProps = z.infer<typeof ForecastSummaryCardPropsSchema>;

// =============================================================================
// GROW METRICS CARD
// =============================================================================

export const GrowMetricsCardPropsSchema = z.object({
  metrics: GrowMetricsSchema,
  isLoading: z.boolean().default(false),
  onRefresh: z.function().args().returns(z.void()).optional(),
});

export type GrowMetricsCardProps = z.infer<typeof GrowMetricsCardPropsSchema>;

// =============================================================================
// GOALS SUMMARY CARD
// =============================================================================

export const GoalsSummaryCardPropsSchema = z.object({
  summary: GoalsSummarySchema,
  isLoading: z.boolean().default(false),
  onAddGoal: z.function().args().returns(z.void()).optional(),
  onViewAll: z.function().args().returns(z.void()).optional(),
});

export type GoalsSummaryCardProps = z.infer<typeof GoalsSummaryCardPropsSchema>;

// =============================================================================
// GROW DASHBOARD STATE
// =============================================================================

export const GrowDashboardStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable(),
  selectedGoalId: z.string().uuid().nullable(),
  forecastPeriod: ForecastPeriodSchema.default('30d'),
  selectedScenario: ScenarioTypeSchema.default('baseline'),
  filterGoalStatus: z.enum(['all', ...GoalStatusSchema.options]).default('all'),
  sortGoalsBy: z.enum(['priority', 'progress', 'targetDate', 'name']).default('priority'),
});

export type GrowDashboardState = z.infer<typeof GrowDashboardStateSchema>;
