"use client";

import { cn } from "@/lib/utils";
import {
  Waves,
  LayoutDashboard,
  Shield,
  TrendingUp,
  Zap,
  ScrollText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabBar } from "@/components/ui/TabBar";

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Home", href: "/", activeColor: "text-[var(--accent-blue)]" },
  { icon: Shield, label: "Protect", href: "/protect", activeColor: "text-[var(--accent-blue)]" },
  { icon: TrendingUp, label: "Grow", href: "/grow", activeColor: "text-[var(--accent-cyan)]" },
  { icon: Zap, label: "Execute", href: "/execute", activeColor: "text-[var(--accent-cyan)]" },
  { icon: ScrollText, label: "Audit", href: "/audit", activeColor: "text-[var(--accent-blue)]" },
  { icon: Settings, label: "Settings", href: "/settings", activeColor: "text-[var(--accent-blue)]" },
];

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[var(--background)]">
      {/* Desktop Sidebar - hidden on mobile */}
      {!hideNav && (
        <div className="hidden lg:flex flex-col items-center gap-8 w-[72px] h-full bg-[var(--background-secondary)] border-r border-[var(--border-subtle)] py-6 shrink-0">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--accent-blue)] rounded-[10px]">
              <Waves className="w-6 h-6 text-white" />
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex flex-col gap-2">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] transition-colors group relative",
                    isActive
                      ? "bg-[var(--surface)]"
                      : "bg-transparent hover:bg-[var(--surface)]"
                  )}
                  title={item.label}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6",
                      isActive
                        ? item.activeColor
                        : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>

        {/* Mobile Tab Bar - hidden on desktop */}
        {!hideNav && (
          <div className="lg:hidden">
            <TabBar />
          </div>
        )}
      </div>
    </div>
  );
}
