import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rides } from "@/lib/mock-data";

export const Route = createFileRoute("/rides")({
  head: () => ({ meta: [{ title: "Rides · EV Ride Admin" }] }),
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
        title="Ride operations"
        description="Live and historical rides across the platform. Monitor pickups, fares and incidents in real time."
      />

      <div className="flex gap-2 mb-6">
        {["All", "In progress", "Completed", "Cancelled"].map((t, i) => (
          <Button
            key={t}
            variant={i === 0 ? "default" : "outline"}
            size="sm"
            className={i === 0 ? "bg-primary" : ""}
          >
            {t}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground text-left">
            <tr>
              <th className="px-6 py-3 font-medium">Ride</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Driver</th>
              <th className="px-6 py-3 font-medium">Route</th>
              <th className="px-6 py-3 font-medium">Distance</th>
              <th className="px-6 py-3 font-medium">Fare</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="px-6 py-4 font-medium">{r.customer}</td>
                <td className="px-6 py-4 text-muted-foreground">{r.driver}</td>
                <td className="px-6 py-4">
                  {r.from} <span className="text-muted-foreground mx-1">→</span> {r.to}
                </td>
                <td className="px-6 py-4 tabular-nums">{r.distance} km</td>
                <td className="px-6 py-4 tabular-nums font-medium">₹{r.fare}</td>
                <td className="px-6 py-4">
                  <Status status={r.status} />
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Status({ status }: { status: string }) {
  const m: Record<string, string> = {
    completed: "bg-success/10 text-success border-success/30",
    in_progress: "bg-accent/40 text-accent-foreground border-accent",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const label = status === "in_progress" ? "In progress" : status;
  return <Badge variant="outline" className={`${m[status]} capitalize text-[11px]`}>{label}</Badge>;
}
