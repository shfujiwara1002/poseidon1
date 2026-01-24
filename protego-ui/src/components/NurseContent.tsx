"use client";

import {
  CheckCircle,
  ShoppingBag,
  Cpu,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export default function NurseContent() {
  return (
    <div className="flex flex-col gap-6 p-4 w-full font-primary">
      {/* Success Banner */}
      <div className="flex items-center gap-3 bg-[var(--success-tint)] rounded-[var(--radius-md)] px-5 py-4 w-full">
        <CheckCircle className="w-6 h-6 text-[var(--success)]" />
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[15px] font-semibold text-[var(--success)]">
            Transaction Verified Against Your Profile
          </span>
          <span className="text-[13px] text-[var(--text-secondary)]">
            No action needed — this matches your spending patterns
          </span>
        </div>
      </div>

      {/* Transaction Card */}
      <div className="flex flex-col gap-3 bg-[var(--surface)] rounded-[var(--radius-md)] p-4 w-full">
        {/* Transaction Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-elevated)] rounded-[var(--radius-sm)]">
              <ShoppingBag className="w-5 h-5 text-[var(--text-secondary)]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                BestBuy Electronics
              </span>
              <span className="text-[13px] text-[var(--text-tertiary)]">
                Electronics Store
              </span>
            </div>
          </div>
          <span className="text-2xl font-bold text-[var(--text-primary)]">
            $127.00
          </span>
        </div>

        {/* Transaction Details */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <span className="text-[13px] text-[var(--text-tertiary)]">
              Date & Time
            </span>
            <span className="text-[13px] text-[var(--text-primary)]">
              Jan 24, 2026, 2:47 AM
            </span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[13px] text-[var(--text-tertiary)]">
              Account
            </span>
            <span className="text-[13px] text-[var(--text-primary)]">
              Chase Visa ••••4521
            </span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col gap-4 w-full">
        <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
          PERSONALIZED BASELINE ANALYSIS
        </span>

        {/* Curve Card */}
        <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-[var(--radius-md)] p-4 w-full">
          <span className="text-[15px] font-semibold text-[var(--text-primary)]">
            Transaction Time Distribution
          </span>

          {/* Curve Visual */}
          <div className="relative w-full h-[120px] bg-[var(--background-secondary)] rounded-[var(--radius-sm)]">
            <svg
              className="absolute inset-0 w-full h-[90px]"
              viewBox="0 0 320 90"
              preserveAspectRatio="none"
            >
              {/* Population Curve */}
              <path
                d="M20 80q60 0 100-40 40-30 80 0 40 40 100 40"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
              />
              {/* Your Curve */}
              <path
                d="M20 80q20-40 40-60 20-15 40 0 20 20 40 60l160 0"
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth="2"
              />
            </svg>
            {/* Current Marker */}
            <div className="absolute top-[15px] left-[55px] w-3 h-3 bg-[var(--success)] rounded-full" />
            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 h-5">
              <span className="text-[10px] text-[var(--text-tertiary)]">
                12AM
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                6AM
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                12PM
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                6PM
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)]">
                12AM
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-5 w-full">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[3px] bg-[var(--text-tertiary)] rounded-sm" />
              <span className="text-[11px] text-[var(--text-tertiary)]">
                Population Average
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[3px] bg-[var(--accent-blue)] rounded-sm" />
              <span className="text-[11px] text-[var(--accent-blue)]">
                Your Baseline
              </span>
            </div>
          </div>

          {/* Context */}
          <div className="flex items-center gap-2 bg-[var(--background)] rounded-[var(--radius-sm)] p-3 w-full">
            <div className="w-2 h-2 bg-[var(--success)] rounded-full shrink-0" />
            <span className="text-[12px] text-[var(--text-secondary)]">
              Your transaction time (2:47 AM) is typical for your profile
            </span>
          </div>
        </div>

        {/* Model Badge */}
        <div className="flex items-center justify-center gap-2 py-2 w-full">
          <Cpu className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[11px] text-[var(--text-tertiary)]">
            Evaluated against User Baseline v4 (Jan 20, 2026)
          </span>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="flex flex-col gap-3 w-full">
        <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
          AI-GENERATED EXPLANATION
        </span>

        {/* Explanation Card */}
        <div className="flex flex-col gap-3 bg-[var(--indigo-tint)] border border-[var(--indigo-border)] rounded-[var(--radius-md)] p-4 w-full">
          <div className="flex items-center gap-2 w-full">
            <Sparkles className="w-4 h-4 text-[var(--indigo)]" />
            <span className="text-[13px] font-semibold text-[var(--indigo)]">
              AI-Generated Explanation
            </span>
          </div>
          <p className="text-[14px] text-[var(--surface)] leading-[1.6]">
            While a 2:47 AM electronics purchase would trigger alerts for most
            users, this transaction aligns with your established &apos;Night
            Shift&apos; spending profile. Your historical data shows regular
            activity between 1 AM and 4 AM. No alert was sent to your bank.
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="h-px bg-[var(--border)] w-full" />

        <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
          YOUR RESPONSE
        </span>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button className="flex items-center justify-center h-12 border-[1.5px] border-[var(--success)] rounded-[var(--radius-md)] px-5 w-full hover:bg-[var(--success-tint)] transition-colors">
            <span className="text-[15px] font-medium text-[var(--success)]">
              Looks correct
            </span>
          </button>
          <button className="flex items-center justify-center h-12 border-[1.5px] border-[var(--border)] rounded-[var(--radius-md)] px-5 w-full hover:bg-[var(--surface)] transition-colors">
            <span className="text-[15px] font-medium text-[var(--text-secondary)]">
              This was not me
            </span>
          </button>
        </div>

        {/* Adjust Profile Link */}
        <div className="flex items-center justify-center gap-1.5 py-2 w-full cursor-pointer hover:opacity-80 transition-opacity">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium text-[var(--text-tertiary)]">
            Adjust my profile
          </span>
        </div>
      </div>
    </div>
  );
}
