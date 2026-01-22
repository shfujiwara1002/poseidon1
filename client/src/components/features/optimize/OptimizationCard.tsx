/**
 * OptimizationCard Component
 * Displays a single optimization with approve/reject actions
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from './PriorityBadge';
import { SavingsBadge } from './SavingsBadge';
import { OptimizationTypeIcon } from './OptimizationTypeIcon';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
} from 'lucide-react';
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

interface OptimizationCardProps {
  optimization: Optimization;
  onApprove: () => void;
  onReject: () => void;
  onViewDetails?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showActions?: boolean;
  compact?: boolean;
}

export function OptimizationCard({
  optimization,
  onApprove,
  onReject,
  onViewDetails,
  isExpanded = false,
  onToggleExpand,
  showActions = true,
  compact = false,
}: OptimizationCardProps) {
  const isPending = optimization.status === 'pending';
  const isExpired = optimization.expiresAt && new Date(optimization.expiresAt) < new Date();

  return (
    <Card
      className={cn(
        'bg-slate-900/50 border-slate-800 overflow-hidden',
        optimization.priority === 'urgent' && 'border-red-500/30',
        optimization.priority === 'high' && 'border-orange-500/30'
      )}
    >
      {/* Optimize engine accent */}
      <div
        className="h-1 w-full"
        style={{ background: colors.gradients.optimize }}
      />

      <CardHeader className={cn('pb-2', compact && 'p-3')}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <OptimizationTypeIcon type={optimization.type} size="md" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">{optimization.title}</h4>
              <p className="text-sm text-slate-400 mt-0.5 line-clamp-2">
                {optimization.description}
              </p>
            </div>
          </div>
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onToggleExpand}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn('pt-0', compact && 'p-3 pt-0')}>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <PriorityBadge priority={optimization.priority} size="sm" />
          <SavingsBadge
            amount={optimization.estimatedSavings}
            frequency={optimization.savingsFrequency}
            size="sm"
          />
          <span className="text-xs text-slate-500">
            {(optimization.confidenceScore * 100).toFixed(0)}% confidence
          </span>
        </div>

        {/* Expiration warning */}
        {optimization.expiresAt && !isExpired && (
          <div className="flex items-center gap-1 text-xs text-amber-400 mb-3">
            <Clock className="h-3 w-3" />
            <span>
              Expires {new Date(optimization.expiresAt).toLocaleDateString()}
            </span>
          </div>
        )}

        {isExpired && (
          <div className="flex items-center gap-1 text-xs text-red-400 mb-3">
            <AlertCircle className="h-3 w-3" />
            <span>This optimization has expired</span>
          </div>
        )}

        {/* Expanded details */}
        {isExpanded && optimization.metadata && (
          <div className="bg-slate-800/50 rounded-lg p-3 mb-3 text-sm">
            <h5 className="text-slate-300 font-medium mb-2">Details</h5>
            <dl className="space-y-1">
              {Object.entries(optimization.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-slate-400 capitalize">
                    {key.replace(/_/g, ' ')}
                  </dt>
                  <dd className="text-slate-200">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Actions */}
        {showActions && isPending && !isExpired && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-slate-700 hover:bg-slate-800"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-1" />
              Dismiss
            </Button>
          </div>
        )}

        {/* View details for non-pending */}
        {!isPending && onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-slate-400 hover:text-white"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default OptimizationCard;
