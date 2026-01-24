"use client";

import { Signal, Wifi, Battery } from "lucide-react";

interface StatusBarProps {
  time?: string;
}

export function StatusBar({ time = "9:41" }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between h-11 px-6 w-full">
      <span className="text-[15px] font-semibold text-[var(--text-primary)]">
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4 text-[var(--text-primary)]" />
        <Wifi className="w-4 h-4 text-[var(--text-primary)]" />
        <div className="w-6 h-3 bg-[var(--text-primary)] rounded-[3px]" />
      </div>
    </div>
  );
}
