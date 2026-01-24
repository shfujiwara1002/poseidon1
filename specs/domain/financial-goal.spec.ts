/**
 * Financial Goal Domain Specification
 *
 * Defines user financial goals tracked by the Grow engine.
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const GoalTypeSchema = z.enum([
  'emergency_fund',
  'retirement',
  'home_purchase',
  'vehicle',
  'education',
  'vacation',
  'debt_payoff',
  'investment',
  'custom',
]);
export type GoalType = z.infer<typeof GoalTypeSchema>;

export const GoalStatusSchema = z.enum([
  'active',
  'paused',
  'completed',
  'abandoned',
]);
export type GoalStatus = z.infer<typeof GoalStatusSchema>;

export const GoalPrioritySchema = z.enum(['low', 'medium', 'high', 'critical']);
export type GoalPriority = z.infer<typeof GoalPrioritySchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const FinancialGoalSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  // Goal Definition
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: GoalTypeSchema,
  status: GoalStatusSchema,
  priority: GoalPrioritySchema,

  // Financial Targets
  targetAmount: z.number().min(0),
  currentAmount: z.number().min(0),
  monthlyContribution: z.number().min(0),

  // Timeline
  targetDate: z.string().datetime(),
  startDate: z.string().datetime(),

  // Progress
  percentComplete: z.number().min(0).max(100),
  onTrack: z.boolean(),
  daysRemaining: z.number().int(),

  // Linked Accounts
  linkedAccountIds: z.array(z.string().uuid()).default([]),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable().optional(),
});

export type FinancialGoal = z.infer<typeof FinancialGoalSchema>;

// =============================================================================
// MILESTONE SCHEMA
// =============================================================================

export const GoalMilestoneSchema = z.object({
  id: z.string().uuid(),
  goalId: z.string().uuid(),

  name: z.string().max(100),
  targetAmount: z.number().min(0),
  targetDate: z.string().datetime(),

  isCompleted: z.boolean(),
  completedAt: z.string().datetime().nullable().optional(),

  createdAt: z.string().datetime(),
});

export type GoalMilestone = z.infer<typeof GoalMilestoneSchema>;

// =============================================================================
// PROGRESS HISTORY
// =============================================================================

export const GoalProgressEntrySchema = z.object({
  id: z.string().uuid(),
  goalId: z.string().uuid(),

  date: z.string().datetime(),
  amount: z.number().min(0),
  percentComplete: z.number().min(0).max(100),

  // Contribution details
  contributionAmount: z.number().optional(),
  contributionSource: z.string().optional(),
});

export type GoalProgressEntry = z.infer<typeof GoalProgressEntrySchema>;

// =============================================================================
// GOAL SUMMARY
// =============================================================================

export const GoalsSummarySchema = z.object({
  totalGoals: z.number().int().min(0),
  activeGoals: z.number().int().min(0),
  completedGoals: z.number().int().min(0),

  totalTargetAmount: z.number().min(0),
  totalCurrentAmount: z.number().min(0),
  overallProgress: z.number().min(0).max(100),

  goalsOnTrack: z.number().int().min(0),
  goalsAtRisk: z.number().int().min(0),
  goalsBehind: z.number().int().min(0),

  monthlyContributionTotal: z.number().min(0),
});

export type GoalsSummary = z.infer<typeof GoalsSummarySchema>;
