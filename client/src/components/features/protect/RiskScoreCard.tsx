/**
 * RiskScoreCard Component
 * Displays the user's protection/risk score with trend indicator
 * @see specs/components/features/protect/protect-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

// Props aligned with spec (simplified for runtime - no z.function validation)
interface RiskScoreCardProps {
  score: number;
  trend: 'improving' | 'stable' | 'declining';
  previousScore?: number;
  lastUpdated: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const trendConfig = {
  improving: {
    icon: TrendingUp,
    color: 'text-green-500',
    label: 'Improving',
  },
  stable: {
    icon: Minus,
    color: 'text-slate-400',
    label: 'Stable',
  },
  declining: {
    icon: TrendingDown,
    color: 'text-red-500',
    label: 'Declining',
  },
} as const;

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 50) return 'text-yellow-500';
  return 'text-red-500';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'At Risk';
}

export function RiskScoreCard({
  score,
  trend,
  previousScore,
  lastUpdated,
  onRefresh,
  isLoading = false,
}: RiskScoreCardProps) {
  const TrendIcon = trendConfig[trend].icon;
  const trendColor = trendConfig[trend].color;
  const scoreChange = previousScore ? score - previousScore : 0;

  return (
    <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
      {/* Protect engine accent */}
      <div
        className="h-1 w-full"
        style={{ background: colors.gradients.protect }}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <h3 className="text-sm font-medium text-slate-400">Protection Score</h3>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4 text-slate-400", isLoading && "animate-spin")} />
          </button>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-baseline gap-3">
          <span className={cn("text-5xl font-bold font-display", getScoreColor(score))}>
            {score}
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-slate-500">/100</span>
            <span className={cn("text-xs font-medium", getScoreColor(score))}>
              {getScoreLabel(score)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <TrendIcon className={cn("h-4 w-4", trendColor)} />
          <span className={cn("text-sm", trendColor)}>
            {trendConfig[trend].label}
          </span>
          {scoreChange !== 0 && (
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded",
              scoreChange > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {scoreChange > 0 ? '+' : ''}{scoreChange}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Updated {new Date(lastUpdated).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </CardContent>
    </Card>
  );
}

export default RiskScoreCard;
