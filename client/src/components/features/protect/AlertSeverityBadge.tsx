/**
 * AlertSeverityBadge Component
 * Displays alert severity level with appropriate styling
 * @see specs/components/features/protect/protect-components.spec.ts
 */

import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

interface AlertSeverityBadgeProps {
  severity: AlertSeverity;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const severityConfig: Record<AlertSeverity, { label: string; color: string; bg: string }> = {
  low: {
    label: 'Low',
    color: colors.severity.low,
    bg: 'bg-green-500/10',
  },
  medium: {
    label: 'Medium',
    color: colors.severity.medium,
    bg: 'bg-yellow-500/10',
  },
  high: {
    label: 'High',
    color: colors.severity.high,
    bg: 'bg-orange-500/10',
  },
  critical: {
    label: 'Critical',
    color: colors.severity.critical,
    bg: 'bg-red-500/10',
  },
};

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function AlertSeverityBadge({
  severity,
  size = 'md',
  showLabel = true,
}: AlertSeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        sizeClasses[size]
      )}
      style={{ color: config.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {showLabel && config.label}
    </span>
  );
}

export default AlertSeverityBadge;
