"use client";

import React, { useState, useEffect } from "react";
import { SiteSketchLogo, BlueprintSketchSVG, PhotorealLivingRoomSVG, FramingStagingSVG } from "./ArchitecturalSVGs";
import { X, Play, Pause, Sparkles } from "lucide-react";

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial?: () => void;
}

export default function WalkthroughModal({
  isOpen,
  onClose,
  onOpenTrial
}: WalkthroughModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      time: "0:00 - 0:12",
      title: "Step 01: Hand-Drawn Sketch Line Detection",
      description: "Upload hand-drawn pencil sketches, scans, or PDF floorplans. SiteSketch identifies exterior wall perimeters, partition lines, door swings, and window openings.",
      tag: "LINE DETECTION",
      component: <BlueprintSketchSVG className="w-full h-full" />
    },
    {
      time: "0:12 - 0:28",
      title: "Step 02: Realistic Lighting & Material Preview",
      description: "Review material finishes, ambient lighting color temperatures, and surface textures directly applied to the detected room layout.",
      tag: "FINISH PREVIEW",
      component: <PhotorealLivingRoomSVG lighting="daylight" className="w-full h-full" />
    },
    {
      time: "0:28 - 0:45",
      title: "Step 03: Construction Phase Progression",
      description: "Track spatial progress from structural wall layout through rough-in mechanical routing to completed interior finishes.",
      tag: "CONSTRUCTION PLANNING",
      component: <FramingStagingSVG className="w-full h-full" />
    },
    {
      time: "0:45 - 1:00",
      title: "Step 04: Preliminary Bill of Materials (BOM) Takeoff",
      description: "Calculates flooring square footages with waste allowances, wall finishes, and fixture counts with instant CSV export.",
      tag: "BOM SPEC EXPORT",
      component: <PhotorealLivingRoomSVG lighting="sunset" className="w-full h-full" />
    }
  ];

  // Auto-play walkthrough progression
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-[0_0_80px_-15px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <SiteSketchLogo className="w-7 h-7" />
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                SiteSketch 60-Second Interactive Tour
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  SPATIAL WORKFLOW
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs flex items-center gap-1 font-mono cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Simulation Viewport */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          {/* Active scene animation */}
          <div className="absolute inset-0 transition-opacity duration-500">
            {steps[activeStep].component}
          </div>

          {/* Floating UI overlay badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              {steps[activeStep].tag} • {steps[activeStep].time}
            </span>
          </div>

          {/* Step Timeline Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeStep === i
                    ? "w-8 bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Narrative Description & Chapter Selector */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {steps.map((st, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  activeStep === i
                    ? "bg-slate-800/90 border-cyan-500/60 shadow-sm"
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-mono text-cyan-400">{st.time}</div>
                <div className="text-xs font-bold text-slate-200 line-clamp-1">{st.title}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div>
              <h4 className="text-sm font-bold text-slate-100">{steps[activeStep].title}</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{steps[activeStep].description}</p>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onOpenTrial) onOpenTrial();
              }}
              className="py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-[0_0_16px_rgba(6,182,212,0.4)] shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Free Trial Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
