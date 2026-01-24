"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusBar } from "@/components/ui/StatusBar";
import { Header } from "@/components/ui/Header";
import { AlertCard } from "@/components/cards/AlertCard";
import { AppLayout } from "@/components/layout/AppLayout";
import { SlidersHorizontal, Search } from "lucide-react";

type FilterType = "all" | "pending" | "resolved";

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
];

export function ProtectFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  return (
    <AppLayout>
      <div className="flex flex-col h-full w-full">
        {/* Mobile Status Bar - hidden on desktop */}
        <div className="lg:hidden">
          <StatusBar time="9:41" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8 lg:border-b lg:border-[var(--border-subtle)]">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 flex-1">
            <Header title="Protect" showBack backHref="/" />
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-4 flex-1">
            <span className="text-xl font-semibold text-[var(--text-primary)]">
              Protect Feed
            </span>
            <span className="text-[13px] text-[var(--text-tertiary)]">
              Monitor and respond to security alerts
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-2 h-9 px-3 bg-[var(--surface)] rounded-[var(--radius-sm)] w-[240px]">
              <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="flex-1 bg-transparent text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
              />
            </div>
            <SlidersHorizontal className="w-6 h-6 text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 h-12 lg:h-14 px-4 lg:px-8">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "flex items-center justify-center h-8 px-4 rounded-full text-[13px] transition-colors",
                activeFilter === filter.value
                  ? "bg-[var(--accent-blue)] text-white font-semibold"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] font-medium hover:bg-[var(--surface-elevated)]"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-5 p-4 lg:p-8 lg:max-w-4xl">
            {/* Today Section */}
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                Today
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AlertCard
                  id="1"
                  severity="high"
                  title="Location Conflict Detected"
                  account="Chase Visa ••••4521"
                  summary="$487 at ElectroMart, London"
                  timestamp="2 min ago"
                  chips={["New location", "Unusual time", "New merchant"]}
                />
              </div>
            </div>

            {/* This Week Section */}
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                This Week
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AlertCard
                  id="2"
                  severity="medium"
                  title="Unusual Velocity Pattern"
                  account="Citi Checking ••••7890"
                  summary="4 transactions in 15 minutes, $847 total"
                  timestamp="3 days ago"
                  chips={["Velocity spike", "Multiple ATMs", "High amount"]}
                />
                <AlertCard
                  id="3"
                  severity="low"
                  title="New Device Detected"
                  account="Amex Gold ••••1234"
                  summary="Login from new iPhone in San Francisco"
                  timestamp="5 days ago"
                  chips={["New device", "Known location"]}
                />
              </div>
            </div>

            {/* Earlier Section - Desktop only */}
            <div className="hidden lg:flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                Earlier
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AlertCard
                  id="4"
                  severity="medium"
                  title="Large Transaction Alert"
                  account="Chase Visa ••••4521"
                  summary="$2,450 at Best Buy Electronics"
                  timestamp="1 week ago"
                  chips={["High amount", "Verified"]}
                />
                <AlertCard
                  id="5"
                  severity="low"
                  title="Subscription Renewal"
                  account="Citi Checking ••••7890"
                  summary="$14.99 Netflix recurring charge"
                  timestamp="2 weeks ago"
                  chips={["Recurring", "Expected"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
