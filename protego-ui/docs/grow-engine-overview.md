# Poseidon.Ai Grow Engine Intelligence Framework

## Updated Based on Current Implementation

---

## Defining Statement

The Grow engine is Poseidon's **anticipatory coordination intelligence**: it converts multi-account history plus known future obligations into a short-horizon, confidence-scored plan that answers three fundamental questions:

1. **"What will happen next?"** - Cash flow forecasting
2. **"What is the safest move now?"** - Safe-to-spend calculation
3. **"What tradeoff am I making?"** - Opportunity cost analysis

While Protect secures the present and Execute converts recommendations into actions, Grow optimizes the future by solving two problems that emerge from financial fragmentation:
- **Cash-Drag**: Money sitting idle when it could be working
- **Allocation-Blindness**: Inability to see the complete picture across institutions

---

## Regulatory Foundation

### Permissible Activities (Publisher's Exclusion)
- Cash flow forecasting
- General financial education
- Balance optimization across deposit accounts
- Fee avoidance recommendations
- Scenario modeling based on user inputs
- Aggregated benchmarking

### Prohibited Activities (RIA Territory)
- Specific securities recommendations
- Individualized investment allocation advice
- Discretionary management of assets
- Recommendations that could be construed as managing portfolios

### Terminology Discipline
Replace "portfolio optimization" with:
- Cash allocation suggestions
- Balance optimization
- Liquidity planning
- Debt cost minimization
- Goal-based saving plans

---

## Intelligence Categories

### Category 1: Predictive Liquidity Intelligence

**Currently Implemented:**

| Feature | UI Location | Data Display |
|---------|-------------|--------------|
| 7-Day Cash Flow Forecast | Forecast Cone Card | Visual with confidence band |
| Safe to Spend | Key Metrics Row | `$850` (green, after obligations) |
| Lowest Point Prediction | Key Metrics Row | `$1,247` with date (Feb 3) |
| Confidence Level | Key Metrics Row | `High` (P80 interval) |
| Danger Zone | Forecast Chart | Red band at $1,000 minimum |

**Visual Implementation:**
```
Forecast Cone = Solid cyan line (predicted) + Shaded area (80% confidence)
Current balance marker = Cyan dot with value label ($5,247)
Payday marker = Green vertical line with "$" icon
Bill due marker = Amber vertical line with bill icon
```

**Panel Talking Point:** "Chase cannot tell you that your Amex autopay will cause problems. Amex cannot tell you that your rent just cleared at Chase. Only Poseidon sees the full picture and can forecast accordingly."

---

### Category 2: Cross-Account Liquidity Coordination

**Currently Implemented:**

| Feature | UI Location | Status |
|---------|-------------|--------|
| Surplus Detection | Recommendations | "You have $4,700 in idle cash earning 0.01%" |
| Transfer Recommendation | Recommendations | "Review Transfer" action button |
| Opportunity Quantification | Recommendations | "+$212/year potential" |

**Recommendation Card Structure:**
```tsx
{
  type: "Surplus Detected",
  insight: "$4,700 idle cash",
  impact: "+$212/year potential",
  action: "Review Transfer",
  accent: "green"
}
```

**Panel Talking Point:** "This is the 'money left on the table' that aggregation alone does not surface. Poseidon identifies AND enables action with user consent."

---

### Category 3: Upcoming Obligations Intelligence

**Currently Implemented:**

| Feature | UI Location | Display |
|---------|-------------|---------|
| Bill Calendar | Upcoming Bills section | Card per bill |
| Amount with Confidence | Bill cards | Fixed amount display |
| Due Date | Bill cards | "Due Feb 1" format |
| Status Indicators | Bill badges | On Track / +40% warning |
| Bill Anomaly Detection | Electric card | Amber border + "+40%" badge |

**Bill Card Data Structure:**
```tsx
{
  merchant: "Rent",
  icon: Building,
  iconColor: "--accent-blue",
  amount: "$2,100",
  dueDate: "Feb 1",
  status: { text: "On Track", variant: "success" }
}
```

**Anomaly Visualization:**
- Normal: Standard card with green "On Track" badge
- Alert: Amber border (`border border-[#D9770640]`) + percentage badge

---

### Category 4: Subscription Portfolio Intelligence

**Currently Implemented:**

| Feature | UI Location | Display |
|---------|-------------|---------|
| Cross-Account Inventory | Subscriptions list | All subscriptions |
| Total Monthly Spend | Summary card | "$347/month" |
| YoY Trend | Summary header | "+12% YoY" (red) |
| Category Breakdown | Summary bar chart | Streaming/Software/Fitness |
| Price Change Detection | Alert banner | "Netflix increased from $15.99 to $22.99" |
| Status Badges | Subscription items | New, Price Increased, Unused |

**Subscription Item Badges:**

| Badge | Color | Background | Use Case |
|-------|-------|------------|----------|
| Price Increased | `#D97706` | `#D9770620` | Amount changed from previous |
| New | `#2563EB` | `#2563EB20` | < 3 occurrences |
| Unused | `#64748B` | `#64748B20` | No recent activity detected |

**Category Breakdown (Summary Card):**
```tsx
<div className="flex gap-0.5">
  <div style={{ width: 120 }} className="bg-[var(--indigo)]" />    // Streaming $156
  <div style={{ width: 80 }} className="bg-[var(--accent-cyan)]" /> // Software $98
  <div style={{ width: 60 }} className="bg-[var(--success)]" />     // Fitness $45
</div>
```

**Desktop Sidebar Stats:**
- Active Subscriptions: 12 (cyan)
- Price Increases: 1 (warning)
- Unused This Month: $25 (critical)
- Annual Total: $4,164 (success)

**Panel Talking Point:** "The average consumer underestimates their subscriptions by $133 per month because visibility is scattered across accounts. Poseidon provides a single, cross-account view with proactive change detection."

---

### Category 5: Risk Mitigation Intelligence

**Currently Implemented:**

| Feature | UI Location | Display |
|---------|-------------|---------|
| Overdraft Risk Warning | Recommendations | Amber accent card |
| Risk Quantification | Recommendations | "-$35 overdraft fee risk" |
| Buffer Recommendation | Recommendations | "Set Up Buffer" action |

**Risk Recommendation Card:**
```tsx
{
  type: "Overdraft Risk",
  insight: "Balance may drop below $500 on Feb 3 if rent clears early",
  impact: "-$35 overdraft fee risk",
  action: "Set Up Buffer",
  accent: "amber"
}
```

---

## Inter-Engine Integration

### Grow → Protect Data Flows

| Data | Purpose |
|------|---------|
| Forecast context | Reduce false positives by providing surplus/risk context |
| Travel patterns | Help distinguish "risky" from "novel" |
| Subscription history | Validate recurring charge authenticity |

### Grow → Execute Action Triggers

| Trigger | Action |
|---------|--------|
| Surplus detected | Queue transfer recommendation |
| Idle cash identified | Suggest HYSA optimization |
| Overdraft risk | Suggest buffer setup |

---

## Technology Implementation

### Frontend Stack

```json
{
  "framework": "Next.js 16 (App Router)",
  "react": "React 19",
  "styling": "Tailwind CSS v4",
  "icons": "Lucide React",
  "charting": "Custom SVG (Forecast Cone)"
}
```

### Data Visualization

**Forecast Cone (Current Implementation):**
```tsx
<svg viewBox="0 0 276 130" preserveAspectRatio="none">
  {/* Confidence band */}
  <path
    d="M0,55 Q70,50 138,60 T276,75 L276,95 Q207,85 138,70 Q69,55 0,55 Z"
    fill="#06B6D435"
  />
  {/* Prediction line */}
  <path
    d="M0,55 Q70,50 138,60 T276,85"
    stroke="#06B6D4"
    strokeWidth="2"
    fill="none"
  />
</svg>
```

### Recommended Backend Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Forecasting | Prophet | Time series prediction |
| Recurring Detection | Plaid Recurring API | Subscription identification |
| Probability Modeling | Monte Carlo | Confidence intervals |

---

## MVP Intelligence Set (Prototype)

### MVP Capability 1: Cross-Account 7-Day Cash Flow Forecast

**What to Show:**
- Interactive "Forecast Cone" with projected daily balances
- Confidence band (80% interval)
- Known events marked (payday, bills)
- "Danger zone" highlighting
- Safe-to-spend number

**Implementation Status:** ✓ Implemented (visual prototype)

### MVP Capability 2: Surplus Detection with Actionable Recommendation

**What to Show:**
- Current balance versus projected peak outflow
- Calculated idle cash
- Recommendation with annual value
- One-tap pathway to action

**Implementation Status:** ✓ Implemented (UI complete)

### MVP Capability 3: Subscription Portfolio with Mutation Detection

**What to Show:**
- Complete inventory across accounts
- Total monthly spend with trend
- Category breakdown
- Highlighted mutations (price changes)
- Unused subscription flags

**Implementation Status:** ✓ Implemented (full page)

---

## UX Design Principles

### The Forecast Cone
Instead of a simple line chart, display a confidence interval cone:
- Solid line: Predicted trajectory
- Shaded area: Uncertainty range (80% confidence)
- Area narrows where confidence is higher

### Evidence-First Drill-Down
Show three deterministic artifacts before GenAI explanation:
1. Feature summary (payday detected, bills detected)
2. Forecast interval (P10/P50/P90)
3. Rule conversion (buffer requirements)

### Mobile-First Layout
- Top: "Next 7 Days" forecast cone
- Middle: Risk cards (projected low balance, upcoming bills)
- Bottom: Recommendations with "Review evidence" drill-down

---

## Complete Grow Engine Intelligence Checklist

### Implemented ✓
- [x] 7-day cash flow forecast visualization
- [x] Safe-to-spend calculation display
- [x] Lowest point prediction
- [x] Confidence level indicator
- [x] Bill calendar with amounts and dates
- [x] Bill anomaly detection (visual alert)
- [x] Cross-account subscription inventory
- [x] Price change detection
- [x] Category spend breakdown
- [x] Surplus detection recommendation
- [x] Overdraft risk warning
- [x] Transfer and buffer action buttons

### Pending Implementation
- [ ] Interactive timeline scrubbing
- [ ] Real-time data via Plaid integration
- [ ] Prophet forecasting model integration
- [ ] Consent modals for actions
- [ ] Audit trail logging
- [ ] Goal-based planning features
- [ ] Comparative benchmarking
- [ ] Debt cost intelligence

---

## Summary

This framework positions Grow as:
- **Technically sophisticated** through established forecasting methods
- **Practically valuable** through immediately actionable insights
- **Regulatorily defensible** through careful boundary management
- **Distinctively differentiated** through cross-account intelligence that no single institution can replicate

The current UI implementation provides a complete visual prototype of the core Grow intelligence features, ready for demonstration and user testing.
