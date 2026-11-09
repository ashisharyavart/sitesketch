"use client";

import React from "react";
import FeatureTabs from "./FeatureTabs";
import {
  BlueprintSketchSVG,
  PhotorealLivingRoomSVG,
  FramingStagingSVG
} from "./ArchitecturalSVGs";
import {
  PenTool,
  Sun,
  FileSpreadsheet,
  Palette,
  HardHat,
  MonitorPlay,
  ArrowRight,
  Cpu
} from "lucide-react";

interface FeaturesGridProps {
  onOpenTrial: (tier?: string) => void;
}

export default function FeaturesGrid({ onOpenTrial }: FeaturesGridProps) {
  const features = [
    {
      id: "feature-vector",
      icon: PenTool,
      badge: "SPATIAL OCR 2.4",
      title: "Pencil & CAD Vectorization Engine",
      description:
        "Upload phone photos of tracing paper, napkin sketches, or raw DWG/PDF files. Our spatial neural net automatically recognizes load-bearing walls, door swings, and window rough openings.",
      tag: "Vector Extraction",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
          <BlueprintSketchSVG className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-mono text-[9px]">
            99.4% OCR ACCURACY
          </div>
        </div>
      )
    },
    {
      id: "feature-lighting",
      icon: Sun,
      badge: "KELVIN ENGINE",
      title: "Photorealistic Multi-Environment Lighting",
      description:
        "Instantly toggle daylight orientation, golden-hour exterior radiance, or interior ambient spot-lighting schemes calibrated to real Kelvin temperatures.",
      tag: "2700K - 6500K",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
          <PhotorealLivingRoomSVG lighting="sunset" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800 font-mono text-[9px]">
            RAYTRACED GOLDEN HOUR
          </div>
        </div>
      )
    },
    {
      id: "feature-bom",
      icon: FileSpreadsheet,
      badge: "AUTOMATED TAKEOFF",
      title: "Automatic Bill of Materials (BOM) & Takeoffs",
      description:
        "Stop manual spatial calculations. SiteSketch parses the design and outputs an itemized spreadsheet of flooring square footage, paint coverage, and fixture counts.",
      tag: "CSV & IFC Export",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] space-y-1.5 flex flex-col justify-center">
          <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400">
            <span>ITEM</span>
            <span>QTY / AREA</span>
            <span>TOTAL</span>
          </div>
          <div className="flex justify-between text-slate-200">
            <span className="truncate pr-2">Herringbone White Oak</span>
            <span className="text-cyan-400">312 sq ft</span>
            <span className="text-amber-400">$4,524</span>
          </div>
          <div className="flex justify-between text-slate-200">
            <span className="truncate pr-2">Acoustic Fluted Panels</span>
            <span className="text-cyan-400">180 sq ft</span>
            <span className="text-amber-400">$2,952</span>
          </div>
          <div className="flex justify-between text-slate-200">
            <span className="truncate pr-2">Carrara Marble Plinth</span>
            <span className="text-cyan-400">1 Unit</span>
            <span className="text-amber-400">$1,280</span>
          </div>
          <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-cyan-300">
            <span>Project Material Sum:</span>
            <span>$8,756.00</span>
          </div>
        </div>
      )
    },
    {
      id: "feature-materials",
      icon: Palette,
      badge: "PBR SHADER GRAPH",
      title: "Material & Finish Swapping Sandbox",
      description:
        "Test herringbone oak versus polished concrete flooring, or carrara marble versus matte quartz countertops with one click, preserving natural room shadows and reflections.",
      tag: "Instant PBR Preview",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
          <PhotorealLivingRoomSVG flooring="concrete" countertop="quartz" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-slate-300 font-mono text-[9px]">
            TERRAZZO + NERO QUARTZ
          </div>
        </div>
      )
    },
    {
      id: "feature-framing",
      icon: HardHat,
      badge: "SITE ALIGNMENT",
      title: "Raw Job-Site Framing Staging",
      description:
        "Snap a photo of an unfinished concrete shell or wooden stud framing on-site. SiteSketch aligns 3D design finishes precisely over the physical site geometry for client walk-ins.",
      tag: "Framing to Finish",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
          <FramingStagingSVG className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800 font-mono text-[9px]">
            2x6 TIMBER REGISTRATION
          </div>
        </div>
      )
    },
    {
      id: "feature-viewer",
      icon: MonitorPlay,
      badge: "WEB CLIENT HUB",
      title: "Client Presentation Web Viewers",
      description:
        "Share secure, browser-based 360° panoramic viewer links with homeowners and stakeholders. Enable digital markup, annotations, and instant design finish approvals without downloads.",
      tag: "Zero Client Installs",
      visual: (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-center items-center p-4 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
            <MonitorPlay className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-slate-200">
            360° Panoramic Live Link
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            ✓ 2 STAKEHOLDER APPROVALS PINNED
          </span>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
            B2B ARCHITECTURAL CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Engineered for Spatial Accuracy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              Not Just Pretty Pictures.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            SiteSketch bridges architectural blueprints and photorealistic visualizations with underlying BIM dimensions, material takeoffs, and automated schedules.
          </p>
        </div>

        {/* Live Interactive Feature Demo Sandbox */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>LIVE INTERACTIVE PLATFORM DEMO:</span>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Test real features before starting your trial
            </span>
          </div>

          <FeatureTabs onOpenTrial={() => onOpenTrial("pro")} />
        </div>

        {/* 6-Card Maximized B2B Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 p-6 flex flex-col justify-between space-y-5 shadow-lg overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />

                <div className="space-y-4">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Technical Graphic Asset Viewport */}
                <div className="pt-2">
                  {feat.visual}
                </div>

                {/* Card Action Link */}
                <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400/80 group-hover:text-cyan-300 flex items-center gap-1">
                    {feat.tag}
                  </span>
                  <button
                    onClick={() => onOpenTrial("trial")}
                    className="text-slate-400 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
