# Poseidon.AI

A financial intelligence platform powered by three AI engines: **Protect** (fraud detection), **Grow** (forecasting), and **Optimize** (automated actions).

![Poseidon.AI Dashboard](https://img.shields.io/badge/Status-Active-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![React](https://img.shields.io/badge/React-18.3-61dafb)

## Features

### Three AI Engines

| Engine | Purpose | Key Metrics |
|--------|---------|-------------|
| **Protect** | Real-time fraud detection & risk scoring | Threat Score, Risk Flags, Transaction Scanning |
| **Grow** | Cash flow forecasting & financial projections | Accuracy %, Confidence Intervals, Trend Analysis |
| **Optimize** | Automated savings & action recommendations | Pending Savings, Auto-actions, Execution Status |

### Technical Highlights

- **Spec-Driven Development (SDD)**: All domain models defined as Zod specifications
- **Type-Safe API**: Shared Zod schemas validate requests/responses
- **Real-time Updates**: React Query with 5-second refresh intervals
- **Mock Data Fallback**: Works without database for frontend development
- **Design Tokens**: Consistent theming with engine-specific gradients

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL (optional, for full-stack mode)

### Frontend Only (No Database Required)

```bash
npm install
npx vite --host
```

Open http://localhost:5173 - the app uses mock data when the backend is unavailable.

### Full Stack (With Database)

```bash
# 1. Set up environment
export DATABASE_URL="postgresql://user:password@localhost:5432/poseidon"

# 2. Install dependencies
npm install

# 3. Push schema to database
npm run db:push

# 4. Start development server
npm run dev
```

Open http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npx vite` | Frontend-only dev server (no database) |
| `npm run dev` | Full-stack dev server (requires DATABASE_URL) |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push Drizzle schema to PostgreSQL |

## Project Structure

```
poseidon1/
├── client/                    # React frontend
│   └── src/
│       ├── components/
│       │   ├── features/      # Engine-specific components
│       │   │   ├── protect/   # RiskBadge, AlertCard, RiskScoreCard
│       │   │   ├── grow/      # TrendIndicator, ForecastSummaryCard
│       │   │   └── optimize/  # OptimizationCard, SavingsBadge
│       │   └── ui/            # shadcn/ui components
│       ├── pages/             # Route pages (Dashboard, Transactions, etc.)
│       ├── hooks/             # React Query hooks
│       ├── tokens/            # Design tokens (colors, spacing, typography)
│       └── mocks/             # Mock data generators
├── server/                    # Express backend
│   ├── routes.ts              # API handlers
│   └── storage.ts             # Database access layer
├── shared/                    # Shared code
│   ├── schema.ts              # Database schema (Drizzle + Zod)
│   └── routes.ts              # API contracts with response schemas
├── specs/                     # SDD Specifications
│   ├── domain/                # Domain model specs (Zod schemas)
│   └── components/            # Component specs
└── docs/                      # Documentation
    ├── architecture/          # Architecture decisions
    ├── api/                   # API contracts
    └── specs/                 # Engine specifications
```

## Architecture

### Data Flow

```
React Component → React Query Hook → fetch() → Express Route → DatabaseStorage → PostgreSQL
                                   ↓
                          (Falls back to mock data if backend unavailable)
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/dashboard` | GET | Aggregated dashboard data |
| `/api/engines` | GET | List all engines |
| `/api/actions/:id/execute` | POST | Execute a pending action |

### Design Tokens

Engine-specific gradients for visual identity:

- **Protect**: Blue gradient (`#3b82f6` → `#1d4ed8`)
- **Grow**: Green gradient (`#22c55e` → `#16a34a`)
- **Optimize**: Purple gradient (`#a855f7` → `#7c3aed`)

## Deployment

### Railway (Recommended)

```bash
# Install CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add --plugin postgresql
railway up
```

Configuration files included: `railway.toml`, `nixpacks.toml`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes (full-stack) | PostgreSQL connection string |
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | `development` or `production` |

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Query, Wouter, Framer Motion |
| **Backend** | Express, Drizzle ORM, PostgreSQL, Passport.js |
| **Validation** | Zod (shared schemas) |
| **Build** | esbuild, Vite |

## Development

### Spec-Driven Development

This project follows SDD principles:

> "Specifications are not documentation of code; code is implementation of specifications."

1. Define domain models in `specs/domain/*.spec.ts`
2. Implement components following `specs/components/`
3. Use design tokens from `client/src/tokens/`

### Adding a New Feature

1. Create spec in `specs/domain/`
2. Update `shared/schema.ts` with database fields
3. Add simplified response schema in `shared/routes.ts`
4. Create feature components in `client/src/components/features/`
5. Update relevant pages

## License

MIT
