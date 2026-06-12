import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileContainer } from "@/components/MobileContainer";
import { ArrowLeft, Camera, ScanFace, CheckCircle, Shield } from "lucide-react";
import { useState, useRef, useCallback } from "react";

export const Route = createFileRoute("/face-verification")({
  head: () => ({
    meta: [
      { title: "Face Verification — E-Taxi" },
      { name: "description", content: "Complete face verification for your E-Taxi driver account." },
    ],
  }),
  component: FaceVerificationPage,
});

function FaceVerificationPage() {
  const [step, setStep] = useState<"intro" | "camera" | "preview" | "success">("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStep("camera");
    } catch {
      setCapturedImage("mock-selfie");
      setStep("preview");
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL("image/png"));
      }
    }
    setStep("preview");
  }, []);

  const retake = useCallback(() => {
    setCapturedImage(null);
    setStep("camera");
  }, []);

  const submit = useCallback(() => {
    setStep("success");
  }, []);

  return (
    <MobileContainer>
      <div className="px-6 pt-6 pb-8 min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/kyc" className="size-10 bg-surface rounded-xl flex items-center justify-center border border-border">
            <ArrowLeft className="size-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-outfit font-semibold">Face Verification</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Secure your account</p>
          </div>
        </div>

        {step === "intro" && (
          <IntroStep onStart={startCamera} />
        )}

        {step === "camera" && (
          <CameraStep videoRef={videoRef} onCapture={capturePhoto} />
        )}

        {step === "preview" && (
          <PreviewStep
            image={capturedImage}
            onRetake={retake}
            onSubmit={submit}
          />
        )}

        {step === "success" && (
          <SuccessStep />
        )}
      </div>
    </MobileContainer>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-8">
      <div className="bg-surface rounded-3xl border border-border p-8 flex flex-col items-center text-center">
        <div className="size-20 bg-electric/10 rounded-full flex items-center justify-center mb-6">
          <ScanFace className="size-10 text-electric" />
        </div>
        <h2 className="text-xl font-outfit font-semibold mb-2">Verify Your Identity</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We'll take a quick selfie to match with your documents. Make sure you're in a well-lit area.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-surface rounded-2xl border border-border">
          <div className="size-10 bg-electric/10 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="size-5 text-electric" />
          </div>
          <div>
            <h3 className="font-medium text-sm mb-1">Prevent Fake Accounts</h3>
            <p className="text-xs text-muted-foreground">Face match ensures only verified drivers access the platform.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-surface rounded-2xl border border-border">
          <div className="size-10 bg-electric/10 rounded-xl flex items-center justify-center shrink-0">
            <Camera className="size-5 text-electric" />
          </div>
          <div>
            <h3 className="font-medium text-sm mb-1">Quick & Secure</h3>
            <p className="text-xs text-muted-foreground">Takes less than 30 seconds. Your photo is encrypted and stored securely.</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <Camera className="size-5" />
        Take Selfie
      </button>
    </div>
  );
}

function CameraStep({
  videoRef,
  onCapture,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCapture: () => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-muted-foreground">
        Position your face within the frame
      </p>
      <div className="relative aspect-[3/4] bg-surface rounded-3xl border-2 border-electric/30 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {/* Face outline guide */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-60 border-2 border-dashed border-electric/40 rounded-full" />
        </div>
      </div>
      <button
        onClick={onCapture}
        className="w-full h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <Camera className="size-5" />
        Capture Photo
      </button>
    </div>
  );
}

function PreviewStep({
  image,
  onRetake,
  onSubmit,
}: {
  image: string | null;
  onRetake: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-muted-foreground">
        Review your photo before submitting
      </p>
      <div className="aspect-[3/4] bg-surface rounded-3xl border border-border overflow-hidden">
        {image === "mock-selfie" ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="size-24 bg-electric/10 rounded-full flex items-center justify-center">
              <ScanFace className="size-12 text-electric" />
            </div>
            <p className="text-sm text-muted-foreground">Mock selfie preview</p>
          </div>
        ) : image ? (
          <img src={image} alt="Captured selfie" className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 h-14 bg-surface text-foreground font-outfit font-medium rounded-2xl border border-border flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Retake
        </button>
        <button
          onClick={onSubmit}
          className="flex-[2] h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <CheckCircle className="size-5" />
          Submit
        </button>
      </div>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-center text-center pt-12 space-y-6">
      <div className="size-24 bg-electric/10 rounded-full flex items-center justify-center">
        <CheckCircle className="size-12 text-electric" />
      </div>
      <div>
        <h2 className="text-2xl font-outfit font-semibold mb-2">Verification Submitted</h2>
        <p className="text-sm text-muted-foreground leading-relaxed px-4">
          Your documents and selfie are under review. We'll notify you within 24 hours.
        </p>
      </div>
      <div className="w-full space-y-3 pt-6">
        <Link
          to="/kyc"
          className="w-full h-14 bg-electric text-charcoal font-outfit font-semibold rounded-2xl flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Back to KYC
        </Link>
        <Link
          to="/dashboard"
          className="w-full h-14 bg-surface text-foreground font-outfit font-medium rounded-2xl border border-border flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
