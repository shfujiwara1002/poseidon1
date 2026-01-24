"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  ChevronLeft,
  Filter,
  ArrowUp,
  ChevronRight,
  AlertTriangle,
  Music,
  Sparkles,
  Dumbbell,
} from "lucide-react";
import Link from "next/link";

interface SubscriptionItemProps {
  logo: React.ReactNode;
  logoColor: string;
  name: string;
  amount: string;
  renewDate: string;
  badge?: {
    text: string;
    color: string;
    bgColor: string;
  };
  hasBorder?: boolean;
}

function SubscriptionItem({
  logo,
  logoColor,
  name,
  amount,
  renewDate,
  badge,
  hasBorder,
}: SubscriptionItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl bg-[var(--surface)] p-4 w-full ${
        hasBorder ? "border border-[#D9770640]" : ""
      }`}
    >
      <div
        className="flex items-center justify-center w-11 h-11 rounded-[10px]"
        style={{ backgroundColor: logoColor }}
      >
        {logo}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-[15px] font-semibold text-[var(--text-primary)]">
            {name}
          </span>
          {badge && (
            <div
              className="px-2 py-0.5 rounded-[10px]"
              style={{ backgroundColor: badge.bgColor }}
            >
              <span
                className="text-[10px] font-semibold"
                style={{ color: badge.color }}
              >
                {badge.text}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)] font-mono">
            {amount}
          </span>
          <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
          <span className="text-xs text-[var(--text-tertiary)]">{renewDate}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]" />
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full w-full">
        {/* Mobile Status Bar - hidden on desktop */}
        <div className="lg:hidden">
          <StatusBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8 lg:border-b lg:border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <Link
              href="/grow"
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)]"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </Link>
            <span className="text-xl lg:text-2xl font-semibold text-[var(--text-primary)]">
              Subscriptions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)]">
              <Filter className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-5 p-4 lg:p-8">
            {/* Main Content Column */}
            <div className="flex flex-col gap-5 lg:gap-6 flex-1 lg:max-w-2xl">
              {/* Summary Card */}
              <div
                className="rounded-2xl p-5 space-y-4"
                style={{
                  background: "linear-gradient(180deg, #0A1628 0%, #1E293B 100%)",
                }}
              >
                {/* Summary Header */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                      Monthly Subscription Spend
                    </span>
                    <span className="text-4xl font-bold text-[var(--text-primary)] font-mono">
                      $347
                    </span>
                    <span className="text-[15px] text-[var(--text-tertiary)]">/month</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#DC262620]">
                    <ArrowUp className="w-3.5 h-3.5 text-[var(--critical)]" />
                    <span className="text-xs font-semibold text-[var(--critical)]">
                      +12% YoY
                    </span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="flex flex-col gap-3 w-full">
                  <span className="text-xs font-medium text-[var(--text-tertiary)]">
                    By Category
                  </span>
                  {/* Category Bars */}
                  <div className="flex gap-0.5 w-full h-2 rounded">
                    <div className="w-[120px] h-2 rounded bg-[var(--indigo)]" />
                    <div className="w-[80px] h-2 rounded bg-[var(--accent-cyan)]" />
                    <div className="w-[60px] h-2 rounded bg-[var(--success)]" />
                    <div className="flex-1 h-2 rounded bg-[var(--surface-elevated)]" />
                  </div>
                  {/* Category Legend */}
                  <div className="flex gap-4 w-full flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-[var(--indigo)]" />
                      <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                        Streaming $156
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-[var(--accent-cyan)]" />
                      <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                        Software $98
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-[var(--success)]" />
                      <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                        Fitness $45
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Alert Banner */}
              <div className="flex items-center gap-3 rounded-xl bg-[#D9770615] border border-[#D9770640] px-4 py-3 w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-[#D9770625]">
                  <AlertTriangle className="w-[18px] h-[18px] text-[var(--warning)]" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-sm font-semibold text-[var(--warning)]">
                    Price Increase Detected
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Netflix increased from $15.99 to $22.99
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[var(--warning)]" />
              </div>

              {/* Subscriptions List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                    All Subscriptions
                  </span>
                  <span className="text-[13px] font-medium text-[var(--text-tertiary)]">
                    12 active
                  </span>
                </div>

                {/* Netflix */}
                <SubscriptionItem
                  logo={
                    <span className="text-xl font-bold text-white">N</span>
                  }
                  logoColor="#E50914"
                  name="Netflix"
                  amount="$22.99/mo"
                  renewDate="Renews Feb 15"
                  badge={{
                    text: "Price Increased",
                    color: "#D97706",
                    bgColor: "#D9770620",
                  }}
                  hasBorder
                />

                {/* Spotify */}
                <SubscriptionItem
                  logo={<Music className="w-[22px] h-[22px] text-white" />}
                  logoColor="#1DB954"
                  name="Spotify Premium"
                  amount="$10.99/mo"
                  renewDate="Renews Feb 22"
                />

                {/* ChatGPT Plus */}
                <SubscriptionItem
                  logo={<Sparkles className="w-[22px] h-[22px] text-white" />}
                  logoColor="#10A37F"
                  name="ChatGPT Plus"
                  amount="$20.00/mo"
                  renewDate="Renews Feb 28"
                  badge={{
                    text: "New",
                    color: "#2563EB",
                    bgColor: "#2563EB20",
                  }}
                />

                {/* Planet Fitness */}
                <SubscriptionItem
                  logo={<Dumbbell className="w-[22px] h-[22px] text-white" />}
                  logoColor="#FF6B35"
                  name="Planet Fitness"
                  amount="$24.99/mo"
                  renewDate="Renews Mar 1"
                  badge={{
                    text: "Unused",
                    color: "#64748B",
                    bgColor: "#64748B20",
                  }}
                />
              </div>
            </div>

            {/* Sidebar Content - Desktop */}
            <div className="hidden lg:flex flex-col gap-5 lg:gap-6 lg:w-[360px]">
              {/* Subscription Insights */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Subscription Insights
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--accent-cyan)]">
                      12
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Active Subscriptions
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--warning)]">
                      1
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Price Increases
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--critical)]">
                      $25
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Unused This Month
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--success)]">
                      $4,164
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Annual Total
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Quick Actions
                </span>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--surface-elevated)] transition-colors">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      Review Unused Subscriptions
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--surface-elevated)] transition-colors">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      Set Price Alert Thresholds
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--surface-elevated)] transition-colors">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      Export Subscription Report
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
