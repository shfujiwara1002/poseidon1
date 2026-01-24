"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check, RotateCw } from "lucide-react";

type ActionStatus = "pending" | "in_progress" | "completed";

interface ActionCardProps {
  status: ActionStatus;
  title: string;
  subtitle: string;
  amount?: string;
  amountSubtext?: string;
  savingsText?: string;
  isReversible?: boolean;
  progressText?: string;
  progressStep?: string;
  timestamp?: string;
  accentColor?: "blue" | "cyan" | "green";
  onApprove?: () => void;
  onDismiss?: () => void;
  onViewDetails?: () => void;
}

const accentColors = {
  blue: "bg-[var(--accent-blue)]",
  cyan: "bg-[var(--accent-cyan)]",
  green: "bg-[var(--success)]",
};

export function ActionCard({
  status,
  title,
  subtitle,
  amount,
  amountSubtext,
  savingsText,
  isReversible = false,
  progressText,
  progressStep,
  timestamp,
  accentColor = "blue",
  onApprove,
  onDismiss,
  onViewDetails,
}: ActionCardProps) {
  if (status === "completed") {
    return (
      <div className="flex items-start gap-3 rounded-xl bg-[var(--surface)] p-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--success-tint)]">
          <Check className="w-4 h-4 text-[var(--success)]" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[var(--text-primary)]">
              {title}
            </span>
            <div className="px-2 py-0.5 rounded-md bg-[var(--success-tint)]">
              <span className="text-[10px] font-semibold text-[var(--success)]">
                Protected
              </span>
            </div>
          </div>
          <span className="text-[12px] text-[var(--text-tertiary)]">
            {subtitle}
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[12px] font-mono text-[var(--text-secondary)]">
              {amountSubtext}
            </span>
            <span className="text-[11px] text-[var(--text-tertiary)]">
              {timestamp}
            </span>
          </div>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[var(--accent-blue)]"
            >
              View Details
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === "in_progress") {
    return (
      <div className="flex rounded-xl bg-[var(--surface)] overflow-hidden">
        <div className={cn("w-1", accentColors[accentColor])} />
        <div className="flex flex-col gap-3 p-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
              <span className="text-[14px] font-semibold text-[var(--text-primary)]">
                {title}
              </span>
            </div>
          </div>
          <span className="text-[12px] text-[var(--text-tertiary)]">
            {subtitle}
          </span>

          {progressText && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[var(--accent-cyan)]">
                  {progressText}
                </span>
                {progressStep && (
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    {progressStep}
                  </span>
                )}
              </div>
              <div className="h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-cyan)] rounded-full transition-all"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {amount && (
              <span className="text-[16px] font-bold font-mono text-[var(--text-primary)]">
                {amount}
              </span>
            )}
            {savingsText && (
              <div className="px-2 py-1 rounded-md bg-[var(--success-tint)]">
                <span className="text-[11px] font-semibold text-[var(--success)]">
                  {savingsText}
                </span>
              </div>
            )}
          </div>

          {isReversible && (
            <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
              <RotateCw className="w-3 h-3" />
              <span className="text-[11px] font-medium">Reversible</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: pending status
  return (
    <div className="flex rounded-xl bg-[var(--surface)] overflow-hidden">
      <div className={cn("w-1", accentColors[accentColor])} />
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[var(--text-primary)]">
            {title}
          </span>
          {savingsText && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--success-tint)]">
              <ArrowRight className="w-3 h-3 text-[var(--success)] -rotate-45" />
              <span className="text-[11px] font-semibold text-[var(--success)]">
                {savingsText}
              </span>
            </div>
          )}
        </div>
        <span className="text-[12px] text-[var(--text-tertiary)]">
          {subtitle}
        </span>

        {amount && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[20px] font-bold font-mono text-[var(--text-primary)]">
              {amount}
            </span>
            {amountSubtext && (
              <span className="text-[11px] text-[var(--text-tertiary)]">
                {amountSubtext}
              </span>
            )}
          </div>
        )}

        <span className="text-[11px] text-[var(--text-tertiary)]">
          {timestamp}
        </span>

        {isReversible && (
          <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
            <RotateCw className="w-3 h-3" />
            <span className="text-[11px] font-medium">Reversible</span>
          </div>
        )}

        <div className="flex items-center gap-3 mt-1">
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-cyan)]"
            >
              <span className="text-[13px] font-semibold text-white">
                Review & Approve
              </span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="px-4 py-2.5 rounded-lg bg-[var(--border-subtle)]"
            >
              <span className="text-[13px] font-semibold text-[var(--text-secondary)]">
                Dismiss
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
