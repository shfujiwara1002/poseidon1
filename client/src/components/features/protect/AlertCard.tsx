/**
 * AlertCard Component
 * Individual alert display with actions
 * @see specs/components/features/protect/protect-components.spec.ts
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
  X,
  Search,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertSeverityBadge } from './AlertSeverityBadge';
import type { Alert } from '@shared/schema';

interface AlertCardProps {
  alert: Alert;
  onDismiss: () => void;
  onInvestigate: () => void;
  onResolve?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const alertTypeIcons = {
  fraud: AlertTriangle,
  anomaly: AlertTriangle,
  threshold: AlertTriangle,
  security: Shield,
  compliance: Shield,
} as const;

export function AlertCard({
  alert,
  onDismiss,
  onInvestigate,
  onResolve,
  isExpanded = false,
  onToggleExpand,
}: AlertCardProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const Icon = alertTypeIcons[alert.type as keyof typeof alertTypeIcons] || AlertTriangle;

  const handleToggle = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setExpanded(!expanded);
    }
  };

  const isExpandedState = onToggleExpand ? isExpanded : expanded;

  return (
    <Card className={cn(
      "bg-slate-900/50 border-slate-800 overflow-hidden transition-all",
      alert.severity === 'critical' && "border-red-500/30",
      alert.severity === 'high' && "border-orange-500/30",
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              alert.severity === 'critical' && "bg-red-500/10",
              alert.severity === 'high' && "bg-orange-500/10",
              alert.severity === 'medium' && "bg-yellow-500/10",
              alert.severity === 'low' && "bg-green-500/10",
            )}>
              <Icon className={cn(
                "h-5 w-5",
                alert.severity === 'critical' && "text-red-500",
                alert.severity === 'high' && "text-orange-500",
                alert.severity === 'medium' && "text-yellow-500",
                alert.severity === 'low' && "text-green-500",
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium text-white truncate">{alert.title}</h4>
                <AlertSeverityBadge severity={alert.severity as 'low' | 'medium' | 'high' | 'critical'} size="sm" />
              </div>
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{alert.message}</p>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            {isExpandedState ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Expanded Content */}
        {isExpandedState && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-slate-500">Risk Score</span>
                <p className="text-white font-medium">{alert.riskScore ?? 'N/A'}/100</p>
              </div>
              <div>
                <span className="text-slate-500">Confidence</span>
                <p className="text-white font-medium">{alert.confidence ? `${alert.confidence}%` : 'N/A'}</p>
              </div>
              <div>
                <span className="text-slate-500">Type</span>
                <p className="text-white font-medium capitalize">{alert.type}</p>
              </div>
              <div>
                <span className="text-slate-500">Created</span>
                <p className="text-white font-medium">
                  {alert.createdAt ? new Date(alert.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onInvestigate}
                className="flex-1 border-slate-700 hover:bg-slate-800"
              >
                <Search className="h-4 w-4 mr-1" />
                Investigate
              </Button>
              {onResolve && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResolve}
                  className="flex-1 border-green-500/30 text-green-500 hover:bg-green-500/10"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resolve
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onDismiss}
                className="border-slate-700 hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default AlertCard;
