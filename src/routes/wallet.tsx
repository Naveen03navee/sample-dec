import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [{ title: "Wallet — Voltaride" }] }),
  component: WalletPage,
});

const txns = [
  { kind: "out", label: "Ride to Presidio Eco Center", date: "Today · 9:42 AM", amount: -12.9 },
  { kind: "in", label: "Wallet top-up", date: "Yesterday", amount: 50 },
  { kind: "out", label: "Ride to SoMa", date: "Wed", amount: -8.4 },
  { kind: "in", label: "Referral reward · Priya", date: "Mon", amount: 10 },
  { kind: "out", label: "Ride to SFO", date: "Sun", amount: -34.2 },
] as const;

function WalletPage() {
  return (
    <MobileFrame>
      <div className="absolute inset-0 overflow-y-auto bg-surface">
        <div className="px-6 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Wallet balance</p>
          <div className="mt-5 p-5 rounded-3xl bg-ink text-white shadow-xl">
            <p className="text-xs uppercase tracking-widest text-white/50">Available</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">$87.40</p>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl bg-white text-ink text-sm font-semibold flex items-center justify-center gap-1.5">
                <Plus className="size-4" /> Add money
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold">Withdraw</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[25, 50, 100].map((v) => (
              <button key={v} className="py-3 rounded-2xl bg-white ring-1 ring-black/5 font-semibold text-sm">
                +${v}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent activity</h2>
            <button className="text-xs font-medium text-spark">See all</button>
          </div>

          <div className="mt-3 space-y-1">
            {txns.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl ring-1 ring-black/5">
                <div
                  className={`size-10 rounded-full grid place-items-center ${
                    t.kind === "in" ? "bg-leaf-soft text-leaf" : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {t.kind === "in" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-tight">{t.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{t.date}</p>
                </div>
                <p className={`text-sm font-semibold ${t.amount > 0 ? "text-leaf" : ""}`}>
                  {t.amount > 0 ? "+" : "−"}${Math.abs(t.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="h-6" />
        </div>
      </div>
    </MobileFrame>
  );
}