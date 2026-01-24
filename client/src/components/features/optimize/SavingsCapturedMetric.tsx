/**
 * SavingsCapturedMetric Component
 * Displays total savings captured through optimizations
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

type Trend = 'up' | 'stable' | 'down';

interface SavingsCapturedMetricProps {
  totalSavings: number;
  monthlySavings: number;
  yearlySavings: number;
  savingsGoal?: number;
  percentOfGoal?: number;
  trend?: Trend;
  onViewDetails?: () => void;
  isLoading?: boolean;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
}

const trendConfig: Record<Trend, { icon: typeof TrendingUp; color: string; label: string }> = {
  up: { icon: TrendingUp, color: 'text-green-400', label: 'Increasing' },
  stable: { icon: Minus, color: 'text-slate-400', label: 'Stable' },
  down: { icon: TrendingDown, color: 'text-red-400', label: 'Decreasing' },
};

export function SavingsCapturedMetric({
  totalSavings,
  monthlySavings,
  yearlySavings,
  savingsGoal,
  percentOfGoal,
  trend,
  onViewDetails,
  isLoading = false,
}: SavingsCapturedMetricProps) {
  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-10 bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <Card
      className={cn(
        'bg-slate-900/50 border-slate-800 overflow-hidden',
        onViewDetails && 'cursor-pointer hover:border-slate-700 transition-colors'
      )}
      onClick={onViewDetails}
    >
      {/* Optimize engine accent */}
      <div
        className="h-1 w-full"
        style={{ background: colors.gradients.optimize }}
      />

      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-sm text-slate-400">Savings Captured</span>
          </div>
          {trend && TrendIcon && (
            <div className={cn('flex items-center gap-1', trendConfig[trend].color)}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-xs">{trendConfig[trend].label}</span>
            </div>
          )}
        </div>

        {/* Total savings */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">
            {formatCurrency(totalSavings)}
          </span>
          <span className="text-slate-400 text-sm ml-2">total</span>
        </div>

        {/* Monthly/Yearly breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Monthly</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(monthlySavings)}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Yearly</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(yearlySavings)}
            </p>
          </div>
        </div>

        {/* Goal progress */}
        {savingsGoal && percentOfGoal !== undefined && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-1 text-slate-400">
                <Target className="h-4 w-4" />
                <span>Goal: {formatCurrency(savingsGoal)}</span>
              </div>
              <span className="text-purple-400 font-medium">
                {percentOfGoal.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={percentOfGoal}
              className="h-2 bg-slate-800"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SavingsCapturedMetric;
