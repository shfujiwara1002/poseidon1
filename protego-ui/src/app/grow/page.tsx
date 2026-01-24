"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  ChevronLeft,
  Bell,
  Calendar,
  Building,
  Zap,
  CreditCard,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function GrowForecastPage() {
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
              href="/"
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)]"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </Link>
            <span className="text-xl lg:text-2xl font-semibold text-[var(--text-primary)]">
              Grow
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)]">
              <Bell className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-5 p-4 lg:p-8">
            {/* Main Content Column */}
            <div className="flex flex-col gap-5 lg:gap-6 flex-1 lg:max-w-2xl">
              {/* Forecast Cone Card */}
              <div
                className="rounded-2xl p-4 space-y-3"
                style={{
                  background: "linear-gradient(180deg, #0A1628 0%, #1E293B 100%)",
                }}
              >
                {/* Forecast Header */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                    7-Day Cash Flow Forecast
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    <span className="text-[13px] font-medium text-[var(--text-tertiary)]">
                      Jan 24 - Jan 31
                    </span>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="relative h-[140px] w-full">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 h-[130px] flex flex-col justify-between w-[45px]">
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] font-mono">
                      $8,000
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] font-mono">
                      $6,000
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] font-mono">
                      $4,000
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] font-mono">
                      $2,000
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] font-mono">
                      $0
                    </span>
                  </div>

                  {/* Graph Area */}
                  <div className="absolute left-[50px] top-0 right-0 h-[130px]">
                    {/* Danger Zone */}
                    <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#DC262615]" />
                    <div className="absolute bottom-[30px] left-0 right-0 h-[1px] bg-[#DC262660]" />
                    <span className="absolute bottom-[5px] right-0 text-[9px] font-medium text-[#DC2626]">
                      Min: $1,000
                    </span>

                    {/* Confidence Cone */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 276 130"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,55 Q70,50 138,60 T276,75 L276,95 Q207,85 138,70 Q69,55 0,55 Z"
                        fill="#06B6D435"
                      />
                      <path
                        d="M0,55 Q70,50 138,60 T276,85"
                        stroke="#06B6D4"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>

                    {/* Current Balance Marker */}
                    <div className="absolute left-0 top-[35px] flex flex-col items-center gap-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)] border-2 border-white" />
                      <span className="text-[11px] font-semibold text-[var(--text-primary)] font-mono">
                        $5,247
                      </span>
                    </div>

                    {/* Payday Marker */}
                    <div className="absolute left-[120px] top-0 h-[130px]">
                      <div className="w-[1px] h-full bg-[#059669] opacity-50" />
                      <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-[#059669] flex items-center justify-center">
                        <span className="text-[10px] text-white">$</span>
                      </div>
                    </div>

                    {/* Bill Marker */}
                    <div className="absolute left-[200px] top-0 h-[130px]">
                      <div className="w-[1px] h-full bg-[#D97706] opacity-50" />
                      <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-[#D97706] flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="2" />
                          <line x1="8" y1="7" x2="16" y2="7" stroke="white" strokeWidth="2" />
                          <line x1="8" y1="11" x2="16" y2="11" stroke="white" strokeWidth="2" />
                          <line x1="8" y1="15" x2="12" y2="15" stroke="white" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* X-Axis Labels */}
                  <div className="absolute left-[50px] bottom-0 right-0 flex justify-between pt-[5px] h-5">
                    <span className="text-[10px] font-semibold text-[var(--accent-cyan)]">
                      Today
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Sat
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Sun
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Mon
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Tue
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Wed
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                      Thu
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 w-full">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 rounded-sm bg-[var(--accent-cyan)]" />
                    <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                      Predicted
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-2.5 rounded-sm bg-[#06B6D430]" />
                    <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                      80% Confidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="flex gap-2 w-full">
                <div className="flex-1 flex flex-col gap-1 rounded-xl bg-[var(--surface)] p-3">
                  <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                    Safe to Spend
                  </span>
                  <span className="text-[22px] font-bold text-[var(--success)] font-mono">
                    $850
                  </span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    after obligations
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1 rounded-xl bg-[var(--surface)] p-3">
                  <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                    Lowest Point
                  </span>
                  <span className="text-[22px] font-bold text-[var(--text-primary)] font-mono">
                    $1,247
                  </span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">on Feb 3</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 rounded-xl bg-[var(--surface)] p-3">
                  <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                    Confidence
                  </span>
                  <span className="text-[22px] font-bold text-[var(--success)]">High</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    P80 interval
                  </span>
                </div>
              </div>

              {/* Upcoming Bills Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                    Upcoming Bills
                  </span>
                  <Link
                    href="/grow/subscriptions"
                    className="text-[13px] font-medium text-[var(--accent-blue)]"
                  >
                    View All
                  </Link>
                </div>

                {/* Bills Scroll */}
                <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3">
                  {/* Bill Card 1 - Rent */}
                  <div className="flex flex-col gap-2 rounded-xl bg-[var(--surface)] p-3 min-w-[160px] lg:min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2563EB20]">
                        <Building className="w-4 h-4 text-[var(--accent-blue)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Rent
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--text-primary)] font-mono">
                      $2,100
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                        Due Feb 1
                      </span>
                      <div className="px-2 py-0.5 rounded-[10px] bg-[var(--success-tint)]">
                        <span className="text-[10px] font-semibold text-[var(--success)]">
                          On Track
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bill Card 2 - Electric */}
                  <div className="flex flex-col gap-2 rounded-xl bg-[var(--surface)] p-3 min-w-[160px] lg:min-w-0 border border-[#D9770640]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D9770620]">
                        <Zap className="w-4 h-4 text-[var(--warning)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Electric
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--text-primary)] font-mono">
                      $187
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                        Due Feb 5
                      </span>
                      <div className="px-2 py-0.5 rounded-[10px] bg-[var(--warning-tint)]">
                        <span className="text-[10px] font-semibold text-[var(--warning)]">
                          +40%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bill Card 3 - Amex */}
                  <div className="flex flex-col gap-2 rounded-xl bg-[var(--surface)] p-3 min-w-[160px] lg:min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#6366F120]">
                        <CreditCard className="w-4 h-4 text-[var(--indigo)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Amex
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--text-primary)] font-mono">
                      $1,450
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
                        Due Feb 8
                      </span>
                      <div className="px-2 py-0.5 rounded-[10px] bg-[var(--success-tint)]">
                        <span className="text-[10px] font-semibold text-[var(--success)]">
                          On Track
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col gap-5 lg:gap-6 lg:w-[360px]">
              {/* Recommendations Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                    Recommendations
                  </span>
                  <div className="px-2.5 py-1 rounded-xl bg-[var(--accent-blue)]">
                    <span className="text-[11px] font-semibold text-white">2 new</span>
                  </div>
                </div>

                {/* Recommendation Card 1 - Surplus */}
                <div className="flex rounded-xl bg-[var(--bg-white)] overflow-hidden w-full">
                  <div className="w-1 bg-[var(--success)] rounded-l-xl" />
                  <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#05966915]">
                        <TrendingUp className="w-3.5 h-3.5 text-[var(--success)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-dark)]">
                        Surplus Detected
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text-tertiary)]">
                      You have $4,700 in idle cash earning 0.01%
                    </p>
                    <span className="text-sm font-semibold text-[var(--success)]">
                      +$212/year potential
                    </span>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2.5 rounded-lg bg-[var(--accent-blue)]">
                        <span className="text-[13px] font-semibold text-white">
                          Review Transfer
                        </span>
                      </button>
                      <span className="text-[13px] font-medium text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)]">
                        Dismiss
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation Card 2 - Overdraft Risk */}
                <div className="flex rounded-xl bg-[var(--bg-white)] overflow-hidden w-full">
                  <div className="w-1 bg-[var(--warning)] rounded-l-xl" />
                  <div className="flex flex-col gap-2.5 p-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#D9770615]">
                        <AlertTriangle className="w-3.5 h-3.5 text-[var(--warning)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-dark)]">
                        Overdraft Risk
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text-tertiary)]">
                      Balance may drop below $500 on Feb 3 if rent clears early
                    </p>
                    <span className="text-sm font-semibold text-[var(--critical)]">
                      -$35 overdraft fee risk
                    </span>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2.5 rounded-lg bg-[var(--accent-blue)]">
                        <span className="text-[13px] font-semibold text-white">
                          Set Up Buffer
                        </span>
                      </button>
                      <span className="text-[13px] font-medium text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)]">
                        Dismiss
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Desktop only */}
              <div className="hidden lg:flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Grow Insights
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--accent-cyan)]">
                      $347
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Monthly Subscriptions
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--success)]">
                      +$212
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Potential Savings/yr
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
