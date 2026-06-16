import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { drivers } from "@/lib/mock-data";

export const Route = createFileRoute("/drivers")({
  head: () => ({ meta: [{ title: "Drivers · EV Ride Admin" }] }),
  component: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
});

function Page() {
  return (
    <div className="max-w-[1400px]">
      <PageHeader
        title="Driver management"
        description="Approve, monitor and manage every EV driver across the network. Real-time KYC and ride performance."
        action={{ label: "Onboard driver", icon: <Plus className="h-4 w-4" /> }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="Active" value="504" tone="success" />
        <Stat label="Pending KYC" value="38" tone="warning" />
        <Stat label="Suspended" value="12" tone="destructive" />
        <Stat label="Avg rating" value="4.78" tone="default" />
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="text-left">
              <th className="px-6 py-3 font-medium">Driver</th>
              <th className="px-6 py-3 font-medium">Vehicle</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Rides</th>
              <th className="px-6 py-3 font-medium">Earnings</th>
              <th className="px-6 py-3 font-medium">KYC</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                        {d.name.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <div className="font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{d.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{d.vehicle}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    {d.rating}
                  </span>
                </td>
                <td className="px-6 py-4 tabular-nums">{d.rides.toLocaleString()}</td>
                <td className="px-6 py-4 tabular-nums font-medium">₹{d.earnings.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <KycBadge status={d.kyc} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "destructive" | "default" }) {
  const map = {
    success: "border-success/30 bg-success/5",
    warning: "border-warning/40 bg-warning/5",
    destructive: "border-destructive/30 bg-destructive/5",
    default: "",
  };
  return (
    <Card className={`p-4 ${map[tone]}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="font-display text-2xl font-semibold">{value}</div>
    </Card>
  );
}

function KycBadge({ status }: { status: string }) {
  if (status === "verified")
    return <Badge variant="outline" className="border-success/40 text-success bg-success/5">Verified</Badge>;
  return <Badge variant="outline" className="border-warning/40 text-warning bg-warning/5">Pending</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = {
    active: "bg-success/10 text-success border-success/30",
    pending: "bg-warning/10 text-warning border-warning/40",
    suspended: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return <Badge variant="outline" className={`${m[status]} capitalize`}>{status}</Badge>;
}
