"use client";

import { cn } from "@/lib/utils";
import {
  Waves,
  LayoutDashboard,
  Shield,
  Wallet,
  ScrollText,
  ArrowLeft,
  FileText,
  Car,
  ShoppingBag,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, href: "/" },
  { icon: Shield, href: "/protect", active: true },
  { icon: Wallet, href: "/accounts" },
  { icon: ScrollText, href: "/audit" },
];

export function WebDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[var(--background)]">
      {/* Sidebar */}
      <div className="flex flex-col items-center gap-8 w-[72px] h-full bg-[var(--background-secondary)] border-r border-[var(--border-subtle)] py-6">
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 bg-[var(--accent-blue)] rounded-[10px]">
          <Waves className="w-6 h-6 text-white" />
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.active || pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] transition-colors",
                  isActive
                    ? "bg-[var(--surface)]"
                    : "bg-transparent hover:bg-[var(--surface)]"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    isActive
                      ? "text-[var(--accent-blue)]"
                      : "text-[var(--text-tertiary)]"
                  )}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-8 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-4">
            <Link
              href="/protect"
              className="flex items-center justify-center w-9 h-9 bg-[var(--surface)] rounded-[var(--radius-sm)]"
            >
              <ArrowLeft className="w-[18px] h-[18px] text-[var(--text-primary)]" />
            </Link>
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                Location Conflict Detected
              </span>
              <span className="text-[13px] text-[var(--text-tertiary)]">
                Case #EVT-2026-01-24-00847 • High Confidence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 h-9 px-3.5 border border-[var(--border)] rounded-[var(--radius-sm)]">
              <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
              <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                View Audit Log
              </span>
            </button>
            <Badge variant="high">High</Badge>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 gap-8 p-8 overflow-auto">
          {/* Left Panel */}
          <div className="flex flex-col gap-6 flex-1">
            <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
              EVIDENCE
            </span>

            {/* Transaction Card */}
            <div className="flex flex-col gap-4 bg-white rounded-[var(--radius-md)] p-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-semibold text-[#0F172A]">
                    ElectroMart
                  </span>
                  <span className="text-[14px] text-[var(--text-tertiary)]">
                    Electronics • London, United Kingdom
                  </span>
                </div>
                <span className="text-[32px] font-bold text-[#0F172A]">
                  $487.00
                </span>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                      Date & Time
                    </span>
                    <span className="text-[14px] font-medium text-[#0F172A]">
                      Jan 24, 2026, 3:47 AM GMT
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                      Channel
                    </span>
                    <span className="text-[14px] font-medium text-[#0F172A]">
                      Card-present (chip read)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                      Account
                    </span>
                    <span className="text-[14px] font-medium text-[#0F172A]">
                      Chase Visa ••••4521
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                      Risk Score
                    </span>
                    <span className="text-[14px] font-bold text-[var(--critical)]">
                      87/100 • High
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-[var(--radius-md)] p-5">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[var(--text-primary)]">
                  Cross-Account Conflict
                </span>
                <div className="flex items-center h-6 px-2.5 rounded-full bg-[var(--critical-tint)]">
                  <span className="text-[11px] font-semibold text-[var(--critical)]">
                    Physical Impossibility
                  </span>
                </div>
              </div>

              {/* Map Visualization */}
              <div className="relative h-[180px] bg-gradient-to-br from-[#0F172A] to-[var(--surface)] rounded-[var(--radius-sm)]">
                <div className="absolute left-[80px] top-[70px] flex flex-col items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-blue)] border-2 border-white" />
                  <span className="text-[11px] font-semibold text-white">
                    New York
                  </span>
                </div>
                <div className="absolute right-[80px] top-[50px] flex flex-col items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-[var(--critical)] border-2 border-white" />
                  <span className="text-[11px] font-semibold text-white">
                    London
                  </span>
                </div>
                <div className="absolute left-1/2 top-[80px] -translate-x-1/2 flex items-center h-6 px-3 rounded-full bg-[#0A162890]">
                  <span className="text-[11px] font-semibold text-white">
                    3,459 miles • 15 min apart
                  </span>
                </div>
                <div className="absolute left-[100px] right-[100px] top-[77px] h-0.5 bg-white/40" />
              </div>

              {/* Timeline */}
              <div className="flex gap-4">
                <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-[var(--radius-sm)] flex-1">
                  <div className="flex items-center justify-center w-9 h-9 rounded-[18px] bg-[var(--accent-blue-tint)]">
                    <Car className="w-4 h-4 text-[var(--accent-blue)]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                      Uber ride, Manhattan
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      10:32 PM EST • Citi ••••7890
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-[var(--radius-sm)] flex-1">
                  <div className="flex items-center justify-center w-9 h-9 rounded-[18px] bg-[var(--critical-tint)]">
                    <ShoppingBag className="w-4 h-4 text-[var(--critical)]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                      ElectroMart, London
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      10:47 PM EST • Chase ••••4521
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6 w-[400px]">
            <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
              EXPLANATION & ACTION
            </span>

            {/* AI Explanation */}
            <div className="flex flex-col gap-4 bg-[var(--indigo-tint)] border border-[var(--indigo-border)] rounded-[var(--radius-md)] p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-[18px] h-[18px] text-[#4F46E5]" />
                <span className="text-[14px] font-semibold text-[#4F46E5]">
                  AI-Generated Explanation
                </span>
              </div>
              <p className="text-[14px] text-[var(--surface)] leading-[1.6]">
                Poseidon detected conflicting card-present activity across your
                linked accounts. Your Chase Visa was used in London while your
                Citi debit card completed a transaction in New York within the
                same 15-minute window.
              </p>
              <span className="text-[12px] font-medium text-[var(--indigo)]">
                Sources: Location conflict, Cross-account triangulation,
                Physical impossibility
              </span>
            </div>

            {/* Action Card */}
            <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-[var(--radius-md)] p-5">
              <p className="text-[13px] text-[var(--text-secondary)]">
                Your response helps improve detection accuracy and is logged for
                your records.
              </p>

              <Button variant="danger" className="w-full">
                This was NOT me
              </Button>

              <Button variant="success" className="w-full">
                This was me
              </Button>

              <button className="h-10 text-[14px] font-medium text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                I need more time
              </button>
            </div>

            {/* Audit Link */}
            <div className="flex items-center justify-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
              <span className="text-[13px] font-medium text-[var(--accent-blue)]">
                View full audit trail
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
