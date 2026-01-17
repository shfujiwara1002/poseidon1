import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Engine Status metrics
export const engines = pgTable("engines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Protect, Grow, Optimize
  status: text("status").notNull(), // active, warning, optimizing
  score: decimal("score").notNull(), // e.g., 0.02 (threat), 98.4 (accuracy)
  metricLabel: text("metric_label").notNull(), // "Threat Score", "Accuracy", "Pending Savings"
  metricValue: text("metric_value").notNull(), // "0.02%", "98.4%", "$408/yr"
  details: text("details").notNull(), // "1,248 transactions scanned", "$4,200 projected surplus"
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Mock Transactions for "Protect" engine
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  merchant: text("merchant").notNull(),
  amount: decimal("amount").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(), // safe, suspicious, blocked
  riskScore: integer("risk_score").notNull(), // 0-100
});

// Forecast data for "Grow" engine (Chart data)
export const forecasts = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  actual: decimal("actual"),
  projected: decimal("projected").notNull(),
  lowerBound: decimal("lower_bound"),
  upperBound: decimal("upper_bound"),
});

// Automated Actions for "Optimize" engine
export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "subscription_cancel", "fund_transfer"
  description: text("description").notNull(),
  amount: decimal("amount"),
  status: text("status").notNull(), // pending, executed
  date: timestamp("date").defaultNow(),
});

// Alerts/Notifications
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(), // high, medium, low
  read: boolean("read").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertEngineSchema = createInsertSchema(engines).omit({ id: true, lastUpdated: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });
export const insertForecastSchema = createInsertSchema(forecasts).omit({ id: true });
export const insertActionSchema = createInsertSchema(actions).omit({ id: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, timestamp: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Engine = typeof engines.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Forecast = typeof forecasts.$inferSelect;
export type Action = typeof actions.$inferSelect;
export type Alert = typeof alerts.$inferSelect;

export type EngineResponse = Engine;
export type DashboardDataResponse = {
  engines: Engine[];
  recentTransactions: Transaction[];
  forecasts: Forecast[];
  pendingActions: Action[];
  alerts: Alert[];
};
