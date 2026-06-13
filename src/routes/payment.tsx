import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { ArrowLeft, Check, Plus } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — Voltaride" }] }),
  component: PaymentPage,
});

const methods = [
  { id: "visa", label: "Visa •••• 4242", sub: "Expires 09/27", tone: "from-blue-600 to-indigo-600" },
  { id: "upi", label: "UPI", sub: "you@okhdfc", tone: "from-emerald-500 to-teal-500" },
  { id: "gpay", label: "Google Pay", sub: "marcus@gmail.com", tone: "from-zinc-700 to-zinc-900" },
  { id: "paytm", label: "Paytm Wallet", sub: "Balance $42.10", tone: "from-sky-500 to-blue-600" },
  { id: "bhim", label: "BHIM", sub: "Linked account", tone: "from-orange-500 to-amber-500" },
  { id: "amzn", label: "Amazon Pay", sub: "Balance $12.00", tone: "from-amber-500 to-yellow-500" },
  { id: "cash", label: "Cash", sub: "Pay your driver directly", tone: "from-zinc-500 to-zinc-700" },
];

function PaymentPage() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState("visa");
  return (
    <MobileFrame>
      <div className="absolute inset-0 flex flex-col bg-surface">
        <div className="px-6 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => navigate({ to: "/" })} className="size-9 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">Payment method</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-2.5">
          {methods.map((m) => {
            const active = picked === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setPicked(m.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                  active ? "bg-white ring-2 ring-leaf ring-offset-2" : "bg-white ring-1 ring-black/5"
                }`}
              >
                <div className={`size-11 rounded-xl bg-gradient-to-br ${m.tone} grid place-items-center text-white text-[10px] font-bold uppercase`}>
                  {m.label.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-xs text-zinc-500">{m.sub}</p>
                </div>
                {active && <Check className="size-5 text-leaf" />}
              </button>
            );
          })}

          <button className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white ring-1 ring-dashed ring-zinc-300 text-left">
            <div className="size-11 rounded-xl bg-zinc-50 grid place-items-center">
              <Plus className="size-5 text-zinc-500" />
            </div>
            <p className="text-sm font-medium text-zinc-600">Add new method</p>
          </button>
        </div>
        <div className="p-6 pt-3 bg-surface">
          <button
            onClick={() => navigate({ to: "/" })}
            className="w-full bg-leaf text-white py-4 rounded-2xl font-semibold shadow-lg shadow-leaf/20"
          >
            Save & continue
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}