import { useDashboardData } from "@/hooks/use-dashboard";
import { Layout } from "@/components/Layout";
import { EngineCard } from "@/components/EngineCard";
import { ActionCard } from "@/components/ActionCard";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { AlertTriangle, TrendingUp, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-mono text-sm animate-pulse">Initializing Command Center...</p>
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
            <div className="text-xs text-slate-500">{format(new Date(), "MMM dd, HH:mm")}</div>
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
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              Net Worth Projection
            </h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">
                AI Confidence: 94%
              </span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.forecasts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`$${value}`, "Value"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                />
                {/* Dashed line for current date context if needed */}
                <ReferenceLine x="Mar" stroke="#94a3b8" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Feed */}
        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white">Pending Optimizations</h3>
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {data.pendingActions.length}
            </span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {data.pendingActions.length > 0 ? (
              data.pendingActions.map((action) => (
                <ActionCard key={action.id} action={action} />
              ))
            ) : (
              <div className="text-center text-slate-500 py-8">
                No pending actions. System optimized.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Recent Transactions */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg text-white mb-6">Recent Activity</h3>
          <div className="space-y-1">
            {data.recentTransactions.map((tx) => (
              <div key={tx.id} className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg items-center">
                <div className="col-span-6">
                  <div className="font-medium text-slate-200">{tx.merchant}</div>
                  <div className="text-xs text-slate-500">{new Date(tx.date || "").toLocaleDateString()}</div>
                </div>
                <div className="col-span-3 text-right font-mono text-slate-300">
                  ${tx.amount}
                </div>
                <div className="col-span-3 flex justify-end">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium uppercase tracking-wide",
                    tx.status === "suspicious" 
                      ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  )}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <Bell size={20} className="text-yellow-500" />
            Security Alerts
          </h3>
          <div className="space-y-4">
            {data.alerts.map((alert) => (
              <div key={alert.id} className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <div className={cn(
                  "mt-1 p-2 rounded-lg h-fit",
                  alert.severity === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                )}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm mb-1">{alert.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{alert.message}</p>
                </div>
              </div>
            ))}
            {data.alerts.length === 0 && (
              <div className="text-slate-500 text-center py-8">No active security alerts.</div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
