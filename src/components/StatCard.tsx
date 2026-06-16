import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon: LucideIcon;
  accent?: boolean;
}

export function StatCard({ label, value, delta, hint, icon: Icon, accent }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card
      className={cn(
        "p-6 relative overflow-hidden border-border/60 transition-all hover:shadow-[var(--shadow-elegant)]",
        accent && "bg-[var(--gradient-primary)] text-primary-foreground border-transparent",
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className={cn(
            "text-xs uppercase tracking-wider font-medium",
            accent ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
        <div
          className={cn(
            "h-9 w-9 rounded-lg grid place-items-center",
            accent ? "bg-white/10" : "bg-accent/40 text-primary",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="font-display text-3xl font-semibold tracking-tight">{value}</div>
      <div className="flex items-center gap-2 mt-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              accent
                ? "text-primary-foreground"
                : positive
                  ? "text-success"
                  : "text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && (
          <span className={cn(accent ? "text-primary-foreground/60" : "text-muted-foreground")}>
            {hint}
          </span>
        )}
      </div>
    </Card>
  );
}
