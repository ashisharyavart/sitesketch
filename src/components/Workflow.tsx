"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  Cpu,
  Palette,
  FileCheck2,
  ArrowRight,
  Sparkles,
  Layers,
  Check
} from "lucide-react";

interface WorkflowProps {
  onOpenTrial: () => void;
}

export default function Workflow({ onOpenTrial }: WorkflowProps) {
  const [activeStyle, setActiveStyle] = useState<"minimalist" | "japandi" | "industrial" | "coastal">("minimalist");

  const styles = [
    {
      id: "minimalist",
      label: "Minimalist",
      palette: "Monochrome & European Oak",
      desc: "Clean line geometry, flush concealed cabinetry, frameless glazing, and warm white microcement."
    },
    {
      id: "japandi",
      label: "Japandi",
      palette: "Slatted Hinoki & Wabi-Sabi",
      desc: "Low-profile walnut plinths, woven tatami textures, organic clay plaster, and filtered shoji daylight."
    },
    {
      id: "industrial",
      label: "Industrial",
      palette: "Polished Concrete & Raw Steel",
      desc: "Exposed brick, blackened structural I-beams, ductwork accents, and factory grid sash windows."
    },
    {
      id: "coastal",
      label: "Coastal",
      palette: "Travertine & Whitewashed Cedar",
      desc: "Floor-to-ceiling sliding glass, bleached oak, linen upholstery, and soft oceanic daylighting."
    }
  ];

  const steps = [
    {
      number: "01",
      stepName: "Step 01: Capture & Upload",
      headline: "Drop Any 2D Tracing Paper or Photo",
      description:
        "Drag and drop any 2D sketch, blueprints, or raw on-site photo. Supports JPG, PNG, PDF, and DXF files.",
      icon: UploadCloud,
      meta: "Formats: JPG, PNG, PDF, DXF, DWG"
    },
    {
      number: "02",
      stepName: "Step 02: AI Spatial Analysis",
      headline: "Neural Boundary Extrusion",
      description:
        "The platform extrudes dimensions, segments room boundaries, and identifies architectural structural elements.",
      icon: Cpu,
      meta: "Latency: <1.2s on Cloud GPU"
    },
    {
      number: "03",
      stepName: "Step 03: Style, Material & Lighting Prompting",
      headline: "Curate Mood & Finishes",
      description:
        "Select a design style (Minimalist, Japandi, Industrial, Coastal) or input custom project design tokens.",
      icon: Palette,
      meta: "4 Presets + Custom Design Tokens"
    },
    {
      number: "04",
      stepName: "Step 04: One-Click Export & Spec Handoff",
      headline: "Deliver Visuals & BOM Takeoffs",
      description:
        "Export 4K Ultra-HD renders, interactive 3D web links, and synchronized CSV/PDF material schedules.",
      icon: FileCheck2,
      meta: "Sync: Revit, AutoCAD, Web 360"
    }
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 relative bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
            PRODUCTION PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            How SiteSketch Accelerates Your Studio Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From initial client coffee chat napkin sketch to contract-ready architectural visualization in four frictionless steps.
          </p>
        </div>

        {/* 4 Steps Production Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.number}
                className="relative rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 group shadow-lg"
              >
                {/* Step Number Stamp */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm group-hover:scale-105 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-slate-500 transition-colors">
                    {st.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    {st.stepName}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-white">
                    {st.headline}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {/* Meta bottom badge */}
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {st.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Style Tokens Showcase (Step 3 Highlight) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  Step 03 Highlight: Curated Architectural Style Presets
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">
                Calibrated Materials &amp; Design Vocabulary
              </h3>
            </div>

            <button
              onClick={onOpenTrial}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Style Generator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id as any)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                  activeStyle === style.id
                    ? "bg-slate-800/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-200">{style.label}</span>
                  {activeStyle === style.id && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-cyan-400">
                  {style.palette}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {style.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
