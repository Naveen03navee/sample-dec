import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle, CreditCard, Shield, Car, FileCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/kyc")({
  head: () => ({
    meta: [
      { title: "KYC Verification — E-Taxi" },
      { name: "description", content: "Upload your KYC documents for verification. Driving license, Aadhaar, PAN, and vehicle documents." },
    ],
  }),
  component: KycPage,
});

type DocStatus = "pending" | "uploaded" | "verified" | "rejected";

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  status: DocStatus;
  category: "driver" | "vehicle" | "ev";
}

function KycPage() {
  const [docs, setDocs] = useState<DocItem[]>([
    { id: "dl", title: "Driving License", subtitle: "Front & back photo required", icon: CreditCard, status: "pending", category: "driver" },
    { id: "aadhaar", title: "Aadhaar Card", subtitle: "Mask first 8 digits", icon: Shield, status: "uploaded", category: "driver" },
    { id: "pan", title: "PAN Card", subtitle: "Clear photo required", icon: CreditCard, status: "pending", category: "driver" },
    { id: "rc", title: "RC Book", subtitle: "Vehicle registration certificate", icon: Car, status: "pending", category: "vehicle" },
    { id: "insurance", title: "Insurance Certificate", subtitle: "Valid insurance document", icon: FileCheck, status: "pending", category: "vehicle" },
    { id: "puc", title: "Pollution Certificate", subtitle: "If applicable for EV", icon: FileCheck, status: "pending", category: "ev" },
  ]);

  const updateStatus = (id: string, status: DocStatus) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const allVerified = docs.every((d) => d.status === "verified");

  return (
    <MobileContainer>
      <div className="px-6 pt-6 pb-32 min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/register" className="size-10 bg-surface rounded-xl flex items-center justify-center border border-border">
            <ArrowLeft className="size-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-outfit font-semibold">KYC Verification</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {docs.filter((d) => d.status === "verified").length} of {docs.length} verified
            </p>
          </div>
        </div>

        {/* Overall Status */}
        <div className="bg-surface border border-border rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Verification Progress</span>
            <span className="text-xs text-electric font-semibold">
              {Math.round((docs.filter((d) => d.status === "verified").length / docs.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-electric rounded-full transition-all duration-500"
              style={{
                width: `${(docs.filter((d) => d.status === "verified").length / docs.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          <DocCategory
            title="Driver Documents"
            docs={docs.filter((d) => d.category === "driver")}
            onUpload={(id) => updateStatus(id, "uploaded")}
          />
          <DocCategory
            title="Vehicle Documents"
            docs={docs.filter((d) => d.category === "vehicle")}
            onUpload={(id) => updateStatus(id, "uploaded")}
          />
          <DocCategory
            title="EV Verification"
            docs={docs.filter((d) => d.category === "ev")}
            onUpload={(id) => updateStatus(id, "uploaded")}
          />
        </div>

        {/* Face Verification Link */}
        <div className="mt-8 bg-electric/5 border border-electric/20 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-electric/10 rounded-xl flex items-center justify-center">
                <Shield className="size-6 text-electric" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Face Verification</h3>
                <p className="text-xs text-muted-foreground">Selfie + liveness check</p>
              </div>
            </div>
            <Link
              to="/face-verification"
              className="px-4 py-2 bg-electric text-charcoal text-sm font-semibold rounded-xl"
            >
              Start
            </Link>
          </div>
        </div>

        {/* Continue Button */}
        <Link
          to="/dashboard"
          className={`w-full h-14 mt-8 font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform ${
            allVerified
              ? "bg-electric text-charcoal"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {allVerified ? "Go to Dashboard" : "Complete all documents"}
        </Link>
      </div>
      <BottomNav />
    </MobileContainer>
  );
}

function DocCategory({
  title,
  docs,
  onUpload,
}: {
  title: string;
  docs: DocItem[];
  onUpload: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h2>
      <div className="space-y-3">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} onUpload={() => onUpload(doc.id)} />
        ))}
      </div>
    </div>
  );
}

function DocCard({ doc, onUpload }: { doc: DocItem; onUpload: () => void }) {
  const Icon = doc.icon;

  const statusConfig = {
    pending: { bg: "bg-surface", border: "border-border", iconColor: "text-muted-foreground", chip: "bg-muted/50 text-muted-foreground", label: "Pending" },
    uploaded: { bg: "bg-surface", border: "border-amber-500/30", iconColor: "text-amber-400", chip: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Processing" },
    verified: { bg: "bg-electric/5", border: "border-electric/30", iconColor: "text-electric", chip: "bg-electric/10 text-electric border-electric/20", label: "Verified" },
    rejected: { bg: "bg-destructive/5", border: "border-destructive/30", iconColor: "text-destructive", chip: "bg-destructive/10 text-destructive border-destructive/20", label: "Rejected" },
  };

  const config = statusConfig[doc.status];

  return (
    <div className={`${config.bg} p-4 rounded-2xl border ${config.border} flex items-center gap-4`}>
      <div className={`size-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}>
        <Icon className={`size-6 ${config.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{doc.title}</h3>
        <p className="text-xs text-muted-foreground">{doc.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {doc.status === "verified" && <CheckCircle className="size-5 text-electric" />}
        {doc.status === "uploaded" && <Clock className="size-5 text-amber-400" />}
        {doc.status === "rejected" && <AlertCircle className="size-5 text-destructive" />}
        {doc.status === "pending" && (
          <button
            onClick={onUpload}
            className="size-9 bg-surface rounded-lg border border-border flex items-center justify-center hover:border-electric/50 transition-colors"
          >
            <Upload className="size-4 text-muted-foreground" />
          </button>
        )}
        <span className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full border ${config.chip}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}
