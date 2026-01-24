import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, PieChart, Activity, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@/assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Activity, label: "Transactions", href: "/transactions" },
  { icon: PieChart, label: "Forecast", href: "/forecast" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

function SidebarContent() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img src={logoImage} alt="Poseidon.AI" className="w-full max-w-[200px]" />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign Out */}
      <div className="mt-auto p-6 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
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
          <SheetContent
            side="left"
            className="p-0 bg-slate-950 border-r border-white/10 w-64"
          >
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
}
