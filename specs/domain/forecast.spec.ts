/**
 * Forecast Domain Specification
 *
 * Defines forecasting entities for the Grow engine.
 * Handles predictions for revenue, expenses, and net worth.
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const ForecastTypeSchema = z.enum([
  'revenue',
  'expense',
  'net_worth',
  'savings',
  'cashflow',
  'investment_return',
]);
export type ForecastType = z.infer<typeof ForecastTypeSchema>;

export const ForecastPeriodSchema = z.enum(['7d', '30d', '60d', '90d', '6m', '1y', '5y']);
export type ForecastPeriod = z.infer<typeof ForecastPeriodSchema>;

export const ForecastTrendSchema = z.enum(['improving', 'stable', 'declining']);
export type ForecastTrend = z.infer<typeof ForecastTrendSchema>;

export const ScenarioTypeSchema = z.enum(['pessimistic', 'baseline', 'optimistic']);
export type ScenarioType = z.infer<typeof ScenarioTypeSchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const ForecastSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  // Forecast Configuration
  type: ForecastTypeSchema,
  period: ForecastPeriodSchema,
  scenario: ScenarioTypeSchema.default('baseline'),

  // Predicted Values
  predictedValue: z.number(),
  confidenceLow: z.number(),  // Lower bound of confidence interval
  confidenceHigh: z.number(), // Upper bound of confidence interval
  confidenceLevel: z.number().min(0).max(100), // e.g., 80% confidence

  // Comparison
  baselineValue: z.number(),  // Current/starting value
  percentChange: z.number(),   // % change from baseline
  trend: ForecastTrendSchema,

  // Model Metadata
  modelVersion: z.string(),
  accuracy: z.number().min(0).max(100), // Historical accuracy
  dataPointsUsed: z.number().int().min(0),

  // Timestamps
  forecastDate: z.string().datetime(), // When forecast was generated
  targetDate: z.string().datetime(),   // Date being predicted
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

export type Forecast = z.infer<typeof ForecastSchema>;

// =============================================================================
// TIME SERIES DATA POINT
// =============================================================================

export const ForecastDataPointSchema = z.object({
  date: z.string().datetime(),
  value: z.number(),
  isActual: z.boolean(), // true = historical, false = predicted
  confidenceLow: z.number().optional(),
  confidenceHigh: z.number().optional(),
});

export type ForecastDataPoint = z.infer<typeof ForecastDataPointSchema>;

// =============================================================================
// FORECAST CHART DATA
// =============================================================================

export const ForecastChartDataSchema = z.object({
  forecastId: z.string().uuid(),
  type: ForecastTypeSchema,
  period: ForecastPeriodSchema,
  dataPoints: z.array(ForecastDataPointSchema),
  summary: z.object({
    startValue: z.number(),
    endValue: z.number(),
    minValue: z.number(),
    maxValue: z.number(),
    percentChange: z.number(),
    trend: ForecastTrendSchema,
  }),
});

export type ForecastChartData = z.infer<typeof ForecastChartDataSchema>;

// =============================================================================
// FINANCIAL GOAL INTEGRATION
// =============================================================================

export const GoalForecastSchema = z.object({
  goalId: z.string().uuid(),
  goalName: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  targetDate: z.string().datetime(),

  // Forecast
  projectedAmount: z.number(),
  projectedDate: z.string().datetime(), // When goal will be reached
  onTrack: z.boolean(),
  percentComplete: z.number().min(0).max(100),

  // Scenarios
  scenarios: z.object({
    pessimistic: z.object({
      projectedDate: z.string().datetime(),
      projectedAmount: z.number(),
    }),
    baseline: z.object({
      projectedDate: z.string().datetime(),
      projectedAmount: z.number(),
    }),
    optimistic: z.object({
      projectedDate: z.string().datetime(),
      projectedAmount: z.number(),
    }),
  }),
});

export type GoalForecast = z.infer<typeof GoalForecastSchema>;
