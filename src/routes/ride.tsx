import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MobileFrame } from "@/components/MobileFrame";
import { MapBackground } from "@/components/MapBackground";
import { Phone, MessageSquare, X, Leaf, Star, Check } from "lucide-react";

const search = z.object({
  vehicle: z.string().default("compact"),
  fare: z.coerce.number().default(12.4),
});

export const Route = createFileRoute("/ride")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Your ride — Voltaride" }] }),
  component: RidePage,
});

type Stage = "searching" | "assigned" | "arriving" | "in_ride" | "completed";

const stageMeta: Record<Stage, { title: string; sub: string }> = {
  searching: { title: "Finding your driver", sub: "Matching you with a nearby EV…" },
  assigned: { title: "Driver assigned", sub: "Marcus is on the way" },
  arriving: { title: "Driver arriving", sub: "Pulling up in 2 min" },
  in_ride: { title: "Ride in progress", sub: "Estimated arrival in 11 min" },
  completed: { title: "You've arrived", sub: "Hope you enjoyed the silent ride" },
};

const order: Stage[] = ["searching", "assigned", "arriving", "in_ride", "completed"];

function RidePage() {
  const { fare } = Route.useSearch();
  const [stage, setStage] = useState<Stage>("searching");
  const [showCancel, setShowCancel] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const i = order.indexOf(stage);
    if (i < order.length - 1) {
      const t = setTimeout(() => setStage(order[i + 1]), stage === "in_ride" ? 4500 : 2500);
      return () => clearTimeout(t);
    }
    if (stage === "completed") {
      const t = setTimeout(() => setShowFeedback(true), 800);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const meta = stageMeta[stage];

  return (
    <MobileFrame hideTabs>
      <MapBackground />

      {/* Top status pill */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[342px] z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl ring-1 ring-black/5 shadow-sm px-4 py-3 flex items-center gap-3">
          <div className="relative size-3">
            <span className="absolute inset-0 rounded-full bg-leaf animate-ping opacity-60" />
            <span className="absolute inset-0 rounded-full bg-leaf" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight">{meta.title}</p>
            <p className="text-[11px] text-zinc-500">{meta.sub}</p>
          </div>
        </div>

        {/* Stage dots */}
        <div className="mt-3 flex items-center gap-1.5 px-1">
          {order.slice(0, 4).map((s, i) => {
            const reached = order.indexOf(stage) >= i;
            return (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-colors"
                style={{ background: reached ? "var(--leaf)" : "rgba(0,0,0,0.08)" }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom driver sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] ring-1 ring-black/5 shadow-[0_-12px_40px_-15px_rgba(0,0,0,0.1)] z-10">
        <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mt-3 mb-4" />
        <div className="px-6 pb-6">
          {stage === "searching" ? (
            <div className="py-6 text-center">
              <div className="mx-auto size-14 rounded-full bg-leaf-soft grid place-items-center mb-4">
                <span className="size-3 bg-leaf rounded-full animate-pulse" />
              </div>
              <p className="font-medium">Connecting to nearby drivers…</p>
              <p className="text-xs text-zinc-500 mt-1">This usually takes under 30 seconds.</p>
              <button
                onClick={() => setShowCancel(true)}
                className="mt-6 text-xs font-semibold text-zinc-500 underline underline-offset-4"
              >
                Cancel request
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div className="size-14 rounded-2xl bg-zinc-100 grid place-items-center text-lg font-semibold">M</div>
                <div className="flex-1">
                  <p className="font-semibold">Marcus Chen</p>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Star className="size-3 fill-amber-400 text-amber-400" /> 4.98 · 2,431 trips
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">Plate</p>
                  <p className="text-sm font-semibold tracking-tight">7 EV · 042</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 mb-4 bg-zinc-50 rounded-xl">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">Vehicle</p>
                  <p className="text-sm font-medium">Tesla Model 3 · Pearl White</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-leaf-soft rounded-md">
                  <Leaf className="size-3 text-leaf" />
                  <span className="text-[10px] font-bold text-leaf">EV</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button className="flex items-center justify-center gap-2 py-3.5 bg-spark text-white rounded-2xl font-semibold text-sm shadow-md shadow-spark/20">
                  <Phone className="size-4" /> Call
                </button>
                <button className="flex items-center justify-center gap-2 py-3.5 bg-white text-ink rounded-2xl font-semibold text-sm ring-1 ring-black/5">
                  <MessageSquare className="size-4" /> Message
                </button>
              </div>

              <button
                onClick={() => setShowCancel(true)}
                className="w-full text-center text-xs font-semibold text-zinc-500 py-2"
              >
                Cancel ride
              </button>
            </>
          )}
        </div>
      </div>

      {showCancel && <CancelSheet onClose={() => setShowCancel(false)} />}
      {showFeedback && <FeedbackSheet fare={fare} onClose={() => setShowFeedback(false)} />}
    </MobileFrame>
  );
}

function CancelSheet({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const reasons = ["Driver delayed", "Change of plan", "Wrong pickup location", "Found another ride"];
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="absolute inset-0 bg-black/40 z-30 flex items-end" onClick={onClose}>
      <div className="w-full bg-white rounded-t-[28px] p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Cancel ride?</h3>
          <button onClick={onClose}><X className="size-5 text-zinc-400" /></button>
        </div>
        <p className="text-sm text-zinc-500 mb-4">Pick a reason to help us improve.</p>
        <div className="space-y-2 mb-5">
          {reasons.map((r) => (
            <button
              key={r}
              onClick={() => setPicked(r)}
              className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all ${
                picked === r ? "bg-leaf-soft ring-2 ring-leaf" : "bg-zinc-50 ring-1 ring-black/5"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          disabled={!picked}
          onClick={() => navigate({ to: "/" })}
          className="w-full bg-leaf text-white py-3.5 rounded-2xl font-semibold disabled:opacity-40"
        >
          Confirm cancellation
        </button>
      </div>
    </div>
  );
}

function FeedbackSheet({ fare, onClose }: { fare: number; onClose: () => void }) {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [stars, setStars] = useState(0);
  const [note, setNote] = useState("");

  return (
    <div className="absolute inset-0 bg-black/40 z-30 flex items-end">
      <div className="w-full bg-white rounded-t-[28px] p-6 max-h-[90%] overflow-y-auto">
        <div className="mx-auto w-12 h-1 bg-zinc-200 rounded-full mb-4" />
        {!paid ? (
          <>
            <h3 className="text-xl font-semibold tracking-tight">Trip complete</h3>
            <p className="text-sm text-zinc-500 mt-1">Pay to wrap up your ride.</p>

            <div className="mt-4 p-4 bg-leaf-soft rounded-2xl flex items-center gap-3">
              <Leaf className="size-5 text-leaf" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-leaf">You saved 1.4kg of CO₂</p>
                <p className="text-[11px] text-leaf/80">Equivalent to a tree absorbing CO₂ for 3 weeks.</p>
              </div>
            </div>

            <div className="mt-5 p-4 bg-zinc-50 rounded-2xl">
              <div className="flex justify-between text-sm mb-2"><span className="text-zinc-500">Base fare</span><span>${(fare - 1.5).toFixed(2)}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-zinc-500">EV credit</span><span className="text-leaf">−$0.50</span></div>
              <div className="flex justify-between text-sm mb-3"><span className="text-zinc-500">Taxes</span><span>$2.00</span></div>
              <div className="h-px bg-zinc-200 mb-3" />
              <div className="flex justify-between font-semibold"><span>Total</span><span>${(fare + 0.5).toFixed(2)}</span></div>
            </div>

            <button
              onClick={() => {
                setPaying(true);
                setTimeout(() => { setPaying(false); setPaid(true); }, 1200);
              }}
              className="mt-5 w-full bg-leaf text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              {paying ? "Processing…" : `Pay $${(fare + 0.5).toFixed(2)} with Visa •••• 4242`}
            </button>
            <button onClick={() => navigate({ to: "/payment" })} className="mt-3 w-full text-xs font-semibold text-spark">
              Change payment method
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto size-14 rounded-full bg-leaf grid place-items-center mb-4">
              <Check className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-center">Payment successful</h3>
            <p className="text-sm text-zinc-500 text-center mt-1">Rate your trip with Marcus.</p>

            <div className="flex justify-center gap-2 my-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setStars(n)}>
                  <Star className={`size-9 ${n <= stars ? "fill-amber-400 text-amber-400" : "text-zinc-200"}`} />
                </button>
              ))}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything to add? (optional)"
              className="w-full bg-zinc-50 rounded-2xl p-4 text-sm outline-none resize-none ring-1 ring-black/5 focus:ring-2 focus:ring-leaf"
              rows={3}
            />

            <button
              onClick={() => { onClose(); navigate({ to: "/" }); }}
              className="mt-5 w-full bg-leaf text-white py-4 rounded-2xl font-semibold"
            >
              Submit & finish
            </button>
          </>
        )}
      </div>
    </div>
  );
}