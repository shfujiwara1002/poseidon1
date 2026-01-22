/**
 * Engine Domain Specification
 *
 * Defines the three AI engines of Poseidon.AI:
 * - Protect: Fraud detection and security
 * - Grow: Forecasting and predictions
 * - Optimize: Automated actions and recommendations
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const EngineTypeSchema = z.enum(['protect', 'grow', 'optimize']);
export type EngineType = z.infer<typeof EngineTypeSchema>;

export const EngineStatusSchema = z.enum(['active', 'learning', 'paused', 'error', 'maintenance']);
export type EngineStatus = z.infer<typeof EngineStatusSchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const EngineSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  type: EngineTypeSchema,
  status: EngineStatusSchema,

  // Performance Metrics
  accuracy: z.number().min(0).max(100).nullable().optional(),
  confidence: z.number().min(0).max(100).nullable().optional(),

  // Display
  metricLabel: z.string(),
  metricValue: z.string(),
  details: z.string(),
  score: z.string().nullable().optional(),

  // Timestamps
  lastUpdated: z.string().datetime().nullable(),
  lastTrainedAt: z.string().datetime().nullable().optional(),
});

export type Engine = z.infer<typeof EngineSchema>;

// =============================================================================
// PROTECT ENGINE SPECIFIC
// =============================================================================

export const ProtectMetricsSchema = z.object({
  engineId: z.number().int().positive(),
  threatScore: z.number().min(0).max(100),
  threatsBlocked: z.number().int().min(0),
  alertsActive: z.number().int().min(0),
  fraudPrevented: z.number().min(0), // USD amount
  lastScanAt: z.string().datetime(),
  scanCoverage: z.number().min(0).max(100), // percentage
});

export type ProtectMetrics = z.infer<typeof ProtectMetricsSchema>;

// =============================================================================
// GROW ENGINE SPECIFIC
// =============================================================================

export const GrowMetricsSchema = z.object({
  engineId: z.number().int().positive(),
  forecastAccuracy: z.number().min(0).max(100),
  activeForecasts: z.number().int().min(0),
  projectedGrowth: z.number(), // percentage, can be negative
  confidenceLevel: z.number().min(0).max(100),
  lastForecastAt: z.string().datetime(),
  forecastHorizon: z.enum(['7d', '30d', '90d', '1y']),
});

export type GrowMetrics = z.infer<typeof GrowMetricsSchema>;

// =============================================================================
// OPTIMIZE ENGINE SPECIFIC
// =============================================================================

export const OptimizeMetricsSchema = z.object({
  engineId: z.number().int().positive(),
  pendingOptimizations: z.number().int().min(0),
  completedOptimizations: z.number().int().min(0),
  totalSavings: z.number().min(0), // USD amount
  monthlySavingsRate: z.number().min(0), // USD per month
  automationRate: z.number().min(0).max(100), // percentage
  lastOptimizationAt: z.string().datetime(),
});

export type OptimizeMetrics = z.infer<typeof OptimizeMetricsSchema>;

// =============================================================================
// UNIFIED ENGINE STATE
// =============================================================================

export const EngineStateSchema = z.object({
  engines: z.array(EngineSchema),
  protect: ProtectMetricsSchema.optional(),
  grow: GrowMetricsSchema.optional(),
  optimize: OptimizeMetricsSchema.optional(),
  lastRefreshedAt: z.string().datetime(),
});

export type EngineState = z.infer<typeof EngineStateSchema>;
