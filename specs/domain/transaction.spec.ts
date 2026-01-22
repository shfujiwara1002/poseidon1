/**
 * Transaction Domain Specification
 *
 * Defines financial transaction entities for Poseidon.AI platform.
 * Used by Protect engine for fraud detection and Optimize engine for analysis.
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const TransactionTypeSchema = z.enum(['income', 'expense', 'transfer']);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const TransactionCategorySchema = z.enum([
  // Income
  'salary',
  'investment_income',
  'freelance',
  'other_income',
  // Expenses
  'housing',
  'transportation',
  'food',
  'utilities',
  'healthcare',
  'entertainment',
  'shopping',
  'subscriptions',
  'debt_payment',
  'other_expense',
  // Transfers
  'savings_transfer',
  'investment_transfer',
  'account_transfer',
]);
export type TransactionCategory = z.infer<typeof TransactionCategorySchema>;

export const TransactionStatusSchema = z.enum(['pending', 'completed', 'failed', 'cancelled']);
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

export const RiskFlagSchema = z.enum(['none', 'low', 'medium', 'high', 'critical']);
export type RiskFlag = z.infer<typeof RiskFlagSchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  accountId: z.string().uuid(),

  // Transaction Details
  amount: z.number(),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']).default('USD'),
  type: TransactionTypeSchema,
  category: TransactionCategorySchema,
  description: z.string().max(500),
  merchantName: z.string().max(200).nullable().optional(),
  merchantCategory: z.string().max(100).nullable().optional(),

  // Status & Processing
  status: TransactionStatusSchema,
  processedAt: z.string().datetime().nullable().optional(),

  // Risk Analysis (Protect Engine)
  riskFlag: RiskFlagSchema.default('none'),
  riskScore: z.number().min(0).max(100).nullable().optional(),
  riskReasons: z.array(z.string()).default([]),

  // Optimization (Optimize Engine)
  optimizationApplied: z.boolean().default(false),
  optimizationId: z.string().uuid().nullable().optional(),
  potentialSavings: z.number().min(0).nullable().optional(),

  // Timestamps
  timestamp: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// =============================================================================
// AGGREGATION SCHEMAS
// =============================================================================

export const TransactionSummarySchema = z.object({
  totalIncome: z.number(),
  totalExpenses: z.number(),
  netChange: z.number(),
  transactionCount: z.number(),
  avgTransactionSize: z.number(),
  topCategories: z.array(z.object({
    category: TransactionCategorySchema,
    amount: z.number(),
    count: z.number(),
  })),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
});

export type TransactionSummary = z.infer<typeof TransactionSummarySchema>;

// =============================================================================
// FILTER SCHEMAS
// =============================================================================

export const TransactionFilterSchema = z.object({
  userId: z.string().uuid().optional(),
  type: TransactionTypeSchema.optional(),
  category: TransactionCategorySchema.optional(),
  status: TransactionStatusSchema.optional(),
  riskFlag: RiskFlagSchema.optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  searchQuery: z.string().optional(),
});

export type TransactionFilter = z.infer<typeof TransactionFilterSchema>;
