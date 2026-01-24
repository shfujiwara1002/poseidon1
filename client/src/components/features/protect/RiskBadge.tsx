/**
 * RiskBadge Component
 * Displays transaction risk level with optional score
 * @see specs/components/features/protect/protect-components.spec.ts
 */

import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

type RiskFlag = 'none' | 'low' | 'medium' | 'high' | 'critical';

interface RiskBadgeProps {
  riskFlag: RiskFlag;
  riskScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

const riskConfig: Record<RiskFlag, {
  label: string;
  color: string;
  bg: string;
  icon: typeof ShieldCheck;
}> = {
  none: {
    label: 'Safe',
    color: colors.risk.none,
    bg: 'bg-green-500/10',
    icon: ShieldCheck,
  },
  low: {
    label: 'Low Risk',
    color: colors.risk.low,
    bg: 'bg-green-500/10',
    icon: ShieldCheck,
  },
  medium: {
    label: 'Medium',
    color: colors.risk.medium,
    bg: 'bg-yellow-500/10',
    icon: ShieldAlert,
  },
  high: {
    label: 'High Risk',
    color: colors.risk.high,
    bg: 'bg-orange-500/10',
    icon: ShieldAlert,
  },
  critical: {
    label: 'Critical',
    color: colors.risk.critical,
    bg: 'bg-red-500/10',
    icon: ShieldX,
  },
};

const sizeClasses = {
  sm: { badge: 'text-xs px-1.5 py-0.5', icon: 'h-3 w-3' },
  md: { badge: 'text-sm px-2 py-1', icon: 'h-4 w-4' },
  lg: { badge: 'text-base px-3 py-1.5', icon: 'h-5 w-5' },
};

export function RiskBadge({
  riskFlag,
  riskScore,
  size = 'md',
  showScore = false,
}: RiskBadgeProps) {
  const config = riskConfig[riskFlag];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        sizeClasses[size].badge
      )}
      style={{ color: config.color }}
    >
      <Icon className={sizeClasses[size].icon} />
      <span>{config.label}</span>
      {showScore && riskScore !== undefined && (
        <span className="opacity-75">({riskScore})</span>
      )}
    </span>
  );
}

export default RiskBadge;
