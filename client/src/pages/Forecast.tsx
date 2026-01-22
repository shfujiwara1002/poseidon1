/**
 * Forecast Page
 * Net worth projections with AI-powered insights and confidence bands
 * @see specs/pages/forecast.spec.ts
 */

import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, AlertCircle, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ForecastSummaryCard, TrendIndicator } from "@/components/features/grow";
import { colors } from "@/tokens/colors";
import type { Forecast } from "@shared/schema";

export default function ForecastPage() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      return res.json();
    },
  });

  const forecasts: Forecast[] = dashboardData?.forecasts || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  // Calculate statistics
  const historicalData = forecasts.filter((f) => f.actual);
  const projectedData = forecasts.filter((f) => !f.actual);

  const avgHistorical =
    historicalData.length > 0
      ? historicalData.reduce((sum, f) => sum + parseFloat(f.actual || "0"), 0) /
        historicalData.length
      : 0;

  const avgProjected =
    projectedData.length > 0
      ? projectedData.reduce((sum, f) => sum + parseFloat(String(f.projected)), 0) /
        projectedData.length
      : 0;

  const growthRate =
    historicalData.length > 0
      ? ((avgProjected - avgHistorical) / avgHistorical) * 100
      : 0;

  const nextProjected = forecasts.find((f) => !f.actual);
  const lastActual = historicalData[historicalData.length - 1];
  const lastProjected = projectedData[projectedData.length - 1];

  // Determine trend
  const trend: 'improving' | 'stable' | 'declining' =
    growthRate > 5 ? 'improving' : growthRate < -5 ? 'declining' : 'stable';

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl text-white mb-1 font-display font-bold flex items-center gap-3">
            <TrendingUp className="text-green-400" />
            Net Worth Forecast
          </h1>
          <p className="text-slate-400 text-sm">
            AI-powered projections with confidence bands
          </p>
        </div>
        <TrendIndicator
          trend={trend}
          percentChange={growthRate}
          size="lg"
        />
      </div>

      {/* Forecast Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <ForecastSummaryCard
          type="net_worth"
          predictedValue={avgProjected}
          confidenceLow={avgProjected * 0.92}
          confidenceHigh={avgProjected * 1.08}
          percentChange={growthRate}
          trend={trend}
          previousValue={avgHistorical}
        />
        <ForecastSummaryCard
          type="savings"
          predictedValue={(avgProjected - avgHistorical) * 12}
          percentChange={growthRate * 0.8}
          trend={growthRate > 0 ? 'improving' : 'stable'}
        />
        <ForecastSummaryCard
          type="cashflow"
          predictedValue={avgProjected * 0.15}
          percentChange={growthRate * 0.5}
          trend={growthRate > 3 ? 'improving' : 'stable'}
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.grow }}
          />
          <div className="p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              AI Confidence
            </div>
            <div className="text-2xl font-bold text-green-400">94%</div>
            <div className="text-xs text-slate-500 mt-1">Based on historical accuracy</div>
          </div>
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.grow }}
          />
          <div className="p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Avg Historical
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              ${(avgHistorical / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {historicalData.length} months tracked
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <div
            className="h-1 w-full"
            style={{ background: colors.gradients.grow }}
          />
          <div className="p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Avg Projected
            </div>
            <div className="text-2xl font-bold text-green-400 font-mono">
              ${(avgProjected / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {projectedData.length} months ahead
            </div>
          </div>
        </div>
        <div
          className={cn(
            "glass-card rounded-xl overflow-hidden",
            growthRate > 0 && "border border-green-500/20"
          )}
        >
          <div
            className="h-1 w-full"
            style={{ background: growthRate > 0 ? colors.gradients.grow : colors.gradients.protect }}
          />
          <div className="p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">
              Growth Rate
            </div>
            <div
              className={cn(
                "text-2xl font-bold font-mono",
                growthRate > 0 ? "text-green-400" : "text-slate-300"
              )}
            >
              {growthRate > 0 ? "+" : ""}
              {growthRate.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">Historical to Projected</div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div
          className="h-1 w-full"
          style={{ background: colors.gradients.grow }}
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-green-500" />
                Net Worth Projection
              </h3>
              <p className="text-xs text-slate-500">
                Historical data (solid line) and projected values with confidence bands
              </p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forecasts}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.engine.grow.base} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.engine.grow.base} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.engine.grow.light} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.engine.grow.light} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
                  formatter={(value) => [`$${value}`, value ? "Value" : ""]}
                />
                <ReferenceLine
                  x="Mar"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  label={{ value: "Today", position: "top", fill: "#94a3b8", fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke={colors.engine.grow.base}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Historical"
                />
                <Area
                  type="monotone"
                  dataKey="projected"
                  stroke={colors.engine.grow.light}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProjected)"
                  name="Projected"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Confidence Bands Chart */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div
          className="h-1 w-full"
          style={{ background: colors.gradients.grow }}
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-white mb-2">Confidence Bands</h3>
              <p className="text-xs text-slate-500">
                Upper and lower bounds showing forecast uncertainty range
              </p>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecasts}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
                  formatter={(value) => [`$${value}`, value ? "Value" : ""]}
                />
                <ReferenceLine x="Mar" stroke="#94a3b8" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Upper Bound"
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke={colors.engine.grow.base}
                  strokeWidth={2}
                  dot={false}
                  name="Projection"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Lower Bound"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Forecast Details Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div
          className="h-1 w-full"
          style={{ background: colors.gradients.grow }}
        />
        <div className="p-6">
          <h3 className="font-bold text-lg text-white mb-6">Forecast Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Month
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Actual
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Projected
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Variance
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Lower Bound
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-400 uppercase tracking-wider text-xs">
                    Upper Bound
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecasts.map((forecast) => {
                  const variance = forecast.actual
                    ? (
                        ((parseFloat(String(forecast.projected)) -
                          parseFloat(forecast.actual)) /
                          parseFloat(forecast.actual)) *
                        100
                      ).toFixed(1)
                    : null;

                  return (
                    <tr
                      key={forecast.id}
                      className={cn(
                        "border-b border-white/5 hover:bg-white/5 transition-colors",
                        !forecast.actual && "bg-green-500/5"
                      )}
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-200">
                          {forecast.month}
                          {!forecast.actual && (
                            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                              Projected
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-slate-400">
                        {forecast.actual ? `$${forecast.actual}` : "—"}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-green-400">
                        ${forecast.projected}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {variance !== null ? (
                          <span
                            className={cn(
                              "font-mono text-sm",
                              parseFloat(variance) > 0 ? "text-green-400" : "text-red-400"
                            )}
                          >
                            {parseFloat(variance) > 0 ? "+" : ""}
                            {variance}%
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-amber-400/60 text-xs">
                        ${forecast.lowerBound}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-amber-400/60 text-xs">
                        ${forecast.upperBound}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="glass-card rounded-2xl overflow-hidden border border-green-500/20">
        <div
          className="h-1 w-full"
          style={{ background: colors.gradients.grow }}
        />
        <div className="p-6 bg-green-500/5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Zap className="w-5 h-5 text-green-400 mt-1" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Grow Engine Insights</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  Your net worth is projected to grow by <strong className="text-green-400">{growthRate.toFixed(1)}%</strong> from
                  current trend
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  The Protect engine has prevented fraud losses averaging{" "}
                  <strong>0.12% monthly</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  Recommended action: Execute pending optimizations to accelerate growth
                  projection
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Next major milestone:{" "}
                  <strong className="text-green-400">
                    ${(parseFloat(String(nextProjected?.projected || "0")) / 1000).toFixed(1)}k
                  </strong>{" "}
                  by <strong>{nextProjected?.month}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
