"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Shield, TrendingUp, Zap, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { icon: LayoutDashboard, label: "Home", href: "/", activeColor: "text-[var(--accent-blue)]" },
  { icon: Shield, label: "Protect", href: "/protect", activeColor: "text-[var(--accent-blue)]" },
  { icon: TrendingUp, label: "Grow", href: "/grow", activeColor: "text-[var(--accent-cyan)]" },
  { icon: Zap, label: "Execute", href: "/execute", activeColor: "text-[var(--accent-cyan)]" },
  { icon: Settings, label: "Settings", href: "/settings", activeColor: "text-[var(--text-tertiary)]" },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-around h-[83px] bg-[var(--background-secondary)] border-t border-[var(--border-subtle)] pt-3 pb-[34px] w-full">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href ||
          (tab.href !== "/" && pathname.startsWith(tab.href));
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-1 w-[75px]"
          >
            <Icon
              className={cn(
                "w-6 h-6",
                isActive ? tab.activeColor : "text-[var(--text-tertiary)]"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                isActive
                  ? `${tab.activeColor} font-semibold`
                  : "text-[var(--text-tertiary)] font-medium"
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
