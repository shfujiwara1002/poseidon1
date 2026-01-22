/**
 * Protect Engine Component Specifications
 *
 * Defines component props and states for fraud detection UI.
 */

import { z } from 'zod';
import {
  AlertSchema,
  AlertSeveritySchema,
  AlertStatusSchema,
  AlertSummarySchema,
} from '../../../domain/alert.spec';
import { TransactionSchema, RiskFlagSchema } from '../../../domain/transaction.spec';
import { ProtectMetricsSchema } from '../../../domain/engine.spec';

// =============================================================================
// RISK SCORE CARD
// =============================================================================

export const RiskScoreCardPropsSchema = z.object({
  score: z.number().min(0).max(100),
  trend: z.enum(['improving', 'stable', 'declining']),
  previousScore: z.number().min(0).max(100).optional(),
  lastUpdated: z.string().datetime(),
  onRefresh: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
});

export type RiskScoreCardProps = z.infer<typeof RiskScoreCardPropsSchema>;

// =============================================================================
// ALERTS LIST
// =============================================================================

export const AlertsListPropsSchema = z.object({
  alerts: z.array(AlertSchema),
  onDismiss: z.function().args(z.string()).returns(z.void()),
  onInvestigate: z.function().args(z.string()).returns(z.void()),
  onResolve: z.function().args(z.string()).returns(z.void()).optional(),
  maxVisible: z.number().default(5),
  showViewAll: z.boolean().default(true),
  onViewAll: z.function().args().returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
  emptyMessage: z.string().default('No alerts to display'),
});

export type AlertsListProps = z.infer<typeof AlertsListPropsSchema>;

// =============================================================================
// ALERT CARD
// =============================================================================

export const AlertCardPropsSchema = z.object({
  alert: AlertSchema,
  onDismiss: z.function().args().returns(z.void()),
  onInvestigate: z.function().args().returns(z.void()),
  onResolve: z.function().args().returns(z.void()).optional(),
  isExpanded: z.boolean().default(false),
  onToggleExpand: z.function().args().returns(z.void()).optional(),
});

export type AlertCardProps = z.infer<typeof AlertCardPropsSchema>;

// =============================================================================
// SUSPICIOUS TRANSACTION ROW
// =============================================================================

export const SuspiciousTransactionRowPropsSchema = z.object({
  transaction: TransactionSchema,
  onFlag: z.function().args(RiskFlagSchema).returns(z.void()),
  onClear: z.function().args().returns(z.void()),
  onViewDetails: z.function().args().returns(z.void()).optional(),
  isSelected: z.boolean().default(false),
  onSelect: z.function().args().returns(z.void()).optional(),
});

export type SuspiciousTransactionRowProps = z.infer<typeof SuspiciousTransactionRowPropsSchema>;

// =============================================================================
// SUSPICIOUS TRANSACTIONS LIST
// =============================================================================

export const SuspiciousTransactionsListPropsSchema = z.object({
  transactions: z.array(TransactionSchema),
  onFlag: z.function().args(z.string(), RiskFlagSchema).returns(z.void()),
  onClear: z.function().args(z.string()).returns(z.void()),
  onViewDetails: z.function().args(z.string()).returns(z.void()).optional(),
  selectedIds: z.array(z.string()).default([]),
  onSelectionChange: z.function().args(z.array(z.string())).returns(z.void()).optional(),
  isLoading: z.boolean().default(false),
  showBulkActions: z.boolean().default(true),
});

export type SuspiciousTransactionsListProps = z.infer<typeof SuspiciousTransactionsListPropsSchema>;

// =============================================================================
// ALERT SEVERITY BADGE
// =============================================================================

export const AlertSeverityBadgePropsSchema = z.object({
  severity: AlertSeveritySchema,
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showLabel: z.boolean().default(true),
});

export type AlertSeverityBadgeProps = z.infer<typeof AlertSeverityBadgePropsSchema>;

// =============================================================================
// RISK BADGE
// =============================================================================

export const RiskBadgePropsSchema = z.object({
  riskFlag: RiskFlagSchema,
  riskScore: z.number().min(0).max(100).optional(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  showScore: z.boolean().default(false),
});

export type RiskBadgeProps = z.infer<typeof RiskBadgePropsSchema>;

// =============================================================================
// PROTECT DASHBOARD STATE
// =============================================================================

export const ProtectDashboardStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable(),
  selectedAlertId: z.string().uuid().nullable(),
  filterSeverity: z.enum(['all', ...AlertSeveritySchema.options]),
  filterStatus: z.enum(['all', ...AlertStatusSchema.options]),
  sortBy: z.enum(['date', 'severity', 'riskScore']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ProtectDashboardState = z.infer<typeof ProtectDashboardStateSchema>;

// =============================================================================
// PROTECT METRICS CARD
// =============================================================================

export const ProtectMetricsCardPropsSchema = z.object({
  metrics: ProtectMetricsSchema,
  isLoading: z.boolean().default(false),
  onRefresh: z.function().args().returns(z.void()).optional(),
});

export type ProtectMetricsCardProps = z.infer<typeof ProtectMetricsCardPropsSchema>;

// =============================================================================
// ALERT SUMMARY CARD
// =============================================================================

export const AlertSummaryCardPropsSchema = z.object({
  summary: AlertSummarySchema,
  isLoading: z.boolean().default(false),
  onFilterBySeverity: z.function().args(AlertSeveritySchema).returns(z.void()).optional(),
});

export type AlertSummaryCardProps = z.infer<typeof AlertSummaryCardPropsSchema>;
