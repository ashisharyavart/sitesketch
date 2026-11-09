"use client";

import React, { useState } from "react";
import StudioCanvas from "./StudioCanvas";
import { StudioPartnerLogos } from "./ArchitecturalSVGs";
import {
  Sparkles,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  Compass
} from "lucide-react";

interface HeroProps {
  onOpenTrial: (tier?: string, email?: string) => void;
  onOpenWalkthrough: () => void;
}

export default function Hero({ onOpenTrial, onOpenWalkthrough }: HeroProps) {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      onOpenTrial("trial", emailInput);
    } else {
      onOpenTrial("trial");
    }
  };

  return (
    <section
      id="spatial-engine"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Background Architectural Blueprint Grid & Radial Glows */}
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Top Text & CTA Container */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Pre-header Pill Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
            <span>⚡ Spatial Engine v2.4 Beta Live — Generative BIM &amp; Photoreal Renders</span>
          </div>

          {/* Main Headline (H1) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.12]">
            Turn Rough Floor Sketches into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
              Photorealistic Spaces
            </span>{" "}
            in Seconds.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            SiteSketch transforms hand-drawn pencil schematics, CAD layouts, and raw job-site shells into immersive 3D interior renders, material schedules, and automated cost estimates.
          </p>

          {/* Action Bar (Email Input + Primary CTA + Walkthrough) */}
          <div className="pt-2 max-w-xl mx-auto">
            <form
              onSubmit={handleSubmitEmail}
              className="flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)] backdrop-blur-md"
            >
              <div className="flex-grow w-full">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your studio work email..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm whitespace-nowrap flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get 5 Free Studio Renders</span>
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
              <button
                type="button"
                onClick={onOpenWalkthrough}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold hover:underline cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400 ml-0.5" />
                </div>
                <span>Watch 60s Platform Walkthrough</span>
              </button>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No credit card required
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400">Direct DWG / Revit export</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Asset: High-Fidelity UI Frame (Studio Canvas) */}
        <div className="pt-2">
          <StudioCanvas onOpenTrial={onOpenTrial} />
        </div>

        {/* Social Proof Strip */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6 text-center">
          <p className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest">
            Trusted by 1,400+ interior designers, BIM modelers, and residential developers worldwide
          </p>

          <StudioPartnerLogos />
        </div>
      </div>
    </section>
  );
}
