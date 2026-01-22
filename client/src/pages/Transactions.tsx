/**
 * Transactions Page
 * Transaction list with filtering, search, and risk indicators
 * @see specs/pages/transactions.spec.ts
 */

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ChevronDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RiskBadge } from "@/components/features/protect";
import { colors } from "@/tokens/colors";
import type { TransactionResponse } from "@shared/routes";

type RiskFlag = 'none' | 'low' | 'medium' | 'high' | 'critical';

function getRiskFlag(riskScore: number): RiskFlag {
  if (riskScore <= 10) return 'none';
  if (riskScore <= 30) return 'low';
  if (riskScore <= 60) return 'medium';
  if (riskScore <= 80) return 'high';
  return 'critical';
}

export default function Transactions() {
  const [statusFilter, setStatusFilter] = useState<"all" | "safe" | "suspicious">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "risk">("date");

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      return res.json();
    },
  });

  const transactions: TransactionResponse[] = dashboardData?.recentTransactions || [];

  // Filter and sort transactions
  let filtered = transactions.filter((tx) => {
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (searchTerm && !tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    return true;
  });

  if (sortBy === "amount") {
    filtered.sort((a, b) => parseFloat(String(b.amount)) - parseFloat(String(a.amount)));
  } else if (sortBy === "risk") {
    filtered.sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));
  } else {
    filtered.sort(
      (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  }

  // Calculate stats
  const suspiciousCount = transactions.filter((tx) => tx.status === "suspicious").length;
  const totalAmount = filtered.reduce((sum, tx) => sum + parseFloat(String(tx.amount)), 0);
  const avgRisk = filtered.length > 0
    ? filtered.reduce((sum, tx) => sum + (tx.riskScore ?? 0), 0) / filtered.length
    : 0;

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white mb-1 font-display font-bold flex items-center gap-3">
            <Activity className="text-blue-400" />
            Transactions
          </h1>
          <p className="text-slate-400 text-sm">{filtered.length} transactions found</p>
        </div>
      </div>

      {/* Stats Summary */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-xl overflow-hidden">
            <div
              className="h-1 w-full"
              style={{ background: colors.gradients.protect }}
            />
            <div className="p-4">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                Total Transactions
              </div>
              <div className="text-2xl font-bold text-white">{filtered.length}</div>
            </div>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div
              className="h-1 w-full"
              style={{ background: colors.gradients.grow }}
            />
            <div className="p-4">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                Total Amount
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div
              className="h-1 w-full"
              style={{ background: avgRisk > 30 ? colors.gradients.protect : colors.gradients.grow }}
            />
            <div className="p-4">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                Avg Risk Score
              </div>
              <div className={cn(
                "text-2xl font-bold",
                avgRisk > 50 ? "text-red-400" : avgRisk > 30 ? "text-amber-400" : "text-green-400"
              )}>
                {avgRisk.toFixed(1)}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl overflow-hidden">
            <div
              className="h-1 w-full"
              style={{ background: suspiciousCount > 0 ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : colors.gradients.grow }}
            />
            <div className="p-4">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                Flagged
              </div>
              <div className={cn(
                "text-2xl font-bold",
                suspiciousCount > 0 ? "text-red-400" : "text-green-400"
              )}>
                {suspiciousCount}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by merchant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "safe", "suspicious"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-all border",
                  statusFilter === status
                    ? status === "suspicious"
                      ? "bg-red-500 text-white border-red-400"
                      : status === "safe"
                      ? "bg-green-500 text-white border-green-400"
                      : "bg-blue-500 text-white border-blue-400"
                    : "bg-slate-800/50 text-slate-300 border-white/10 hover:border-white/20"
                )}
              >
                {status === "all"
                  ? "All Transactions"
                  : status === "safe"
                  ? "Safe"
                  : "Suspicious"}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-300 hover:border-white/20 transition-colors">
              <Filter size={16} />
              Sort: {sortBy === "date" ? "Date" : sortBy === "amount" ? "Amount" : "Risk"}
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-10 hidden group-hover:block">
              {(["date", "amount", "risk"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg",
                    sortBy === opt ? "text-blue-400" : "text-slate-300"
                  )}
                >
                  {opt === "date" ? "Sort by Date" : opt === "amount" ? "Sort by Amount" : "Sort by Risk"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div
          className="h-1 w-full"
          style={{ background: colors.gradients.protect }}
        />
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No transactions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                      Merchant
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                      Amount
                    </th>
                    <th className="text-center px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                      Risk
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx) => (
                    <tr
                      key={tx.id}
                      className={cn(
                        "border-b border-white/5 hover:bg-white/5 transition-colors",
                        tx.status === "suspicious" && "bg-red-500/5"
                      )}
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-200">{tx.merchant}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-400">
                        {tx.date ? format(new Date(tx.date), "MMM dd, yyyy") : "N/A"}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-slate-200">
                        ${tx.amount}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <RiskBadge
                            riskFlag={getRiskFlag(tx.riskScore)}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span
                          className={cn(
                            "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border",
                            tx.status === "suspicious"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          )}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
