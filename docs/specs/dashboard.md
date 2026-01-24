# Feature: Dashboard (Command Center)

> Write in plain English. Claude will translate this to technical specs.

## What is this?
The main control panel for Poseidon.AI where users see everything at a glance. It shows the status of all three AI engines (Protect, Grow, Optimize), financial projections, security alerts, and pending optimizations. Think of it as mission control for your money.

## Who needs it and why?
- **Users** need to quickly understand their financial health without clicking through multiple pages
- **Users** need to see urgent alerts (fraud, anomalies) immediately so they can take action
- **Users** need to track pending money-saving actions and execute them easily

## What should it do?
- [ ] Show status of all three engines (Protect, Grow, Optimize) at the top
- [ ] Display a net worth projection chart showing future financial trajectory
- [ ] Show active security alerts with severity indicators (critical alerts stand out)
- [ ] List pending optimizations (money-saving actions) ready to execute
- [ ] Show recent transaction activity with risk indicators
- [ ] Auto-refresh data every 30 seconds (can be disabled)
- [ ] Allow manual refresh with a button
- [ ] Show "last updated" timestamp
- [ ] Display system status indicator (optimal, degraded, error, maintenance)

## What does the UI look like?

### Layout (top to bottom)
1. **Header**: Title "Command Center", system status dot, user avatar, refresh button
2. **Engine Grid**: Three cards side-by-side showing Protect (blue), Grow (green), Optimize (purple)
3. **Main Content Row**:
   - Large chart showing net worth projection (takes 2/3 width)
   - Stats panel showing protection score and savings (takes 1/3 width)
4. **Bottom Row**:
   - Security alerts panel (left half)
   - Pending optimizations panel (right half)
5. **Recent Activity**: Table of recent transactions

### Visual Elements
- Engine cards show: name, status (active/processing/idle), key metric, trend indicator
- Alerts show: severity badge, message, timestamp, dismiss button
- Optimizations show: title, potential savings, priority badge, execute button
- Transactions show: description, amount, date, risk indicator (if flagged)

## What data does it need?

**Inputs (from API):**
- List of engines with their current status and metrics
- List of active alerts (fraud warnings, anomalies)
- List of forecasts for the net worth chart
- List of pending optimizations/actions
- List of recent transactions

**Outputs (user actions):**
- Dismiss an alert
- Execute an optimization
- Click to view details of any item
- Toggle auto-refresh on/off
- Manual refresh

**Stored preferences:**
- Which sections are expanded/collapsed
- Auto-refresh enabled/disabled
- View mode (overview vs detailed)

## What could go wrong?

| Situation | What should happen |
|-----------|-------------------|
| API is slow or down | Show loading skeleton, then error message with retry button |
| No alerts | Show "All Clear" message with checkmark icon |
| No pending optimizations | Show "You're optimized!" message |
| Too many alerts (100+) | Show first 3, with "View All" link |
| Data is stale (>5 min) | Show warning badge on timestamp |
| Engine is offline | Show warning badge on that engine card |

## Related features
- **Depends on**: Protect Engine, Grow Engine, Optimize Engine, Transactions
- **Used by**: Landing page (links here), Navigation (always accessible)

## Notes
- This is the first page users see after logging in
- Performance is critical - should load in under 2 seconds
- Mobile responsive: stack sections vertically on small screens
- Charts should animate smoothly when data updates
- Consider accessibility: screen readers, keyboard navigation

---

## Status
- [x] Spec written
- [ ] Claude reviewed
- [x] Technical spec generated (specs/pages/dashboard.spec.ts)
- [ ] Implementation started
- [ ] Testing complete
- [ ] Deployed

## Changelog
| Date | Who | What changed |
|------|-----|--------------|
| 2025-01-22 | User | Initial plain English spec created |
