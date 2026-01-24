/**
 * Optimize Engine Component Specifications
 *
 * Defines component props and states for automated actions UI.
 */

import { z } from 'zod';
import {
  OptimizationSchema,
  OptimizationTypeSchema,
  OptimizationStatusSchema,
  OptimizationPrioritySchema,
  OptimizationSummarySchema,
  AutomationLogEntrySchema,
  SavingsFrequencySchema,
} from '../../../domain/optimization.spec';
import { OptimizeMetricsSchema } from '../../../domain/engine.spec';

// =============================================================================
// OPTIMIZATION CARD
// =============================================================================

export const OptimizationCardPropsSchema = z.object({
  optimization: OptimizationSchema,
  onApprove: z.function().args().returns(z.void()),
  onReject: z.function().args().returns(z.void()),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  isExpanded: z.boolean().default(false),
  onToggleExpand: z.function().args().returns(z.void()).optional(),
  showActions: z.boolean().default(true),
  compact: z.boolean().default(false),
});

export type OptimizationCardProps = z.infer<typeof OptimizationCardPropsSchema>;

// =============================================================================
// PENDING OPTIMIZATIONS LIST
// =============================================================================

export const PendingOptimizationsListPropsSchema = z.object({
  optimizations: z.array(OptimizationSchema),
  onApprove: z.function().args(z.string()).returns(z.void()),
  onReject: z.function().args(z.string()).returns(z.void()),
  onViewDetails: z.function().args(z.string()).returns(z.void()).optional(),
  onApproveAll: z.function().args().returns(z.void()).optional(),
  maxVisible: z.number().default(5),
  showViewAll: z.boolean().default(true),
  onViewAll: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
  emptyMessage: z.string().default('No pending optimizations'),
});

export type PendingOptimizationsListProps = z.infer<typeof PendingOptimizationsListPropsSchema>;

// =============================================================================
// SAVINGS CAPTURED METRIC
// =============================================================================

export const SavingsCapturedMetricPropsSchema = z.object({
  totalSavings: z.number().min(0),
  monthlySavings: z.number().min(0),
  yearlySavings: z.number().min(0),
  savingsGoal: z.number().min(0).optional(),
  percentOfGoal: z.number().min(0).max(100).optional(),
  trend: z.enum(['up', 'stable', 'down']).optional(),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
});

export type SavingsCapturedMetricProps = z.infer<typeof SavingsCapturedMetricPropsSchema>;

// =============================================================================
// AUTOMATION LOG
// =============================================================================

export const AutomationLogPropsSchema = z.object({
  entries: z.array(AutomationLogEntrySchema),
  maxVisible: z.number().default(10),
  showTimestamps: z.boolean().default(true),
  onViewAll: z.function().args().returns(z.void()).optional(),
  onRefresh: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
  emptyMessage: z.string().default('No automation activity yet'),
});

export type AutomationLogProps = z.infer<typeof AutomationLogPropsSchema>;

// =============================================================================
// AUTOMATION LOG ENTRY
// =============================================================================

export const AutomationLogEntryPropsSchema = z.object({
  entry: AutomationLogEntrySchema,
  onViewOptimization: z.function().args().returns(z.void()).optional(),
  showDetails: z.boolean().default(false),
});

export type AutomationLogEntryProps = z.infer<typeof AutomationLogEntryPropsSchema>;

// =============================================================================
// PRIORITY BADGE
// =============================================================================

export const PriorityBadgePropsSchema = z.object({
  priority: OptimizationPrioritySchema,
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showLabel: z.boolean().default(true),
});

export type PriorityBadgeProps = z.infer<typeof PriorityBadgePropsSchema>;

// =============================================================================
// SAVINGS BADGE
// =============================================================================

export const SavingsBadgePropsSchema = z.object({
  amount: z.number().min(0),
  frequency: SavingsFrequencySchema,
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showFrequency: z.boolean().default(true),
});

export type SavingsBadgeProps = z.infer<typeof SavingsBadgePropsSchema>;

// =============================================================================
// OPTIMIZATION TYPE ICON
// =============================================================================

export const OptimizationTypeIconPropsSchema = z.object({
  type: OptimizationTypeSchema,
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showLabel: z.boolean().default(false),
});

export type OptimizationTypeIconProps = z.infer<typeof OptimizationTypeIconPropsSchema>;

// =============================================================================
// OPTIMIZE METRICS CARD
// =============================================================================

export const OptimizeMetricsCardPropsSchema = z.object({
  metrics: OptimizeMetricsSchema,
  isLoading: z.boolean().default(false),
  onRefresh: z.function().args().returns(z.void()).optional(),
});

export type OptimizeMetricsCardProps = z.infer<typeof OptimizeMetricsCardPropsSchema>;

// =============================================================================
// OPTIMIZATION SUMMARY CARD
// =============================================================================

export const OptimizationSummaryCardPropsSchema = z.object({
  summary: OptimizationSummarySchema,
  isLoading: z.boolean().default(false),
  onFilterByStatus: z.function().args(OptimizationStatusSchema).returns(z.void()).optional(),
  onFilterByPriority: z.function().args(OptimizationPrioritySchema).returns(z.void()).optional(),
});

export type OptimizationSummaryCardProps = z.infer<typeof OptimizationSummaryCardPropsSchema>;

// =============================================================================
// EXECUTE MODAL
// =============================================================================

export const ExecuteModalPropsSchema = z.object({
  optimization: OptimizationSchema,
  isOpen: z.boolean(),
  onClose: z.function().args().returns(z.void()),
  onConfirm: z.function().args().returns(z.void()),
  onSchedule: z.function().args(z.string().datetime()).returns(z.void()).optional(),
  isExecuting: z.boolean().default(false),
});

export type ExecuteModalProps = z.infer<typeof ExecuteModalPropsSchema>;

// =============================================================================
// OPTIMIZE DASHBOARD STATE
// =============================================================================

export const OptimizeDashboardStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable(),
  selectedOptimizationId: z.string().uuid().nullable(),
  filterStatus: z.enum(['all', ...OptimizationStatusSchema.options]).default('all'),
  filterPriority: z.enum(['all', ...OptimizationPrioritySchema.options]).default('all'),
  filterType: z.enum(['all', ...OptimizationTypeSchema.options]).default('all'),
  sortBy: z.enum(['priority', 'savings', 'date']).default('priority'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  showExecuteModal: z.boolean().default(false),
});

export type OptimizeDashboardState = z.infer<typeof OptimizeDashboardStateSchema>;
