"use client";

import React, { useState } from "react";
import ComparisonSlider from "./ComparisonSlider";
import { BlueprintSketchSVG } from "./ArchitecturalSVGs";
import {
  FileSpreadsheet,
  Download,
  Share2,
  Cpu,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface StudioCanvasProps {
  onOpenTrial?: (tier?: string) => void;
}

export default function StudioCanvas({ onOpenTrial }: StudioCanvasProps) {
  const [copiedBom, setCopiedBom] = useState(false);

  const bomItems = [
    {
      id: "BOM-01",
      category: "Flooring",
      item: "Select Grade Herringbone European White Oak",
      spec: "5/8\" Engineered • UV Matte Lacquer",
      qty: "312 sq ft",
      rate: "$14.50/sq ft",
      cost: 4524.0
    },
    {
      id: "BOM-02",
      category: "Furniture",
      item: "Bouclé Curved Sectional Modular Sofa",
      spec: "Custom 3-piece radius • High-resilience foam",
      qty: "1 Unit",
      rate: "$3,850.00",
      cost: 3850.0
    },
    {
      id: "BOM-03",
      category: "Millwork",
      item: "Fluted Charcoal Acoustic Wall Paneling",
      spec: "FSC Oak veneer • Solid black MDF core",
      qty: "180 sq ft",
      rate: "$16.40/sq ft",
      cost: 2952.0
    },
    {
      id: "BOM-04",
      category: "Surfaces",
      item: "Monolithic Carrara Marble Plinth Table",
      spec: "Honed finish • Mitred waterfall edges",
      qty: "1 Unit",
      rate: "$1,280.00",
      cost: 1280.0
    },
    {
      id: "BOM-05",
      category: "Fenestration",
      item: "Ultra-Slim Thermal Break Steel Mullions",
      spec: "Double-glazed Low-E argon filled glass",
      qty: "14.5 lin ft",
      rate: "$128.00/ft",
      cost: 1856.0
    },
    {
      id: "BOM-06",
      category: "Lighting",
      item: "Spun Brass Minimalist Pendant (4000K)",
      spec: "Integrated 24V Dimmable Driver",
      qty: "1 Unit",
      rate: "$680.00",
      cost: 680.0
    }
  ];

  const subtotal = bomItems.reduce((acc, curr) => acc + curr.cost, 0);
  const taxEst = subtotal * 0.0825;
  const grandTotal = subtotal + taxEst;

  const handleCopyBom = () => {
    setCopiedBom(true);
    setTimeout(() => setCopiedBom(false), 2000);
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-700/60 bg-slate-950 shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)] overflow-hidden transition-all duration-300">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 border-b border-slate-800 text-xs">
        {/* Left: Window Controls + Project Info */}
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600" />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center space-x-2">
            <span className="font-mono text-cyan-400 font-bold text-[11px] tracking-wide">
              SiteSketch Studio
            </span>
            <span className="text-slate-500 text-[10px]">/</span>
            <span className="font-mono text-slate-300 text-[11px] hidden sm:inline">
              Res_Project_402_Living_Scandinavian.skx
            </span>
          </div>
        </div>

        {/* Center: Live GPU Telemetry */}
        <div className="hidden lg:flex items-center space-x-3 font-mono text-[10px] text-slate-400">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-200">ENGINE v2.4: RT-GPU ACTIVE</span>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800/40">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>LATENCY: 0.8s</span>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800/40 text-amber-400">
            <Sparkles className="w-3 h-3" />
            <span>4K ULTRA-HD</span>
          </div>
        </div>

        {/* Right: Studio Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenTrial && onOpenTrial("pro")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Canvas</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport: 3-Pane Layout on Large Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[480px]">
        {/* PANE 1: Left 2D Hand-Drawn Blueprint Schematic (col-span-3) */}
        <div className="hidden xl:flex xl:col-span-3 flex-col bg-slate-950 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Raw 2D Pencil Input
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
              SOURCE
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Paper schematic uploaded via mobile camera. Spatial OCR parsed 6 walls, 2 door swings, 1 glazed wall, and 312 sq. ft. living perimeter.
          </p>

          {/* Blueprint Thumbnail */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-900 shadow-inner">
            <BlueprintSketchSVG className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 rounded bg-slate-950/90 backdrop-blur-sm border border-slate-800 text-[10px] font-mono">
              <span className="text-cyan-400">Scale: 1/4&quot; = 1&apos;-0&quot;</span>
              <span className="text-slate-400">Detected: 99.4%</span>
            </div>
          </div>

          {/* Extracted Spatial Schema */}
          <div className="space-y-1.5 pt-1 text-[11px] font-mono">
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Living Room Span:</span>
              <span className="text-slate-200 font-semibold">28&apos;-6&quot; × 16&apos;-8&quot;</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Finished Ceiling:</span>
              <span className="text-slate-200 font-semibold">10&apos;-6&quot; Aff.</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Exterior Glazing:</span>
              <span className="text-slate-200 font-semibold">14&apos;-6&quot; Low-E Steel</span>
            </div>
            <div className="flex justify-between py-1 text-slate-400">
              <span>Style Token:</span>
              <span className="text-amber-400 font-semibold">Nordic Minimalist</span>
            </div>
          </div>
        </div>

        {/* PANE 2: Center Interactive Before/After Split Screen Slider (col-span-6) */}
        <div className="col-span-1 lg:col-span-8 xl:col-span-6 flex flex-col bg-slate-950 p-3 sm:p-5">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Generative Spatial Viewport
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-mono">
              <span>Interactive Slider Enabled</span>
            </div>
          </div>

          {/* The Interactive Comparison Slider */}
          <div className="flex-grow flex items-center justify-center">
            <ComparisonSlider className="w-full" showControls={true} />
          </div>

          {/* Quick Render Spec Footer */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Preset:</span>
              <span className="text-slate-300">Scandinavian Daylight 4K</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">BIM Sync:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Revit 2026 Ready
              </span>
            </div>
          </div>
        </div>

        {/* PANE 3: Right Auto-Generated Bill of Materials (BOM) & Takeoffs (col-span-3) */}
        <div className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Automated BOM &amp; Takeoff
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/60">
              SYNCED
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Auto-quantified takeoffs calculated directly from room dimensions and spatial element segmentation.
          </p>

          {/* BOM Itemized List */}
          <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1">
            {bomItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors text-xs space-y-1"
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-200 text-[11px] line-clamp-1">
                    {item.item}
                  </span>
                  <span className="font-mono text-amber-400 font-bold text-[11px] shrink-0 ml-2">
                    ${item.cost.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>{item.qty}</span>
                  <span className="text-slate-500">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Export Box */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Materials Subtotal:</span>
              <span className="font-semibold">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-cyan-400 font-bold">
              <span>Total Project Takeoff:</span>
              <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopyBom}
                className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span>{copiedBom ? "Exported CSV!" : "Export CSV"}</span>
              </button>
              <button
                onClick={() => onOpenTrial && onOpenTrial("pro")}
                className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono transition-colors cursor-pointer"
              >
                <Share2 className="w-3 h-3" />
                <span>Push to Revit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
