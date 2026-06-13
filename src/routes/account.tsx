import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ChevronRight, Home, Briefcase, History, Gift, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Voltaride" }] }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <MobileFrame>
      <div className="absolute inset-0 overflow-y-auto bg-surface">
        <div className="px-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-leaf grid place-items-center text-white text-xl font-semibold">A</div>
            <div>
              <p className="text-lg font-semibold">Alex Rivera</p>
              <p className="text-xs text-zinc-500">+1 (555) 010-2024</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Trips" value="47" />
            <Stat label="Spent" value="$612" />
            <Stat label="Rating" value="4.96" />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-zinc-500">Saved places</p>
          <div className="mt-2 space-y-2">
            <Row icon={Home} title="Home" sub="412 Oak Avenue" />
            <Row icon={Briefcase} title="Work" sub="1 Market Plaza" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">Account</p>
          <div className="mt-2 space-y-2">
            <Row icon={History} title="Ride history" to="/history" />
            <Row icon={CreditCard} title="Payment methods" to="/payment" />
            <Row icon={Gift} title="Refer a friend" sub="Earn $10 per signup" />
            <Row icon={Bell} title="Notifications" />
            <Row icon={HelpCircle} title="Help & support" />
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white ring-1 ring-black/5 text-sm font-semibold text-zinc-600">
            <LogOut className="size-4" /> Sign out
          </button>
          <p className="mt-4 text-center text-[11px] text-zinc-400">Voltaride · v1.0</p>
          <div className="h-6" />
        </div>
      </div>
    </MobileFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-white rounded-2xl ring-1 ring-black/5">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function Row({
  icon: Icon,
  title,
  sub,
  to,
}: {
  icon: typeof Home;
  title: string;
  sub?: string;
  to?: "/history" | "/payment";
}) {
  const body = (
    <div className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white ring-1 ring-black/5">
      <div className="size-9 rounded-xl bg-zinc-50 grid place-items-center">
        <Icon className="size-4 text-zinc-600" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium">{title}</p>
        {sub && <p className="text-[11px] text-zinc-500">{sub}</p>}
      </div>
      <ChevronRight className="size-4 text-zinc-400" />
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : <button className="w-full">{body}</button>;
}