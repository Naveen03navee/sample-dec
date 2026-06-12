import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import {
  Zap,
  Wallet,
  Battery,
  MapPin,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  User,
  Bell,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Driver Dashboard — E-Taxi" },
      { name: "description", content: "E-Taxi driver dashboard. View earnings, trips, and manage your EV." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <MobileContainer>
      <div className="pb-24">
        {/* Top Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="size-12 bg-surface rounded-2xl flex items-center justify-center border border-border"
            >
              <User className="size-6 text-electric" />
            </Link>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Welcome back</p>
              <h1 className="text-lg font-outfit font-semibold">Arjun</h1>
            </div>
          </div>
          <button className="size-12 bg-surface rounded-2xl flex items-center justify-center border border-border relative">
            <Bell className="size-5 text-muted-foreground" />
            <div className="absolute top-2.5 right-2.5 size-2 bg-electric rounded-full" />
          </button>
        </div>

        {/* Online/Offline Toggle */}
        <div className="px-6 mb-6">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-full h-16 rounded-2xl flex items-center justify-between px-6 transition-all ${
              isOnline
                ? "bg-electric text-charcoal shadow-[0_8px_30px_rgba(34,197,94,0.25)]"
                : "bg-surface text-foreground border border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`size-3 rounded-full ${isOnline ? "bg-charcoal animate-pulse" : "bg-muted-foreground"}`} />
              <span className="font-outfit font-semibold text-lg">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            <div
              className={`w-14 h-7 rounded-full relative transition-colors ${
                isOnline ? "bg-charcoal/20" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${
                  isOnline ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Status Card */}
        {isOnline ? (
          <div className="px-6 mb-6">
            <div className="bg-electric/5 border border-electric/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-2 bg-electric rounded-full animate-pulse" />
                <span className="text-xs text-electric font-medium uppercase tracking-wider">
                  Nearby Demand
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expected Earnings</p>
                  <p className="text-xl font-outfit font-semibold text-electric">₹450/hr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Ride Requests</p>
                  <p className="text-xl font-outfit font-semibold text-electric">12 nearby</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 mb-6">
            <div className="bg-surface border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="size-4 text-electric" />
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Battery Status
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-2xl font-outfit font-semibold">78%</p>
                  <p className="text-xs text-muted-foreground">~240 km range</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-electric">Good</p>
                  <p className="text-xs text-muted-foreground">Battery Health</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-electric rounded-full" style={{ width: "78%" }} />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                <span>Nearest charger: 2.4 km — MG Road Station</span>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Cards */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-outfit font-semibold">Earnings</h2>
            <Link to="/dashboard" className="text-xs text-electric font-medium flex items-center gap-1">
              View all <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <EarningCard label="Today's" amount="₹2,450" icon={Wallet} />
            <EarningCard label="Weekly" amount="₹14,200" icon={TrendingUp} />
            <EarningCard label="Monthly" amount="₹52,800" icon={Star} />
            <EarningCard label="Trips" amount="14" icon={Clock} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6">
          <h2 className="text-base font-outfit font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon={Zap} label="Go Online" to="/dashboard" />
            <QuickAction icon={Wallet} label="Wallet" to="/dashboard" />
            <QuickAction icon={MapPin} label="Charging" to="/dashboard" />
            <QuickAction icon={TrendingUp} label="Incentives" to="/dashboard" />
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileContainer>
  );
}

function EarningCard({
  label,
  amount,
  icon: Icon,
}: {
  label: string;
  amount: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4">
      <Icon className="size-5 text-electric mb-3" />
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-outfit font-semibold">{amount}</p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  to,
}: {
  icon: React.ElementType;
  label: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 p-3 bg-surface border border-border rounded-2xl active:scale-[0.95] transition-transform"
    >
      <div className="size-10 bg-electric/10 rounded-xl flex items-center justify-center">
        <Icon className="size-5 text-electric" />
      </div>
      <span className="text-[10px] font-medium text-center leading-tight">{label}</span>
    </Link>
  );
}
