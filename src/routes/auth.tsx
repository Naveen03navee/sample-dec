import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Leaf, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Voltaride" },
      { name: "description", content: "Sign in to Voltaride with a one-time code." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  return (
    <MobileFrame hideTabs>
      <div className="absolute inset-0 flex flex-col px-6 pt-8 pb-10 bg-surface">
        <div className="size-14 rounded-2xl bg-leaf grid place-items-center shadow-lg shadow-leaf/30">
          <Leaf className="size-7 text-white" />
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          {step === "phone" ? "Ride electric." : "Enter your code"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
          {step === "phone"
            ? "Sign in with your mobile number. We'll text you a one-time code."
            : `We sent a 4-digit code to ${phone || "your phone"}.`}
        </p>

        {step === "phone" ? (
          <div className="mt-8">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Mobile</label>
            <div className="mt-2 flex items-center gap-2 bg-white rounded-2xl ring-1 ring-black/5 px-4 py-4">
              <span className="text-sm font-medium text-zinc-500">+1</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 010-2024"
                inputMode="tel"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 flex gap-3">
            {otp.map((d, i) => (
              <input
                key={i}
                value={d}
                maxLength={1}
                onChange={(e) => {
                  const next = [...otp];
                  next[i] = e.target.value.replace(/\D/g, "");
                  setOtp(next);
                }}
                className="w-14 h-16 text-center text-xl font-semibold bg-white rounded-2xl ring-1 ring-black/5 outline-none focus:ring-2 focus:ring-leaf"
              />
            ))}
          </div>
        )}

        <div className="mt-auto">
          {step === "otp" && (
            <button className="mb-3 text-xs font-medium text-spark">Resend code in 0:24</button>
          )}
          <button
            onClick={() => (step === "phone" ? setStep("otp") : navigate({ to: "/" }))}
            className="w-full bg-leaf text-white py-4 rounded-2xl font-semibold shadow-lg shadow-leaf/20 ring-4 ring-leaf/10 flex items-center justify-center gap-2"
          >
            {step === "phone" ? "Send code" : "Verify & continue"}
            <ArrowRight className="size-4" />
          </button>
          <p className="mt-4 text-center text-[11px] text-zinc-400 leading-relaxed">
            By continuing you agree to Voltaride's Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}