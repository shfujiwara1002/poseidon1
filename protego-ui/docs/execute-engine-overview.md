# Poseidon.Ai Execute Engine Intelligence Framework

## Updated Based on Current Implementation

---

## Defining Statement

Execute is Poseidon's **supervised coordination layer**: it converts approved recommendations from Protect and Grow into verified actions across financial institutions, with explicit consent, honest reversibility communication, and audit-grade traceability.

The engine operates on a simple principle: reduce the activation energy between knowing and doing. A user who sees "you could save $212/year by moving idle cash" but must then navigate three apps, remember passwords, and manually initiate transfers will rarely act. Execute collapses that friction to a single consent tap.

While Protect secures the present and Grow optimizes the future, Execute bridges the gap between insight and action.

---

## Three-Mode Execution Model

Execute acknowledges that true payment initiation APIs remain uneven in the US market. This model provides a defensible, realistic framework that demonstrates sophistication about technology realities.

| Mode | Label | Description | User Experience |
|------|-------|-------------|-----------------|
| Mode A | Guide | Step-by-step instructions within Poseidon | "We'll guide you through the steps" |
| Mode B | Orchestrate | Prepare context, user completes in bank app | "Opens [Bank Name] App" |
| Mode C | Execute | Poseidon initiates via API (future state) | "Instant Execution" |

**Panel Talking Point:** "We use graduated execution. Mode A guides, Mode B orchestrates, Mode C executes. For MVP, we operate primarily in Modes A and B, demonstrating the full workflow while being honest about API availability. Mode C expands as partnerships mature."

---

## Intelligence Categories

### Category 1: Action Eligibility and Safety Intelligence

Determines whether an action is allowed, safe, and appropriate before anything happens. This category directly supports "bank-grade governance" claims.

| Intelligence Type | Description | Output |
|-------------------|-------------|--------|
| Consent Validation | Check if user has pre-authorized action class | Allow/Require explicit consent |
| Policy Enforcement | Apply platform rules (daily limits, blocked merchants) | Allow/Block with reason |
| Reversibility Assessment | Determine if action can be undone and under what conditions | Reversibility level badge |
| Data Freshness Check | Verify aggregation data is current enough for safe execution | Proceed/Warn/Block |
| Jurisdictional Compliance | Ensure action is permitted in user's region | Allow/Block |

---

### Category 2: Action Planning and Routing Intelligence

Converts an approved intent into a concrete, minimal-friction execution plan.

| Intelligence Type | Description | Output |
|-------------------|-------------|--------|
| Channel Selection | Determine best execution path (Mode A/B/C) | Execution mode |
| Dependency Resolution | Identify prerequisite actions | Sequenced action plan |
| Rail Selection | Choose payment method (ACH, wire, internal) | Transaction type |
| Timing Optimization | Schedule for optimal settlement | Execution timestamp |
| Fallback Planning | Define alternative paths if primary fails | Backup route |

---

### Category 3: Execution Orchestration Intelligence

Actually performs or supervises execution and maintains reliability.

| Intelligence Type | Description | Output |
|-------------------|-------------|--------|
| Runbook Selection | Choose vendor-specific step sequence | Execution steps |
| Progress Tracking | Monitor execution through stages | Status updates |
| Error Detection | Identify and classify failures | Error type + recovery options |
| Idempotency Enforcement | Prevent duplicate executions | Transaction uniqueness |
| Kill Switch | Emergency halt capability | Immediate stop |

---

### Category 4: Post-Action Verification and Audit Intelligence

This is where many prototypes feel fake. Verification makes Execute feel operational and trustworthy.

| Intelligence Type | Description | Output |
|-------------------|-------------|--------|
| Outcome Verification | Confirm action completed successfully | Verified/Unverified status |
| Reconciliation | Match expected vs. actual results | Discrepancy detection |
| Audit Trail Generation | Create immutable record of all steps | Audit log entry |
| Reversal Tracking | Monitor and manage reversal requests | Reversal status |
| Value Attribution | Calculate and display benefit captured | Savings/value metric |

---

## Execute Engine Capability Families

### Family 1: Fraud and Security Response (Highest Value, Lowest Regulatory Ambiguity)

Why it wins: Ties directly to Protect hero moment; requires no money movement; highest perceived user value.

| Action | Mode | Reversibility | Description |
|--------|------|---------------|-------------|
| Card Freeze | B | Fully Reversible | Deep link to bank's freeze control |
| Dispute Initiation | A/B | Process-Dependent | Prepare evidence package, guide through dispute |
| Account Security Review | A | N/A | Guided walkthrough of security settings |
| Alert Response | A | N/A | Confirm/deny transaction authenticity |

**Current Implementation:**
- "Card Frozen: Chase Visa" completed action card
- "Fraud alert response" with Protected badge
- "View Details" drill-down link

---

### Family 2: Cross-Account Liquidity Actions (Core Differentiation)

Why it wins: Proves the "coordination layer" thesis; banks cannot recommend moving money to competitors.

| Action | Mode | Reversibility | Description |
|--------|------|---------------|-------------|
| Surplus Transfer | B/C | Fully Reversible | Move idle cash to higher-yield account |
| Buffer Setup | B | Fully Reversible | Transfer funds to prevent overdraft |
| Bill Payment | B | Limited Window | Pay bills from optimal account |

**Current Implementation:**
- "Transfer to Marcus HYSA" pending action card
- Amount display: "$4,700"
- Savings indicator: "+$280/yr"
- Source/destination: "From Chase Checking ****4521"

---

### Family 3: Subscription Management (Highly Relatable)

Why it wins: Direct tie to the $133/month underestimation statistic; easy to demo with mocked flows.

| Action | Mode | Reversibility | Description |
|--------|------|---------------|-------------|
| Subscription Cancellation | A | Re-subscribe Available | Guided or concierge cancellation |
| Plan Downgrade | A/B | Upgrade Available | Switch to lower-cost tier |
| Price Negotiation | A | N/A | Guided request for better rate |

**Current Implementation:**
- "Cancel Hulu Subscription" in-progress action
- Progress indicator: "Contacting Hulu..." (Step 2/5)
- Savings display: "Save $216/yr"
- Monthly amount: "$17.99/mo"

---

### Family 4: Fee Avoidance and Payment Timing

Language discipline: Frame as "guided request" with outcome tracking, not guaranteed savings. Avoid UDAAP concerns.

| Action | Mode | Reversibility | Description |
|--------|------|---------------|-------------|
| Fee Refund Request | A | N/A | Guided request to bank |
| Payment Timing | B | Adjustable | Optimize bill payment date |
| Overdraft Prevention | B | Reversible | Proactive balance adjustment |

---

### Family 5: Account Optimization

| Action | Mode | Reversibility | Description |
|--------|------|---------------|-------------|
| Account Setup | A/B | Closeable | Guide new account opening |
| Consolidation | A | Reversible | Combine scattered balances |
| Autopay Setup | B | Cancellable | Configure recurring payments |

---

## Governance Framework

### Consent Architecture (Four Tiers)

| Tier | Actions | Consent Type | Example |
|------|---------|--------------|---------|
| Tier 1 | View-only, educational | Implicit (usage = consent) | View recommendation details |
| Tier 2 | Low-risk, easily reversible | Tap-to-confirm | Freeze/unfreeze card |
| Tier 3 | Financial movement, limited reversibility | Explicit consent + biometric | Fund transfers |
| Tier 4 | High-risk, irreversible | Multi-factor + cooling period | Account closure |

---

### Reversibility Framework (Four Levels)

| Level | Badge Color | Description | UI Treatment |
|-------|-------------|-------------|--------------|
| Fully Reversible | Green (#059669) | Can undo anytime, no fees | Green badge + RotateCw icon |
| Time-Limited | Amber (#D97706) | Reversible within window | Amber badge + clock icon |
| Process-Dependent | Blue (#2563EB) | Requires separate process | Blue badge + info icon |
| Irreversible | Red (#DC2626) | Cannot be undone | Red badge + warning icon |

**Critical point:** Never promise universal reversibility. Be explicit about what can and cannot be undone.

---

### Audit Trail Requirements

Every executed action generates an immutable audit record containing:

- **Trigger source:** Which engine (Protect/Grow) and intelligence type initiated the recommendation
- **User consent:** Timestamp, device, authentication method, exact consent language displayed
- **Execution steps:** API calls made, responses received, intermediate states
- **Outcome:** Success/failure status, confirmation details, error messages
- **Reversal status:** Whether reversal is available, deadline if time-limited, reversal actions taken

---

## Inter-Engine Integration

### Protect → Execute Flows

| Trigger | Action | Mode |
|---------|--------|------|
| Confirmed fraud | Card freeze recommendation | B |
| Disputed charge | Dispute workflow initiation | A/B |
| Suspicious activity | Account security review | A |
| Recurring price change | Cancellation review | A |

### Grow → Execute Flows

| Trigger | Action | Mode |
|---------|--------|------|
| Surplus detected | Transfer recommendation | B/C |
| Idle cash identified | HYSA optimization | B |
| Overdraft risk | Buffer setup | B |
| Unused subscription | Cancellation workflow | A |

---

## Current UI Components

### Action Queue Screen

The Action Queue is the central hub for managing all Execute activities.

**Header:**
- Title: "Action Queue" (24pt semibold)
- Subtitle: "3 Awaiting · 1 In Progress · 12 Completed"
- Filter button (SlidersHorizontal icon)

**Sections:**
1. Awaiting Approval - Actions pending user consent
2. In Progress - Actions currently executing
3. Completed Today - Recently finished actions

### ActionCard Component

```typescript
type ActionStatus = "pending" | "in_progress" | "completed";

interface ActionCardProps {
  status: ActionStatus;
  title: string;
  subtitle: string;
  amount?: string;
  amountSubtext?: string;
  savingsText?: string;
  isReversible?: boolean;
  progressText?: string;
  progressStep?: string;
  timestamp?: string;
  accentColor?: "blue" | "cyan" | "green";
  onApprove?: () => void;
  onDismiss?: () => void;
  onViewDetails?: () => void;
}
```

**Visual Elements:**
- Left accent bar (4px, colored by status)
- Status-specific icons (pending: none, in_progress: pulse dot, completed: checkmark)
- Primary action button: "Review & Approve" (cyan)
- Secondary action: "Dismiss" (gray)
- Reversibility badge with RotateCw icon

### EngineCard (Execute Variant)

```typescript
const executeConfig = {
  icon: Zap,
  title: "Execute",
  iconColor: "text-[var(--accent-cyan)]",
  bgColor: "bg-[#0A1A1F]",
  borderColor: "border-[#164E63]",
  hoverBorder: "hover:border-[var(--accent-cyan)]",
};
```

**Command Center Display:**
```tsx
<EngineCard
  variant="execute"
  metric="3 Awaiting · 1 In Progress"
  badgeText="Active"
  badgeVariant="cyan"
  href="/execute"
/>
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
  "fonts": "Inter, JetBrains Mono (monospace)"
}
```

### Key Data Objects

```typescript
interface ActionPacket {
  id: string;
  type: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  sourceAccount?: string;
  destinationAccount?: string;
  amount?: number;
  timing: string;
  reversibilityLevel: "full" | "time_limited" | "process_dependent" | "irreversible";
  consentText: string;
  createdAt: string;
  updatedAt: string;
}

interface ConsentRecord {
  actionId: string;
  timestamp: string;
  authMethod: "face_id" | "touch_id" | "passcode";
  deviceId: string;
  location?: string;
  consentTextVersion: string;
  biometricVerified: boolean;
}

interface AuditEvent {
  actionId: string;
  timestamp: string;
  eventType: string;
  description: string;
  technicalDetail?: string;
}
```

---

## MVP Prototype Capabilities (March 2026)

### MVP Demo 1: Fraud Response Execution

**Scenario:** Protect detects cross-account conflict (London/NYC impossibility). User confirms fraud.

**What to Show:**
- Alert detail from Protect with evidence
- "This was NOT me" initiates action sheet
- Action options: Freeze Card, Start Dispute, Secure Account
- Selecting "Freeze Card" shows consent modal with reversibility note
- Deep link launches Chase app to card controls (Mode B)
- Audit log entry created immediately

**Why it wins:** Highest perceived value, lowest regulatory ambiguity, ties directly to Protect hero moment.

### MVP Demo 2: Cross-Account Transfer Execution

**Scenario:** Grow identifies $4,700 surplus in Chase checking earning 0.01%. Recommendation to transfer to Marcus HYSA at 4.25%.

**What to Show:**
- Recommendation card from Grow with calculated annual benefit ($200)
- "Review Transfer" shows deterministic calculation and constraints
- User approves via consent modal (amount, source, destination, timing, reversibility)
- Poseidon generates step-by-step handoff to bank app (Mode B)
- Verification screen: "Awaiting confirmation" → "Confirmed"
- Audit record viewable

### MVP Demo 3: Subscription Cancellation Workflow

**Scenario:** Grow identifies unused Hulu subscription ($17.99/month, no activity in 90 days).

**What to Show:**
- Subscription portfolio from Grow with "Unused" flag
- "Cancel Subscription" initiates workflow
- Cancellation method selection: "Cancel myself" vs. "Cancel for me"
- Progress tracking: "Pending" → "Confirmed"
- Savings captured: "$216/year"

---

## Implementation Status

### Completed ✓
- [x] Execute tab in TabBar navigation
- [x] Execute in AppLayout sidebar
- [x] EngineCard with Execute variant
- [x] ActionCard component (pending/in_progress/completed states)
- [x] Action Queue page (`/execute`)
- [x] Awaiting Approval section with action cards
- [x] In Progress section with progress indicator
- [x] Completed Today section
- [x] Execute Insights sidebar stats
- [x] Automation Level settings card
- [x] Recent Savings list
- [x] Reversibility badges
- [x] Cyan accent color identity

### Pending Implementation
- [ ] Consent modal with biometric authentication
- [ ] Action Preview screen (full layout)
- [ ] Execution Progress screen (step timeline)
- [ ] Verification/Completion screen
- [ ] Mode B handoff screen
- [ ] Subscription cancellation guided flow
- [ ] Fraud response action sheet
- [ ] Action History screen with audit trail
- [ ] Kill Switch interface
- [ ] Real-time status updates
- [ ] Deep linking to banking apps

---

## Panel Talking Points

**On differentiation:** "Mint shows you the problem. Poseidon solves it. When we detect idle cash, we don't just tell you, we move it. When we spot fraud, we don't just alert you, we initiate the dispute. The activation energy between knowing and doing drops to a single tap."

**On governance:** "Execute operates under a strict consent architecture. No action executes without explicit user approval. Every action is logged. Reversibility is honestly communicated. We are an instruction executor, not a discretionary manager."

**On technical realism:** "We use graduated execution. Mode A guides, Mode B orchestrates, Mode C executes. For MVP, we operate primarily in Modes A and B. Mode C expands as partnerships mature. We don't overpromise on API availability."

**On competitive moat:** "Banks cannot recommend moving money to competitors. Aggregators like Plaid are infrastructure, not consumer-facing. Our differentiation is the trust architecture combined with cross-institutional execution capability. That operational complexity is our moat."

---

## Summary

The Execute engine framework positions Poseidon as:

1. **Technically Sophisticated** - Three-mode execution model, comprehensive governance
2. **Practically Valuable** - Single-tap action completion with clear feedback
3. **Regulatorily Defensible** - Explicit consent, audit trails, honest reversibility
4. **Distinctively Differentiated** - Cross-institutional execution no single bank can offer

The current UI implementation provides the Action Queue experience with pending, in-progress, and completed action states. The detailed action flows and governance modals are planned for subsequent development phases.

### Key Differentiators Demonstrated

| Feature | Single Bank | Poseidon |
|---------|-------------|----------|
| Cross-account transfers | ❌ Cannot recommend | ✓ Surplus detection + execution |
| Fraud response | ❌ Single account only | ✓ Coordinated multi-account |
| Subscription management | ❌ Per-account view | ✓ Complete portfolio + cancellation |
| Audit trail | ❌ Hidden in statements | ✓ Transparent, exportable |
