"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { AppLayout } from "@/components/layout/AppLayout";
import { ActionCard } from "@/components/cards/ActionCard";
import { ChevronLeft, Bell, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function ExecutePage() {
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
            <div className="flex flex-col gap-0.5">
              <span className="text-xl lg:text-2xl font-semibold text-[var(--text-primary)]">
                Action Queue
              </span>
              <span className="text-[12px] font-mono text-[var(--text-tertiary)]">
                3 Awaiting · 1 In Progress · 12 Completed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--surface)]">
              <SlidersHorizontal className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
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
              {/* Awaiting Approval Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[2px] text-[var(--text-tertiary)]">
                    AWAITING APPROVAL
                  </span>
                  <span className="text-[12px] font-mono font-medium text-[var(--accent-cyan)]">
                    [3]
                  </span>
                </div>

                <ActionCard
                  status="pending"
                  title="Transfer to Marcus HYSA"
                  subtitle="Opens Goldman Sachs App"
                  amount="$4,700"
                  amountSubtext="From Chase Checking ****4521"
                  savingsText="+$280/yr"
                  isReversible={true}
                  timestamp="Recommended 2 hours ago"
                  accentColor="blue"
                  onApprove={() => {}}
                  onDismiss={() => {}}
                />

                <ActionCard
                  status="pending"
                  title="Pay Amex Statement"
                  subtitle="Full Balance Payment"
                  amount="$1,450"
                  amountSubtext="Due Feb 8 · Avoids $29 interest"
                  isReversible={true}
                  timestamp="Recommended yesterday"
                  accentColor="cyan"
                  onApprove={() => {}}
                  onDismiss={() => {}}
                />

                <ActionCard
                  status="pending"
                  title="Negotiate Xfinity Bill"
                  subtitle="AI Call to Customer Service"
                  amount="$89.99/mo"
                  amountSubtext="Current plan · Target: $59.99/mo"
                  savingsText="Save $360/yr"
                  isReversible={false}
                  timestamp="Opportunity detected 3 days ago"
                  accentColor="cyan"
                  onApprove={() => {}}
                  onDismiss={() => {}}
                />
              </div>

              {/* In Progress Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[2px] text-[var(--text-tertiary)]">
                    IN PROGRESS
                  </span>
                  <span className="text-[12px] font-mono font-medium text-[var(--accent-cyan)]">
                    [1]
                  </span>
                </div>

                <ActionCard
                  status="in_progress"
                  title="Cancel Hulu Subscription"
                  subtitle="Guided Steps"
                  progressText="Contacting Hulu..."
                  progressStep="Step 2/5"
                  amount="$17.99/mo"
                  savingsText="Save $216/yr"
                  isReversible={true}
                  accentColor="cyan"
                />
              </div>

              {/* Completed Today Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[2px] text-[var(--text-tertiary)]">
                    COMPLETED TODAY
                  </span>
                  <Link
                    href="/execute/history"
                    className="text-[12px] font-medium text-[var(--accent-blue)]"
                  >
                    view all →
                  </Link>
                </div>

                <ActionCard
                  status="completed"
                  title="Card Frozen: Chase Visa"
                  subtitle="Completed via Chase App"
                  amountSubtext="Fraud alert response · ****4521"
                  timestamp="10:54 AM"
                  onViewDetails={() => {}}
                />
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col gap-5 lg:gap-6 lg:w-[360px]">
              {/* Execute Stats */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Execute Insights
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--accent-cyan)]">
                      $856
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Saved This Month
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <span className="text-2xl font-bold text-[var(--success)]">
                      16
                    </span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      Actions Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Automation Settings */}
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Automation Level
                </span>
                <div className="flex flex-col gap-2 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-[var(--text-primary)]">
                      Current Mode
                    </span>
                    <div className="px-2.5 py-1 rounded-lg bg-[var(--accent-cyan)]">
                      <span className="text-[11px] font-semibold text-white">
                        Co-Pilot
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[var(--text-tertiary)]">
                    Recommendations require your approval before execution
                  </p>
                  <button className="mt-2 text-[12px] font-medium text-[var(--accent-blue)]">
                    Change automation settings →
                  </button>
                </div>
              </div>

              {/* Recent Savings */}
              <div className="hidden lg:flex flex-col gap-3">
                <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                  Recent Savings
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                    <span className="text-[13px] text-[var(--text-secondary)]">
                      Netflix downgrade
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--success)]">
                      +$72/yr
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                    <span className="text-[13px] text-[var(--text-secondary)]">
                      Bank fee refund
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--success)]">
                      +$35
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                    <span className="text-[13px] text-[var(--text-secondary)]">
                      Insurance quote
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--success)]">
                      +$240/yr
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
