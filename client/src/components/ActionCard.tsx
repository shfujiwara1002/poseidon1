import { useState } from "react";
import { Play, Clock } from "lucide-react";
import type { Action } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ExecuteModal } from "./ExecuteModal";

interface ActionCardProps {
  action: Action;
}

export function ActionCard({ action }: ActionCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isPending = action.status === "pending";

  return (
    <>
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "mt-1 p-2 rounded-lg",
              action.type === "fund_transfer"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-blue-500/20 text-blue-400"
            )}
          >
            {action.type === "fund_transfer" ? (
              <Play size={16} />
            ) : (
              <Clock size={16} />
            )}
          </div>
          <div>
            <h4 className="font-medium text-slate-200">{action.description}</h4>
            <div className="flex gap-2 text-xs mt-1 text-slate-400">
              <span>{new Date(action.date || "").toLocaleDateString()}</span>
              {action.amount && (
                <span className="text-emerald-400 font-mono font-medium">
                  ${action.amount}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          disabled={!isPending}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
            isPending
              ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50"
              : "bg-emerald-500/10 text-emerald-400 cursor-default border border-emerald-500/20"
          )}
        >
          {isPending ? "Execute" : "Done"}
        </button>
      </div>

      <ExecuteModal
        action={action}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
