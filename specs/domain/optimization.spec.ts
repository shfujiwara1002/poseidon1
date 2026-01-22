/**
 * Optimization Domain Specification
 *
 * Defines automated actions and recommendations from the Optimize engine.
 * Handles suggestions for bill payments, expense reduction, and financial optimization.
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const OptimizationTypeSchema = z.enum([
  'bill_payment',        // Automated bill payment
  'subscription_cancel', // Cancel unused subscription
  'subscription_switch', // Switch to cheaper alternative
  'savings_transfer',    // Auto-transfer to savings
  'debt_payment',        // Optimal debt payment
  'investment_rebalance',// Portfolio rebalancing
  'negotiation',         // Bill negotiation opportunity
  'bundle_savings',      // Bundle services for discount
]);
export type OptimizationType = z.infer<typeof OptimizationTypeSchema>;

export const OptimizationStatusSchema = z.enum([
  'pending',      // Awaiting user approval
  'approved',     // User approved, awaiting execution
  'executing',    // Currently being executed
  'completed',    // Successfully completed
  'failed',       // Execution failed
  'rejected',     // User rejected
  'expired',      // Opportunity expired
]);
export type OptimizationStatus = z.infer<typeof OptimizationStatusSchema>;

export const OptimizationPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);
export type OptimizationPriority = z.infer<typeof OptimizationPrioritySchema>;

export const SavingsFrequencySchema = z.enum(['one_time', 'monthly', 'yearly']);
export type SavingsFrequency = z.infer<typeof SavingsFrequencySchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const OptimizationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  // Classification
  type: OptimizationTypeSchema,
  status: OptimizationStatusSchema,
  priority: OptimizationPrioritySchema,

  // Content
  title: z.string().max(200),
  description: z.string().max(1000),
  details: z.record(z.unknown()).optional(),

  // Impact
  estimatedSavings: z.number().min(0),
  savingsFrequency: SavingsFrequencySchema,
  annualizedSavings: z.number().min(0), // Calculated annual impact
  confidenceScore: z.number().min(0).max(100),

  // Execution
  requiresApproval: z.boolean().default(true),
  autoExecute: z.boolean().default(false),
  executionSteps: z.array(z.string()).default([]),

  // Relationships
  relatedTransactionIds: z.array(z.string().uuid()).default([]),
  relatedAccountId: z.string().uuid().nullable().optional(),

  // Scheduling
  scheduledFor: z.string().datetime().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),

  // Resolution
  approvedAt: z.string().datetime().nullable().optional(),
  approvedBy: z.string().uuid().nullable().optional(),
  executedAt: z.string().datetime().nullable().optional(),
  actualSavings: z.number().nullable().optional(),
  failureReason: z.string().nullable().optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Optimization = z.infer<typeof OptimizationSchema>;

// =============================================================================
// ACTION SCHEMAS
// =============================================================================

export const ApproveOptimizationSchema = z.object({
  optimizationId: z.string().uuid(),
  approvedBy: z.string().uuid(),
  scheduledFor: z.string().datetime().optional(),
});

export type ApproveOptimization = z.infer<typeof ApproveOptimizationSchema>;

export const RejectOptimizationSchema = z.object({
  optimizationId: z.string().uuid(),
  rejectedBy: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type RejectOptimization = z.infer<typeof RejectOptimizationSchema>;

// =============================================================================
// AGGREGATION SCHEMAS
// =============================================================================

export const OptimizationSummarySchema = z.object({
  total: z.number().int().min(0),
  byStatus: z.object({
    pending: z.number().int().min(0),
    approved: z.number().int().min(0),
    executing: z.number().int().min(0),
    completed: z.number().int().min(0),
    failed: z.number().int().min(0),
    rejected: z.number().int().min(0),
    expired: z.number().int().min(0),
  }),
  byPriority: z.object({
    urgent: z.number().int().min(0),
    high: z.number().int().min(0),
    medium: z.number().int().min(0),
    low: z.number().int().min(0),
  }),
  potentialSavings: z.object({
    oneTime: z.number().min(0),
    monthly: z.number().min(0),
    yearly: z.number().min(0),
    total: z.number().min(0),
  }),
  realizedSavings: z.number().min(0),
});

export type OptimizationSummary = z.infer<typeof OptimizationSummarySchema>;

// =============================================================================
// AUTOMATION LOG
// =============================================================================

export const AutomationLogEntrySchema = z.object({
  id: z.string().uuid(),
  optimizationId: z.string().uuid(),
  action: z.string(),
  status: z.enum(['success', 'failure', 'pending']),
  message: z.string(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export type AutomationLogEntry = z.infer<typeof AutomationLogEntrySchema>;
