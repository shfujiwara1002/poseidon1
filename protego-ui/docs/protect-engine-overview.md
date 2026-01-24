# Poseidon.Ai Protect Engine Intelligence Framework

## Updated Based on Current Implementation

---

## Defining Statement

The Protect engine is Poseidon's **real-time security intelligence**: it monitors multi-account transaction activity to detect anomalies, fraud, and account compromise that no single institution can identify alone.

While Grow optimizes the future and Execute converts recommendations into verified actions, Protect secures the present by leveraging **cross-account visibility** to solve the coordination gap problem.

---

## Core Detection Categories

### Category 1: Personalized Transaction Anomaly Intelligence

This category uses Isolation Forest to establish and monitor individual behavioral baselines rather than population-level rules.

| Detection | Description | UI Indicator |
|-----------|-------------|--------------|
| Unfamiliar Merchant | First transaction with this merchant | "NEW" badge |
| Unusual Transaction Time | Outside user's typical hours | Time histogram |
| Atypical Amount | Exceeds percentile threshold | Amount distribution |
| Geographic Deviation | New location for user | Location marker |
| Velocity Spike | Unusual transaction frequency | Rate indicator |

**Current UI Implementation:**

The HeroAlertCard displays high-confidence anomalies with:
- Red accent bar (4px, `--critical`)
- ShieldAlert icon (32pt)
- Alert title and timestamp
- Summary text
- "Review Evidence" primary action
- "I am traveling" context mitigation

**Panel Talking Point:** "The night-shift nurse scenario demonstrates differentiation from population-level rules. Same transaction, different scores based on personalized baselines."

---

### Category 2: Cross-Account Coordination Intelligence

This category represents Poseidon's **unique competitive advantage**. These detections are impossible for any single institution to perform.

| Detection | Description | Trigger |
|-----------|-------------|---------|
| Cross-Institutional Triangulation | Conflicting location/time across accounts | Physical impossibility |
| Coordinated Multi-Account Attack | Systematic activity across linked accounts | Pattern correlation |
| Balance-Shift Risk | Suspicious movement patterns | Cross-account analysis |
| Duplicate Charges | Same merchant across payment methods | Amount/time matching |

**Hero Moment: London vs. New York Triangulation**

```
Chase Visa:      $487 at ElectroMart, London    (3:47 AM GMT)
Citi Checking:   $23.50 Uber ride, Manhattan    (10:32 PM EST)
─────────────────────────────────────────────────────────────
Time gap: 15 minutes
Distance: 3,459 miles
Required speed: > Mach 18
Result: PHYSICAL IMPOSSIBILITY DETECTED
```

**Current UI Implementation:**

```tsx
<HeroAlertCard
  title="Cross-Account Conflict Detected"
  timestamp="2 minutes ago"
  summary="Card-present purchase in London conflicts with NY activity 15 minutes earlier"
  alertId="1"
/>
```

**Panel Talking Point:** "No single bank can see both of these transactions. Chase sees the London purchase. Citi sees the Uber ride. Only Poseidon can triangulate and detect the impossibility."

---

### Category 3: Recurring Payment Integrity Intelligence

This category addresses merchant malpractice and forgotten charges.

| Detection | Description | Badge |
|-----------|-------------|-------|
| Price Mutation | Amount changed from previous | "Price Increased" (amber) |
| New Recurring Charge | Subscription with < 3 occurrences | "New" (blue) |
| Trial-to-Paid Conversion | Free trial converted to paid | Alert banner |
| Unused Subscription | No detected usage activity | "Unused" (gray) |
| Stealth Price Creep | Gradual increase over time | Trend indicator |

**Current UI Integration with Grow Engine:**

The Subscriptions page (`/grow/subscriptions`) displays:
- Price alert banner for detected changes
- Status badges on subscription items
- YoY trend comparison (+12%)

**Panel Talking Point:** "The average consumer underestimates their subscriptions by $133 per month because visibility is scattered across accounts."

---

### Category 4: Account Security Intelligence

| Detection | Description | Severity |
|-----------|-------------|----------|
| Unusual Poseidon Session | New device/location | Medium |
| Account Takeover Precursors | Password changes, email updates | High |
| Permission Changes | Consent or access modifications | Medium |
| Suspicious Device Access | Unrecognized device patterns | High |

**Integration Points:**
- Settings page for device management
- Session review workflow
- Consent audit trail

---

## Graduated Autonomy Model

### Confidence Tier Implementation

| Tier | Color | UI Intensity | Friction | Notification |
|------|-------|--------------|----------|--------------|
| Low | Blue (#2563EB) | Standard card | Single tap | In-app badge |
| Medium | Amber (#D97706) | Prominent, top of feed | Must open detail | Push notification |
| High | Red (#DC2626) | Hero card on Command Center | Review + consent | Critical push + SMS |

### Badge Variants

```typescript
const variantStyles = {
  high: {
    bg: "bg-[var(--critical-tint)]",
    dot: "bg-[var(--critical)]",
    text: "text-[var(--critical)]",
  },
  medium: {
    bg: "bg-[var(--warning-tint)]",
    dot: "bg-[var(--warning)]",
    text: "text-[var(--warning)]",
  },
  low: {
    bg: "bg-[var(--accent-blue-tint)]",
    dot: "bg-[var(--accent-blue)]",
    text: "text-[var(--accent-blue)]",
  },
  success: {
    bg: "bg-[var(--success-tint)]",
    dot: "bg-[var(--success)]",
    text: "text-[var(--success)]",
  },
};
```

---

## Four-Field Alert Structure

Every Protect alert displays four elements:

### 1. What Happened
- Transaction details
- Account identifier
- Amount and timestamp
- Merchant name and category

### 2. Why It's Risky
Grounded reason codes from model features:
- "Location: London (never seen)"
- "Time: 3:47 AM (rare for you)"
- "Amount: $487 (above typical electronics spend)"
- "Merchant: ElectroMart (first transaction)"

### 3. What Poseidon Recommends
Bounded, reversible actions:
- "Review this transaction"
- "Consider freezing this card"
- "Verify this was you"

### 4. What Happens with User's Answer
- "Your response helps improve future detection accuracy"
- Decision logged to audit trail
- Model feedback incorporated

---

## Inter-Engine Integration

### Protect → Grow Data Flows

| Data | Purpose |
|------|---------|
| Transaction authenticity | Validate forecast inputs |
| Fraud resolution status | Update account balances |
| Subscription verification | Confirm recurring charges |

### Protect → Execute Action Triggers

| Trigger | Action |
|---------|--------|
| Confirmed fraud | Queue card freeze recommendation |
| Disputed charge | Initiate dispute workflow |
| Recurring price change | Queue cancellation review |

---

## Current UI Components

### EngineCard (Protect Variant)

```typescript
const protectConfig = {
  icon: Shield,
  title: "Protect",
  iconColor: "text-[var(--accent-blue)]",
  bgColor: "bg-[var(--background)]",
  borderColor: "border-[var(--border-subtle)]",
  hoverBorder: "hover:border-[var(--accent-blue)]",
};
```

**Command Center Display:**
```tsx
<EngineCard
  variant="protect"
  metric="Threat: 0.02%"
  badgeText="Active"
  badgeVariant="success"
  href="/protect"
/>
```

### HeroAlertCard

```tsx
interface HeroAlertCardProps {
  title: string;
  timestamp: string;
  summary: string;
  alertId?: string;
}
```

**Visual Elements:**
- Red accent bar (w-1, bg-[var(--critical)])
- ShieldAlert icon (w-8 h-8)
- Title (20px semibold)
- Timestamp (13px tertiary)
- Summary (15px secondary)
- Primary button: "Review Evidence"
- Secondary action: "I am traveling"

### ActivityItem

```typescript
const iconConfig = {
  check: { Icon: CheckCircle, color: "text-[var(--success)]" },
  document: { Icon: FileText, color: "text-[var(--accent-blue)]" },
  sync: { Icon: RefreshCw, color: "text-[var(--success)]" },
};
```

**Example Usage:**
```tsx
<ActivityItem icon="check" title="Fraud check passed: Uber Eats $23.50" timestamp="5 hours ago" />
```

---

## Technology Stack

### Current Implementation

```json
{
  "framework": "Next.js 16 (App Router)",
  "react": "React 19",
  "styling": "Tailwind CSS v4",
  "icons": "Lucide React",
  "fonts": "Inter (next/font)"
}
```

### Backend Requirements (Planned)

| Component | Technology | Purpose |
|-----------|------------|---------|
| Anomaly Detection | Isolation Forest | Personalized baselines |
| Cross-Account | Custom correlation | Triangulation logic |
| Real-time | WebSocket / Socket.io | Live alerts |
| Aggregation | Plaid | Account data |

---

## MVP Detection Set for Prototype

### Priority 1: Cross-Account Triangulation
- **Visual:** Map with NYC ↔ London
- **Badge:** "Physical Impossibility Detected"
- **Differentiation:** Impossible for single institution

### Priority 2: Personalized Baseline Scoring
- **Visual:** Dual bell curve (population vs. user)
- **Scenario:** Night-shift nurse
- **Differentiation:** Reduces false positives

### Priority 3: Subscription Mutation Detection
- **Visual:** Price alert banner + item badges
- **Integration:** Grow engine subscriptions page
- **Value:** Immediate, tangible protection

---

## Implementation Status

### Completed ✓
- [x] Navigation with Protect tab (TabBar + Sidebar)
- [x] EngineCard with Protect variant
- [x] HeroAlertCard for high-confidence alerts
- [x] Badge component with all confidence tiers
- [x] ActivityItem for timeline display
- [x] Command Center integration
- [x] Blue accent color identity
- [x] Responsive layout (mobile + desktop)

### Pending Implementation
- [ ] Protect alerts feed page (`/protect`)
- [ ] Alert detail view (4-zone layout)
- [ ] Cross-account map visualization
- [ ] Risk score gauge component
- [ ] Contributing factors list
- [ ] Consent modals
- [ ] Audit trail integration
- [ ] Real-time WebSocket updates
- [ ] Plaid data integration

---

## Summary

The Protect engine framework positions Poseidon as:

1. **Technically Sophisticated** - Isolation Forest for personalization, cross-account correlation
2. **Practically Valuable** - Immediately understandable alerts and actions
3. **Distinctively Differentiated** - Cross-account intelligence no single institution can replicate

The current UI implementation provides the Command Center experience with hero alerts and engine status display. The detailed alert workflow and case management are planned for subsequent development phases.

### Key Differentiators Demonstrated

| Feature | Single Bank | Poseidon |
|---------|-------------|----------|
| London/NYC triangulation | ❌ Cannot detect | ✓ Physical impossibility |
| Night-shift baseline | ❌ Population rules | ✓ Personalized scoring |
| Cross-account patterns | ❌ Siloed view | ✓ Unified intelligence |
| Subscription oversight | ❌ Per-account only | ✓ Complete inventory |
