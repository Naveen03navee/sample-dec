import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { customers } from "@/lib/mock-data";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers · EV Ride Admin" }] }),
  component: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
});

const tierColor: Record<string, string> = {
  Platinum: "bg-[var(--gradient-primary)] text-primary-foreground border-transparent",
  Gold: "bg-warning/15 text-warning border-warning/40",
  Silver: "bg-muted text-foreground border-border",
  Bronze: "bg-accent/40 text-accent-foreground border-accent",
};

function Page() {
  return (
    <div className="max-w-[1400px]">
      <PageHeader
        title="Customers"
        description="Riders across the platform — loyalty tier, lifetime value and engagement."
      />

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground text-left">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Tier</th>
              <th className="px-6 py-3 font-medium">Rides</th>
              <th className="px-6 py-3 font-medium">Lifetime spend</th>
              <th className="px-6 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {c.name.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{c.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={tierColor[c.tier]}>{c.tier}</Badge>
                </td>
                <td className="px-6 py-4 tabular-nums">{c.rides}</td>
                <td className="px-6 py-4 tabular-nums font-medium">₹{c.spent.toLocaleString()}</td>
                <td className="px-6 py-4 text-muted-foreground">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
