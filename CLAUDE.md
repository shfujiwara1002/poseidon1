# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (requires DATABASE_URL)
npm run build     # Build for production (outputs to dist/)
npm run start     # Run production build
npm run check     # TypeScript type checking
npm run db:push   # Push Drizzle schema changes to PostgreSQL
npx vite          # Run frontend-only dev server (no database required)
```

## Architecture

This is a full-stack TypeScript monorepo for FIS.ai, a financial intelligence dashboard with three AI engines: Protect (fraud detection), Grow (forecasting), and Optimize (automated actions).

### Project Structure

- **client/** - React frontend (Vite, Wouter routing, React Query, shadcn/ui, Tailwind)
- **server/** - Express backend (Drizzle ORM, PostgreSQL, Passport.js auth)
- **shared/** - Shared types and API contracts (Zod schemas)

### Key Files

- `shared/schema.ts` - Database tables (engines, transactions, forecasts, actions, alerts) and Zod schemas
- `shared/routes.ts` - Type-safe API contract definitions with Zod validation
- `server/storage.ts` - DatabaseStorage class implementing data access layer
- `server/routes.ts` - Express route handlers
- `client/src/hooks/use-dashboard.ts` - React Query hooks for API calls (includes mock data fallback)
- `client/src/App.tsx` - Client routing with Wouter

### Data Flow

```
React Component → React Query Hook → fetch() → Express Route → DatabaseStorage → Drizzle → PostgreSQL
```

All API responses are validated with Zod schemas defined in `shared/routes.ts`.

### API Endpoints

- `GET /api/dashboard` - Aggregated dashboard data (engines, transactions, forecasts, actions, alerts)
- `GET /api/engines` - List all engines
- `POST /api/actions/:id/execute` - Execute a pending action

### Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required for backend)
- `PORT` - Server port (default: 5000)
