# Data Flow Architecture

This document details how data flows through the Poseidon.AI system.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │    React     │───▶│  React Query │───▶│   fetch()    │              │
│  │  Components  │◀───│    Cache     │◀───│              │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼ HTTP/JSON
┌─────────────────────────────────────────────────────────────────────────┐
│                              SERVER                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │   Express    │───▶│   Routes     │───▶│   Storage    │              │
│  │  Middleware  │    │  (Zod valid) │    │   Layer      │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼ SQL
┌─────────────────────────────────────────────────────────────────────────┐
│                            DATABASE                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  PostgreSQL  │    │   Drizzle    │    │   Tables     │              │
│  │              │◀───│     ORM      │◀───│  (schema.ts) │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
└─────────────────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Client Initiates Request

```typescript
// client/src/hooks/use-dashboard.ts
const { data, isLoading, error } = useQuery({
  queryKey: ["dashboard"],
  queryFn: async () => {
    const response = await fetch("/api/dashboard");
    return response.json();
  },
});
```

### 2. Express Receives Request

```typescript
// server/routes.ts
app.get("/api/dashboard", async (req, res) => {
  // Authentication check via Passport.js
  // Route to storage layer
});
```

### 3. Storage Layer Queries Database

```typescript
// server/storage.ts
class DatabaseStorage {
  async getDashboardData(): Promise<DashboardData> {
    const engines = await db.select().from(enginesTable);
    const transactions = await db.select().from(transactionsTable);
    // ... aggregate and return
  }
}
```

### 4. Response Validated and Returned

```typescript
// shared/routes.ts - Zod schema validates response
const DashboardResponseSchema = z.object({
  engines: z.array(EngineSchema),
  transactions: z.array(TransactionSchema),
  forecasts: z.array(ForecastSchema),
  actions: z.array(ActionSchema),
  alerts: z.array(AlertSchema),
});
```

## Data Models

### Core Entities

| Entity | Table | Description |
|--------|-------|-------------|
| Engine | `engines` | AI engine status (Protect, Grow, Optimize) |
| Transaction | `transactions` | Financial transaction records |
| Forecast | `forecasts` | AI-generated predictions |
| Action | `actions` | Recommended automated actions |
| Alert | `alerts` | Fraud/anomaly alerts |

### Relationships

```
engines ──────┬─────────────────────────────────────┐
              │                                      │
transactions ─┼─────▶ alerts (transaction_id)       │
              │                                      │
              ├─────▶ forecasts (based on history)  │
              │                                      │
              └─────▶ actions (recommendations)     │
```

## Caching Strategy

### Client-Side (React Query)

| Query Key | Stale Time | Cache Time | Background Refetch |
|-----------|------------|------------|-------------------|
| `["dashboard"]` | 30s | 5min | Every 30s |
| `["engines"]` | 1min | 10min | On window focus |
| `["forecasts", period]` | 1hr | 24hr | Manual only |

### Server-Side

- No server caching currently
- Consider Redis for frequently accessed data
- Database connection pooling via pg-pool

## Error Handling

### Client Errors

```typescript
// React Query handles errors automatically
if (error) {
  // Show error toast
  // Fall back to cached data if available
  // Log to monitoring service
}
```

### Server Errors

```typescript
// Express error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
```

## Authentication Flow

```
User ──▶ Login Form ──▶ POST /api/login
                              │
                              ▼
                     Passport.js validates
                              │
                              ▼
                     Session created (express-session)
                              │
                              ▼
                     Cookie set in browser
                              │
                              ▼
                     Subsequent requests authenticated
```

## Real-Time Updates (Future)

Planned WebSocket integration:

```
Client ◀──────────────── WebSocket ───────────────▶ Server
         │                                              │
         ├── New alert pushed                           ├── Alert generated
         ├── Action status update                       ├── Action executed
         └── Engine status change                       └── Engine state change
```
