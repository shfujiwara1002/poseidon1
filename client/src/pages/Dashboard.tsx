/**
 * Dashboard Page
 * Main command center view with engine status, alerts, and optimizations
 * @see specs/pages/dashboard.spec.ts
 */

import { useDashboardData } from "@/hooks/use-dashboard";
import { Layout } from "@/components/Layout";
import { EngineCard } from "@/components/EngineCard";
import { RiskScoreCard } from "@/components/features/protect";
import { PendingOptimizationsList, SavingsCapturedMetric } from "@/components/features/optimize";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp, Activity, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { colors } from "@/tokens/colors";

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-mono text-sm animate-pulse">
            Initializing Command Center...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Error loading dashboard data.
      </div>
    );
  }

  // Transform data for components
  const protectEngine = data.engines.find((e) => e.name === "Protect");

  // Calculate risk score from threat score
  const threatScore = protectEngine ? parseFloat(protectEngine.score || "0") : 0;
  const protectionScore = Math.max(0, 100 - threatScore);

  // Transform pending actions to optimizations format
  const transformedOptimizations = data.pendingActions.map((action) => ({
    id: String(action.id),
    type: action.type === "fund_transfer" ? "savings_transfer" as const : "subscription_cancel" as const,
    title: action.description,
    description: `Save $${action.amount} ${action.type === "fund_transfer" ? "with automated transfer" : "by canceling"}`,
    status: action.status as "pending" | "approved" | "rejected" | "executed" | "scheduled" | "failed",
    priority: "medium" as const,
    estimatedSavings: parseFloat(action.amount || "0"),
    savingsFrequency: action.type === "fund_transfer" ? "one_time" as const : "monthly" as const,
    confidenceScore: 0.85,
    createdAt: new Date().toISOString(),
  }));

  // Calculate total potential savings
  const totalPotentialSavings = transformedOptimizations.reduce(
    (sum, o) => sum + o.estimatedSavings,
    0
  );

  // Get unread alerts
  const unreadAlerts = data.alerts.filter((a) => !a.read);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white mb-1">Command Center</h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Status: Optimal
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-white font-medium">Alex Chen</div>
            <div className="text-xs text-slate-500">
              {format(new Date(), "MMM dd, HH:mm")}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            AC
          </div>
        </div>
      </div>

      {/* Engine Status Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.engines.map((engine) => (
          <EngineCard key={engine.id} engine={engine} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.grow }}
          />
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-green-500" />
                Net Worth Projection
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">
                  AI Confidence: 94%
                </span>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.forecasts}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.engine.grow.base} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.engine.grow.base} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      color: "#f8fafc",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`$${value}`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke={colors.engine.grow.base}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProjected)"
                  />
                  <ReferenceLine x="Mar" stroke="#94a3b8" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security & Savings Panel */}
        <div className="space-y-6">
          {/* Protection Score */}
          <RiskScoreCard
            score={protectionScore}
            trend={protectionScore > 90 ? "improving" : "stable"}
            previousScore={protectionScore - 2}
            lastUpdated={new Date().toISOString()}
          />

          {/* Savings Metric */}
          <SavingsCapturedMetric
            totalSavings={totalPotentialSavings * 12}
            monthlySavings={totalPotentialSavings}
            yearlySavings={totalPotentialSavings * 12}
            trend="up"
          />
        </div>
      </div>

      {/* Bottom Row - Alerts and Optimizations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Security Alerts */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.protect }}
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium text-white">Security Alerts</h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                  {unreadAlerts.length}
                </span>
              </div>
            </div>
            {unreadAlerts.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="p-3 bg-green-500/10 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="font-medium text-white mb-1">All Clear</h4>
                <p className="text-sm text-slate-400">No active security alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {unreadAlerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-4 rounded-lg border-l-2",
                      alert.severity === "high" || alert.severity === "critical"
                        ? "bg-red-500/5 border-l-red-500"
                        : "bg-orange-500/5 border-l-orange-500"
                    )}
                  >
                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full uppercase",
                          alert.severity === "high" || alert.severity === "critical"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-orange-500/10 text-orange-400"
                        )}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-xs text-slate-500">
                        {alert.timestamp
                          ? format(new Date(alert.timestamp), "MMM dd, HH:mm")
                          : "Just now"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Optimizations */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.optimize }}
          />
          <div className="p-6">
            <PendingOptimizationsList
              optimizations={transformedOptimizations}
              onApprove={(id) => console.log("Approve:", id)}
              onReject={(id) => console.log("Reject:", id)}
              maxVisible={3}
              emptyMessage="No pending optimizations. System optimized."
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Activity size={20} className="text-blue-400" />
            Recent Activity
          </h3>
          <a
            href="/transactions"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
          </a>
        </div>
        <div className="space-y-1">
          {data.recentTransactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg items-center"
            >
              <div className="col-span-6">
                <div className="font-medium text-slate-200">{tx.merchant}</div>
                <div className="text-xs text-slate-500">
                  {tx.date ? format(new Date(tx.date), "MMM dd, yyyy") : "Today"}
                </div>
              </div>
              <div className="col-span-3 text-right font-mono text-slate-300">
                ${tx.amount}
              </div>
              <div className="col-span-3 flex justify-end">
                <span
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium uppercase tracking-wide",
                    tx.status === "suspicious"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  )}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
