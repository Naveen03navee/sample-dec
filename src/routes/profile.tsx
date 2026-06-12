import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, User, Phone, Mail, MapPin, Car, Battery, Hash, Star, Award, Shield, Crown, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Driver Profile — E-Taxi" },
      { name: "description", content: "View and manage your E-Taxi driver profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <MobileContainer>
      <div className="pb-24">
        {/* Profile Header */}
        <div className="bg-surface border-b border-border px-6 pt-6 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/dashboard" className="size-10 bg-background rounded-xl flex items-center justify-center border border-border">
              <ArrowLeft className="size-5 text-muted-foreground" />
            </Link>
            <h1 className="text-xl font-outfit font-semibold">My Profile</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-20 bg-electric/10 rounded-2xl flex items-center justify-center border-2 border-electric/20">
              <User className="size-10 text-electric" />
            </div>
            <div>
              <h2 className="text-xl font-outfit font-semibold">Arjun Mehta</h2>
              <div className="flex items-center gap-2 mt-1">
                <Star className="size-4 text-electric fill-electric" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-muted-foreground">(128 rides)</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="size-2 bg-electric rounded-full animate-pulse" />
                <span className="text-xs text-electric font-medium uppercase tracking-wider">Active Driver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Star} label="Rating" value="4.8" />
            <StatCard icon={Award} label="Rides" value="128" />
            <StatCard icon={Shield} label="KYC" value="Done" green />
          </div>
        </div>

        {/* Subscription */}
        <div className="px-6 mb-6">
          <Link to="/dashboard" className="block bg-electric/5 border border-electric/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-electric/10 rounded-xl flex items-center justify-center">
                  <Crown className="size-5 text-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Free Plan</h3>
                  <p className="text-xs text-muted-foreground">12% commission</p>
                </div>
              </div>
              <span className="text-xs text-electric font-semibold bg-electric/10 px-3 py-1 rounded-full">
                Current
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Upgrade to Premium for 8% commission, priority rides & charging discounts.
            </p>
          </Link>
        </div>

        {/* Personal Info */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Personal Information
          </h3>
          <div className="bg-surface border border-border rounded-2xl divide-y divide-border">
            <InfoRow icon={Phone} label="Mobile" value="+91 98765 43210" />
            <InfoRow icon={Mail} label="Email" value="arjun.mehta@email.com" />
            <InfoRow icon={MapPin} label="City" value="Mumbai, Maharashtra" />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Vehicle Information
          </h3>
          <div className="bg-surface border border-border rounded-2xl divide-y divide-border">
            <InfoRow icon={Car} label="Vehicle" value="Tata Tigor EV" />
            <InfoRow icon={Hash} label="Registration" value="MH 01 AA 1234" />
            <InfoRow icon={Battery} label="Battery" value="30 kWh / 312 km range" />
          </div>
        </div>

        {/* Documents */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Documents Status
          </h3>
          <div className="bg-surface border border-border rounded-2xl divide-y divide-border">
            <DocRow label="Driving License" status="verified" />
            <DocRow label="Aadhaar Card" status="verified" />
            <DocRow label="PAN Card" status="verified" />
            <DocRow label="RC Book" status="verified" />
            <DocRow label="Insurance" status="verified" />
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileContainer>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  green,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col items-center text-center">
      <Icon className={`size-5 mb-2 ${green ? "text-electric" : "text-muted-foreground"}`} />
      <p className="text-lg font-outfit font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4">
      <Icon className="size-5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function DocRow({ label, status }: { label: string; status: "verified" | "pending" }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm font-medium">{label}</span>
      <span
        className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
          status === "verified"
            ? "bg-electric/10 text-electric"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
