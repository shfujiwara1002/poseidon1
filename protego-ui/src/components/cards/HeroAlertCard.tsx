"use client";

import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface HeroAlertCardProps {
  title: string;
  timestamp: string;
  summary: string;
  alertId?: string;
}

export function HeroAlertCard({ title, timestamp, summary, alertId = "1" }: HeroAlertCardProps) {
  return (
    <div className="flex w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--background)] to-[var(--surface)]">
      {/* Red accent bar */}
      <div className="w-1 bg-[var(--critical)] rounded-l-2xl" />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-[var(--text-primary)]" />
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-[var(--text-primary)]">
              {title}
            </span>
            <span className="text-[13px] text-[var(--text-tertiary)]">
              {timestamp}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
          {summary}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <Link href={`/alert/${alertId}`} className="w-full">
            <Button variant="primary" className="w-full">
              Review Evidence
            </Button>
          </Link>
          <button className="h-10 text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            I am traveling
          </button>
        </div>
      </div>
    </div>
  );
}
