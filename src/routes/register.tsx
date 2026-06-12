import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { ArrowLeft, ChevronRight, User, Phone, Mail, Calendar, MapPin, Car, Battery, Hash } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Driver Registration — E-Taxi" },
      { name: "description", content: "Register as an E-Taxi EV driver. Complete your profile and start earning." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  return (
    <MobileContainer>
      <div className="px-6 pt-6 pb-32 min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="size-10 bg-surface rounded-xl flex items-center justify-center border border-border">
            <ArrowLeft className="size-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-outfit font-semibold">Registration</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-electric" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Form Steps */}
        {step === 1 && <PersonalInfoStep onNext={() => setStep(2)} />}
        {step === 2 && <AddressStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <VehicleStep onNext={() => {}} onBack={() => setStep(2)} />}
      </div>
    </MobileContainer>
  );
}

function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-surface border border-border rounded-2xl h-14 pl-12 pr-4 focus:border-electric outline-none transition-colors text-sm placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}

function PersonalInfoStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-outfit font-semibold mb-1">Personal Information</h2>
        <p className="text-sm text-muted-foreground">Enter details as per your Aadhaar card</p>
      </div>

      <div className="space-y-4">
        <InputField label="Full Name" icon={User} placeholder="Arjun Sharma" />
        <InputField label="Mobile Number" icon={Phone} type="tel" placeholder="+91 98765 43210" />
        <InputField label="Email Address" icon={Mail} type="email" placeholder="arjun@email.com" />
        <InputField label="Date of Birth" icon={Calendar} type="date" placeholder="" />
      </div>

      <button
        onClick={onNext}
        className="w-full h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 mt-8 active:scale-[0.98] transition-transform"
      >
        Continue
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

function AddressStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-outfit font-semibold mb-1">Address Details</h2>
        <p className="text-sm text-muted-foreground">Your current residential address</p>
      </div>

      <div className="space-y-4">
        <InputField label="Current Address" icon={MapPin} placeholder="House No, Street, Locality" />
        <InputField label="City" icon={MapPin} placeholder="Mumbai" />
        <InputField label="State" icon={MapPin} placeholder="Maharashtra" />
        <InputField label="PIN Code" icon={Hash} placeholder="400001" />
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 h-14 bg-surface text-foreground font-outfit font-medium rounded-2xl border border-border flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Continue
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function VehicleStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [vehicleType, setVehicleType] = useState("");

  const types = [
    { id: "e-sedan", label: "E-Sedan", desc: "4-door electric car" },
    { id: "e-auto", label: "E-Auto", desc: "Electric 3-wheeler" },
    { id: "e-bike", label: "E-Bike", desc: "Electric 2-wheeler" },
    { id: "fleet", label: "Fleet", desc: "Company-owned vehicle" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-outfit font-semibold mb-1">Vehicle Information</h2>
        <p className="text-sm text-muted-foreground">Details of your electric vehicle</p>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">
          Vehicle Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setVehicleType(t.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                vehicleType === t.id
                  ? "border-electric bg-electric/10"
                  : "border-border bg-surface"
              }`}
            >
              <Car className={`size-5 mb-2 ${vehicleType === t.id ? "text-electric" : "text-muted-foreground"}`} />
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <InputField label="Registration Number" icon={Hash} placeholder="MH 01 AA 1234" />
        <InputField label="Battery Capacity" icon={Battery} placeholder="30 kWh" />
        <InputField label="Vehicle Model" icon={Car} placeholder="Tata Tigor EV" />
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 h-14 bg-surface text-foreground font-outfit font-medium rounded-2xl border border-border flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Back
        </button>
        <Link
          to="/kyc"
          className="flex-[2] h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Continue to KYC
          <ChevronRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
