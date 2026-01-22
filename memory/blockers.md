# Known Blockers & Workarounds

> Last updated: 2025-01-22

## Active Blockers

Currently no active blockers.

---

## Resolved Blockers

### TypeScript errors in storage.ts
**Status**: Resolved
**Date Identified**: 2025-01-22
**Date Resolved**: 2025-01-22
**Impact**: Build failed, couldn't deploy
**Root Cause**: Schema expanded with new required fields (type, category, period) but seed data wasn't updated
**Fix**: Updated seed data in storage.ts to include all required fields:
- Engines: Added `type` field ('protect', 'grow', 'optimize')
- Transactions: Added `type`, `category`, `merchantName`, `riskFlag` fields
- Forecasts: Added `type`, `period`, `predictedValue`, `confidenceLow/High` fields
- Alerts: Added `type` field ('threshold', 'anomaly', 'fraud', etc.)

### Type mismatch in use-dashboard.ts
**Status**: Resolved
**Date Identified**: 2025-01-22
**Date Resolved**: 2025-01-22
**Impact**: TypeScript error on line 232
**Root Cause**: Function returned `Action` (full schema type) but API returns `ActionResponse` (simplified)
**Fix**: Changed import from `Action` to `ActionResponse` from `@shared/routes`

### Database not available for frontend development
**Status**: Resolved
**Date**: 2025-01-19
**Impact**: Frontend developers couldn't run the app
**Workaround**:
- Added mock data fallback in `client/src/hooks/use-dashboard.ts`
- Run `npx vite` instead of `npm run dev` for frontend-only development
**Permanent Fix**: Mock data is now a standard feature for local development

---

## Potential Issues

### Component implementation gap
**Risk**: Medium
**Description**: 16 of 32 specified components not yet implemented
**Impact**: Some UI features incomplete
**Mitigation**:
- Prioritize ExecuteModal (needed for action execution)
- Prioritize ForecastChart (core Grow visualization)
- Track progress in current-sprint.md

### Feature specs incomplete
**Risk**: Low
**Description**: docs/specs/{protect,grow,optimize}-engine.md are placeholder-level
**Impact**: Developers may lack detailed requirements
**Mitigation**:
- Expand specs as components are implemented
- Use component specs as source of truth for now

### No test coverage
**Risk**: Medium
**Description**: No unit or integration tests
**Impact**: Regressions possible
**Mitigation**:
- Add tests incrementally
- Focus on critical paths first (action execution, data fetching)

---

## Environment-Specific Issues

### macOS
- No known issues

### Linux
- Not tested yet

### Windows
- Not tested yet

---

## Template for New Blockers

```markdown
### [Blocker Title]
**Status**: Active | Investigating | Resolved
**Date Identified**: YYYY-MM-DD
**Date Resolved**: YYYY-MM-DD (if resolved)
**Impact**: What can't be done because of this
**Root Cause**: Why this is happening
**Workaround**: Temporary solution
**Permanent Fix**: Long-term solution (if known)
**Owner**: Who is responsible for fixing
```
