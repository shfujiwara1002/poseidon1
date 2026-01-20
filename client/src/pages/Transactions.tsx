import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Transaction } from "@shared/schema";

export default function Transactions() {
  const [statusFilter, setStatusFilter] = useState<"all" | "safe" | "suspicious">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      return res.json();
    },
  });

  const transactions: Transaction[] = dashboardData?.recentTransactions || [];

  // Filter and sort transactions
  let filtered = transactions.filter((tx) => {
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (searchTerm && !tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    return true;
  });

  if (sortBy === "amount") {
    filtered.sort((a, b) => parseFloat(String(b.amount)) - parseFloat(String(a.amount)));
  } else {
    filtered.sort(
      (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white mb-1 font-display font-bold">
            Transactions
          </h1>
          <p className="text-slate-400 text-sm">{filtered.length} transactions found</p>
        </div>
      </div>

      {/* Stats Summary */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Total Transactions
            </div>
            <div className="text-2xl font-bold text-white">{filtered.length}</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Total Amount
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              $
              {filtered
                .reduce((sum, tx) => sum + parseFloat(String(tx.amount)), 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Avg Risk Score
            </div>
            <div className="text-2xl font-bold text-white">
              {(
                filtered.reduce((sum, tx) => sum + tx.riskScore, 0) / filtered.length
              ).toFixed(1)}
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
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
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
                    ? "bg-cyan-500 text-white border-cyan-400"
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
              Sort: {sortBy === "date" ? "Date" : "Amount"}
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-10 hidden group-hover:block">
              {(["date", "amount"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg"
                >
                  {opt === "date" ? "Sort by Date" : "Sort by Amount"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card p-6 rounded-2xl overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
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
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Risk Score
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
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
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
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                            tx.riskScore > 50
                              ? "bg-red-500/20 text-red-400"
                              : tx.riskScore > 20
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-emerald-500/20 text-emerald-400"
                          )}
                        >
                          {tx.riskScore}
                        </div>
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

    </Layout>
  );
}
