import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IndianRupee, Percent, TrendingUp, Wallet } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { ridesByDay } from "@/lib/mock-data";

export const Route = createFileRoute("/revenue")({
  head: () => ({ meta: [{ title: "Revenue · EV Ride Admin" }] }),
  component: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
});

const monthly = [
  { m: "Jan", revenue: 18.4, commission: 3.7 },
  { m: "Feb", revenue: 21.8, commission: 4.4 },
  { m: "Mar", revenue: 24.6, commission: 4.9 },
  { m: "Apr", revenue: 28.1, commission: 5.6 },
  { m: "May", revenue: 32.4, commission: 6.5 },
  { m: "Jun", revenue: 38.2, commission: 7.6 },
];

function Page() {
  return (
    <div className="max-w-[1400px]">
      <PageHeader
        title="Revenue & finance"
        description="Gross bookings, platform commission and driver payouts across the network."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Gross bookings (MTD)" value="₹38.2L" delta={18.0} hint="vs last month" icon={IndianRupee} accent />
        <StatCard label="Commission" value="₹7.6L" delta={16.2} hint="20% take rate" icon={Percent} />
        <StatCard label="Driver payouts" value="₹30.6L" delta={18.4} hint="80% net to drivers" icon={Wallet} />
        <StatCard label="Avg ride value" value="₹178" delta={4.1} hint="vs last month" icon={TrendingUp} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold mb-1">Revenue trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Gross bookings & commission · ₹ lakhs</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly} margin={{ left: -10 }}>
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
              <Bar dataKey="revenue" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="commission" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold mb-1">Weekly bookings</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 7 days · ₹</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ridesByDay} margin={{ left: -10 }}>
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
              <Line type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-1)" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
