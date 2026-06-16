import { createFileRoute } from "@tanstack/react-router";
import { Bike, Car, CheckCircle2, Truck } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/vehicles")({
  head: () => ({ meta: [{ title: "Vehicles · EV Ride Admin" }] }),
  component: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
});

const fleet = [
  { kind: "E-Auto", icon: Truck, count: 248, active: 218, battery: 72 },
  { kind: "E-Bike", icon: Bike, count: 162, active: 141, battery: 68 },
  { kind: "E-Car", icon: Car, count: 94, active: 78, battery: 81 },
];

const pending = [
  { id: "VH-2241", model: "Mahindra Treo · E-Auto", owner: "Suresh Gowda", reg: "KA02GH7712", submitted: "2h ago" },
  { id: "VH-2242", model: "Ola S1 Pro · E-Bike", owner: "Vinay Reddy", reg: "KA09PQ4421", submitted: "5h ago" },
  { id: "VH-2243", model: "Tata Tigor EV · E-Car", owner: "Meena Krishnan", reg: "KA01RS8890", submitted: "1d ago" },
];

function Page() {
  return (
    <div className="max-w-[1400px]">
      <PageHeader
        title="Fleet & vehicles"
        description="Every EV on the platform — verification, battery health and operational status."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {fleet.map((f) => (
          <Card key={f.kind} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-11 w-11 rounded-xl bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-success/30 text-success bg-success/5">
                {f.active} active
              </Badge>
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.kind}</div>
            <div className="font-display text-3xl font-semibold mt-1">{f.count}</div>
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Avg battery</span>
                <span className="font-medium tabular-nums">{f.battery}%</span>
              </div>
              <Progress value={f.battery} className="h-1.5" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-semibold">Pending verification</h3>
            <p className="text-xs text-muted-foreground">Review submitted EV registration & documents</p>
          </div>
          <Badge variant="outline">{pending.length} awaiting</Badge>
        </div>
        <div className="space-y-2">
          {pending.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-4 py-3 px-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">{v.model}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {v.owner} · {v.reg} · submitted {v.submitted}
                </div>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-muted">
                Reject
              </button>
              <button className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
