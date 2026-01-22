/**
 * AutomationLogEntry Component
 * Displays single automation log entry
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { CheckCircle, XCircle, Clock, AlertTriangle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionType = 'approve' | 'reject' | 'execute' | 'schedule' | 'auto_execute' | 'expire';
type ActionResult = 'success' | 'failure' | 'pending';

interface AutomationLogEntry {
  id: string;
  optimizationId: string;
  optimizationTitle: string;
  actionType: ActionType;
  result: ActionResult;
  timestamp: string | Date;
  details?: string;
  savingsRealized?: number;
}

interface AutomationLogEntryProps {
  entry: AutomationLogEntry;
  onViewOptimization?: () => void;
  showDetails?: boolean;
}

const actionTypeConfig: Record<ActionType, {
  icon: typeof CheckCircle;
  label: string;
  color: string;
}> = {
  approve: {
    icon: CheckCircle,
    label: 'Approved',
    color: 'text-green-400',
  },
  reject: {
    icon: XCircle,
    label: 'Rejected',
    color: 'text-red-400',
  },
  execute: {
    icon: Zap,
    label: 'Executed',
    color: 'text-purple-400',
  },
  schedule: {
    icon: Clock,
    label: 'Scheduled',
    color: 'text-blue-400',
  },
  auto_execute: {
    icon: Zap,
    label: 'Auto-Executed',
    color: 'text-cyan-400',
  },
  expire: {
    icon: AlertTriangle,
    label: 'Expired',
    color: 'text-amber-400',
  },
};

const resultColors: Record<ActionResult, string> = {
  success: 'border-l-green-500',
  failure: 'border-l-red-500',
  pending: 'border-l-blue-500',
};

function formatTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function AutomationLogEntry({
  entry,
  onViewOptimization,
  showDetails = false,
}: AutomationLogEntryProps) {
  const config = actionTypeConfig[entry.actionType];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'bg-slate-800/50 rounded-lg p-3 border-l-2',
        resultColors[entry.result],
        onViewOptimization && 'cursor-pointer hover:bg-slate-800 transition-colors'
      )}
      onClick={onViewOptimization}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5', config.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-medium', config.color)}>
              {config.label}
            </span>
            <span className="text-xs text-slate-500">
              {formatTimestamp(entry.timestamp)}
            </span>
          </div>
          <p className="text-sm text-white truncate">{entry.optimizationTitle}</p>
          {showDetails && entry.details && (
            <p className="text-xs text-slate-400 mt-1">{entry.details}</p>
          )}
          {entry.savingsRealized !== undefined && entry.savingsRealized > 0 && (
            <p className="text-xs text-green-400 mt-1">
              +${entry.savingsRealized.toLocaleString()} saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AutomationLogEntry;
