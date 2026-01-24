/**
 * Dashboard Page Specification
 *
 * Main command center view for Poseidon.AI Money Platform.
 * Displays engine status, financial projections, alerts, and optimizations.
 *
 * @module specs/pages/dashboard
 */

import { z } from 'zod';
import { EngineSchema, EngineStateSchema } from '../domain/engine.spec';
import { AlertSchema, AlertSummarySchema } from '../domain/alert.spec';
import { TransactionSchema } from '../domain/transaction.spec';
import { ForecastSchema } from '../domain/forecast.spec';
import { OptimizationSchema } from '../domain/optimization.spec';

// =============================================================================
// PAGE DATA SCHEMA
// =============================================================================

/**
 * Dashboard data returned from API
 */
export const DashboardDataSchema = z.object({
  engines: z.array(EngineSchema),
  alerts: z.array(AlertSchema),
  forecasts: z.array(ForecastSchema),
  pendingActions: z.array(OptimizationSchema),
  recentTransactions: z.array(TransactionSchema),
  lastUpdated: z.string().datetime(),
});

export type DashboardData = z.infer<typeof DashboardDataSchema>;

// =============================================================================
// PAGE STATE SCHEMA
// =============================================================================

/**
 * Dashboard UI state for filtering, sorting, and view management
 */
export const DashboardStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable(),
  lastRefresh: z.string().datetime().nullable(),

  // View preferences
  view: z.enum(['overview', 'detailed']).default('overview'),

  // Section collapse states
  sectionsExpanded: z.object({
    engines: z.boolean().default(true),
    projection: z.boolean().default(true),
    alerts: z.boolean().default(true),
    optimizations: z.boolean().default(true),
    activity: z.boolean().default(true),
  }),

  // Refresh state
  isRefreshing: z.boolean().default(false),
  autoRefreshEnabled: z.boolean().default(true),
  autoRefreshInterval: z.number().default(30000), // 30 seconds
});

export type DashboardState = z.infer<typeof DashboardStateSchema>;

// =============================================================================
// HEADER COMPONENT
// =============================================================================

export const DashboardHeaderPropsSchema = z.object({
  title: z.string().default('Command Center'),
  systemStatus: z.enum(['optimal', 'degraded', 'error', 'maintenance']).default('optimal'),
  user: z.object({
    name: z.string(),
    initials: z.string().max(2),
    avatarUrl: z.string().url().optional(),
  }),
  lastUpdated: z.string().datetime().optional(),
  onRefresh: z.function().args().returns(z.void()).optional(),
  isRefreshing: z.boolean().default(false),
});

export type DashboardHeaderProps = z.infer<typeof DashboardHeaderPropsSchema>;

// =============================================================================
// SYSTEM STATUS
// =============================================================================

export const SystemStatusSchema = z.enum(['optimal', 'degraded', 'error', 'maintenance']);
export type SystemStatus = z.infer<typeof SystemStatusSchema>;

export const SystemStatusConfigSchema = z.object({
  label: z.string(),
  color: z.string(),
  icon: z.string(),
  pulse: z.boolean(),
});

export type SystemStatusConfig = z.infer<typeof SystemStatusConfigSchema>;

// =============================================================================
// ENGINE STATUS GRID
// =============================================================================

export const EngineStatusGridPropsSchema = z.object({
  engines: z.array(EngineSchema),
  isLoading: z.boolean().default(false),
  onEngineClick: z.function().args(z.string()).returns(z.void()).optional(),
  variant: z.enum(['dashboard', 'landing', 'compact']).default('dashboard'),
});

export type EngineStatusGridProps = z.infer<typeof EngineStatusGridPropsSchema>;

// =============================================================================
// NET WORTH PROJECTION CHART
// =============================================================================

export const NetWorthProjectionChartPropsSchema = z.object({
  forecasts: z.array(ForecastSchema),
  confidenceLevel: z.number().min(0).max(100).default(94),
  showConfidenceBand: z.boolean().default(true),
  currentMonth: z.string().optional(),
  isLoading: z.boolean().default(false),
  height: z.number().default(300),
  onPeriodSelect: z.function().args(z.string()).returns(z.void()).optional(),
});

export type NetWorthProjectionChartProps = z.infer<typeof NetWorthProjectionChartPropsSchema>;

// =============================================================================
// SECURITY ALERTS PANEL
// =============================================================================

export const SecurityAlertsPanelPropsSchema = z.object({
  alerts: z.array(AlertSchema),
  maxVisible: z.number().default(3),
  isLoading: z.boolean().default(false),
  onDismiss: z.function().args(z.string()).returns(z.void()).optional(),
  onViewDetails: z.function().args(z.string()).returns(z.void()).optional(),
  onViewAll: z.function().args().returns(z.void()).optional(),
  emptyTitle: z.string().default('All Clear'),
  emptyMessage: z.string().default('No active security alerts'),
});

export type SecurityAlertsPanelProps = z.infer<typeof SecurityAlertsPanelPropsSchema>;

// =============================================================================
// RECENT ACTIVITY TABLE
// =============================================================================

export const RecentActivityTablePropsSchema = z.object({
  transactions: z.array(TransactionSchema),
  maxVisible: z.number().default(5),
  isLoading: z.boolean().default(false),
  onViewAll: z.function().args().returns(z.void()).optional(),
  onTransactionClick: z.function().args(z.string()).returns(z.void()).optional(),
  showRiskIndicator: z.boolean().default(true),
});

export type RecentActivityTableProps = z.infer<typeof RecentActivityTablePropsSchema>;

// =============================================================================
// TRANSACTION ROW
// =============================================================================

export const TransactionRowPropsSchema = z.object({
  transaction: TransactionSchema,
  onClick: z.function().args().returns(z.void()).optional(),
  showRiskIndicator: z.boolean().default(true),
});

export type TransactionRowProps = z.infer<typeof TransactionRowPropsSchema>;

// =============================================================================
// STATS PANEL (Protection Score + Savings)
// =============================================================================

export const StatsPanelPropsSchema = z.object({
  protectionScore: z.number().min(0).max(100),
  protectionTrend: z.enum(['improving', 'stable', 'declining']),
  totalSavings: z.number(),
  monthlySavings: z.number(),
  savingsTrend: z.enum(['up', 'down', 'stable']),
  isLoading: z.boolean().default(false),
});

export type StatsPanelProps = z.infer<typeof StatsPanelPropsSchema>;

// =============================================================================
// PAGE LAYOUT SECTIONS
// =============================================================================

/**
 * Defines the structure and order of dashboard sections
 */
export const DashboardSectionSchema = z.enum([
  'header',
  'engineGrid',
  'mainContent',    // Projection chart + stats panel
  'bottomRow',      // Alerts + optimizations
  'recentActivity',
]);

export type DashboardSection = z.infer<typeof DashboardSectionSchema>;

export const DashboardLayoutSchema = z.object({
  sections: z.array(DashboardSectionSchema),
  gridConfig: z.object({
    engines: z.object({
      columns: z.number().default(3),
      gap: z.number().default(24), // 6 * 4px
    }),
    mainContent: z.object({
      chartSpan: z.number().default(2),
      statsSpan: z.number().default(1),
      gap: z.number().default(24),
    }),
    bottomRow: z.object({
      columns: z.number().default(2),
      gap: z.number().default(24),
    }),
  }),
});

export type DashboardLayout = z.infer<typeof DashboardLayoutSchema>;

// =============================================================================
// DEFAULT LAYOUT CONFIGURATION
// =============================================================================

export const DEFAULT_DASHBOARD_LAYOUT: DashboardLayout = {
  sections: ['header', 'engineGrid', 'mainContent', 'bottomRow', 'recentActivity'],
  gridConfig: {
    engines: { columns: 3, gap: 24 },
    mainContent: { chartSpan: 2, statsSpan: 1, gap: 24 },
    bottomRow: { columns: 2, gap: 24 },
  },
};

// =============================================================================
// PAGE PROPS SCHEMA
// =============================================================================

export const DashboardPagePropsSchema = z.object({
  initialData: DashboardDataSchema.optional(),
  layout: DashboardLayoutSchema.optional(),
  autoRefresh: z.boolean().default(true),
  refreshInterval: z.number().default(30000),
});

export type DashboardPageProps = z.infer<typeof DashboardPagePropsSchema>;

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

export const UseDashboardDataReturnSchema = z.object({
  data: DashboardDataSchema.nullable(),
  isLoading: z.boolean(),
  error: z.instanceof(Error).nullable(),
  refetch: z.function().args().returns(z.promise(z.void())),
  isRefetching: z.boolean(),
});

export type UseDashboardDataReturn = z.infer<typeof UseDashboardDataReturnSchema>;
