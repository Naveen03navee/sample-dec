import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Leaf, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: "Eco impact — Voltaride" }] }),
  component: ImpactPage,
});

const stats = [
  { label: "CO₂ saved", value: "18.4 kg", sub: "vs gas equivalent" },
  { label: "Electric trips", value: "47", sub: "all-time" },
  { label: "Rewards", value: "$24", sub: "earned" },
];

const weeks = [3, 5, 4, 6, 8, 7, 9, 6, 10, 8, 11, 12];

function ImpactPage() {
  return (
    <MobileFrame>
      <div className="absolute inset-0 overflow-y-auto bg-surface">
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2">
            <Leaf className="size-4 text-leaf" />
            <p className="text-xs font-semibold uppercase tracking-widest text-leaf">Your eco impact</p>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight leading-tight">
            You saved a small forest, one ride at a time.
          </h1>

          <div className="mt-6 p-5 rounded-3xl bg-leaf text-white shadow-xl shadow-leaf/20">
            <p className="text-xs uppercase tracking-widest text-white/70">CO₂ avoided this month</p>
            <p className="mt-1 text-5xl font-semibold tracking-tight">18.4<span className="text-2xl">kg</span></p>
            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <TrendingUp className="size-3.5" /> 23% more than last month
            </div>

            {/* Sparkline */}
            <div className="mt-5 flex items-end gap-1.5 h-16">
              {weeks.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-white/80"
                  style={{ height: `${(v / 12) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="p-3 bg-white rounded-2xl ring-1 ring-black/5">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">{s.label}</p>
                <p className="mt-1 text-lg font-semibold">{s.value}</p>
                <p className="text-[10px] text-zinc-400">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-white ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Refer & earn</p>
            <h3 className="mt-1 text-lg font-semibold">Give $10, get $10</h3>
            <p className="text-xs text-zinc-500 mt-1">Share your code. Both earn ride credit on the first trip.</p>
            <div className="mt-3 flex items-center gap-2 p-3 bg-leaf-soft rounded-xl">
              <code className="flex-1 text-sm font-mono font-semibold text-leaf">MARCUS-EV10</code>
              <button className="text-xs font-semibold text-leaf">Copy</button>
            </div>
          </div>
          <div className="h-6" />
        </div>
      </div>
    </MobileFrame>
  );
}