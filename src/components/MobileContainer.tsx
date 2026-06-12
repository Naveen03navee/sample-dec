import type { ReactNode } from "react";

export function MobileContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal text-foreground font-inter antialiased selection:bg-electric/30">
      <div className="max-w-md mx-auto min-h-screen relative">
        {children}
      </div>
    </div>
  );
}
