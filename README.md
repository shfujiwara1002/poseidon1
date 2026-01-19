# Poseidon1 (FIS.ai)

A financial intelligence dashboard with three AI engines: **Protect** (fraud detection), **Grow** (forecasting), and **Optimize** (automated actions).

## Prerequisites

- Node.js 18+
- PostgreSQL (for full-stack mode)

## Quick Start

### Frontend Only (No Database)

```bash
npm install
npx vite --port 5000
```

Open http://localhost:5000 - the app uses mock data when the backend is unavailable.

### Full Stack (With Database)

1. **Set up PostgreSQL** and create a database

2. **Configure environment**
   ```bash
   export DATABASE_URL="postgresql://user:password@localhost:5432/poseidon"
   ```

3. **Install and run**
   ```bash
   npm install
   npm run db:push    # Push schema to database
   npm run dev        # Start dev server
   ```

Open http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (requires DATABASE_URL) |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push Drizzle schema to PostgreSQL |

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/   # UI components (shadcn/ui)
│   │   ├── pages/        # Route pages
│   │   └── hooks/        # React Query hooks
├── server/          # Express backend
│   ├── routes.ts         # API handlers
│   └── storage.ts        # Database access
├── shared/          # Shared code
│   ├── schema.ts         # Database schema (Drizzle)
│   └── routes.ts         # API contracts (Zod)
```

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, React Query, Wouter
- **Backend**: Express, Drizzle ORM, PostgreSQL
- **Validation**: Zod (shared between frontend and backend)
