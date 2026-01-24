/**
 * PendingOptimizationsList Component
 * Displays list of pending optimizations
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OptimizationCard } from './OptimizationCard';
import { CheckCircle, Zap, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

type OptimizationType =
  | 'bill_negotiation'
  | 'subscription_cancel'
  | 'balance_transfer'
  | 'savings_transfer'
  | 'investment_rebalance'
  | 'debt_payoff'
  | 'expense_reduction'
  | 'income_optimization';

type OptimizationStatus = 'pending' | 'approved' | 'rejected' | 'executed' | 'scheduled' | 'failed';
type OptimizationPriority = 'low' | 'medium' | 'high' | 'urgent';
type SavingsFrequency = 'one_time' | 'monthly' | 'yearly';

interface Optimization {
  id: string;
  type: OptimizationType;
  title: string;
  description: string;
  status: OptimizationStatus;
  priority: OptimizationPriority;
  estimatedSavings: number;
  savingsFrequency: SavingsFrequency;
  confidenceScore: number;
  expiresAt?: string | Date;
  createdAt: string | Date;
  metadata?: Record<string, unknown>;
}

interface PendingOptimizationsListProps {
  optimizations: Optimization[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onApproveAll?: () => void;
  maxVisible?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function PendingOptimizationsList({
  optimizations,
  onApprove,
  onReject,
  onViewDetails,
  onApproveAll,
  maxVisible = 5,
  showViewAll = true,
  onViewAll,
  isLoading = false,
  emptyMessage = 'No pending optimizations',
}: PendingOptimizationsListProps) {
  const pendingOptimizations = optimizations.filter((o) => o.status === 'pending');
  const visibleOptimizations = pendingOptimizations.slice(0, maxVisible);
  const remainingCount = pendingOptimizations.length - maxVisible;

  const totalSavings = pendingOptimizations.reduce(
    (sum, o) => sum + o.estimatedSavings,
    0
  );

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading optimizations...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pendingOptimizations.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-slate-400">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with approve all */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-400" />
          <span className="font-medium text-white">
            {pendingOptimizations.length} Pending Optimization
            {pendingOptimizations.length !== 1 ? 's' : ''}
          </span>
          {totalSavings > 0 && (
            <span className="text-sm text-green-400">
              (${totalSavings.toLocaleString()} potential savings)
            </span>
          )}
        </div>
        {onApproveAll && pendingOptimizations.length > 1 && (
          <Button
            size="sm"
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            onClick={onApproveAll}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve All
          </Button>
        )}
      </div>

      {/* Optimization cards */}
      <div className="space-y-3">
        {visibleOptimizations.map((optimization) => (
          <OptimizationCard
            key={optimization.id}
            optimization={optimization}
            onApprove={() => onApprove(optimization.id)}
            onReject={() => onReject(optimization.id)}
            onViewDetails={
              onViewDetails ? () => onViewDetails(optimization.id) : undefined
            }
            compact
          />
        ))}
      </div>

      {/* View all link */}
      {showViewAll && remainingCount > 0 && onViewAll && (
        <Button
          variant="ghost"
          className="w-full text-slate-400 hover:text-white"
          onClick={onViewAll}
        >
          View {remainingCount} more optimization{remainingCount !== 1 ? 's' : ''}
        </Button>
      )}
    </div>
  );
}

export default PendingOptimizationsList;
