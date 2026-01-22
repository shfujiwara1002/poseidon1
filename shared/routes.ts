/**
 * API Routes and Contracts
 * Type-safe API definitions with Zod validation
 * @see specs/routes/api-contracts.spec.ts
 */

import { z } from "zod";

// =============================================================================
// ERROR SCHEMAS
// =============================================================================

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// =============================================================================
// SIMPLIFIED RESPONSE SCHEMAS (for frontend use)
// =============================================================================

// Engine - simplified for dashboard display
const EngineResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string().optional(),
  status: z.string(),
  score: z.string().nullable().optional(),
  metricLabel: z.string(),
  metricValue: z.string(),
  details: z.string(),
  lastUpdated: z.coerce.date().nullable().optional(),
});

// Transaction - simplified for transaction list
const TransactionResponseSchema = z.object({
  id: z.number(),
  merchant: z.string(),
  amount: z.string(),
  date: z.coerce.date().nullable().optional(),
  status: z.string(),
  riskScore: z.number(),
  riskFlag: z.string().optional(),
});

// Forecast - simplified for chart display
const ForecastResponseSchema = z.object({
  id: z.number(),
  month: z.string(),
  actual: z.string().nullable(),
  projected: z.string(),
  lowerBound: z.string(),
  upperBound: z.string(),
});

// Action - simplified for pending actions list
const ActionResponseSchema = z.object({
  id: z.number(),
  type: z.string(),
  description: z.string(),
  amount: z.string().nullable().optional(),
  status: z.string(),
  date: z.coerce.date().nullable().optional(),
});

// Alert - simplified for alerts list
const AlertResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string(),
  severity: z.string(),
  read: z.boolean(),
  timestamp: z.coerce.date().nullable().optional(),
});

// Dashboard aggregate response
const DashboardResponseSchema = z.object({
  engines: z.array(EngineResponseSchema),
  recentTransactions: z.array(TransactionResponseSchema),
  forecasts: z.array(ForecastResponseSchema),
  pendingActions: z.array(ActionResponseSchema),
  alerts: z.array(AlertResponseSchema),
});

// =============================================================================
// API CONTRACT DEFINITIONS
// =============================================================================

export const api = {
  dashboard: {
    get: {
      method: "GET" as const,
      path: "/api/dashboard",
      responses: {
        200: DashboardResponseSchema,
      },
    },
  },
  engines: {
    list: {
      method: "GET" as const,
      path: "/api/engines",
      responses: {
        200: z.array(EngineResponseSchema),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/engines/:id",
      responses: {
        200: EngineResponseSchema,
        404: errorSchemas.notFound,
      },
    },
  },
  actions: {
    execute: {
      method: "POST" as const,
      path: "/api/actions/:id/execute",
      responses: {
        200: ActionResponseSchema,
        404: errorSchemas.notFound,
      },
    },
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Build URL with path parameters interpolated
 */
export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
export type EngineResponse = z.infer<typeof EngineResponseSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
export type ForecastResponse = z.infer<typeof ForecastResponseSchema>;
export type ActionResponse = z.infer<typeof ActionResponseSchema>;
export type AlertResponse = z.infer<typeof AlertResponseSchema>;
export type EnginesResponse = EngineResponse[];
