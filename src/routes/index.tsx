import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { Zap, ArrowRight, LogIn } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Taxi Driver — Welcome" },
      { name: "description", content: "Join India's largest EV ride-hailing fleet. Start earning with electric mobility." },
      { property: "og:title", content: "E-Taxi Driver — Welcome" },
      { property: "og:description", content: "Join India's largest EV ride-hailing fleet. Start earning with electric mobility." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <MobileContainer>
      <div className="flex flex-col items-center text-center px-6 pt-16 pb-8 min-h-screen">
        {/* Logo */}
        <div className="size-20 bg-electric rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <Zap className="size-10 text-charcoal" strokeWidth={2.5} />
        </div>

        <h1 className="font-outfit text-4xl font-bold tracking-tight mb-2">
          E-Taxi
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium mb-10">
          EV Only Ride-Hailing
        </p>

        {/* Vehicle Illustration Area */}
        <div className="w-full aspect-[4/3] bg-surface rounded-3xl border border-border flex flex-col items-center justify-center mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="size-24 rounded-full bg-electric/10 border-2 border-electric/20 flex items-center justify-center">
              <Zap className="size-12 text-electric" strokeWidth={1.5} />
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              100% Electric Fleet
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-outfit font-semibold leading-tight text-balance mb-3">
          Drive the Future of Mobility
        </h2>
        <p className="text-muted-foreground text-base text-pretty mb-10 leading-relaxed">
          Join India's largest EV taxi fleet. Flexible shifts, zero emissions,
          and weekly payouts directly to your account.
        </p>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3 mt-auto">
          <Link
            to="/register"
            className="h-14 w-full bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 ring-1 ring-electric active:scale-[0.98] transition-transform"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/dashboard"
            className="h-14 w-full bg-surface text-foreground font-outfit font-medium rounded-2xl border border-border ring-1 ring-black/5 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <LogIn className="size-4" />
            Sign In
          </Link>
        </div>
      </div>
    </MobileContainer>
  );
}
