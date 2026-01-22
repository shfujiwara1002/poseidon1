/**
 * TrendIndicator Component
 * Displays forecast trend with arrow and percentage
 * @see specs/components/features/grow/grow-components.spec.ts
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type ForecastTrend = 'improving' | 'stable' | 'declining';

interface TrendIndicatorProps {
  trend: ForecastTrend;
  percentChange: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const trendConfig = {
  improving: {
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    label: 'Improving',
  },
  stable: {
    icon: Minus,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    label: 'Stable',
  },
  declining: {
    icon: TrendingDown,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    label: 'Declining',
  },
} as const;

const sizeClasses = {
  sm: { container: 'text-xs gap-1', icon: 'h-3 w-3' },
  md: { container: 'text-sm gap-1.5', icon: 'h-4 w-4' },
  lg: { container: 'text-base gap-2', icon: 'h-5 w-5' },
};

export function TrendIndicator({
  trend,
  percentChange,
  size = 'md',
  showLabel = true,
}: TrendIndicatorProps) {
  const config = trendConfig[trend];
  const Icon = config.icon;

  const formattedChange = percentChange >= 0
    ? `+${percentChange.toFixed(1)}%`
    : `${percentChange.toFixed(1)}%`;

  return (
    <div className={cn(
      'inline-flex items-center rounded-full px-2 py-1',
      config.bg,
      sizeClasses[size].container
    )}>
      <Icon className={cn(config.color, sizeClasses[size].icon)} />
      <span className={cn('font-medium', config.color)}>
        {formattedChange}
      </span>
      {showLabel && (
        <span className={cn('opacity-75', config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}

export default TrendIndicator;
