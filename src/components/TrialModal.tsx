"use client";

import React, { useState } from "react";
import { SiteSketchLogo } from "./ArchitecturalSVGs";
import { X, CheckCircle2, ArrowRight, Loader2, Sparkles, ShieldCheck, Key } from "lucide-react";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: string;
  defaultEmail?: string;
}

export default function TrialModal({
  isOpen,
  onClose,
  defaultEmail = ""
}: TrialModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [studioName, setStudioName] = useState("");
  const [studioSize, setStudioSize] = useState("2-10");
  const [primaryBim, setPrimaryBim] = useState("Revit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "provisioning" | "success">("form");
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [apiKey] = useState("sk_live_992f8a4e_arch_7b82x4");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStep("provisioning");

    let p = 10;
    const interval = setInterval(() => {
      p += 25;
      setProvisionProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep("success");
        }, 400);
      }
    }, 450);
  };

  const handleReset = () => {
    setStep("form");
    setProvisionProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] p-6 sm:p-8 overflow-hidden">
        {/* Architectural grid background accent */}
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "form" && (
          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
              <SiteSketchLogo className="w-9 h-9" />
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  Launch Studio Beta
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    14-DAY TRIAL
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Instant cloud GPU workspace • No credit card required
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  STUDIO WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@archstudio.design"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    PRACTICE / FIRM NAME
                  </label>
                  <input
                    type="text"
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    placeholder="e.g. Forma Architects"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    STUDIO TEAM SIZE
                  </label>
                  <select
                    value={studioSize}
                    onChange={(e) => setStudioSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                  >
                    <option value="solo">Solo Architect / Designer</option>
                    <option value="2-10">Boutique (2 - 10 Seats)</option>
                    <option value="11-50">Studio Practice (11 - 50 Seats)</option>
                    <option value="50+">Commercial Firm (50+ Seats)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  PRIMARY CAD / BIM ECOSYSTEM
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {["Revit", "AutoCAD", "SketchUp", "Rhino"].map((tool) => (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => setPrimaryBim(tool)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all ${
                        primaryBim === tool
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate 5 Free Studio Renders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> AES-256 Vault
                </span>
                <span>•</span>
                <span>Never trained on public models</span>
                <span>•</span>
                <span>Immediate access</span>
              </div>
            </form>
          </div>
        )}

        {step === "provisioning" && (
          <div className="relative z-10 py-10 flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <SiteSketchLogo className="w-8 h-8" glow={false} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-slate-100 font-mono">
                PROVISIONING SPATIAL GPU NODE...
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Mounting diffusion v2.4 weights &amp; allocating 5 high-resolution rendering tokens
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-cyan-400 h-full transition-all duration-300 shadow-[0_0_12px_#06b6d4]"
                style={{ width: `${Math.min(100, provisionProgress)}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Configuring {primaryBim} pipeline synchronization...</span>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="relative z-10 py-6 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-100">
                Studio Workspace Ready!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto font-mono">
                We&apos;ve dispatched your workspace authentication token to{" "}
                <span className="text-cyan-400 font-semibold">{email || "your studio email"}</span>.
              </p>
            </div>

            {/* Simulated API Key Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  STUDIO SESSION KEY
                </span>
                <span className="text-emerald-400 font-semibold">ACTIVE</span>
              </div>
              <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded border border-slate-800 select-all overflow-x-auto">
                {apiKey}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <span>Launch Canvas in Browser</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
