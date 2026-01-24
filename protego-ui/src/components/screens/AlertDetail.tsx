"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  MapPin,
  Car,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface AlertDetailProps {
  id: string;
}

export function AlertDetail({ id }: AlertDetailProps) {
  // Mock data - in real app, fetch based on id
  const alert = {
    title: "Location Conflict Detected",
    severity: "high" as const,
    timestamp: "2 min ago",
    merchant: "ElectroMart",
    category: "Electronics • London, United Kingdom",
    amount: "$487.00",
    dateTime: "Jan 24, 2026, 3:47 AM GMT",
    channel: "Card-present (chip read)",
    account: "Chase Visa ••••4521",
    riskScore: "87/100 • High",
    distance: "3,459 miles • 15 min apart",
    caseId: "EVT-2026-01-24-00847",
    chips: ["New location", "Unusual time", "New merchant"],
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full w-full">
        {/* Mobile Status Bar - hidden on desktop */}
        <div className="lg:hidden">
          <StatusBar time="9:41" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8 lg:border-b lg:border-[var(--border-subtle)]">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/protect">
              <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
            </Link>
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              Alert Details
            </span>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/protect"
              className="flex items-center justify-center w-9 h-9 bg-[var(--surface)] rounded-[var(--radius-sm)] hover:bg-[var(--surface-elevated)] transition-colors"
            >
              <ArrowLeft className="w-[18px] h-[18px] text-[var(--text-primary)]" />
            </Link>
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                {alert.title}
              </span>
              <span className="text-[13px] text-[var(--text-tertiary)]">
                Case #{alert.caseId} • High Confidence
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Audit Button */}
            <button className="hidden lg:flex items-center gap-2 h-9 px-3.5 border border-[var(--border)] rounded-[var(--radius-sm)] hover:bg-[var(--surface)] transition-colors">
              <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
              <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                View Audit Log
              </span>
            </button>
            <Badge variant={alert.severity}>High</Badge>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-6 p-4 lg:p-8">
            {/* Left Column - Evidence */}
            <div className="flex flex-col gap-6 flex-1 lg:max-w-2xl">
              <span className="text-[11px] font-bold text-[var(--text-tertiary)] tracking-[1px]">
                EVIDENCE
              </span>

              {/* Transaction Card */}
              <div className="flex flex-col gap-4 bg-white rounded-[var(--radius-md)] p-5">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-xl font-semibold text-[#0F172A]">
                      {alert.merchant}
                    </span>
                    <span className="text-[14px] text-[var(--text-tertiary)]">
                      {alert.category}
                    </span>
                  </div>
                  <span className="text-[28px] lg:text-[32px] font-bold text-[#0F172A]">
                    {alert.amount}
                  </span>
                </div>

                <div className="flex gap-6 lg:gap-8">
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                        Date & Time
                      </span>
                      <span className="text-[14px] font-medium text-[#0F172A]">
                        {alert.dateTime}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                        Channel
                      </span>
                      <span className="text-[14px] font-medium text-[#0F172A]">
                        {alert.channel}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                        Account
                      </span>
                      <span className="text-[14px] font-medium text-[#0F172A]">
                        {alert.account}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-medium text-[var(--text-tertiary)]">
                        Risk Score
                      </span>
                      <span className="text-[14px] font-bold text-[var(--critical)]">
                        {alert.riskScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {alert.chips.map((chip, index) => (
                    <Chip key={index}>{chip}</Chip>
                  ))}
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
                  <div className="absolute left-[60px] lg:left-[80px] top-[70px] flex flex-col items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-blue)] border-2 border-white" />
                    <span className="text-[11px] font-semibold text-white">
                      New York
                    </span>
                  </div>
                  <div className="absolute right-[60px] lg:right-[80px] top-[50px] flex flex-col items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--critical)] border-2 border-white" />
                    <span className="text-[11px] font-semibold text-white">
                      London
                    </span>
                  </div>
                  <div className="absolute left-1/2 top-[80px] -translate-x-1/2 flex items-center h-6 px-3 rounded-full bg-[#0A162890]">
                    <span className="text-[11px] font-semibold text-white">
                      {alert.distance}
                    </span>
                  </div>
                  <div className="absolute left-[80px] right-[80px] lg:left-[100px] lg:right-[100px] top-[77px] h-0.5 bg-white/40" />
                </div>

                {/* Timeline Events */}
                <div className="flex flex-col lg:flex-row gap-4">
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

            {/* Right Column - Explanation & Action */}
            <div className="flex flex-col gap-6 lg:w-[400px]">
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
                  Poseidon detected conflicting card-present activity across
                  your linked accounts. Your Chase Visa was used in London while
                  your Citi debit card completed a transaction in New York
                  within the same 15-minute window.
                </p>
                <span className="text-[12px] font-medium text-[var(--indigo)]">
                  Sources: Location conflict, Cross-account triangulation,
                  Physical impossibility
                </span>
              </div>

              {/* Action Card */}
              <div className="flex flex-col gap-4 bg-[var(--surface)] rounded-[var(--radius-md)] p-5">
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Your response helps improve detection accuracy and is logged
                  for your records.
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
              <div className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span className="text-[13px] font-medium text-[var(--accent-blue)]">
                  View full audit trail
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
