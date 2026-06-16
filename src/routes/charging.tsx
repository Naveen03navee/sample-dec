import { createFileRoute } from "@tanstack/react-router";
import { Plus, Zap } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { chargers } from "@/lib/mock-data";

export const Route = createFileRoute("/charging")({
  head: () => ({ meta: [{ title: "Charging · EV Ride Admin" }] }),
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
        title="Charging network"
        description="Monitor charging stations, port availability and uptime across the city."
        action={{ label: "Add station", icon: <Plus className="h-4 w-4" /> }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chargers.map((c) => {
          const utilisation = Math.round(((c.ports - c.available) / c.ports) * 100);
          return (
            <Card key={c.id} className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center">
                  <Zap className="h-5 w-5 text-accent-foreground" />
                </div>
                <StatusDot status={c.status} />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.name}</h3>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {c.id} · {c.type}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Available</div>
                  <div className="font-display text-2xl font-semibold mt-0.5">
                    {c.available}<span className="text-muted-foreground text-base">/{c.ports}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">In use</div>
                  <div className="font-display text-2xl font-semibold mt-0.5">
                    {c.ports - c.available}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5 text-muted-foreground">
                  <span>Utilisation</span>
                  <span className="font-medium tabular-nums text-foreground">{utilisation}%</span>
                </div>
                <Progress value={utilisation} className="h-1.5" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    online: { cls: "bg-success/10 text-success border-success/30", label: "Online" },
    busy: { cls: "bg-warning/10 text-warning border-warning/40", label: "Busy" },
    offline: { cls: "bg-destructive/10 text-destructive border-destructive/30", label: "Offline" },
  };
  const s = map[status];
  return (
    <Badge variant="outline" className={`${s.cls} text-[11px] gap-1.5`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "online" ? "bg-success animate-pulse" : status === "busy" ? "bg-warning" : "bg-destructive"}`} />
      {s.label}
    </Badge>
  );
}
