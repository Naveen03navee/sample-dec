import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing · EV Ride Admin" }] }),
  component: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
});

const tiers = [
  { name: "E-Auto", base: 25, perKm: 12, perMin: 1.5, color: "var(--chart-1)" },
  { name: "E-Bike", base: 15, perKm: 7, perMin: 1, color: "var(--chart-2)" },
  { name: "E-Car", base: 60, perKm: 18, perMin: 2, color: "var(--chart-3)" },
];

function Page() {
  return (
    <div className="max-w-[1400px]">
      <PageHeader
        title="Pricing & surge"
        description="Control base fare, per-km rate, per-minute rate and surge multipliers across vehicle classes."
        action={{ label: "Save changes" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {tiers.map((t) => (
          <Card key={t.name} className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
            <div className="space-y-4">
              <Field label="Base fare (₹)" defaultValue={t.base} />
              <Field label="Per kilometre (₹)" defaultValue={t.perKm} />
              <Field label="Per minute (₹)" defaultValue={t.perMin} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg font-semibold">Surge management</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Dynamic pricing when demand exceeds supply
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="surge" className="text-sm">Enabled</Label>
            <Switch id="surge" defaultChecked />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">Maximum multiplier</Label>
              <span className="font-display text-2xl font-semibold">2.0×</span>
            </div>
            <Slider defaultValue={[2]} min={1} max={3} step={0.1} />
            <p className="text-xs text-muted-foreground mt-2">
              Fares can rise up to this multiple during peak demand.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">Demand threshold</Label>
              <span className="font-display text-2xl font-semibold">75%</span>
            </div>
            <Slider defaultValue={[75]} min={50} max={95} step={5} />
            <p className="text-xs text-muted-foreground mt-2">
              Surge activates when fleet utilisation exceeds this level.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: number }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
      <Input type="number" defaultValue={defaultValue} className="font-medium tabular-nums" />
    </div>
  );
}
