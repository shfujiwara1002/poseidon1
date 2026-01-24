/**
 * PriorityBadge Component
 * Displays optimization priority level
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

type OptimizationPriority = 'low' | 'medium' | 'high' | 'urgent';

interface PriorityBadgeProps {
  priority: OptimizationPriority;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const priorityConfig: Record<OptimizationPriority, {
  label: string;
  color: string;
  bg: string;
}> = {
  low: {
    label: 'Low',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
  },
  medium: {
    label: 'Medium',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  high: {
    label: 'High',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  urgent: {
    label: 'Urgent',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
};

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function PriorityBadge({
  priority,
  size = 'md',
  showLabel = true,
}: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.bg,
        config.color,
        sizeClasses[size]
      )}
    >
      {showLabel ? config.label : priority.charAt(0).toUpperCase()}
    </span>
  );
}

export default PriorityBadge;
