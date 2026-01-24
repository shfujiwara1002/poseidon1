# Poseidon.Ai Execute Engine: Mobile UI/UX Design Specification

## Design Philosophy: Supervised Action Intelligence

The Execute engine occupies a unique position in the Poseidon architecture. Unlike Protect (which demands attention for threats) or Grow (which invites exploration of opportunities), Execute requires a fundamentally different interaction paradigm: high-trust, low-friction action completion with transparent governance.

The design challenge is reconciling two competing needs:
- Users want actions to feel effortless, requiring minimal taps to complete what previously required navigating multiple banking apps
- The regulatory and trust environment demands visible consent, explicit reversibility communication, and auditable trails

**Solution: Progressive Disclosure with Governance Layers** - Actions feel simple on the surface, but evidence, constraints, and audit trails are always one tap away.

**Primary UX Goal:** Convert approved recommendations into completed actions in under 30 seconds while maintaining full auditability and user confidence.

---

## Part 1: Information Architecture for Execute

### Navigation Integration

Execute is accessible through three pathways, each reflecting a different user intent:

**Pathway 1: Action Cards on Command Center (Home Tab)**
- Recommendations from Protect and Grow appear as actionable cards
- Tapping "Execute" on any card initiates the Execute flow
- This is the primary discovery path

**Pathway 2: Dedicated Action Queue**
- Execute tab in bottom TabBar (mobile) and sidebar (desktop)
- Provides access to all pending, in-progress, and completed actions
- Serves users who want to manage multiple actions or review history

**Pathway 3: Contextual Execution from Engine Screens**
- Within Protect alert details or Grow recommendation screens
- "Take Action" buttons initiate Execute flows directly
- Maintains context and reduces navigation friction

### Execute Flow Architecture

Every Execute flow follows a consistent five-stage architecture:

| Stage | Description | Purpose |
|-------|-------------|---------|
| 1. Action Preview | What will happen, with key details | Inform user |
| 2. Evidence Review | Why this action is recommended (optional drill-down) | Build confidence |
| 3. Consent Capture | Explicit authorization with reversibility disclosure | Governance compliance |
| 4. Execution Progress | Real-time status during action completion | Transparency |
| 5. Verification and Audit | Confirmation with audit trail access | Trust and records |

---

## Part 2: Visual Design System Extensions for Execute

### Execute-Specific Color Semantics

Building on the established Poseidon color palette:

| State | Color | Hex | Usage |
|-------|-------|-----|-------|
| Awaiting | Cyan | #06B6D4 | Pending approval actions |
| In Progress | Blue | #2563EB | Active execution |
| Completed | Green | #059669 | Successfully finished |
| Failed | Red | #DC2626 | Error state |

### Mode Indicators

| Mode | Visual Treatment | Icon | Label |
|------|-----------------|------|-------|
| Mode A (Guide) | Dashed border | Compass | "Guided Steps" |
| Mode B (Orchestrate) | Solid border | Handoff | "Opens [Bank Name]" |
| Mode C (Execute) | Filled background | Zap | "Instant Execution" |

### Reversibility Badges

| Level | Color | Icon | Text |
|-------|-------|------|------|
| Fully Reversible | Green (#059669) | RotateCw | "Reversible" |
| Time-Limited | Amber (#D97706) | Clock | "24hr window" |
| Process-Dependent | Blue (#2563EB) | Info | "Contact required" |
| Irreversible | Red (#DC2626) | AlertTriangle | "Cannot undo" |

---

## Part 3: Action Queue Interface

### Current Implementation

The Action Queue is the central hub for managing all Execute activities.

**Queue Header:**
```tsx
<div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8">
  <div className="flex flex-col gap-0.5">
    <span className="text-xl lg:text-2xl font-semibold">Action Queue</span>
    <span className="text-[12px] font-mono text-[var(--text-tertiary)]">
      3 Awaiting · 1 In Progress · 12 Completed
    </span>
  </div>
  <div className="flex items-center gap-2">
    <button className="w-10 h-10 rounded-lg bg-[var(--surface)]">
      <SlidersHorizontal className="w-5 h-5 text-[var(--text-secondary)]" />
    </button>
  </div>
</div>
```

### Action Card Design

Each action in the queue appears as a card with consistent structure:

**Card Container:**
- Full width minus 32pt margin
- 16pt corner radius
- Surface background
- 4pt left accent bar (colored by status)

**Content Layout:**

```
┌─────────────────────────────────────────────────────┐
│▌ Title                                    [Savings] │
│▌ Subtitle                                           │
│▌                                                    │
│▌ $Amount                                            │
│▌ Source/Destination info                            │
│▌                                                    │
│▌ Timestamp                                          │
│▌ ↻ Reversible                                       │
│▌                                                    │
│▌ [Review & Approve →]    [Dismiss]                  │
└─────────────────────────────────────────────────────┘
```

### Status-Specific Variations

**Awaiting Approval:**
- Blue/Cyan left accent
- Primary button: "Review & Approve" (cyan filled)
- Secondary button: "Dismiss" (gray filled)
- Reversibility badge visible

**In Progress:**
- Cyan left accent
- Animated pulse dot next to title
- Progress bar with step indicator
- Status text: "Contacting Hulu..." or similar

**Completed:**
- Green left accent
- Green checkmark icon (32pt)
- "Protected" or "Completed" badge
- "View Details" link
- Timestamp of completion

### Queue Interactions

**Swipe Actions:**
- Swipe right on Awaiting card: Quick approve (triggers consent modal)
- Swipe left on Awaiting card: Dismiss with reason selection
- Long press: Reveal additional options (Schedule, Edit, Archive)

**Empty State:**
"All caught up! New recommendations will appear here when opportunities arise."

---

## Part 4: Action Preview Screen

When a user taps an action card or "Take Action" button, the Action Preview screen provides comprehensive context.

### Screen Structure

**Hero Section (0-200pt):**
- Gradient background: `linear-gradient(180deg, #0A1628 0%, #1E293B 100%)`
- Action Icon: 48pt
- Action Title: 24pt SF Pro Display Bold, white
- Primary Amount: 34pt SF Pro Display Bold, white
- Execution Mode Badge

**Account Flow Visualization (200-320pt):**
```
┌──────────────┐        →        ┌──────────────┐
│ [Bank Logo]  │    $4,700       │ [Bank Logo]  │
│ Chase        │  ─────────────→ │ Marcus       │
│ Checking     │                 │ HYSA         │
│ ****4521     │                 │ ****8890     │
│ Bal: $15,247 │                 │ 4.25% APY    │
└──────────────┘                 └──────────────┘
```

**Benefit Summary Section (320-420pt):**
- Background: Light green tint (#ECFDF5)
- Headline: "Why This Matters"
- Benefit Statement with calculation
- Evidence link: "How we calculated this"

**Timing and Constraints Section (420-520pt):**
- Timing Row: Calendar icon, scheduled date
- Settlement Row: Clock icon, arrival time
- Constraint Row (if applicable): Info icon, limit warnings

**Reversibility Section (520-580pt):**
- Left accent bar colored by reversibility level
- Icon and badge
- Explanation text
- Time limit if applicable

**Primary Action Button (Fixed at Bottom):**
- Full width minus 32pt margin, 56pt height
- Blue filled (#2563EB), white text
- "Approve Transfer" with right arrow icon
- Secondary: "Not Now" or "Remind Me Later"

---

## Part 5: Consent Modal

The Consent Modal is the critical governance moment.

### Modal Presentation

- Bottom sheet rising to ~70% of screen height
- 24pt corner radius at top
- Semi-transparent overlay (#0A1628 at 60% opacity)
- Swipe down to dismiss

### Modal Structure

**Header Section (0-80pt):**
```tsx
<div className="flex flex-col items-center gap-2">
  <div className="w-10 h-1 rounded-full bg-[var(--border-subtle)]" />
  <span className="text-[20px] font-semibold">Confirm Transfer</span>
  <span className="text-[15px] text-[var(--text-tertiary)]">
    Review and authorize this action
  </span>
</div>
```

**Summary Section (80-200pt):**
- Condensed account flow visualization
- Key details list:
  - Amount: $4,700.00
  - From: Chase Checking ****4521
  - To: Marcus HYSA ****8890
  - When: Thursday, January 30, 2026
  - Arrival: End of day (Same-Day ACH)

**Authorization Statement (200-280pt):**
- Light gray background (#F8FAFC)
- Legal text at 15pt
- Explicit consent language

**Biometric Authentication Section (340-400pt):**
- Face ID or Touch ID icon (48pt)
- "Authenticate to authorize" text
- "Use Passcode" fallback link

**Action Buttons (400-480pt):**
- Primary: Green filled (#059669), "Authorize Transfer", checkmark icon
- Cancel: Gray outline, "Cancel" text

---

## Part 6: Execution Progress Screen

### Screen Layout

**Progress Visualization:**
- Circular Progress Indicator: 120pt diameter, centered
- Animated blue arc filling clockwise
- Percentage in center
- Status text below

**Step Timeline:**
```
✓ Authorization captured         10:32:15 AM
✓ Transfer initiated            10:32:17 AM
● Awaiting confirmation         In progress...
○ Verification complete
○ Audit record finalized
```

**Live Status Feed (Optional):**
- Scrollable log of real-time events
- Timestamp in monospace font
- Demonstrates "bank-grade" technical depth

### Mode B Handoff Screen

For Mode B actions:
- Large institution logo (80pt)
- "Complete in Goldman Sachs App"
- Checklist of what's prepared
- Primary button: "Open Goldman Sachs App"
- Secondary: "I'll do this later"

---

## Part 7: Verification and Completion Screen

### Success State

**Hero Section:**
- Gradient from #059669 to #047857 (green)
- Large animated checkmark (80pt)
- "Transfer Complete" at 24pt
- "$4,700.00 transferred"

**Verification Details Card:**
- Verification source
- Confirmation ID (monospace)
- Timestamp
- Settlement status

**Value Captured Section:**
- "Nice work!" headline
- Value statement: "This transfer will earn you approximately $200 more per year."
- Running total if applicable

**Audit Trail Access:**
Expandable section showing:
- Trigger source
- Authorization details
- Execution method
- Verification confirmation

---

## Part 8: Subscription Cancellation Flow

### Cancellation Preview Screen

**Subscription Info:**
- Merchant logo (48pt)
- Subscription name at 24pt
- Monthly amount at 20pt
- Detection reason badge

**Method Selection:**
```
┌─────────────────────────────────────────┐
│ ○ Cancel Myself                         │
│   We'll guide you through the steps     │
│   ~5 minutes                            │
├─────────────────────────────────────────┤
│ ○ Cancel For Me                         │
│   Our team handles everything           │
│   24-48 hours                           │
└─────────────────────────────────────────┘
```

### Guided Cancellation Flow (Mode A)

**Step-by-Step Interface:**
- Progress bar (segmented)
- Step number and title
- Instruction text
- Visual aid (screenshot/illustration)
- "Open [App]" or "Mark Complete" button
- Navigation: Previous / Next

---

## Part 9: Fraud Response Execution Flow

### Alert-to-Action Transition

From Protect alert detail, "This was NOT me" triggers action sheet.

### Fraud Action Sheet

- Dark background (#0A1628)
- "Protect Your Accounts" header
- Shield icon

**Action Cards:**

| Action | Priority | Mode | Description |
|--------|----------|------|-------------|
| Freeze Card | Highest | B | "Prevents further unauthorized charges" |
| Start Dispute | High | A/B | "We've prepared your evidence package" |
| Secure Accounts | Medium | A | "Check connected devices and sessions" |

### Dispute Initiation Flow

**Evidence Package Screen:**
- Transaction Details Card
- Cross-Account Conflict Card (the differentiator)
- Your Statement Card (editable)

**Submission Options:**
- "Submit via Chase App" (Mode B)
- "Generate Dispute Letter" (Mode A)

---

## Part 10: Action History and Audit Interface

### Action History List Screen

**Filter Bar:**
- All Actions
- Transfers
- Cancellations
- Security
- Date Range

**History List Items:**
- Same card design as Action Queue
- Completion-focused information
- "View Audit Trail" link

### Action Detail Screen (Audit View)

**Audit Trail Timeline:**
```
Jan 30, 2026 10:32:12 AM
Pre-flight checks initiated
Data freshness: 2 minutes | Risk score: Low

Jan 30, 2026 10:32:14 AM
Consent modal displayed
Authorization text version: v2.4

Jan 30, 2026 10:32:15 AM
User authorized via Face ID
Device: iPhone 15 Pro | Location: Eastchester, NY
```

**Export Section:**
- PDF Export
- JSON Export
- Share via iOS share sheet

---

## Part 11: Kill Switch and Emergency Controls

### Kill Switch Access

- Prominent button in Action Queue header when actions in progress
- Settings > Security > Emergency Controls
- Haptic shortcut: Triple-tap on Execute screen header

### Kill Switch Interface

**Confirmation Modal:**
- Red-tinted modal with stop sign icon
- "Stop All Pending Actions?"
- List of actions that will be stopped
- Warning about already-submitted transfers
- "Stop Everything" (red) / "Cancel" (gray)

---

## Part 12: Notifications for Execute

### Notification Types

| Type | Priority | Sound | Badge |
|------|----------|-------|-------|
| Action Required | High | Default | Yes |
| Action Completed | Medium | Success | No |
| Action Failed | High | Alert | Yes |
| Verification Needed | High | Default | Yes |

### Notification Content

**Action Completed:**
- Title: "Transfer Complete"
- Body: "$4,700 transferred to Marcus HYSA. Tap to view details."

**Action Failed:**
- Title: "Transfer Could Not Complete"
- Body: "Your transfer to Marcus HYSA failed. Tap to retry or get help."

---

## Part 13: Error States and Edge Cases

### Data Freshness Warning

- Amber banner at top of Action Preview
- Clock with exclamation icon
- "Account data is 6 hours old. Verify current balance before proceeding."
- "Refresh Data" button

### Institution Unavailable

- Modal overlay
- Cloud with X icon
- "Goldman Sachs is temporarily unavailable"
- "Try Again" / "Remind Me in 1 Hour" / "Switch to Guided Steps"

### Insufficient Funds Detected

- Red banner on Action Preview
- Wallet with exclamation icon
- "Available balance ($4,200) is less than transfer amount ($4,700)"
- "Adjust Amount" button

---

## Part 14: Accessibility Considerations

### VoiceOver Support

- All Execute screens must have comprehensive VoiceOver labels
- Action Cards: "[Action type]. [Amount]. [Status]. [Reversibility]. Double tap to review."
- Progress Indicators: Dynamic announcements

### Dynamic Type

- All text scales with system settings
- Minimum touch targets: 44pt
- Layout reflows for larger text sizes

### Reduced Motion

- Replace animations with instant state changes
- Progress uses static percentage
- Success/failure uses icon swap

### Color Blind Support

- Never rely on color alone
- All status colors paired with distinct icons
- Reversibility uses both color and icon

---

## Part 15: Current Implementation Status

### Implemented ✓

- [x] Action Queue Screen with three sections
- [x] ActionCard component (pending/in_progress/completed)
- [x] Execute tab in TabBar
- [x] Execute in AppLayout sidebar
- [x] EngineCard Execute variant
- [x] Reversibility badges
- [x] Execute Insights sidebar
- [x] Automation Level settings card
- [x] Recent Savings list

### Pending Implementation (Demo Priority Order)

**Must Have:**
- [ ] Action Preview Screen (full layout)
- [ ] Consent Modal with biometric UI
- [ ] Execution Progress Screen with timeline
- [ ] Verification/Completion Screen (success state)
- [ ] Mode B Handoff Screen

**Should Have:**
- [ ] Subscription Cancellation Flow (guided steps)
- [ ] Fraud Response Action Sheet
- [ ] Action History Screen with audit trail
- [ ] Error States (institution unavailable, data freshness)

**Nice to Have:**
- [ ] Kill Switch Interface
- [ ] Notification Mockups
- [ ] Reversal Flow from History

---

## Summary: Execute Engine UI/UX Principles

The Execute engine UI succeeds when it achieves:

1. **Friction-Appropriate Trust:** Simple actions feel effortless (minimal taps), while high-impact actions include visible safeguards (biometric auth, explicit consent, reversibility disclosure).

2. **Mode Transparency:** Users always know whether Poseidon is guiding, orchestrating, or executing directly. Mode badges and handoff screens make this explicit.

3. **Verifiable Governance:** Audit trails are not hidden in settings but prominently accessible from completion screens. Users can prove what they authorized.

4. **Graceful Degradation:** When APIs fail, institutions are unavailable, or data is stale, the UI communicates clearly and offers alternatives rather than blocking users.

5. **Calm Urgency:** Even in fraud response scenarios, the interface feels controlled and competent rather than panicked. Users should feel empowered, not overwhelmed.

This design framework positions the Execute engine prototype as technically sophisticated through its handling of multi-step workflows and handoffs, practically usable through clear information hierarchy and minimal friction, and distinctively differentiated through visible governance that no consumer finance app currently delivers at this level of transparency.
