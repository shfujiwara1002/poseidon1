import { Shield, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Engine } from "@shared/schema";
import { motion } from "framer-motion";

interface EngineCardProps {
  engine: Engine;
  variant?: "dashboard" | "landing";
}

export function EngineCard({ engine, variant = "dashboard" }: EngineCardProps) {
  const isLanding = variant === "landing";

  const config = {
    Protect: {
      color: "cyan",
      icon: Shield,
      glow: "shadow-cyan-500/20",
      border: "hover:border-cyan-500/50",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      gradient: "from-cyan-500/20 to-transparent",
    },
    Grow: {
      color: "blue",
      icon: TrendingUp,
      glow: "shadow-blue-500/20",
      border: "hover:border-blue-500/50",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      gradient: "from-blue-500/20 to-transparent",
    },
    Optimize: {
      color: "purple",
      icon: Zap,
      glow: "shadow-purple-500/20",
      border: "hover:border-purple-500/50",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      gradient: "from-purple-500/20 to-transparent",
    },
  }[engine.name] || {
    color: "slate",
    icon: Shield,
    glow: "shadow-slate-500/20",
    border: "hover:border-slate-500/50",
    text: "text-slate-400",
    bg: "bg-slate-500/10",
    gradient: "from-slate-500/20 to-transparent",
  };

  const Icon = config.icon;

  if (isLanding) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "glass-card p-8 rounded-2xl border border-white/5 transition-all duration-300 relative overflow-hidden group",
          config.border,
          "hover:shadow-2xl hover:shadow-black/50"
        )}
      >
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
          config.gradient
        )} />
        
        <div className="relative z-10">
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
            config.bg,
            config.text
          )}>
            <Icon size={28} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{engine.name}</h3>
          <p className="text-slate-400 leading-relaxed">{engine.details}</p>
        </div>
      </motion.div>
    );
  }

  // Dashboard Variant
  return (
    <div className={cn(
      "glass-card p-6 rounded-2xl relative overflow-hidden group transition-all duration-300",
      "hover:border-white/20"
    )}>
      <div className={cn(
        "absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2",
        `bg-${config.color}-500`
      )} />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", config.bg, config.text)}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{engine.name}</h3>
            <span className={cn("text-xs font-mono uppercase tracking-wider", config.text)}>
              {engine.status}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-display font-bold text-white">
            {engine.metricValue}
          </span>
        </div>
        <p className="text-sm text-slate-400">{engine.metricLabel}</p>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>{engine.details}</span>
        </div>
      </div>
    </div>
  );
}
