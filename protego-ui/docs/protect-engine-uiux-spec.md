# Poseidon.Ai Protect Engine UI/UX Design Specification

## Updated Based on Current Implementation

---

## Part 1: Design Philosophy

### The "Transparent Intelligence" Paradigm

Poseidon.Ai cannot adopt neo-bank minimalism because its differentiation depends on exposing the evidence that justifies its recommendations. The solution is **Transparent Intelligence**: a Command Center aesthetic that visualizes the *why* before requesting the *what*.

Users should feel like pilots, not passengers.

**Primary UX Goal:** Convert a potentially alarming event (possible fraud) into a calm, auditable, user-approved resolution in under 20 seconds.

### Non-Negotiable Design Principles

1. **Graduated Autonomy** - Low, medium, and high confidence alerts produce different UI intensity and friction levels
2. **Evidence-First, Narrative-Second** - Deterministic model outputs appear before GenAI explanations
3. **Consent and Reversibility Are Visible** - Every action includes explicit consent language
4. **Cross-Account Is the Hero** - The interface makes clear that single institutions cannot see what Poseidon sees

---

## Part 2: Information Architecture

### Mobile Navigation (TabBar)

```typescript
const tabs = [
  { icon: LayoutDashboard, label: "Home", href: "/", activeColor: "text-[var(--accent-blue)]" },
  { icon: Shield, label: "Protect", href: "/protect", activeColor: "text-[var(--accent-blue)]" },
  { icon: TrendingUp, label: "Grow", href: "/grow", activeColor: "text-[var(--accent-cyan)]" },
  { icon: Settings, label: "Settings", href: "/settings", activeColor: "text-[var(--text-tertiary)]" },
];
```

### Desktop Navigation (Sidebar)

```typescript
const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Home", href: "/", activeColor: "text-[var(--accent-blue)]" },
  { icon: Shield, label: "Protect", href: "/protect", activeColor: "text-[var(--accent-blue)]" },
  { icon: TrendingUp, label: "Grow", href: "/grow", activeColor: "text-[var(--accent-cyan)]" },
  { icon: ScrollText, label: "Audit", href: "/audit", activeColor: "text-[var(--accent-blue)]" },
  { icon: Settings, label: "Settings", href: "/settings", activeColor: "text-[var(--accent-blue)]" },
];
```

---

## Part 3: Visual Design System

### Color Palette

#### CSS Custom Properties

```css
:root {
  /* Primary Accents */
  --accent-blue: #2563EB;           /* Protect engine primary */
  --accent-blue-light: #3B82F6;
  --accent-blue-tint: #2563EB20;
  --accent-cyan: #06B6D4;           /* Grow engine primary */

  /* Backgrounds */
  --background: #0A1628;
  --background-secondary: #0F172A;
  --surface: #1E293B;
  --surface-elevated: #334155;

  /* Semantic Colors */
  --success: #059669;
  --success-tint: #05966920;
  --warning: #D97706;
  --warning-tint: #D9770620;
  --critical: #DC2626;
  --critical-tint: #DC262620;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;

  /* Border Radius */
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
}
```

### Protect Engine Color Identity

The Protect engine uses **blue (#2563EB)** as its primary accent color:

- Engine card border: `--border-subtle` (#1E293B)
- Engine card background: `--background` (#0A1628)
- Hover state: `hover:border-[var(--accent-blue)]`
- Alert accent bar: Critical red (#DC2626) for high-confidence alerts

### Confidence Tier Colors

| Tier | Accent Color | Background Tint | Use Case |
|------|--------------|-----------------|----------|
| High | `#DC2626` (Critical) | `#DC262620` | Fraud likely |
| Medium | `#D97706` (Warning) | `#D9770620` | Review recommended |
| Low | `#2563EB` (Blue) | `#2563EB20` | Confirmation requested |

---

## Part 4: Command Center (Home Screen)

### Currently Implemented Components

#### Status Header

```tsx
<div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8">
  <div className="flex items-center gap-2">
    <span className="text-xl lg:text-2xl font-bold text-[var(--text-primary)]">
      Poseidon.Ai
    </span>
  </div>
  <div className="flex items-center gap-3">
    {/* Desktop: Status badge */}
    <div className="hidden lg:flex">
      <Badge variant="success">All Systems Active</Badge>
    </div>
    {/* Mobile: Status ring */}
    <div className="flex lg:hidden items-center gap-1">
      <div className="w-7 h-7 rounded-full border-[3px] border-[var(--success)]" />
      <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
    </div>
  </div>
</div>
```

#### Hero Alert Card (HeroAlertCard Component)

```tsx
interface HeroAlertCardProps {
  title: string;
  timestamp: string;
  summary: string;
  alertId?: string;
}
```

**Visual Structure:**
```
┌──────────────────────────────────────┐
│█ ┌──────────────────────────────────┐│
│█ │ 🛡️ Cross-Account Conflict Detected││
│█ │    2 minutes ago                 ││
│█ ├──────────────────────────────────┤│
│█ │ Card-present purchase in London  ││
│█ │ conflicts with NY activity       ││
│█ │ 15 minutes earlier               ││
│█ ├──────────────────────────────────┤│
│█ │ [    Review Evidence    ]        ││
│█ │      I am traveling              ││
│█ └──────────────────────────────────┘│
└──────────────────────────────────────┘
  │
  └── Red accent bar (4px, --critical)
```

**Implementation:**
```tsx
<div className="flex w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--background)] to-[var(--surface)]">
  {/* Red accent bar */}
  <div className="w-1 bg-[var(--critical)] rounded-l-2xl" />

  <div className="flex flex-col gap-4 p-5 flex-1">
    {/* Header with icon and title */}
    <div className="flex items-center gap-3">
      <ShieldAlert className="w-8 h-8 text-[var(--text-primary)]" />
      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold">{title}</span>
        <span className="text-[13px] text-[var(--text-tertiary)]">{timestamp}</span>
      </div>
    </div>

    {/* Summary */}
    <p className="text-[15px] text-[var(--text-secondary)]">{summary}</p>

    {/* Actions */}
    <div className="flex flex-col gap-3">
      <Link href={`/alert/${alertId}`}>
        <Button variant="primary">Review Evidence</Button>
      </Link>
      <button className="text-[14px] text-[var(--text-secondary)]">
        I am traveling
      </button>
    </div>
  </div>
</div>
```

#### Engine Status Cards (EngineCard Component)

```typescript
const variantConfig = {
  protect: {
    icon: Shield,
    title: "Protect",
    iconColor: "text-[var(--accent-blue)]",
    bgColor: "bg-[var(--background)]",
    borderColor: "border-[var(--border-subtle)]",
    hoverBorder: "hover:border-[var(--accent-blue)]",
  },
  grow: {
    icon: TrendingUp,
    title: "Grow",
    iconColor: "text-[var(--accent-cyan)]",
    bgColor: "bg-[#0A1A1F]",
    borderColor: "border-[#164E63]",
    hoverBorder: "hover:border-[var(--accent-cyan)]",
  },
};
```

**Command Center Display:**
```tsx
<div className="flex gap-3">
  <EngineCard
    variant="protect"
    metric="Threat: 0.02%"
    badgeText="Active"
    badgeVariant="success"
    href="/protect"
  />
  <EngineCard
    variant="grow"
    metric="Safe: $850 · 7-day forecast"
    badgeText="Active"
    badgeVariant="cyan"
    href="/grow"
  />
</div>
```

#### Recent Activity Timeline (ActivityItem Component)

```typescript
type ActivityIconType = "check" | "document" | "sync";

const iconConfig = {
  check: { Icon: CheckCircle, color: "text-[var(--success)]" },
  document: { Icon: FileText, color: "text-[var(--accent-blue)]" },
  sync: { Icon: RefreshCw, color: "text-[var(--success)]" },
};
```

**Example Items:**
```tsx
<ActivityItem icon="check" title="Fraud check passed: Uber Eats $23.50" timestamp="5 hours ago" />
<ActivityItem icon="document" title="Monthly report ready" timestamp="1 day ago" />
<ActivityItem icon="sync" title="Chase account synced" timestamp="2 hours ago" />
```

---

## Part 5: Badge Component System

```typescript
type BadgeVariant = "high" | "medium" | "low" | "success" | "cyan";

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
  cyan: {
    bg: "bg-[var(--accent-cyan-light)]",
    dot: "bg-[var(--accent-cyan)]",
    text: "text-[var(--accent-cyan)]",
  },
};
```

**Dimensions:**
- Height: 24px
- Padding: 10px horizontal
- Border radius: 100% (pill)
- Dot size: 6x6px

---

## Part 6: Layout System

### AppLayout Component

```tsx
export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[var(--background)]">
      {/* Desktop Sidebar */}
      {!hideNav && (
        <div className="hidden lg:flex flex-col items-center gap-8 w-[72px] h-full bg-[var(--background-secondary)] border-r border-[var(--border-subtle)] py-6">
          {/* Logo */}
          <Link href="/">
            <div className="w-10 h-10 bg-[var(--accent-blue)] rounded-[10px]">
              <Waves className="w-6 h-6 text-white" />
            </div>
          </Link>
          {/* Nav Items */}
          <div className="flex flex-col gap-2">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)]",
                  isActive ? "bg-[var(--surface)]" : "bg-transparent hover:bg-[var(--surface)]"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive ? item.activeColor : "text-[var(--text-tertiary)]")} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex-1 overflow-auto">{children}</div>

        {/* Mobile TabBar */}
        {!hideNav && (
          <div className="lg:hidden">
            <TabBar />
          </div>
        )}
      </div>
    </div>
  );
}
```

### Responsive Breakpoints

| Breakpoint | Width | Navigation | Layout |
|------------|-------|------------|--------|
| Mobile | < 1024px | Bottom TabBar | Single column |
| Desktop | ≥ 1024px | Left Sidebar (72px) | Two columns |

---

## Part 7: Graduated Autonomy Implementation

### Confidence Tier UI Mapping

| Tier | UI Intensity | Friction Level | Notification |
|------|--------------|----------------|--------------|
| Low (Blue) | Standard card | Single tap confirm | In-app only |
| Medium (Amber) | Prominent card, top of feed | Must open detail | Push notification |
| High (Red) | Hero card on Command Center | Review + consent modal | Critical push + SMS |

### Alert Card Accent Bars

The left accent bar (4px width) indicates confidence tier:

```tsx
{/* High confidence - Critical red */}
<div className="w-1 bg-[var(--critical)] rounded-l-2xl" />

{/* Medium confidence - Warning amber */}
<div className="w-1 bg-[var(--warning)] rounded-l-2xl" />

{/* Low confidence - Blue */}
<div className="w-1 bg-[var(--accent-blue)] rounded-l-2xl" />
```

---

## Part 8: Alert Detail View Structure

### Planned Four-Zone Layout

#### Zone 1: Detection Evidence
- Transaction details card
- Risk score visualization (gauge)
- Contributing factors list with deviation bars

#### Zone 2: Cross-Account Evidence (Hero Moment)
- Map visualization (NYC ↔ London)
- Dual-event timeline
- "Physical Impossibility Detected" badge

#### Zone 3: Explanation (GenAI Narrative)
- Light indigo background (#EEF2FF)
- Indigo border (#C7D2FE)
- "AI-Generated Explanation" header
- Citations to Zone 1 evidence

#### Zone 4: Action (Human Approval)
- "This was NOT me" - Red filled button
- "This was me" - Green outline button
- "I need more time" - Gray outline button
- Consent modal before action execution

---

## Part 9: Component Specifications

### Button Component

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "destructive" | "ghost";
  children: React.ReactNode;
  className?: string;
}
```

**Specifications:**
- Height: 48px minimum (touch target)
- Corner radius: 12px
- Primary: `bg-[var(--accent-blue)]` + white text
- Destructive: `bg-[var(--critical)]` + white text

### StatusBar Component (Mobile)

```tsx
<div className="lg:hidden">
  <StatusBar time="9:41" />
</div>
```

Hidden on desktop (`lg:hidden`), shows system time on mobile.

---

## Part 10: Accessibility Requirements

- WCAG 2.2 AA contrast minimum (4.5:1 body, 3:1 large text)
- Color never used alone for risk indication
- Touch targets: 44x44pt minimum
- Screen reader labels for all interactive elements
- Focus indicators for keyboard navigation
- Reduced motion respects system preferences

---

## Part 11: Technology Stack

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

### Key Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS custom properties |
| `src/components/layout/AppLayout.tsx` | Navigation wrapper |
| `src/components/ui/TabBar.tsx` | Mobile navigation |
| `src/components/ui/Badge.tsx` | Status badges |
| `src/components/cards/HeroAlertCard.tsx` | High-priority alerts |
| `src/components/cards/EngineCard.tsx` | Engine status |
| `src/components/cards/ActivityItem.tsx` | Activity timeline |
| `src/components/screens/CommandCenter.tsx` | Home screen |

---

## Summary: Implementation Status

### Completed ✓
- [x] Navigation system (TabBar + Sidebar)
- [x] AppLayout with responsive behavior
- [x] Badge component with all variants
- [x] EngineCard with Protect/Grow variants
- [x] HeroAlertCard for high-confidence alerts
- [x] ActivityItem for timeline display
- [x] Command Center screen layout
- [x] CSS custom properties for theming
- [x] Active state handling for navigation

### Pending Implementation
- [ ] Alert detail view (4-zone layout)
- [ ] Cross-account map visualization
- [ ] Risk score gauge component
- [ ] Contributing factors with deviation bars
- [ ] Action consent modals
- [ ] Case-level audit trail
- [ ] Push notification integration
- [ ] Plaid data integration

---

## Design Principles Summary

The Poseidon.Ai Protect interface succeeds when it achieves:

1. **Transparent Intelligence** - Users see evidence before recommendations
2. **Graduated Autonomy** - Confidence levels translate to UI intensity
3. **Cross-Account Visibility** - Makes clear what no single institution can see
4. **Evidence-First Explanation** - GenAI content is visually distinct from deterministic outputs
5. **Human Approval** - No consequential action without explicit user consent
