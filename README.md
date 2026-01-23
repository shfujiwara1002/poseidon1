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

## Development Guide

### Two Development Workflows

#### Simple Workflow (Quick Changes)
For small changes, bug fixes, or single-component updates:

```bash
# Just describe what you want to Claude Code
"Add a delete button to the alert card"
"Change the Protect engine badge color"
"Fix TypeScript error in dashboard.tsx"
```

Claude will make changes directly without requiring specs.

#### Spec-Driven Workflow (Complex Features)
For multi-file features, new pages, or complex data flows:

**Step 1: Write Plain English Spec**

Create `docs/specs/[feature-name].md` using the template at `docs/specs/_simple-template.md`:

```markdown
# Transaction History

Show last 30 days of transactions with:
- Date, amount, merchant name
- Risk score badge (high/medium/low)
- Filter by date range
- Search by merchant

When user clicks a transaction, show details panel.
```

**Step 2: Generate Technical Specs**

Run in Claude Code:
```
/sync-spec transaction-history
```

This translates your plain English into Zod schemas in `specs/`.

**Step 3: Implement**

Tell Claude:
```
Implement the transaction history feature
```

Claude follows the generated specs exactly.

---

### Claude Code Commands

| Command | When to Use | What It Does |
|---------|-------------|--------------|
| `/spec [feature-name]` | Creating new feature spec | Opens editor for plain English spec |
| `/sync-spec [feature-name]` | After editing spec | Converts to technical Zod schemas |

---

### Directory Structure (What You Edit)

```
poseidon1/
│
├── docs/specs/              ← YOU write plain English specs here
│   ├── _simple-template.md  ← Copy this for new specs
│   ├── dashboard.md
│   ├── protect-engine.md
│   ├── grow-engine.md
│   └── optimize-engine.md
│
├── specs/                   ← Claude generates Zod schemas here
│   ├── domain/              ← Data models (Alert, Forecast, etc.)
│   └── components/          ← Component props by engine
│
├── client/src/
│   ├── components/features/ ← Claude implements components here
│   │   ├── protect/         ← Fraud detection components
│   │   ├── grow/            ← Forecasting components
│   │   └── optimize/        ← Automation components
│   ├── pages/               ← Full pages (Dashboard, Transactions)
│   └── tokens/              ← Design tokens (colors, spacing)
│
└── server/
    ├── routes.ts            ← API endpoints
    └── storage.ts           ← Database queries
```

---

### The Three AI Engines

All components belong to one of three engines:

| Engine | Color | Purpose | Example Components |
|--------|-------|---------|-------------------|
| **Protect** | Blue `#3B82F6` | Fraud detection | RiskBadge, AlertCard, RiskScoreCard |
| **Grow** | Green `#10B981` | Forecasting | TrendIndicator, ForecastCard |
| **Optimize** | Purple `#8B5CF6` | Automation | ActionCard, SavingsBadge |

---

### When to Use Which Workflow?

| Simple Workflow | Spec-Driven Workflow |
|-----------------|---------------------|
| Bug fixes | New pages |
| Small tweaks | Multi-component features |
| Color/style changes | Complex data flows |
| Single component edits | New engine capabilities |

---

### Spec-Driven Development Principles

This project follows SDD:

> "Specifications are not documentation of code; code is implementation of specifications."

**Two-Layer System:**
1. **Plain English Specs** (`docs/specs/`) - What you want in human language
2. **Technical Specs** (`specs/`) - Zod schemas defining exact data shapes

**Rules:**
- All domain models require Zod schema in `specs/domain/`
- Mock data must validate against Zod schemas
- Implementation follows technical specs exactly

---

### Adding a New Feature (Examples)

**Example 1: Small Change**
```
You: "Add a new alert type for unusual spending"
Claude: [Implements directly]
```

**Example 2: Complex Feature**
```
You: /spec transaction-history
[Write plain English in editor]

You: /sync-spec transaction-history
[Claude generates Zod schemas]

You: "Implement transaction history page"
[Claude builds following specs]
```

## License

MIT
