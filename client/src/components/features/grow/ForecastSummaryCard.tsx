/**
 * ForecastSummaryCard Component
 * Displays forecast summary for a specific type
 * @see specs/components/features/grow/grow-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendIndicator } from './TrendIndicator';
import {
  DollarSign,
  TrendingUp,
  Wallet,
  PiggyBank,
  ArrowRightLeft,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

type ForecastType = 'revenue' | 'expense' | 'net_worth' | 'savings' | 'cashflow' | 'investment_return';

interface ForecastSummaryCardProps {
  type: ForecastType;
  predictedValue: number;
  confidenceLow?: number;
  confidenceHigh?: number;
  percentChange: number;
  trend: 'improving' | 'stable' | 'declining';
  previousValue?: number;
  onViewDetails?: () => void;
  compact?: boolean;
  isLoading?: boolean;
}

const forecastTypeConfig: Record<ForecastType, {
  label: string;
  icon: typeof DollarSign;
  color: string;
}> = {
  revenue: {
    label: 'Revenue',
    icon: DollarSign,
    color: 'text-green-500',
  },
  expense: {
    label: 'Expenses',
    icon: Wallet,
    color: 'text-red-500',
  },
  net_worth: {
    label: 'Net Worth',
    icon: TrendingUp,
    color: 'text-blue-500',
  },
  savings: {
    label: 'Savings',
    icon: PiggyBank,
    color: 'text-green-500',
  },
  cashflow: {
    label: 'Cash Flow',
    icon: ArrowRightLeft,
    color: 'text-purple-500',
  },
  investment_return: {
    label: 'Investment Return',
    icon: BarChart3,
    color: 'text-cyan-500',
  },
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ForecastSummaryCard({
  type,
  predictedValue,
  confidenceLow,
  confidenceHigh,
  percentChange,
  trend,
  previousValue,
  onViewDetails,
  compact = false,
  isLoading = false,
}: ForecastSummaryCardProps) {
  const config = forecastTypeConfig[type];
  const Icon = config.icon;

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-8 bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "bg-slate-900/50 border-slate-800 overflow-hidden cursor-pointer transition-colors hover:border-slate-700",
        onViewDetails && "cursor-pointer"
      )}
      onClick={onViewDetails}
    >
      {/* Grow engine accent */}
      <div
        className="h-1 w-full"
        style={{ background: colors.gradients.grow }}
      />

      <CardContent className={cn("p-4", compact && "p-3")}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.color)} />
            <span className="text-sm text-slate-400">{config.label}</span>
          </div>
          <TrendIndicator
            trend={trend}
            percentChange={percentChange}
            size="sm"
            showLabel={false}
          />
        </div>

        <div className="space-y-1">
          <span className={cn(
            "font-bold text-white",
            compact ? "text-xl" : "text-2xl"
          )}>
            {formatCurrency(predictedValue)}
          </span>

          {!compact && confidenceLow !== undefined && confidenceHigh !== undefined && (
            <p className="text-xs text-slate-500">
              Range: {formatCurrency(confidenceLow)} - {formatCurrency(confidenceHigh)}
            </p>
          )}

          {previousValue !== undefined && (
            <p className="text-xs text-slate-500">
              Previous: {formatCurrency(previousValue)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ForecastSummaryCard;
