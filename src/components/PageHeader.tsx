import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; icon?: ReactNode };
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
          EV Ride · Admin
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">{description}</p>
      </div>
      {action && (
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}
