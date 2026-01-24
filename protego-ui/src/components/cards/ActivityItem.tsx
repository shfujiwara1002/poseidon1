"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, FileText, RefreshCw, LucideIcon } from "lucide-react";

type ActivityIconType = "check" | "document" | "sync";

interface ActivityItemProps {
  icon: ActivityIconType;
  title: string;
  timestamp: string;
}

const iconConfig: Record<ActivityIconType, { Icon: LucideIcon; color: string }> = {
  check: { Icon: CheckCircle, color: "text-[var(--success)]" },
  document: { Icon: FileText, color: "text-[var(--accent-blue)]" },
  sync: { Icon: RefreshCw, color: "text-[var(--success)]" },
};

export function ActivityItem({ icon, title, timestamp }: ActivityItemProps) {
  const { Icon, color } = iconConfig[icon];

  return (
    <div className="flex items-center gap-3 h-12 px-3 bg-[var(--surface)] rounded-[10px] w-full">
      <Icon className={cn("w-5 h-5 shrink-0", color)} />
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-[13px] font-medium text-[var(--text-primary)] truncate">
          {title}
        </span>
        <span className="text-[11px] text-[var(--text-tertiary)]">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
