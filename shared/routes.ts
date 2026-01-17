import { z } from 'zod';
import { insertEngineSchema, engines, transactions, forecasts, actions, alerts } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
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

// ============================================
// API CONTRACT
// ============================================
export const api = {
  dashboard: {
    get: {
      method: 'GET' as const,
      path: '/api/dashboard',
      responses: {
        200: z.object({
          engines: z.array(z.custom<typeof engines.$inferSelect>()),
          recentTransactions: z.array(z.custom<typeof transactions.$inferSelect>()),
          forecasts: z.array(z.custom<typeof forecasts.$inferSelect>()),
          pendingActions: z.array(z.custom<typeof actions.$inferSelect>()),
          alerts: z.array(z.custom<typeof alerts.$inferSelect>()),
        }),
      },
    },
  },
  engines: {
    list: {
      method: 'GET' as const,
      path: '/api/engines',
      responses: {
        200: z.array(z.custom<typeof engines.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/engines/:id',
      responses: {
        200: z.custom<typeof engines.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  actions: {
    execute: {
      method: 'POST' as const,
      path: '/api/actions/:id/execute',
      responses: {
        200: z.custom<typeof actions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
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

// ============================================
// TYPE HELPERS
// ============================================
export type DashboardResponse = z.infer<typeof api.dashboard.get.responses[200]>;
