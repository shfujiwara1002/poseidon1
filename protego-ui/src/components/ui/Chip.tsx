"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <div
      className={cn(
        "flex items-center h-7 px-3 rounded-full bg-[var(--surface)] text-[12px] font-medium text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </div>
  );
}
