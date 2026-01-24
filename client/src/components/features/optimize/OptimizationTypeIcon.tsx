/**
 * OptimizationTypeIcon Component
 * Displays icon for optimization type
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import {
  ArrowRightLeft,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp,
  Receipt,
  Bell,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type OptimizationType =
  | 'bill_negotiation'
  | 'subscription_cancel'
  | 'balance_transfer'
  | 'savings_transfer'
  | 'investment_rebalance'
  | 'debt_payoff'
  | 'expense_reduction'
  | 'income_optimization';

interface OptimizationTypeIconProps {
  type: OptimizationType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const typeConfig: Record<OptimizationType, {
  icon: typeof ArrowRightLeft;
  label: string;
  color: string;
}> = {
  bill_negotiation: {
    icon: Receipt,
    label: 'Bill Negotiation',
    color: 'text-purple-400',
  },
  subscription_cancel: {
    icon: Bell,
    label: 'Cancel Subscription',
    color: 'text-red-400',
  },
  balance_transfer: {
    icon: ArrowRightLeft,
    label: 'Balance Transfer',
    color: 'text-blue-400',
  },
  savings_transfer: {
    icon: PiggyBank,
    label: 'Savings Transfer',
    color: 'text-green-400',
  },
  investment_rebalance: {
    icon: TrendingUp,
    label: 'Investment Rebalance',
    color: 'text-cyan-400',
  },
  debt_payoff: {
    icon: CreditCard,
    label: 'Debt Payoff',
    color: 'text-orange-400',
  },
  expense_reduction: {
    icon: Wallet,
    label: 'Reduce Expense',
    color: 'text-yellow-400',
  },
  income_optimization: {
    icon: Zap,
    label: 'Income Optimization',
    color: 'text-emerald-400',
  },
};

const sizeClasses = {
  sm: { icon: 'h-4 w-4', text: 'text-xs' },
  md: { icon: 'h-5 w-5', text: 'text-sm' },
  lg: { icon: 'h-6 w-6', text: 'text-base' },
};

export function OptimizationTypeIcon({
  type,
  size = 'md',
  showLabel = false,
}: OptimizationTypeIconProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const sizeClass = sizeClasses[size];

  return (
    <div className={cn('inline-flex items-center gap-1.5', config.color)}>
      <Icon className={sizeClass.icon} />
      {showLabel && (
        <span className={cn('font-medium', sizeClass.text)}>{config.label}</span>
      )}
    </div>
  );
}

export default OptimizationTypeIcon;
