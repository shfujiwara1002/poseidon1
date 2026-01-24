/**
 * SavingsBadge Component
 * Displays estimated savings amount with frequency
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

type SavingsFrequency = 'one_time' | 'monthly' | 'yearly';

interface SavingsBadgeProps {
  amount: number;
  frequency: SavingsFrequency;
  size?: 'sm' | 'md' | 'lg';
  showFrequency?: boolean;
}

const frequencyLabels: Record<SavingsFrequency, string> = {
  one_time: '',
  monthly: '/mo',
  yearly: '/yr',
};

const sizeClasses = {
  sm: { container: 'text-xs gap-0.5', icon: 'h-3 w-3' },
  md: { container: 'text-sm gap-1', icon: 'h-4 w-4' },
  lg: { container: 'text-base gap-1.5', icon: 'h-5 w-5' },
};

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
}

export function SavingsBadge({
  amount,
  frequency,
  size = 'md',
  showFrequency = true,
}: SavingsBadgeProps) {
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 font-medium',
        'bg-green-500/10 text-green-400',
        sizeClass.container
      )}
    >
      <DollarSign className={sizeClass.icon} />
      <span>
        {formatCurrency(amount)}
        {showFrequency && frequencyLabels[frequency]}
      </span>
    </span>
  );
}

export default SavingsBadge;
