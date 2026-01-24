# Poseidon.Ai Grow Engine UI/UX Design Specification

## Updated Based on Current Implementation

---

## Design Philosophy: Transparent Intelligence

Poseidon.Ai occupies a unique position in the financial technology landscape. It cannot adopt neo-bank minimalism because its differentiation depends on exposing the evidence that justifies its recommendations. The solution is **Transparent Intelligence**: a Command Center aesthetic that visualizes the *why* before requesting the *what*.

Users should feel like pilots, not passengers. They observe the instruments, understand the readings, and make the final decisions.

**Primary UX Goal:** Convert financial complexity into calm, evidence-based, user-approved action in under 20 seconds per interaction.

---

## Part 1: Information Architecture

### Mobile Navigation Structure

The application uses a bottom tab bar with four primary destinations, following iOS Human Interface Guidelines and Material Design 3 principles.

| Tab | Icon | Active Color | Description |
|-----|------|--------------|-------------|
| **Home** | `LayoutDashboard` | `--accent-blue` (#2563EB) | Command Center with engine status and alerts |
| **Protect** | `Shield` | `--accent-blue` (#2563EB) | Fraud detection and security alerts |
| **Grow** | `TrendingUp` | `--accent-cyan` (#06B6D4) | Forward-looking intelligence and forecasts |
| **Settings** | `Settings` | `--text-tertiary` (#64748B) | Account and app configuration |

### Desktop Navigation Structure

A left sidebar (72px width) provides persistent navigation with icon-only display:

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

## Part 2: Visual Design System

### Color Palette

#### CSS Custom Properties (globals.css)

```css
:root {
  /* Primary Accents */
  --accent-blue: #2563EB;
  --accent-blue-light: #3B82F6;
  --accent-blue-tint: #2563EB20;
  --accent-cyan: #06B6D4;           /* Grow engine primary */
  --accent-cyan-light: #06B6D435;   /* Grow engine tint */
  --accent-indigo: #6366F1;

  /* Backgrounds */
  --background: #0A1628;
  --background-secondary: #0F172A;
  --surface: #1E293B;
  --surface-elevated: #334155;

  /* Borders */
  --border: #334155;
  --border-subtle: #1E293B;

  /* Semantic Colors */
  --success: #059669;
  --success-light: #10B981;
  --success-tint: #05966920;
  --warning: #D97706;
  --warning-light: #F59E0B;
  --warning-tint: #D9770620;
  --critical: #DC2626;
  --critical-light: #EF4444;
  --critical-tint: #DC262620;
  --indigo: #6366F1;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
  --text-dark: #0F172A;
  --bg-white: #FFFFFF;

  /* Border Radius */
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
  --radius-pill: 100px;
}
```

### Grow Engine Color Identity

The Grow engine uses **cyan (#06B6D4)** as its primary accent color to differentiate from Protect's blue (#2563EB):

- Engine card border: `#164E63`
- Engine card background: `#0A1A1F`
- Hover state: `hover:border-[var(--accent-cyan)]`
- Active badges: `cyan` variant

### Typography

#### Font Stack
- Primary: Inter (web), SF Pro (iOS)
- Monospace: SF Mono / JetBrains Mono (for numerical values)

#### Scale
| Use Case | Size | Weight |
|----------|------|--------|
| Page title | 24px (desktop), 20px (mobile) | Semibold |
| Section header | 17px | Semibold |
| Body text | 15px | Regular |
| Labels | 13px | Semibold |
| Captions | 11px | Medium |
| Data values | 22px | Bold (mono) |

---

## Part 3: Grow Engine Interface

### Primary View: Forecast Dashboard (`/grow`)

#### Header Component
```tsx
<div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8">
  {/* Mobile: Back button + Title */}
  <div className="flex items-center gap-3">
    <Link href="/" className="flex lg:hidden ...">
      <ChevronLeft className="w-5 h-5" />
    </Link>
    <span className="text-xl lg:text-2xl font-semibold">Grow</span>
  </div>
  {/* Notification bell */}
  <button className="w-10 h-10 rounded-full bg-[var(--surface)]">
    <Bell className="w-5 h-5" />
  </button>
</div>
```

#### Forecast Cone Visualization

The visual hero of the Grow engine displaying a 7-day cash flow forecast with confidence intervals.

**Container Specification:**
```css
background: linear-gradient(180deg, #0A1628 0%, #1E293B 100%);
border-radius: 16px;
padding: 16px;
```

**Visual Elements:**

1. **Y-Axis Labels:** $0 to $8,000 in $2,000 increments (10px, mono font)

2. **Danger Zone:**
   - Height: 30px from bottom
   - Background: `#DC262615`
   - Border line: `#DC262660` (1px)
   - Label: "Min: $1,000"

3. **Confidence Cone (SVG):**
   - Solid cyan line: Predicted trajectory (`stroke="#06B6D4"`)
   - Shaded area: 80% confidence interval (`fill="#06B6D435"`)

4. **Key Markers:**
   - Current balance: Cyan dot with white border, value label ($5,247)
   - Payday: Green vertical line with "$" icon in circle
   - Bill due: Amber vertical line with bill icon

5. **X-Axis Labels:** Today, Sat, Sun, Mon, Tue, Wed, Thu

6. **Legend:**
   - Solid cyan line: "Predicted"
   - Shaded cyan area: "80% Confidence"

#### Key Metrics Row

Three metric cards in horizontal layout:

```tsx
<div className="flex gap-2 w-full">
  {/* Safe to Spend */}
  <div className="flex-1 flex flex-col gap-1 rounded-xl bg-[var(--surface)] p-3">
    <span className="text-[11px] text-[var(--text-tertiary)]">Safe to Spend</span>
    <span className="text-[22px] font-bold text-[var(--success)] font-mono">$850</span>
    <span className="text-[10px] text-[var(--text-tertiary)]">after obligations</span>
  </div>
  {/* Lowest Point */}
  <div className="flex-1 ...">
    <span>Lowest Point</span>
    <span className="text-[var(--text-primary)]">$1,247</span>
    <span>on Feb 3</span>
  </div>
  {/* Confidence */}
  <div className="flex-1 ...">
    <span>Confidence</span>
    <span className="text-[var(--success)]">High</span>
    <span>P80 interval</span>
  </div>
</div>
```

#### Upcoming Bills Section

**Section Header:**
- Title: "Upcoming Bills" (17px semibold)
- Link: "View All" → `/grow/subscriptions`

**Bill Cards (horizontal scroll on mobile, 3-column grid on desktop):**

| Bill | Icon | Icon Color | Amount | Due Date | Status Badge |
|------|------|------------|--------|----------|--------------|
| Rent | `Building` | `--accent-blue` | $2,100 | Feb 1 | On Track (green) |
| Electric | `Zap` | `--warning` | $187 | Feb 5 | +40% (amber, with border) |
| Amex | `CreditCard` | `--indigo` | $1,450 | Feb 8 | On Track (green) |

**Bill Card with Alert (Electric):**
```css
border: 1px solid #D9770640;
```

#### Recommendations Section (Sidebar on Desktop)

**Section Header:**
- Title: "Recommendations"
- Badge: "2 new" (blue filled pill)

**Recommendation Card Structure:**
```tsx
<div className="flex rounded-xl bg-[var(--bg-white)] overflow-hidden">
  {/* Left accent bar - green for opportunity, amber for risk */}
  <div className="w-1 bg-[var(--success)]" />
  <div className="flex flex-col gap-3 p-4 flex-1">
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[#05966915]">
        <TrendingUp className="w-3.5 h-3.5 text-[var(--success)]" />
      </div>
      <span className="text-sm font-semibold text-[var(--text-dark)]">Surplus Detected</span>
    </div>
    <p className="text-[13px] text-[var(--text-tertiary)]">
      You have $4,700 in idle cash earning 0.01%
    </p>
    <span className="text-sm font-semibold text-[var(--success)]">+$212/year potential</span>
    <div className="flex items-center gap-3">
      <button className="px-4 py-2.5 rounded-lg bg-[var(--accent-blue)]">
        <span className="text-[13px] font-semibold text-white">Review Transfer</span>
      </button>
      <span className="text-[13px] text-[var(--text-tertiary)]">Dismiss</span>
    </div>
  </div>
</div>
```

**Recommendation Types:**
1. **Surplus Detected** (green accent): Opportunity for yield improvement
2. **Overdraft Risk** (amber accent): Warning about potential negative balance

---

### Secondary View: Subscriptions Page (`/grow/subscriptions`)

#### Summary Card

**Container:**
```css
background: linear-gradient(180deg, #0A1628 0%, #1E293B 100%);
border-radius: 16px;
padding: 20px;
```

**Summary Header:**
- Label: "Monthly Subscription Spend" (13px medium)
- Value: "$347" (36px bold mono)
- Suffix: "/month" (15px tertiary)
- Trend badge: "+12% YoY" with `ArrowUp` icon (critical red)

**Category Breakdown Bar:**
```tsx
<div className="flex gap-0.5 w-full h-2 rounded">
  <div className="w-[120px] bg-[var(--indigo)]" />    {/* Streaming $156 */}
  <div className="w-[80px] bg-[var(--accent-cyan)]" /> {/* Software $98 */}
  <div className="w-[60px] bg-[var(--success)]" />     {/* Fitness $45 */}
  <div className="flex-1 bg-[var(--surface-elevated)]" /> {/* Remaining */}
</div>
```

#### Price Alert Banner

```tsx
<div className="flex items-center gap-3 rounded-xl bg-[#D9770615] border border-[#D9770640] px-4 py-3">
  <div className="w-8 h-8 rounded-2xl bg-[#D9770625]">
    <AlertTriangle className="w-[18px] h-[18px] text-[var(--warning)]" />
  </div>
  <div className="flex flex-col gap-0.5 flex-1">
    <span className="text-sm font-semibold text-[var(--warning)]">Price Increase Detected</span>
    <span className="text-xs text-[var(--text-secondary)]">
      Netflix increased from $15.99 to $22.99
    </span>
  </div>
  <ChevronRight className="w-5 h-5 text-[var(--warning)]" />
</div>
```

#### Subscription List

**SubscriptionItem Component:**

```tsx
interface SubscriptionItemProps {
  logo: React.ReactNode;
  logoColor: string;
  name: string;
  amount: string;
  renewDate: string;
  badge?: { text: string; color: string; bgColor: string };
  hasBorder?: boolean;
}
```

**Example Subscriptions:**

| Service | Logo | Amount | Renew | Badge |
|---------|------|--------|-------|-------|
| Netflix | "N" (#E50914) | $22.99/mo | Feb 15 | Price Increased (amber) |
| Spotify | `Music` (#1DB954) | $10.99/mo | Feb 22 | - |
| ChatGPT Plus | `Sparkles` (#10A37F) | $20.00/mo | Feb 28 | New (blue) |
| Planet Fitness | `Dumbbell` (#FF6B35) | $24.99/mo | Mar 1 | Unused (gray) |

#### Desktop Sidebar: Subscription Insights

**Stats Grid (2x2):**
| Metric | Value | Color |
|--------|-------|-------|
| Active Subscriptions | 12 | `--accent-cyan` |
| Price Increases | 1 | `--warning` |
| Unused This Month | $25 | `--critical` |
| Annual Total | $4,164 | `--success` |

**Quick Actions:**
- Review Unused Subscriptions
- Set Price Alert Thresholds
- Export Subscription Report

---

## Part 4: Component Specifications

### Badge Component

```typescript
type BadgeVariant = "high" | "medium" | "low" | "success" | "cyan";

const variantStyles = {
  high: { bg: "--critical-tint", dot: "--critical", text: "--critical" },
  medium: { bg: "--warning-tint", dot: "--warning", text: "--warning" },
  low: { bg: "--accent-blue-tint", dot: "--accent-blue", text: "--accent-blue" },
  success: { bg: "--success-tint", dot: "--success", text: "--success" },
  cyan: { bg: "--accent-cyan-light", dot: "--accent-cyan", text: "--accent-cyan" },
};
```

**Dimensions:**
- Height: 24px
- Padding: 10px horizontal
- Border radius: 100px (pill)
- Dot size: 6px

### EngineCard Component

```typescript
interface EngineCardProps {
  variant: "protect" | "grow";
  metric: string;
  badgeText: string;
  badgeVariant: "success" | "low" | "cyan";
  href?: string;
}

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

### AppLayout Component

**Structure:**
```tsx
<div className="flex h-screen w-full bg-[var(--background)]">
  {/* Desktop Sidebar - hidden on mobile */}
  <div className="hidden lg:flex flex-col w-[72px] bg-[var(--background-secondary)]">
    {/* Logo */}
    <div className="w-10 h-10 bg-[var(--accent-blue)] rounded-[10px]">
      <Waves className="w-6 h-6 text-white" />
    </div>
    {/* Nav Items */}
    {sidebarNavItems.map(...)}
  </div>

  {/* Main Content */}
  <div className="flex flex-col flex-1">
    {children}
    {/* Mobile TabBar */}
    <div className="lg:hidden">
      <TabBar />
    </div>
  </div>
</div>
```

---

## Part 5: Responsive Design

### Breakpoints

| Breakpoint | Width | Layout Change |
|------------|-------|---------------|
| Mobile | < 1024px | Single column, TabBar navigation |
| Desktop | ≥ 1024px | Two-column, Sidebar navigation |

### Mobile-Specific Elements
- StatusBar component (hidden on desktop)
- Back button in headers
- Horizontal scroll for bill cards
- TabBar at bottom

### Desktop-Specific Elements
- Persistent sidebar (72px)
- Desktop header with border
- Two-column layout (main + sidebar)
- Grid layout for cards

---

## Part 6: Accessibility Requirements

- WCAG 2.2 AA contrast minimum (4.5:1 for body text, 3:1 for large text)
- Color never used alone for risk indication; paired with icons and labels
- Touch targets: 44x44pt minimum (button: 40x40px minimum)
- Screen reader labels for all interactive elements
- Focus indicators visible for keyboard navigation
- Reduced motion option respects system preferences

---

## Part 7: Technology Stack

### Current Implementation

```json
{
  "framework": "Next.js 16 (App Router)",
  "react": "React 19",
  "styling": "Tailwind CSS v4",
  "icons": "Lucide React",
  "fonts": "Inter (via next/font)"
}
```

### Key Dependencies
- `next`: ^16.0.0
- `react`: ^19.0.0
- `tailwindcss`: ^4.0.0
- `lucide-react`: ^0.x.x
- `clsx` / `tailwind-merge`: For className utilities

---

## Summary: Implementation Checklist

### Completed Features ✓
- [x] Grow engine navigation integration (TabBar + Sidebar)
- [x] Cyan color identity for Grow engine
- [x] Forecast Dashboard with cone visualization
- [x] Key metrics display (Safe to Spend, Lowest Point, Confidence)
- [x] Upcoming Bills section with alert states
- [x] Recommendations section with action buttons
- [x] Subscriptions page with summary and list
- [x] Price alert banner
- [x] Desktop sidebar insights
- [x] Responsive layout (mobile + desktop)

### Pending Features
- [ ] Interactive forecast scrubbing
- [ ] Plaid integration for real data
- [ ] Action consent modals
- [ ] Audit trail integration
- [ ] Push notifications for Grow alerts
