/**
 * ExecuteModal Component
 * Confirmation dialog for executing optimizations
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';
import { OptimizationTypeIcon } from './OptimizationTypeIcon';
import { PriorityBadge } from './PriorityBadge';
import { SavingsBadge } from './SavingsBadge';

type OptimizationType =
  | 'bill_negotiation'
  | 'subscription_cancel'
  | 'balance_transfer'
  | 'savings_transfer'
  | 'investment_rebalance'
  | 'debt_payoff'
  | 'expense_reduction'
  | 'income_optimization';

type OptimizationPriority = 'low' | 'medium' | 'high' | 'urgent';
type SavingsFrequency = 'one_time' | 'monthly' | 'yearly';

interface Optimization {
  id: string | number;
  type: OptimizationType | string;
  title?: string;
  description: string;
  estimatedSavings?: number | string;
  savingsFrequency?: SavingsFrequency;
  priority?: OptimizationPriority;
  confidenceScore?: number;
}

interface ExecuteModalProps {
  optimization: Optimization;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isExecuting?: boolean;
}

function formatCurrency(value: number | string | undefined): string {
  if (value === undefined) return '$0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function ExecuteModal({
  optimization,
  isOpen,
  onClose,
  onConfirm,
  isExecuting = false,
}: ExecuteModalProps) {
  const savings = typeof optimization.estimatedSavings === 'string'
    ? parseFloat(optimization.estimatedSavings)
    : optimization.estimatedSavings ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
        {/* Optimize engine accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
          style={{ background: colors.gradients.optimize }}
        />

        <DialogHeader className="pt-2">
          <DialogTitle className="flex items-center gap-3 text-white">
            <OptimizationTypeIcon
              type={optimization.type as OptimizationType}
              size="md"
            />
            <span>Confirm Execution</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Review and confirm this optimization action
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Action details */}
          <div className="p-4 bg-slate-800/50 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-white">
                  {optimization.title || optimization.description}
                </h4>
                {optimization.title && (
                  <p className="text-sm text-slate-400 mt-1">
                    {optimization.description}
                  </p>
                )}
              </div>
              {optimization.priority && (
                <PriorityBadge
                  priority={optimization.priority}
                  size="sm"
                />
              )}
            </div>

            {/* Savings info */}
            {savings > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm text-slate-400">Estimated savings:</span>
                <SavingsBadge
                  amount={savings}
                  frequency={optimization.savingsFrequency || 'one_time'}
                  size="sm"
                />
              </div>
            )}

            {/* Confidence score */}
            {optimization.confidenceScore !== undefined && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-slate-400">
                  Confidence: {Math.round(optimization.confidenceScore * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-200">
              This action will be executed immediately and may affect your accounts.
              Please ensure the details are correct before proceeding.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isExecuting}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isExecuting}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Executing...
              </>
            ) : (
              'Execute Now'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExecuteModal;
