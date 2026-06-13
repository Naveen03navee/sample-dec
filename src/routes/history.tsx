import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ArrowLeft, Leaf, RotateCw } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Ride history — Voltaride" }] }),
  component: HistoryPage,
});

const rides = [
  { date: "Today · 9:42 AM", from: "88 Battery St", to: "Presidio Eco Center", fare: 12.9, co2: 1.4 },
  { date: "Wed · 6:18 PM", from: "Office", to: "Mission District", fare: 8.4, co2: 0.9 },
  { date: "Mon · 10:02 AM", from: "Home", to: "Embarcadero", fare: 6.2, co2: 0.7 },
  { date: "Sun · 7:14 AM", from: "Home", to: "SFO Terminal 2", fare: 34.2, co2: 4.1 },
  { date: "Fri · 9:20 PM", from: "Castro", to: "Home", fare: 11.7, co2: 1.2 },
];

function HistoryPage() {
  return (
    <MobileFrame>
      <div className="absolute inset-0 overflow-y-auto bg-surface">
        <div className="px-6 pt-4 flex items-center gap-3">
          <Link to="/account" className="size-9 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">Ride history</h1>
        </div>
        <div className="px-6 pt-4 space-y-3 pb-6">
          {rides.map((r, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-zinc-500">{r.date}</p>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-leaf-soft rounded-full">
                  <Leaf className="size-3 text-leaf" />
                  <span className="text-[10px] font-bold text-leaf">−{r.co2}kg CO₂</span>
                </div>
              </div>
              <div className="mt-3 flex">
                <div className="flex flex-col items-center pt-1">
                  <div className="size-2 rounded-full bg-spark" />
                  <div className="w-px flex-1 bg-zinc-200 my-1" />
                  <div className="size-2 rounded-sm bg-leaf" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium leading-tight">{r.from}</p>
                  <div className="h-3" />
                  <p className="text-sm font-medium leading-tight">{r.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold">${r.fare.toFixed(2)}</p>
                </div>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-50 text-sm font-semibold ring-1 ring-black/5">
                <RotateCw className="size-3.5" /> Rebook
              </button>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}