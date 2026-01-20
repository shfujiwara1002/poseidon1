import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// =============================================================================
// DATABASE TABLE DEFINITIONS
// =============================================================================

/**
 * Engine Status - Tracks the three AI engines: Protect, Grow, Optimize
 */
export const engines = pgTable("engines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull(),
  score: decimal("score").notNull(),
  metricLabel: text("metric_label").notNull(),
  metricValue: text("metric_value").notNull(),
  details: text("details").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

/**
 * Transactions - Mock transaction data for fraud detection (Protect engine)
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  merchant: text("merchant").notNull(),
  amount: decimal("amount").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(),
  riskScore: integer("risk_score").notNull(),
});

/**
 * Forecasts - Net worth projection data with confidence bounds (Grow engine)
 */
export const forecasts = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  actual: decimal("actual"),
  projected: decimal("projected").notNull(),
  lowerBound: decimal("lower_bound"),
  upperBound: decimal("upper_bound"),
});

/**
 * Actions - Automated optimization actions (Optimize engine)
 */
export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount"),
  status: text("status").notNull(),
  date: timestamp("date").defaultNow(),
});

/**
 * Alerts - Security alerts and notifications
 */
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(),
  read: boolean("read").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

// =============================================================================
// ZOD SCHEMAS FOR VALIDATION
// =============================================================================

export const insertEngineSchema = createInsertSchema(engines).omit({
  id: true,
  lastUpdated: true
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true
});

export const insertForecastSchema = createInsertSchema(forecasts).omit({
  id: true
});

export const insertActionSchema = createInsertSchema(actions).omit({
  id: true
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  timestamp: true
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Engine = typeof engines.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Forecast = typeof forecasts.$inferSelect;
export type Action = typeof actions.$inferSelect;
export type Alert = typeof alerts.$inferSelect;

export type InsertEngine = z.infer<typeof insertEngineSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertForecast = z.infer<typeof insertForecastSchema>;
export type InsertAction = z.infer<typeof insertActionSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type DashboardDataResponse = {
  engines: Engine[];
  recentTransactions: Transaction[];
  forecasts: Forecast[];
  pendingActions: Action[];
  alerts: Alert[];
};
