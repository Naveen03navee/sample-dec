import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Car,
  Route as RouteIcon,
  IndianRupee,
  Zap,
  UserCog,
  BarChart3,
  Bell,
  Search,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/drivers", label: "Drivers", icon: UserCog },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/vehicles", label: "Vehicles", icon: Car },
  { to: "/rides", label: "Rides", icon: RouteIcon },
  { to: "/pricing", label: "Pricing", icon: IndianRupee },
  { to: "/charging", label: "Charging", icon: Zap },
  { to: "/revenue", label: "Revenue", icon: BarChart3 },
] as const;

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen border-r border-sidebar-border">
        <div className="px-6 pt-7 pb-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-sidebar-primary grid place-items-center shadow-[0_0_20px_-4px_var(--sidebar-primary)]">
              <Leaf className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">EV Ride</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50">
                Admin Console
              </div>
            </div>
          </Link>
        </div>

        <nav className="px-3 flex-1 space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_4px_20px_-8px_var(--sidebar-primary)]"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 p-4 rounded-xl bg-sidebar-accent/60 border border-sidebar-border">
          <div className="flex items-center gap-2 text-xs font-medium text-sidebar-primary mb-1.5">
            <Zap className="h-3.5 w-3.5" /> Sustainability
          </div>
          <div className="text-2xl font-display font-semibold">42.8 t</div>
          <div className="text-[11px] text-sidebar-foreground/60 mt-0.5">
            CO₂ saved this month
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-10 flex items-center px-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search drivers, rides, customers…"
              className="pl-9 bg-muted/50 border-transparent focus-visible:bg-card"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-success/40 text-success bg-success/5 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              All systems normal
            </Badge>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
            </Button>
            <div className="flex items-center gap-2.5 pl-3 border-l">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                  NC
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-sm font-medium">Nikhil C.M</div>
                <div className="text-[11px] text-muted-foreground">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
