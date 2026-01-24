"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { HeroAlertCard } from "@/components/cards/HeroAlertCard";
import { EngineCard } from "@/components/cards/EngineCard";
import { ActivityItem } from "@/components/cards/ActivityItem";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";

export function CommandCenter() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full w-full">
        {/* Mobile Status Bar - hidden on desktop */}
        <div className="lg:hidden">
          <StatusBar time="9:41" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8 lg:border-b lg:border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold text-[var(--text-primary)]">
              Poseidon.Ai
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Desktop: Show status badge */}
            <div className="hidden lg:flex items-center gap-2">
              <Badge variant="success">All Systems Active</Badge>
            </div>
            {/* Mobile: Show status ring */}
            <div className="flex lg:hidden items-center gap-1">
              <div className="w-7 h-7 rounded-full border-[3px] border-[var(--success)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-5 p-4 lg:p-8">
            {/* Main Content Column */}
            <div className="flex flex-col gap-5 lg:gap-6 flex-1 lg:max-w-2xl">
              {/* Hero Alert */}
              <HeroAlertCard
                title="Cross-Account Conflict Detected"
                timestamp="2 minutes ago"
                summary="Card-present purchase in London conflicts with NY activity 15 minutes earlier"
                alertId="1"
              />

              {/* Engine Status Section */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Engine Status
                </span>
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
                <EngineCard
                  variant="execute"
                  metric="3 Awaiting · 1 In Progress"
                  badgeText="Active"
                  badgeVariant="cyan"
                  href="/execute"
                />
              </div>
            </div>

            {/* Sidebar Content - Desktop */}
            <div className="flex flex-col gap-5 lg:gap-6 lg:w-[360px]">
              {/* Recent Activity Section */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Recent Activity
                </span>
                <div className="flex flex-col gap-2">
                  <ActivityItem
                    icon="check"
                    title="Fraud check passed: Uber Eats $23.50"
                    timestamp="5 hours ago"
                  />
                  <ActivityItem
                    icon="document"
                    title="Monthly report ready"
                    timestamp="1 day ago"
                  />
                  <ActivityItem
                    icon="sync"
                    title="Chase account synced"
                    timestamp="2 hours ago"
                  />
                </div>
              </div>

              {/* Quick Stats - Desktop only */}
              <div className="hidden lg:flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  This Month
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">
                      127
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Transactions Scanned
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--success)]">
                      3
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Threats Blocked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
