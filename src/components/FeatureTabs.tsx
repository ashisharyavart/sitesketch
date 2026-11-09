"use client";

import React, { useState } from "react";
import {
  BlueprintSketchSVG,
  PhotorealLivingRoomSVG
} from "./ArchitecturalSVGs";
import {
  PenTool,
  Sun,
  FileSpreadsheet,
  Palette,
  RotateCw,
  CheckCircle2,
  Copy
} from "lucide-react";

interface FeatureTabsProps {
  onOpenTrial?: () => void;
}

type TabType = "vectorizer" | "lighting" | "bom" | "materials" | "viewer";

export default function FeatureTabs({ onOpenTrial }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("lighting");

  // Tab 1 state: Vectorizer
  const [vectorLayer, setVectorLayer] = useState<"all" | "walls" | "dims">("all");

  // Tab 2 state: Multi-Kelvin Lighting
  const [kelvin, setKelvin] = useState<number>(4000);

  // Tab 3 state: Live BOM
  const [selectedRoom, setSelectedRoom] = useState<"living" | "kitchen" | "master">("living");

  // Tab 4 state: Materials
  const [selectedFloor, setSelectedFloor] = useState<"oak" | "concrete" | "walnut">("oak");
  const [selectedCounter, setSelectedCounter] = useState<"marble" | "quartz">("marble");

  // Tab 5 state: 360 Viewer
  const [rotationAngle, setRotationAngle] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const getLightingMode = (): "daylight" | "sunset" | "overcast" => {
    if (kelvin < 3200) return "sunset";
    if (kelvin > 5200) return "overcast";
    return "daylight";
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "vectorizer", label: "Pencil & CAD Vectorizer", icon: PenTool },
    { id: "lighting", label: "Multi-Kelvin Lighting", icon: Sun },
    { id: "bom", label: "Live BOM & Takeoffs", icon: FileSpreadsheet },
    { id: "materials", label: "Finish Swapping Sandbox", icon: Palette },
    { id: "viewer", label: "360° Client Web Viewer", icon: RotateCw },
  ];

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Tab Bar Navigation */}
      <div className="flex border-b border-slate-800 overflow-x-auto bg-slate-950/80 p-2 gap-1.5 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Interactive Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* TAB 1: PENCIL & CAD VECTORIZER */}
        {activeTab === "vectorizer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                NEURAL VECTORIZATION ENGINE
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                Instant CAD Schematics from Napkin Photos
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                SiteSketch uses spatial OCR to translate hand-drawn pencil schematics into clean, vectorized geometric curves, detecting load-bearing thickness and window openings.
              </p>

              {/* Layer switch controls */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400">INSPECT VECTOR LAYERS:</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    onClick={() => setVectorLayer("all")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      vectorLayer === "all"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    All Vectors
                  </button>
                  <button
                    onClick={() => setVectorLayer("walls")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      vectorLayer === "walls"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Load Walls
                  </button>
                  <button
                    onClick={() => setVectorLayer("dims")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      vectorLayer === "dims"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Dimensions
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-cyan-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 6 Structural Wall Assemblies Extruded
                </div>
                <div className="text-slate-400">
                  Export ready: AutoCAD .DWG / Revit .IFC 4.3
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] relative">
                <BlueprintSketchSVG className="w-full h-full" />
                {vectorLayer === "walls" && (
                  <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none flex items-center justify-center">
                    <span className="px-3 py-1 rounded bg-slate-950/90 border border-cyan-400 text-cyan-300 text-xs font-mono">
                      LOAD-BEARING WALL ISOLATION ACTIVE
                    </span>
                  </div>
                )}
                {vectorLayer === "dims" && (
                  <div className="absolute inset-0 bg-amber-500/10 pointer-events-none flex items-center justify-center">
                    <span className="px-3 py-1 rounded bg-slate-950/90 border border-amber-400 text-amber-300 text-xs font-mono">
                      DIMENSION ANNOTATION EXTRACTION ACTIVE
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MULTI-KELVIN LIGHTING */}
        {activeTab === "lighting" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">
                KELVIN COLOR TEMPERATURE SCHEDULER
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                Calibrated Atmospheric Lighting Schemes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test how morning radiance, warm 2700K golden sunset, or crisp 6500K overcast light influences interior materials, textures, and perceived volume.
              </p>

              {/* Interactive Kelvin Slider */}
              <div className="space-y-3 pt-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400">CORRELATED TEMPERATURE:</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{kelvin} KELVIN</span>
                </div>
                <input
                  type="range"
                  min="2200"
                  max="6500"
                  step="100"
                  value={kelvin}
                  onChange={(e) => setKelvin(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>2200K (Sunset Golden)</span>
                  <span>4000K (Daylight)</span>
                  <span>6500K (Overcast)</span>
                </div>
              </div>

              {/* Sun Angle Presets */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setKelvin(2700)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-all ${
                    kelvin <= 3000
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Sunset 2700K
                </button>
                <button
                  onClick={() => setKelvin(4000)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-all ${
                    kelvin > 3000 && kelvin < 5200
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Daylight 4000K
                </button>
                <button
                  onClick={() => setKelvin(6500)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-all ${
                    kelvin >= 5200
                      ? "bg-slate-700/60 border-slate-500 text-slate-200 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Overcast 6500K
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] relative shadow-inner">
                <PhotorealLivingRoomSVG lighting={getLightingMode()} className="w-full h-full" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTOMATIC BOM & TAKEOFFS */}
        {activeTab === "bom" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">
                AUTOMATED BILL OF MATERIALS (BOM)
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                Stop Manual Takeoff Calculations
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                SiteSketch parses detected interior geometry and matches surface areas against manufacturer catalogs, yielding instant flooring, millwork, and fixture line items.
              </p>

              {/* Room selector */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400">SELECT PROJECT ZONE:</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSelectedRoom("living")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      selectedRoom === "living"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Living (312 sq ft)
                  </button>
                  <button
                    onClick={() => setSelectedRoom("kitchen")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      selectedRoom === "kitchen"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Kitchen (195 sq ft)
                  </button>
                  <button
                    onClick={() => setSelectedRoom("master")}
                    className={`py-2 px-2 rounded-lg border transition-all ${
                      selectedRoom === "master"
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Suite (240 sq ft)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onOpenTrial}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Generate Full Schedule in Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold">
                    TAKEOFF SCHEDULE // ZONE: {selectedRoom.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    IFC 4.3 VERIFIED
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedRoom === "living" && (
                    <>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">01. European White Oak Herringbone (312 sq ft)</span>
                        <span className="text-amber-400 font-bold">$4,524.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">02. Fluted Charcoal Acoustic Millwork (180 sq ft)</span>
                        <span className="text-amber-400 font-bold">$2,952.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">03. Bouclé Modular Curved Sectional (1 unit)</span>
                        <span className="text-amber-400 font-bold">$3,850.00</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-300">04. Carrara Plinth Table &amp; Brass Pendant</span>
                        <span className="text-amber-400 font-bold">$1,960.00</span>
                      </div>
                    </>
                  )}

                  {selectedRoom === "kitchen" && (
                    <>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">01. Honed Quartz Waterfall Island (42 sq ft)</span>
                        <span className="text-amber-400 font-bold">$3,780.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">02. Flat-Panel Matte Charcoal Cabinetry (24 lin ft)</span>
                        <span className="text-amber-400 font-bold">$7,200.00</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-300">03. Integrated Induction Cooktop &amp; Faucets</span>
                        <span className="text-amber-400 font-bold">$3,150.00</span>
                      </div>
                    </>
                  )}

                  {selectedRoom === "master" && (
                    <>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">01. Smoked Walnut Engineered Hardwood (240 sq ft)</span>
                        <span className="text-amber-400 font-bold">$3,600.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-300">02. Upholstered Platform Bed Frame (King)</span>
                        <span className="text-amber-400 font-bold">$2,450.00</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-300">03. Dual Recessed Architectural Wall Sconces</span>
                        <span className="text-amber-400 font-bold">$580.00</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Material Takeoff:</span>
                  <span className="text-cyan-400 font-bold text-base">
                    {selectedRoom === "living"
                      ? "$13,286.00"
                      : selectedRoom === "kitchen"
                      ? "$14,130.00"
                      : "$6,630.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FINISH SWAPPING SANDBOX */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                PBR MATERIAL SANDBOX
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                One-Click Material &amp; Finish Swapping
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compare finishes in real time without waiting for full cloud re-renders. Dynamic shader graphs maintain ambient reflections and diffuse ambient occlusions.
              </p>

              {/* Flooring swatches */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">FLOORING SPECIFICATION:</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSelectedFloor("oak")}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      selectedFloor === "oak"
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Herringbone Oak
                  </button>
                  <button
                    onClick={() => setSelectedFloor("concrete")}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      selectedFloor === "concrete"
                        ? "bg-slate-700/60 border-slate-400 text-slate-200 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Terrazzo Concrete
                  </button>
                  <button
                    onClick={() => setSelectedFloor("walnut")}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      selectedFloor === "walnut"
                        ? "bg-amber-900/40 border-amber-600 text-amber-200 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Smoked Walnut
                  </button>
                </div>
              </div>

              {/* Countertop swatches */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">ISLAND &amp; PLINTH SURFACE:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSelectedCounter("marble")}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      selectedCounter === "marble"
                        ? "bg-slate-200/20 border-slate-300 text-slate-100 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Honed Carrara Marble
                  </button>
                  <button
                    onClick={() => setSelectedCounter("quartz")}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      selectedCounter === "quartz"
                        ? "bg-slate-800 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Matte Nero Quartz
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] relative shadow-inner">
                <PhotorealLivingRoomSVG
                  lighting="daylight"
                  flooring={selectedFloor}
                  countertop={selectedCounter}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 360 CLIENT WEB VIEWER */}
        {activeTab === "viewer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                BROWSER-NATIVE 360° CLIENT HUB
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                Zero Downloads for Homeowners &amp; Clients
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Send secure, responsive panoramic links. Clients rotate spaces, leave digital finish comments, and approve material palettes directly on their phone or tablet.
              </p>

              {/* Orbit rotation buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400">PANORAMA CAMERA ORIENTATION:</span>
                <div className="flex items-center gap-2">
                  {[-45, 0, 45, 90].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setRotationAngle(deg)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono border transition-all ${
                        rotationAngle === deg
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      {deg}° Cam
                    </button>
                  ))}
                </div>
              </div>

              {/* Share link box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>CLIENT SHARE LINK:</span>
                  <span className="text-emerald-400 font-bold">READY</span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800 text-xs font-mono text-cyan-300">
                  <span className="truncate mr-2">https://sitesketch.online/view/v3_res_nordic</span>
                  <button
                    onClick={handleCopyLink}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedLink && (
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    Link copied to clipboard!
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/10] relative shadow-inner">
                <div
                  className="w-full h-full transition-transform duration-500 ease-out"
                  style={{ transform: `scale(1.05) translateX(${rotationAngle * 0.4}px)` }}
                >
                  <PhotorealLivingRoomSVG lighting="daylight" className="w-full h-full" />
                </div>

                {/* Interactive Client Annotation Pins */}
                <div className="absolute top-1/3 left-1/3 z-10 group">
                  <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.8)] cursor-pointer animate-bounce">
                    1
                  </div>
                  <div className="hidden group-hover:block absolute bottom-7 -left-12 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 shadow-xl pointer-events-none">
                    <span className="text-cyan-400 font-mono font-bold block">Client Note:</span>
                    &quot;Love the oak floor layout, let&apos;s proceed with this tone!&quot;
                  </div>
                </div>

                <div className="absolute top-1/2 right-1/4 z-10 group">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(245,158,11,0.8)] cursor-pointer">
                    2
                  </div>
                  <div className="hidden group-hover:block absolute bottom-7 -right-12 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 shadow-xl pointer-events-none">
                    <span className="text-amber-400 font-mono font-bold block">Spec Approved:</span>
                    Honed Carrara plinth table confirmed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
