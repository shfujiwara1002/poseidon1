"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "high" | "medium" | "low" | "success" | "cyan";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; dot: string; text: string }> = {
  high: {
    bg: "bg-[var(--critical-tint)]",
    dot: "bg-[var(--critical)]",
    text: "text-[var(--critical)]",
  },
  medium: {
    bg: "bg-[var(--warning-tint)]",
    dot: "bg-[var(--warning)]",
    text: "text-[var(--warning)]",
  },
  low: {
    bg: "bg-[var(--accent-blue-tint)]",
    dot: "bg-[var(--accent-blue)]",
    text: "text-[var(--accent-blue)]",
  },
  success: {
    bg: "bg-[var(--success-tint)]",
    dot: "bg-[var(--success)]",
    text: "text-[var(--success)]",
  },
  cyan: {
    bg: "bg-[var(--accent-cyan-light)]",
    dot: "bg-[var(--accent-cyan)]",
    text: "text-[var(--accent-cyan)]",
  },
};

export function Badge({ variant, children, className }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 h-6 px-2.5 rounded-full",
        styles.bg,
        className
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", styles.dot)} />
      <span className={cn("text-xs font-semibold", styles.text)}>{children}</span>
    </div>
  );
}
