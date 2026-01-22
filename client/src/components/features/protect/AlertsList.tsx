/**
 * AlertsList Component
 * Displays a list of security alerts with actions
 * @see specs/components/features/protect/protect-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import { AlertCard } from './AlertCard';
import { cn } from '@/lib/utils';
import type { Alert } from '@shared/schema';

interface AlertsListProps {
  alerts: Alert[];
  onDismiss: (id: string | number) => void;
  onInvestigate: (id: string | number) => void;
  onResolve?: (id: string | number) => void;
  maxVisible?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function AlertsList({
  alerts,
  onDismiss,
  onInvestigate,
  onResolve,
  maxVisible = 5,
  showViewAll = true,
  onViewAll,
  isLoading = false,
  emptyMessage = 'No alerts to display',
}: AlertsListProps) {
  const visibleAlerts = alerts.slice(0, maxVisible);
  const hasMore = alerts.length > maxVisible;

  // Sort by severity (critical first)
  const sortedAlerts = [...visibleAlerts].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return (severityOrder[a.severity as keyof typeof severityOrder] ?? 4) -
           (severityOrder[b.severity as keyof typeof severityOrder] ?? 4);
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-slate-500">Loading alerts...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-3 bg-green-500/10 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h4 className="font-medium text-white mb-1">All Clear</h4>
            <p className="text-sm text-slate-400">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const highCount = alerts.filter(a => a.severity === 'high').length;

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <h3 className="font-medium text-white">Security Alerts</h3>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>
        {(criticalCount > 0 || highCount > 0) && (
          <div className="flex gap-2">
            {criticalCount > 0 && (
              <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                {criticalCount} critical
              </span>
            )}
            {highCount > 0 && (
              <span className="text-xs bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full">
                {highCount} high
              </span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-3">
          {sortedAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={() => onDismiss(alert.id)}
              onInvestigate={() => onInvestigate(alert.id)}
              onResolve={onResolve ? () => onResolve(alert.id) : undefined}
            />
          ))}
        </div>

        {showViewAll && hasMore && onViewAll && (
          <Button
            variant="ghost"
            className="w-full mt-4 text-slate-400 hover:text-white"
            onClick={onViewAll}
          >
            View all {alerts.length} alerts
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default AlertsList;
