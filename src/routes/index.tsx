import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { MapBackground } from "@/components/MapBackground";
import { Leaf, MapPin, Home, Briefcase, ArrowRight, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voltaride — Electric Rides" },
      { name: "description", content: "Book clean, all-electric rides with transparent fares and real-time tracking." },
      { property: "og:title", content: "Voltaride — Electric Rides" },
      { property: "og:description", content: "Book clean, all-electric rides with transparent fares and real-time tracking." },
    ],
  }),
  component: Index,
});

const vehicles = [
  { id: "compact", name: "Volt Compact", eta: "3 min", note: "Low carbon impact", price: 12.4, badge: "FREE EMISSIONS" },
  { id: "haven", name: "Volt Haven", eta: "6 min", note: "Premium SUV", price: 24.5 },
  { id: "share", name: "Volt Share", eta: "5 min", note: "Pool ride", price: 8.2 },
];

function Index() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("88 Battery Street, San Francisco");
  const [drop, setDrop] = useState("Presidio Eco Center");
  const [vehicle, setVehicle] = useState("compact");
  const selected = vehicles.find((v) => v.id === vehicle)!;

  return (
    <MobileFrame>
      <MapBackground />

      {/* Top route card */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[342px] z-10">
        <div className="px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl ring-1 ring-black/5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-spark shrink-0" />
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="flex-1 text-sm font-medium bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="Pickup"
            />
          </div>
          <div className="h-4 w-px bg-zinc-200 ml-[3.5px] my-1" />
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-leaf shrink-0" />
            <input
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="flex-1 text-sm font-medium bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="Where to?"
            />
          </div>
        </div>

        {/* Saved places */}
        <div className="flex gap-2 mt-3 px-1">
          <button
            onClick={() => setDrop("Home · 412 Oak Ave")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full ring-1 ring-black/5 text-xs font-medium"
          >
            <Home className="size-3" /> Home
          </button>
          <button
            onClick={() => setDrop("Work · 1 Market Plaza")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full ring-1 ring-black/5 text-xs font-medium"
          >
            <Briefcase className="size-3" /> Work
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full ring-1 ring-black/5 text-xs font-medium">
            <MapPin className="size-3" /> Saved
          </button>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] ring-1 ring-black/5 shadow-[0_-12px_40px_-15px_rgba(0,0,0,0.1)] z-10">
        <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mt-3 mb-4" />
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Select your ride</h2>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-leaf-soft rounded-full">
              <Leaf className="size-3.5 text-leaf" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-leaf">1.2kg saved</span>
            </div>
          </div>

          <div className="space-y-2.5 mb-5 max-h-[260px] overflow-y-auto">
            {vehicles.map((v) => {
              const active = v.id === vehicle;
              return (
                <button
                  key={v.id}
                  onClick={() => setVehicle(v.id)}
                  className={`w-full flex items-center p-3.5 rounded-2xl transition-all text-left ${
                    active ? "bg-zinc-50 ring-2 ring-leaf ring-offset-2" : "bg-white ring-1 ring-black/5"
                  }`}
                >
                  <div className="size-12 bg-leaf-soft rounded-xl grid place-items-center shrink-0">
                    <CarIcon />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`font-medium ${active ? "" : "text-zinc-700"}`}>{v.name}</p>
                    <p className="text-xs text-zinc-500">
                      {v.eta} • {v.note}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${active ? "" : "text-zinc-600"}`}>${v.price.toFixed(2)}</p>
                    {v.badge && active && <p className="text-[10px] text-leaf font-bold">{v.badge}</p>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment glimpse */}
          <button
            onClick={() => navigate({ to: "/payment" })}
            className="w-full flex items-center justify-between p-3 mb-4 bg-zinc-50 rounded-xl text-left"
          >
            <div className="flex items-center gap-2">
              <div className="size-5 bg-spark rounded-sm" />
              <span className="text-sm font-medium">Visa •••• 4242</span>
            </div>
            <ChevronDown className="size-4 text-zinc-400" />
          </button>

          <Link
            to="/ride"
            search={{ vehicle: selected.id, fare: selected.price }}
            className="w-full bg-leaf text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-leaf/20 ring-4 ring-leaf/10 active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
          >
            Confirm — ${selected.price.toFixed(2)}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-6 text-leaf" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18 L7 12 H25 L27 18 V24 H5 Z" />
      <circle cx="10" cy="24" r="2" fill="currentColor" />
      <circle cx="22" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}
