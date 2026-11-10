"use client";

import React, { useState } from "react";
import ComparisonSlider from "./ComparisonSlider";
import { BlueprintSketchSVG } from "./ArchitecturalSVGs";
import {
  FileSpreadsheet,
  Download,
  Share2,
  CheckCircle2
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
    // Generate real CSV takeoff and trigger immediate browser download
    const csvRows = [
      ["SiteSketch Studio - Project Takeoff Export"],
      ["Project", "Res_Project_402_Living_Scandinavian.skx"],
      ["Date", new Date().toISOString().split("T")[0]],
      [""],
      ["Line Item", "Category", "Description", "Specification", "Quantity", "Unit Rate", "Total Cost ($)"],
      ...bomItems.map((item) => [
        item.id,
        item.category,
        item.item,
        item.spec,
        item.qty,
        item.rate,
        item.cost.toFixed(2)
      ]),
      [""],
      ["Materials Subtotal", "", "", "", "", "", subtotal.toFixed(2)],
      ["Estimated Tax (8.25%)", "", "", "", "", "", taxEst.toFixed(2)],
      ["Grand Total Takeoff", "", "", "", "", "", grandTotal.toFixed(2)]
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows
        .map((e) => e.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sitesketch-studio-takeoff-project402.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedBom(true);
    setTimeout(() => setCopiedBom(false), 3000);
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/95 border-b border-slate-800 text-xs gap-3">
        {/* Left: Document Info */}
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-xs bg-slate-400" />
          <div className="flex items-center space-x-2 font-sans">
            <span className="text-slate-100 font-medium text-xs">
              living-suite-level-01.skx
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              (Scale 1:50, 480 sq ft)
            </span>
          </div>
        </div>

        {/* Center: CAD Drafting Grid & Coordinates */}
        <div className="hidden lg:flex items-center space-x-4 text-xs text-slate-400 font-sans">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500">Grid:</span>
            <span className="text-slate-300">100 mm</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500">Snap:</span>
            <span className="text-slate-300">Orthogonal 90°</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500">Schema:</span>
            <span className="text-slate-300">IFC 4.0</span>
          </div>
        </div>

        {/* Right: Studio Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopyBom}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copiedBom ? "Downloaded CSV" : "Download Takeoff (CSV)"}</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenTrial && onOpenTrial("pro")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
          >
            <span>Open in CAD studio</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport: 3-Pane Layout on Large Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[480px]">
        {/* PANE 1: Left 2D Hand-Drawn Blueprint Schematic (col-span-3) */}
        <div className="hidden xl:flex xl:col-span-3 flex-col bg-slate-950 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-semibold text-slate-200">
              Source schematic
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              Input
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Paper schematic scanned at 300 DPI. Parsed perimeter: 480 sq ft, 4 exterior load-bearing walls, 2 partition runs.
          </p>

          {/* Blueprint Thumbnail */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-900 shadow-inner">
            <BlueprintSketchSVG className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2.5 py-1 rounded bg-slate-950/90 backdrop-blur-sm border border-slate-800 text-[11px] font-sans">
              <span className="text-slate-300">Scale: 1/4&quot; = 1&apos;-0&quot;</span>
              <span className="text-slate-400">Sheet A-101</span>
            </div>
          </div>

          {/* Extracted Spatial Schema */}
          <div className="space-y-1.5 pt-1 text-xs font-sans">
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Living room span:</span>
              <span className="text-slate-200 font-medium">28&apos;-6&quot; × 16&apos;-8&quot;</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Finished ceiling:</span>
              <span className="text-slate-200 font-medium">10&apos;-6&quot; AFF</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Exterior glazing:</span>
              <span className="text-slate-200 font-medium">14&apos;-6&quot; Low-E steel</span>
            </div>
            <div className="flex justify-between py-1 text-slate-400">
              <span>Style token:</span>
              <span className="text-amber-400 font-medium">Nordic minimalist</span>
            </div>
          </div>
        </div>

        {/* PANE 2: Center Interactive Before/After Split Screen Slider (col-span-6) */}
        <div className="col-span-1 lg:col-span-8 xl:col-span-6 flex flex-col bg-slate-950 p-3 sm:p-5">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-200 font-sans">
                Viewport comparison
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-sans">
              <span>Interactive slider enabled</span>
            </div>
          </div>

          {/* The Interactive Comparison Slider */}
          <div className="flex-grow flex items-center justify-center">
            <ComparisonSlider className="w-full" showControls={true} />
          </div>

          {/* Quick Render Spec Footer */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-sans gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Preset:</span>
              <span className="text-slate-300">Scandinavian daylight</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">CAD Export:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> DXF / IFC compatible
              </span>
            </div>
          </div>
        </div>

        {/* PANE 3: Right Auto-Generated Bill of Materials (BOM) & Takeoffs (col-span-3) */}
        <div className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-300" />
              <span className="text-xs font-semibold text-slate-200 font-sans">
                Bill of materials (BOM)
              </span>
            </div>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-sans">
              Takeoff
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Auto-quantified takeoffs calculated directly from room dimensions and spatial element segmentation.
          </p>

          {/* BOM Itemized List */}
          <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1">
            {bomItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors text-xs space-y-1"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-slate-200 text-xs line-clamp-1">
                    {item.item}
                  </span>
                  <span className="text-amber-400 font-medium text-xs shrink-0 ml-2">
                    ${item.cost.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-sans">
                  <span>{item.qty}</span>
                  <span className="text-slate-500">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Export Box */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-sans">
              <span>Materials subtotal:</span>
              <span className="font-semibold text-slate-200">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-100 font-semibold font-sans">
              <span>Estimated takeoff total:</span>
              <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyBom}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{copiedBom ? "Downloaded" : "Export CSV"}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenTrial && onOpenTrial("pro")}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Export schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
