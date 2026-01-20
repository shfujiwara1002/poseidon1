import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { EngineCard } from "@/components/EngineCard";
import type { Engine } from "@shared/schema";
import logoImage from "@/assets/logo.png";

// =============================================================================
// LANDING PAGE DATA
// =============================================================================

const landingEngines: Engine[] = [
  {
    id: 1,
    name: "Protect",
    status: "Active",
    metricLabel: "Threat Score",
    metricValue: "0.02%",
    details: "Real-time fraud detection",
    score: "0.02",
    lastUpdated: null,
  },
  {
    id: 2,
    name: "Grow",
    status: "Active",
    metricLabel: "Accuracy",
    metricValue: "98.4%",
    details: "Cash flow forecasting",
    score: "98.4",
    lastUpdated: null,
  },
  {
    id: 3,
    name: "Optimize",
    status: "Active",
    metricLabel: "Pending Savings",
    metricValue: "$408/yr",
    details: "Automated execution",
    score: "408",
    lastUpdated: null,
  },
];

const stats = [
  { label: "Fraud Prevented", value: "$12.5B+", color: "text-cyan-400" },
  { label: "Avg User Savings", value: "$235/mo", color: "text-blue-400" },
  { label: "Profit Margin", value: "77%", color: "text-purple-400" },
  { label: "Uptime", value: "99.99%", color: "text-emerald-400" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-body selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logoImage} alt="FIS.ai" className="h-10" />
        </div>
        <div className="flex gap-6">
          <Link
            href="/login"
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 py-2"
          >
            Log In
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-slate-950 px-5 py-2 rounded-full font-bold text-sm hover:bg-cyan-50 transition-colors flex items-center gap-2"
          >
            Launch App <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-3xl mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-mono mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM OPERATIONAL
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl font-display font-bold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
            >
              The Financial <br />
              <span className="text-glow-cyan">Immune System.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-10"
            >
              The first autonomous finance platform that protects, grows, and
              optimizes your wealth 24/7 with military-grade precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                Command Center{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800/50 text-slate-300 font-medium text-lg transition-all">
                Read Manifesto
              </button>
            </motion.div>
          </div>

          {/* Feature Grid - Three Engines */}
          <div className="grid md:grid-cols-3 gap-6 mb-32">
            {landingEngines.map((engine, i) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <EngineCard engine={engine} variant="landing" />
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="border-t border-slate-800 pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className={`text-4xl font-display font-bold mb-2 ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
