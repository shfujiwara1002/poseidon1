"use client";

import { cn } from "@/lib/utils";
import { Shield, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type EngineVariant = "protect" | "grow" | "execute";

interface EngineCardProps {
  variant: EngineVariant;
  metric: string;
  badgeText: string;
  badgeVariant: "success" | "low" | "cyan";
  href?: string;
}

const variantConfig = {
  protect: {
    icon: Shield,
    title: "Protect",
    iconColor: "text-[var(--accent-blue)]",
    bgColor: "bg-[var(--background)]",
    borderColor: "border-[var(--border-subtle)]",
    hoverBorder: "hover:border-[var(--accent-blue)]",
  },
  grow: {
    icon: TrendingUp,
    title: "Grow",
    iconColor: "text-[var(--accent-cyan)]",
    bgColor: "bg-[#0A1A1F]",
    borderColor: "border-[#164E63]",
    hoverBorder: "hover:border-[var(--accent-cyan)]",
  },
  execute: {
    icon: Zap,
    title: "Execute",
    iconColor: "text-[var(--accent-cyan)]",
    bgColor: "bg-[#0A1A1F]",
    borderColor: "border-[#164E63]",
    hoverBorder: "hover:border-[var(--accent-cyan)]",
  },
};

export function EngineCard({ variant, metric, badgeText, badgeVariant, href }: EngineCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  const content = (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-3 rounded-[var(--radius-md)] border flex-1 transition-colors cursor-pointer",
        config.bgColor,
        config.borderColor,
        config.hoverBorder
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5">
          <Icon className={cn("w-[18px] h-[18px]", config.iconColor)} />
          <span className="text-[14px] font-semibold text-[var(--text-primary)]">
            {config.title}
          </span>
        </div>
        <Badge variant={badgeVariant}>{badgeText}</Badge>
      </div>
      <span className="text-[12px] font-medium text-[var(--text-secondary)]">
        {metric}
      </span>
    </div>
  );

  if (href) {
    return <Link href={href} className="flex-1">{content}</Link>;
  }

  return content;
}
