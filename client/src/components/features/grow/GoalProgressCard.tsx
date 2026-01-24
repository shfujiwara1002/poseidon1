/**
 * GoalProgressCard Component
 * Displays financial goal with progress bar and details
 * @see specs/components/features/grow/grow-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  Calendar,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

interface FinancialGoal {
  id: number | string;
  name: string;
  type: string;
  status: string;
  priority: string;
  targetAmount: string | number;
  currentAmount: string | number;
  percentComplete: number | null;
  onTrack: boolean | null;
  targetDate: Date | string | null;
  daysRemaining: number | null;
}

interface GoalProgressCardProps {
  goal: FinancialGoal;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
  showForecast?: boolean;
  compact?: boolean;
}

const goalTypeIcons: Record<string, typeof Target> = {
  emergency_fund: Target,
  retirement: Target,
  home_purchase: Target,
  vehicle: Target,
  education: Target,
  vacation: Target,
  debt_payoff: Target,
  investment: TrendingUp,
  custom: Target,
};

const priorityColors: Record<string, string> = {
  low: 'text-slate-400',
  medium: 'text-blue-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function GoalProgressCard({
  goal,
  onEdit,
  onDelete,
  onViewDetails,
  showForecast = true,
  compact = false,
}: GoalProgressCardProps) {
  const Icon = goalTypeIcons[goal.type] || Target;
  const progress = goal.percentComplete ?? 0;
  const isOnTrack = goal.onTrack ?? true;
  const isCompleted = goal.status === 'completed';

  return (
    <Card className={cn(
      "bg-slate-900/50 border-slate-800 overflow-hidden",
      !isOnTrack && "border-orange-500/30"
    )}>
      {/* Grow engine accent */}
      <div
        className="h-1 w-full"
        style={{ background: colors.gradients.grow }}
      />

      <CardHeader className={cn("pb-2", compact && "p-3")}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              {isCompleted ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Icon className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-white">{goal.name}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="capitalize">{goal.type.replace('_', ' ')}</span>
                <span className={priorityColors[goal.priority]}>
                  {goal.priority} priority
                </span>
              </div>
            </div>
          </div>
          {(onEdit || onDelete || onViewDetails) && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", compact && "p-3 pt-0")}>
        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Progress</span>
            <span className="text-white font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-slate-800"
          />
        </div>

        {/* Amount */}
        <div className="flex justify-between items-baseline mb-3">
          <div>
            <span className="text-2xl font-bold text-white">
              {formatCurrency(goal.currentAmount)}
            </span>
            <span className="text-slate-400 text-sm ml-1">
              / {formatCurrency(goal.targetAmount)}
            </span>
          </div>
        </div>

        {/* Status indicators */}
        {!compact && (
          <div className="flex items-center gap-4 text-sm">
            {goal.targetDate && (
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(goal.targetDate).toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
            {goal.daysRemaining !== null && (
              <span className="text-slate-500">
                {goal.daysRemaining} days left
              </span>
            )}
            {!isOnTrack && (
              <div className="flex items-center gap-1 text-orange-400">
                <AlertCircle className="h-4 w-4" />
                <span>Behind schedule</span>
              </div>
            )}
          </div>
        )}

        {/* View Details */}
        {onViewDetails && !compact && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-slate-400 hover:text-white"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default GoalProgressCard;
