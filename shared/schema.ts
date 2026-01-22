import { pgTable, text, serial, integer, boolean, timestamp, decimal, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// =============================================================================
// DATABASE TABLE DEFINITIONS
// Aligned with specs/domain/ Zod schemas
// =============================================================================

/**
 * Engine Status - Tracks the three AI engines: Protect, Grow, Optimize
 * @see specs/domain/engine.spec.ts
 */
export const engines = pgTable("engines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'protect' | 'grow' | 'optimize'
  status: text("status").notNull(), // 'active' | 'learning' | 'paused' | 'error' | 'maintenance'
  accuracy: real("accuracy"),
  confidence: real("confidence"),
  metricLabel: text("metric_label").notNull(),
  metricValue: text("metric_value").notNull(),
  details: text("details").notNull(),
  score: text("score"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  lastTrainedAt: timestamp("last_trained_at"),
});

/**
 * Transactions - Financial transaction records for fraud detection
 * @see specs/domain/transaction.spec.ts
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  accountId: text("account_id"),
  amount: decimal("amount").notNull(),
  currency: text("currency").default("USD"),
  type: text("type").notNull(), // 'income' | 'expense' | 'transfer'
  category: text("category").notNull(),
  description: text("description"),
  merchantName: text("merchant_name"),
  merchantCategory: text("merchant_category"),
  status: text("status").notNull(), // 'pending' | 'completed' | 'failed' | 'cancelled'
  processedAt: timestamp("processed_at"),
  riskFlag: text("risk_flag").default("none"), // 'none' | 'low' | 'medium' | 'high' | 'critical'
  riskScore: integer("risk_score"),
  riskReasons: text("risk_reasons"), // JSON array as string
  optimizationApplied: boolean("optimization_applied").default(false),
  optimizationId: text("optimization_id"),
  potentialSavings: decimal("potential_savings"),
  timestamp: timestamp("timestamp").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Forecasts - Financial predictions with confidence intervals
 * @see specs/domain/forecast.spec.ts
 */
export const forecasts = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  type: text("type").notNull(), // 'revenue' | 'expense' | 'net_worth' | 'savings' | 'cashflow'
  period: text("period").notNull(), // '7d' | '30d' | '60d' | '90d' | '6m' | '1y' | '5y'
  scenario: text("scenario").default("baseline"), // 'pessimistic' | 'baseline' | 'optimistic'
  predictedValue: decimal("predicted_value").notNull(),
  confidenceLow: decimal("confidence_low"),
  confidenceHigh: decimal("confidence_high"),
  confidenceLevel: real("confidence_level"),
  baselineValue: decimal("baseline_value"),
  percentChange: real("percent_change"),
  trend: text("trend"), // 'improving' | 'stable' | 'declining'
  modelVersion: text("model_version"),
  accuracy: real("accuracy"),
  dataPointsUsed: integer("data_points_used"),
  forecastDate: timestamp("forecast_date").defaultNow(),
  targetDate: timestamp("target_date"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  // Legacy fields for chart display
  month: text("month"),
  actual: decimal("actual"),
  projected: decimal("projected"),
  lowerBound: decimal("lower_bound"),
  upperBound: decimal("upper_bound"),
});

/**
 * Actions - Automated optimization recommendations
 * @see specs/domain/optimization.spec.ts
 */
export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  type: text("type").notNull(), // 'bill_payment' | 'subscription_cancel' | 'savings_transfer' | etc.
  title: text("title"),
  description: text("description").notNull(),
  details: text("details"), // JSON string
  status: text("status").notNull(), // 'pending' | 'approved' | 'executing' | 'completed' | 'failed' | 'rejected'
  priority: text("priority").default("medium"), // 'low' | 'medium' | 'high' | 'urgent'
  estimatedSavings: decimal("estimated_savings"),
  savingsFrequency: text("savings_frequency").default("one_time"), // 'one_time' | 'monthly' | 'yearly'
  annualizedSavings: decimal("annualized_savings"),
  confidenceScore: real("confidence_score"),
  requiresApproval: boolean("requires_approval").default(true),
  autoExecute: boolean("auto_execute").default(false),
  scheduledFor: timestamp("scheduled_for"),
  expiresAt: timestamp("expires_at"),
  approvedAt: timestamp("approved_at"),
  approvedBy: text("approved_by"),
  executedAt: timestamp("executed_at"),
  actualSavings: decimal("actual_savings"),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // Legacy fields
  amount: decimal("amount"),
  date: timestamp("date").defaultNow(),
});

/**
 * Alerts - Security alerts and fraud notifications
 * @see specs/domain/alert.spec.ts
 */
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  type: text("type").notNull(), // 'fraud' | 'anomaly' | 'threshold' | 'security' | 'compliance'
  severity: text("severity").notNull(), // 'low' | 'medium' | 'high' | 'critical'
  status: text("status").default("active"), // 'active' | 'investigating' | 'dismissed' | 'resolved' | 'escalated'
  title: text("title").notNull(),
  message: text("message").notNull(),
  details: text("details"), // JSON string
  riskScore: integer("risk_score"),
  confidence: real("confidence"),
  riskFlag: text("risk_flag"),
  transactionId: text("transaction_id"),
  relatedAlertIds: text("related_alert_ids"), // JSON array as string
  dismissedAt: timestamp("dismissed_at"),
  dismissedBy: text("dismissed_by"),
  dismissReason: text("dismiss_reason"),
  resolvedAt: timestamp("resolved_at"),
  resolution: text("resolution"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  // Legacy fields
  read: boolean("read").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

/**
 * Financial Goals - User savings and investment goals
 * @see specs/domain/financial-goal.spec.ts
 */
export const financialGoals = pgTable("financial_goals", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'emergency_fund' | 'retirement' | 'home_purchase' | etc.
  status: text("status").default("active"), // 'active' | 'paused' | 'completed' | 'abandoned'
  priority: text("priority").default("medium"), // 'low' | 'medium' | 'high' | 'critical'
  targetAmount: decimal("target_amount").notNull(),
  currentAmount: decimal("current_amount").default("0"),
  monthlyContribution: decimal("monthly_contribution").default("0"),
  targetDate: timestamp("target_date").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  percentComplete: real("percent_complete").default(0),
  onTrack: boolean("on_track").default(true),
  daysRemaining: integer("days_remaining"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// =============================================================================
// ZOD SCHEMAS FOR VALIDATION
// =============================================================================

export const insertEngineSchema = createInsertSchema(engines).omit({
  id: true,
  lastUpdated: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForecastSchema = createInsertSchema(forecasts).omit({
  id: true,
  createdAt: true,
});

export const insertActionSchema = createInsertSchema(actions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const insertFinancialGoalSchema = createInsertSchema(financialGoals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Engine = typeof engines.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Forecast = typeof forecasts.$inferSelect;
export type Action = typeof actions.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type FinancialGoal = typeof financialGoals.$inferSelect;

export type InsertEngine = z.infer<typeof insertEngineSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertForecast = z.infer<typeof insertForecastSchema>;
export type InsertAction = z.infer<typeof insertActionSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type InsertFinancialGoal = z.infer<typeof insertFinancialGoalSchema>;

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type DashboardDataResponse = {
  engines: Engine[];
  recentTransactions: Transaction[];
  forecasts: Forecast[];
  pendingActions: Action[];
  alerts: Alert[];
  financialGoals?: FinancialGoal[];
};

// =============================================================================
// ENUM VALUES (for reference in components)
// =============================================================================

export const ENGINE_TYPES = ['protect', 'grow', 'optimize'] as const;
export const ENGINE_STATUSES = ['active', 'learning', 'paused', 'error', 'maintenance'] as const;
export const RISK_FLAGS = ['none', 'low', 'medium', 'high', 'critical'] as const;
export const ALERT_SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;
export const ALERT_STATUSES = ['active', 'investigating', 'dismissed', 'resolved', 'escalated'] as const;
export const ACTION_STATUSES = ['pending', 'approved', 'executing', 'completed', 'failed', 'rejected', 'expired'] as const;
export const FORECAST_TRENDS = ['improving', 'stable', 'declining'] as const;
