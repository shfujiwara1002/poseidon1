import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, PieChart, Activity, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Activity, label: "Transactions", href: "/transactions" }, // Placeholder route
    { icon: PieChart, label: "Forecast", href: "/forecast" }, // Placeholder route
    { icon: Settings, label: "Settings", href: "/settings" }, // Placeholder route
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
            F
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">FIS.ai</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/5" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}>
                <item.icon size={18} className={cn(
                  "transition-colors",
                  isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl fixed h-full z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger className="p-2 bg-slate-800 rounded-lg text-white border border-white/10">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-slate-950 border-r border-white/10 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
