"use client";

import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import Link from "next/link";

type AlertSeverity = "high" | "medium" | "low";

interface AlertCardProps {
  id: string;
  severity: AlertSeverity;
  title: string;
  account: string;
  summary: string;
  timestamp: string;
  chips: string[];
}

const severityColors: Record<AlertSeverity, string> = {
  high: "bg-[var(--critical)]",
  medium: "bg-[var(--warning)]",
  low: "bg-[var(--accent-blue)]",
};

export function AlertCard({
  id,
  severity,
  title,
  account,
  summary,
  timestamp,
  chips,
}: AlertCardProps) {
  return (
    <Link href={`/alert/${id}`}>
      <div className="flex w-full rounded-[var(--radius-md)] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        {/* Colored accent bar */}
        <div className={cn("w-1 rounded-l-[var(--radius-md)]", severityColors[severity])} />

        <div className="flex flex-col gap-3 p-4 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <MapPin className={cn("w-5 h-5", severity === "high" ? "text-[var(--critical)]" : "text-[var(--warning)]")} />
            </div>
            <Badge variant={severity}>
              {severity === "high" ? "High" : severity === "medium" ? "Medium" : "Low"}
            </Badge>
          </div>

          {/* Title and account */}
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[17px] font-semibold text-[#0F172A]">
              {title}
            </span>
            <span className="text-[13px] font-medium text-[var(--text-tertiary)]">
              {account}
            </span>
          </div>

          {/* Summary */}
          <p className="text-[15px] text-[var(--text-tertiary)]">{summary}</p>

          {/* Timestamp */}
          <span className="text-[13px] text-[var(--text-secondary)]">
            {timestamp}
          </span>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <Chip key={index}>{chip}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
