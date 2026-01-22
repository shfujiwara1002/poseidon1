/**
 * AutomationLog Component
 * Displays list of automation activity
 * @see specs/components/features/optimize/optimize-components.spec.ts
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AutomationLogEntry } from './AutomationLogEntry';
import { RefreshCw, History, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionType = 'approve' | 'reject' | 'execute' | 'schedule' | 'auto_execute' | 'expire';
type ActionResult = 'success' | 'failure' | 'pending';

interface LogEntry {
  id: string;
  optimizationId: string;
  optimizationTitle: string;
  actionType: ActionType;
  result: ActionResult;
  timestamp: string | Date;
  details?: string;
  savingsRealized?: number;
}

interface AutomationLogProps {
  entries: LogEntry[];
  maxVisible?: number;
  showTimestamps?: boolean;
  onViewAll?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function AutomationLog({
  entries,
  maxVisible = 10,
  showTimestamps = true,
  onViewAll,
  onRefresh,
  isLoading = false,
  emptyMessage = 'No automation activity yet',
}: AutomationLogProps) {
  const visibleEntries = entries.slice(0, maxVisible);
  const remainingCount = entries.length - maxVisible;

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading activity...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium text-white">Automation Activity</h3>
          </div>
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:text-white"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {entries.length === 0 ? (
          <div className="text-center py-6">
            <div className="p-3 bg-slate-800/50 rounded-full inline-block mb-3">
              <History className="h-6 w-6 text-slate-500" />
            </div>
            <p className="text-slate-400">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleEntries.map((entry) => (
              <AutomationLogEntry
                key={entry.id}
                entry={entry}
                showDetails
              />
            ))}

            {remainingCount > 0 && onViewAll && (
              <Button
                variant="ghost"
                className="w-full text-slate-400 hover:text-white"
                onClick={onViewAll}
              >
                View {remainingCount} more entries
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AutomationLog;
