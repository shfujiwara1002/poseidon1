# Known Blockers & Workarounds

> Last updated: 2025-01-21

## Active Blockers

Currently no active blockers.

---

## Resolved Blockers

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

### Mock data drift
**Risk**: Medium
**Description**: Mock data may become inconsistent with real schema as development progresses
**Mitigation**:
- Keep mock data in sync when updating `shared/schema.ts`
- Add validation tests comparing mock structure to Zod schemas

### No authentication in mock mode
**Risk**: Low
**Description**: Frontend-only mode bypasses authentication
**Mitigation**:
- Only use for development
- Always test with full stack before deployment

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
