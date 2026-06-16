import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Car, IndianRupee, Leaf, Users, Zap } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { co2Trend, ridesByDay, vehicleMix, rides } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview · EV Ride Admin" },
      { name: "description", content: "EV Ride admin console — live operations, fleet health and sustainability impact." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  ),
});

function Dashboard() {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Bengaluru · Live
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Good morning, Nikhil.
          </h1>
          <p className="text-muted-foreground mt-1.5">
            Here's what's happening across the EV Ride network today.
          </p>
        </div>
        <Badge className="bg-accent text-accent-foreground gap-1.5 px-3 py-1.5 text-xs">
          <Zap className="h-3 w-3" /> 504 vehicles online
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Rides" value="2,148" delta={12.4} hint="vs yesterday" icon={Car} accent />
        <StatCard label="Revenue (₹)" value="₹1.48L" delta={8.2} hint="vs yesterday" icon={IndianRupee} />
        <StatCard label="Active Drivers" value="504" delta={3.1} hint="of 612 onboarded" icon={Users} />
        <StatCard label="CO₂ Saved" value="42.8 t" delta={22.6} hint="this month" icon={Leaf} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-semibold">Rides & Revenue</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
            </div>
            <div className="flex gap-4 text-xs">
              <Legend dot="var(--chart-1)" label="Rides" />
              <Legend dot="var(--chart-2)" label="Revenue (₹)" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ridesByDay} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="rides" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold">Fleet Mix</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">Active vehicles by type</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={vehicleMix}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                stroke="none"
              >
                {vehicleMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {vehicleMix.map((v) => (
              <div key={v.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: v.color }} />
                  {v.name}
                </span>
                <span className="font-medium tabular-nums">{v.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold">CO₂ Avoided</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">Tonnes saved · 2026</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={co2Trend} margin={{ left: -20, right: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="saved" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Live Ride Feed</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Most recent across the network</p>
            </div>
            <Badge variant="outline" className="text-xs">Auto-refreshing</Badge>
          </div>
          <div className="space-y-1">
            {rides.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-4 py-2.5 px-3 -mx-3 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="text-xs font-mono text-muted-foreground w-20">{r.id}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {r.from} <span className="text-muted-foreground">→</span> {r.to}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {r.customer} · {r.driver}
                  </div>
                </div>
                <RideStatus status={r.status} />
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums">₹{r.fare}</div>
                  <div className="text-[11px] text-muted-foreground">{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

function RideStatus({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    completed: { label: "Completed", cls: "bg-success/10 text-success border-success/30" },
    in_progress: { label: "In progress", cls: "bg-accent/40 text-accent-foreground border-accent" },
    cancelled: { label: "Cancelled", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  };
  const s = map[status] ?? map.completed;
  return (
    <Badge variant="outline" className={`${s.cls} text-[11px] font-medium`}>
      {s.label}
    </Badge>
  );
}
