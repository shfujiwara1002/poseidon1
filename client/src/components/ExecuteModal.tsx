import { useState } from "react";
import type { Action } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useExecuteAction } from "@/hooks/use-dashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle, DollarSign, Calendar, Zap } from "lucide-react";

interface ExecuteModalProps {
  action: Action | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecuteModal({ action, open, onOpenChange }: ExecuteModalProps) {
  const executeMutation = useExecuteAction();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!action) return null;

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await executeMutation.mutateAsync(action.id);
      setIsSuccess(true);
      // Close modal after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setIsExecuting(false);
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      setIsExecuting(false);
    }
  };

  const handleClose = () => {
    if (!isExecuting) {
      setIsSuccess(false);
      onOpenChange(false);
    }
  };

  const actionTypeLabel = {
    subscription_cancel: "Subscription Cancellation",
    fund_transfer: "Fund Transfer",
    negotiation: "Bill Negotiation",
  }[action.type] || action.type;

  const actionTypeIcon = {
    subscription_cancel: <AlertTriangle className="w-6 h-6" />,
    fund_transfer: <DollarSign className="w-6 h-6" />,
    negotiation: <Zap className="w-6 h-6" />,
  }[action.type] || <Zap className="w-6 h-6" />;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
        {isSuccess ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Executed Successfully</h3>
            <p className="text-slate-400 text-center">
              {action.description} has been completed.
            </p>
            {action.amount && (
              <div className="mt-4 px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-mono font-bold text-lg">
                  +${action.amount} saved
                </span>
              </div>
            )}
          </div>
        ) : (
          // Confirmation State
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  action.type === "fund_transfer"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-blue-500/20 text-blue-400"
                )}>
                  {actionTypeIcon}
                </div>
                Execute Action
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Review the details below before executing this optimization.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Action Type */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400 text-sm">Type</span>
                <span className="text-white font-medium">{actionTypeLabel}</span>
              </div>

              {/* Description */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400 text-sm block mb-2">Description</span>
                <p className="text-white font-medium">{action.description}</p>
              </div>

              {/* Amount */}
              {action.amount && (
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Estimated Savings
                  </span>
                  <span className="text-emerald-400 font-mono font-bold text-lg">
                    ${action.amount}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created
                </span>
                <span className="text-white">
                  {new Date(action.date || "").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-200 text-sm">
                  This action will be executed immediately. Please ensure you have reviewed the details.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleClose}
                disabled={isExecuting}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className={cn(
                  "flex-1 px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2",
                  "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
                  "hover:shadow-lg hover:shadow-purple-500/25",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isExecuting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Confirm Execute
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
