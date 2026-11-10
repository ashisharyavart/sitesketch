"use client";

import React, { useState } from "react";
import ComparisonSlider from "./ComparisonSlider";
import { CadFloorplanVectorSVG, PencilFloorplanSketchSVG } from "./ArchitecturalSVGs";
import {
  FileSpreadsheet,
  Download,
  Share2,
  CheckCircle2,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen,
  Info,
  Check,
  Ruler,
  Maximize2
} from "lucide-react";

interface StudioCanvasProps {
  onOpenTrial?: (tier?: string) => void;
}

export default function StudioCanvas({ onOpenTrial }: StudioCanvasProps) {
  // Navigation & Workspace Mode
  const [activeTab, setActiveTab] = useState<"workspace" | "materials" | "compare">("workspace");
  const [selectedElement, setSelectedElement] = useState<string | null>("walls");

  // Canvas Transform State
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Layer Visibility State (Phase 3: toggles actually modify drawing)
  const [layerWalls, setLayerWalls] = useState(true);
  const [layerDoors, setLayerDoors] = useState(true);
  const [layerWindows, setLayerWindows] = useState(true);
  const [layerDimensions, setLayerDimensions] = useState(true);
  const [layerFurniture, setLayerFurniture] = useState(true);
  const [layerRoomLabels, setLayerRoomLabels] = useState(true);

  // Editable Sample Dimensions (Phase 3: updates selected sample geometry & BOM)
  const [roomLengthFt, setRoomLengthFt] = useState<number>(28.5);
  const [roomWidthFt, setRoomWidthFt] = useState<number>(16.67);
  const calculatedSqFt = Math.round(roomLengthFt * roomWidthFt);

  // Materials & Finishes Selection
  const [selectedFlooring, setSelectedFlooring] = useState<"oak" | "walnut" | "concrete">("oak");
  const [selectedWallFinish, setSelectedWallFinish] = useState<"limewash" | "paneling" | "plaster">("limewash");
  const [selectedCountertop, setSelectedCountertop] = useState<"carrara" | "quartz">("carrara");

  // Export Feedback
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Material Catalogs
  const flooringOptions = [
    {
      id: "oak",
      name: "Select European White Oak Herringbone",
      category: "Flooring",
      finish: "UV Ultra-Matte Lacquer",
      unit: "sq ft",
      rate: 14.50,
      color: "bg-[#A87A51]"
    },
    {
      id: "walnut",
      name: "American Black Walnut Wide Plank",
      category: "Flooring",
      finish: "Satin Natural Hardwax-Oil",
      unit: "sq ft",
      rate: 18.20,
      color: "bg-[#3D291F]"
    },
    {
      id: "concrete",
      name: "Micro-Topping Polished Concrete",
      category: "Flooring",
      finish: "Matte Penetrating Silicate Seal",
      unit: "sq ft",
      rate: 11.00,
      color: "bg-[#64748B]"
    }
  ];

  const wallOptions = [
    {
      id: "limewash",
      name: "Warm Mineral Limewash",
      category: "Wall finishes",
      finish: "Natural breathable Roman matte",
      unit: "sq ft",
      rate: 4.20,
      color: "bg-[#EDE8DC]"
    },
    {
      id: "paneling",
      name: "Fluted Oak Acoustic Paneling",
      category: "Wall finishes",
      finish: "FSC oak veneer on acoustic felt",
      unit: "sq ft",
      rate: 16.40,
      color: "bg-[#785032]"
    },
    {
      id: "plaster",
      name: "Venetian Marmorino Plaster",
      category: "Wall finishes",
      finish: "Hand-troweled low-sheen wax",
      unit: "sq ft",
      rate: 12.80,
      color: "bg-[#CBD5E1]"
    }
  ];

  // Dynamic Takeoff based on selection & dimensions
  const activeFlooringData = flooringOptions.find((f) => f.id === selectedFlooring)!;
  const activeWallData = wallOptions.find((w) => w.id === selectedWallFinish)!;

  const flooringQty = Math.round(calculatedSqFt * 1.10); // 10% waste allowance
  const flooringCost = flooringQty * activeFlooringData.rate;

  const wallQty = 860; // 2*(28.5+16.67)*10.5 - 14.5*10.5 approx
  const wallCost = wallQty * activeWallData.rate;

  const fenestrationCost = 14.5 * 145.0; // 14.5 ft @ $145/ft
  const doorCost = 680.0;
  const ceilingCost = calculatedSqFt * 5.80;
  const kitchenIslandCost = selectedCountertop === "carrara" ? 3800.0 : 3400.0;
  const furnitureCost = 3850.0 + 1150.0; // sofa + plinth table

  const materialsSubtotal = flooringCost + wallCost + fenestrationCost + doorCost + ceilingCost + kitchenIslandCost + furnitureCost;
  const laborEstimate = calculatedSqFt * 18.50; // Illustrative installation rate
  const wasteAllowanceEst = flooringCost * 0.10;
  const contingencyEst = (materialsSubtotal + laborEstimate) * 0.05; // 5% contingency
  const taxEst = materialsSubtotal * 0.0825; // 8.25% sales tax
  const finalTakeoffTotal = materialsSubtotal + laborEstimate + contingencyEst + taxEst;

  // Zoom / Pan Handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(200, z + 15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(70, z - 15));
  const handleResetView = () => {
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
    setRoomLengthFt(28.5);
    setRoomWidthFt(16.67);
  };

  // CSV Takeoff Export
  const handleExportCSV = () => {
    const csvRows = [
      ["SiteSketch Studio - Preliminary Bill of Materials (BOM) Takeoff"],
      ["Project", "Residential Suite - Level 01 Plan (Sheet A-101)"],
      ["Dimensions", `${roomLengthFt.toFixed(1)}' x ${roomWidthFt.toFixed(1)}' (${calculatedSqFt} sq ft net)`],
      ["Status", "Interactive Demonstration Takeoff"],
      ["Date", new Date().toISOString().split("T")[0]],
      [""],
      ["Item", "Category", "Specification", "Quantity", "Unit", "Unit Price ($)", "Estimated Total ($)", "Status / Confidence"],
      [
        activeFlooringData.name,
        "Flooring",
        `${activeFlooringData.finish} (includes 10% cutting waste)`,
        flooringQty.toString(),
        "sq ft",
        activeFlooringData.rate.toFixed(2),
        flooringCost.toFixed(2),
        "Measured (CAD geometry + waste)"
      ],
      [
        activeWallData.name,
        "Wall finishes",
        `${activeWallData.finish} applied over 5/8\" Type X Gypsum`,
        wallQty.toString(),
        "sq ft",
        activeWallData.rate.toFixed(2),
        wallCost.toFixed(2),
        "Measured (Perimeter x 10'-6\" AFF)"
      ],
      [
        "Level 5 Smooth Acoustic Plaster",
        "Ceiling",
        "Flat white acoustic absorption ceiling finish",
        calculatedSqFt.toString(),
        "sq ft",
        "5.80",
        ceilingCost.toFixed(2),
        "Measured (Reflected ceiling plan)"
      ],
      [
        "Ultra-Slim Thermal Break Glazing Aperture",
        "Doors and windows",
        "14'-6\" Southern exposure, Low-E double glazing",
        "14.5",
        "lin ft",
        "145.00",
        fenestrationCost.toFixed(2),
        "Measured (CAD wall schedule)"
      ],
      [
        "Solid Core White Oak Flush Egress Door",
        "Doors and windows",
        "32\" x 84\" opening, concealed pivot hinges",
        "1",
        "unit",
        "680.00",
        doorCost.toFixed(2),
        "Counted (Architectural door schedule)"
      ],
      [
        `Open Kitchen Island with ${selectedCountertop === "carrara" ? "Carrara Marble" : "Nero Quartz"} Slab`,
        "Fixtures",
        "Custom waterfall fabrication and bar seating overhang",
        "1",
        "unit",
        kitchenIslandCost.toFixed(2),
        kitchenIslandCost.toFixed(2),
        "Illustrative specification"
      ],
      [
        "Scandinavian Bouclé Curved Sectional Sofa",
        "Furniture",
        "Custom 3-piece radius, high-resilience foam core",
        "1",
        "unit",
        "3850.00",
        "3850.00",
        "Illustrative specification"
      ],
      [
        "Monolithic Marble Plinth Coffee Table",
        "Furniture",
        "Beveled edge honed stone table base",
        "1",
        "unit",
        "1150.00",
        "1150.00",
        "Illustrative specification"
      ],
      [""],
      ["Material Subtotal", "", "", "", "", "", materialsSubtotal.toFixed(2), "Sum of material assemblies"],
      ["Trade Labour Estimate", "", "Illustrative trade installation ($18.50/sq ft)", calculatedSqFt.toString(), "sq ft", "18.50", laborEstimate.toFixed(2), "Estimated trade benchmark"],
      ["Waste Allowance (10% Flooring Included)", "", "Standard layout cut factor", "", "", "", wasteAllowanceEst.toFixed(2), "Included in flooring schedule"],
      ["Contingency (5%)", "", "Unforeseen site conditions & variations", "", "", "", contingencyEst.toFixed(2), "Standard preliminary contingency"],
      ["Estimated Tax (8.25%)", "", "Estimated municipal sales tax on taxable materials", "", "", "", taxEst.toFixed(2), "Jurisdictional estimate"],
      ["Final Estimated Project Total", "", "", "", "", "", finalTakeoffTotal.toFixed(2), "Comprehensive preliminary estimate"]
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sitesketch-takeoff-level01-suite-${calculatedSqFt}sqft.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice("Takeoff CSV exported successfully!");
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-sans">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs gap-3">
        {/* Left: Document Info & Sample Tag */}
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          <div className="flex items-center space-x-2">
            <span className="text-slate-100 font-semibold text-xs">
              Residential Suite · Sheet A-101
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              ({calculatedSqFt} sq ft · Scale 1/4&quot; = 1&apos;-0&quot;)
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
              Sample Project
            </span>
          </div>
        </div>

        {/* Center: Workspace Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "workspace"
                ? "bg-slate-800 text-white font-medium shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            CAD Workspace
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "compare"
                ? "bg-slate-800 text-white font-medium shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sketch vs CAD
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("materials")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "materials"
                ? "bg-slate-800 text-white font-medium shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Materials &amp; Takeoff
          </button>
        </div>

        {/* Right: Studio Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Takeoff (CSV)</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenTrial && onOpenTrial("pro")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>Request Early Access</span>
          </button>
        </div>
      </div>

      {/* Main 3-Pane Architectural Studio Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[520px]">
        {/* PANE 1: LEFT SIDEBAR (Project Navigation & Active Layer Toggles) */}
        <div className="col-span-1 lg:col-span-3 bg-slate-950 p-4 space-y-5 text-xs text-slate-300">
          {/* Project Source Block */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Project Source
            </span>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-200 font-medium">
                <span className="truncate">pencil-suite-scan-01.jpg</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  Detected
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Hand-drawn graphite on 1/4&quot; grid paper. 480 sq ft exterior perimeter identified.
              </p>
            </div>
          </div>

          {/* Interactive Layer Visibility Controls (Actually changes the drawing!) */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Drawing Layers
              </span>
              <span className="text-[10px] text-slate-500">Toggle visibility</span>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#CBD5E1]" />
                  <span className="text-slate-200 font-medium">Exterior &amp; Partition Walls</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerWalls}
                  onChange={(e) => setLayerWalls(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38BDF8]" />
                  <span className="text-slate-200 font-medium">Glazed Window Aperture</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerWindows}
                  onChange={(e) => setLayerWindows(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#E2E8F0]" />
                  <span className="text-slate-200 font-medium">Egress Door Swings</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerDoors}
                  onChange={(e) => setLayerDoors(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B]" />
                  <span className="text-slate-200 font-medium">Spatial CAD Blocks</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerFurniture}
                  onChange={(e) => setLayerFurniture(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400" />
                  <span className="text-slate-200 font-medium">Dimension Strings</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerDimensions}
                  onChange={(e) => setLayerDimensions(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" />
                  <span className="text-slate-200 font-medium">Room Labels &amp; Areas</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerRoomLabels}
                  onChange={(e) => setLayerRoomLabels(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 accent-sky-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Quick Selection Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Inspect Object Geometry
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedElement("walls")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "walls"
                    ? "bg-sky-950 text-sky-300 border border-sky-700"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                Exterior Walls
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("windows")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "windows"
                    ? "bg-sky-950 text-sky-300 border border-sky-700"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                South Glazing
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("doors")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "doors"
                    ? "bg-sky-950 text-sky-300 border border-sky-700"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                Egress Door
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("furniture")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "furniture"
                    ? "bg-sky-950 text-sky-300 border border-sky-700"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                Island &amp; Sofa
              </button>
            </div>
          </div>
        </div>

        {/* PANE 2: CENTRAL WORKSPACE (Canvas + Zoom/Pan + Before/After Comparison) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col bg-slate-950 p-4 space-y-3">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="font-semibold text-slate-200">
                {activeTab === "workspace"
                  ? "Interactive CAD Vector Viewport"
                  : activeTab === "compare"
                  ? "Field Sketch vs CAD Overlay"
                  : "Materials Specification Matrix"}
              </span>
            </div>

            {/* Zoom / Pan Action Pill */}
            {activeTab === "workspace" && (
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 space-x-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 font-mono text-[11px] text-slate-300 min-w-[42px] text-center">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-3 bg-slate-800 mx-0.5" />
                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Canvas Viewport Body */}
          <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 min-h-[380px]">
            {activeTab === "workspace" && (
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-150"
                style={{
                  transform: `scale(${zoomLevel / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`
                }}
              >
                <CadFloorplanVectorSVG
                  className="w-full h-full max-h-[420px]"
                  showWalls={layerWalls}
                  showDoors={layerDoors}
                  showWindows={layerWindows}
                  showDimensions={layerDimensions}
                  showFurniture={layerFurniture}
                  showRoomLabels={layerRoomLabels}
                  selectedElement={selectedElement}
                  onSelectElement={(el) => setSelectedElement(el)}
                />
              </div>
            )}

            {activeTab === "compare" && (
              <div className="w-full p-2">
                <ComparisonSlider showControls={true} />
              </div>
            )}

            {activeTab === "materials" && (
              <div className="w-full p-4 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-100">Select Room Materials &amp; Finishes</h4>
                  <p className="text-xs text-slate-400">
                    Switch finishes to update specifications and recalculate quantity takeoff schedules.
                  </p>
                </div>

                {/* Flooring Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300">Flooring Specification:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {flooringOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFlooring(opt.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedFlooring === opt.id
                            ? "bg-slate-900 border-sky-500 ring-1 ring-sky-500"
                            : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${opt.color} shrink-0`} />
                          <span className="text-xs font-semibold text-slate-200 truncate">{opt.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block">{opt.finish}</span>
                        <span className="text-xs font-mono font-medium text-amber-400 mt-1 block">
                          ${opt.rate.toFixed(2)} / {opt.unit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wall Finishes Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300">Wall Surface Specification:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {wallOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWallFinish(opt.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedWallFinish === opt.id
                            ? "bg-slate-900 border-sky-500 ring-1 ring-sky-500"
                            : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${opt.color} shrink-0`} />
                          <span className="text-xs font-semibold text-slate-200 truncate">{opt.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block">{opt.finish}</span>
                        <span className="text-xs font-mono font-medium text-amber-400 mt-1 block">
                          ${opt.rate.toFixed(2)} / {opt.unit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Countertop Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300">Kitchen Island Countertop Slab:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCountertop("carrara")}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        selectedCountertop === "carrara"
                          ? "bg-slate-900 border-sky-500 ring-1 ring-sky-500"
                          : "bg-slate-950/70 border-slate-800"
                      }`}
                    >
                      <span className="text-xs font-semibold text-slate-200 block">Honed Carrara Marble</span>
                      <span className="text-[11px] text-slate-400">Natural stone · Mitred edge</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCountertop("quartz")}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        selectedCountertop === "quartz"
                          ? "bg-slate-900 border-sky-500 ring-1 ring-sky-500"
                          : "bg-slate-950/70 border-slate-800"
                      }`}
                    >
                      <span className="text-xs font-semibold text-slate-200 block">Nero Suede Quartzite</span>
                      <span className="text-[11px] text-slate-400">Engineered surface · Non-porous</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Central Workspace Footer: Interactive Demonstration Notice */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2 gap-2">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Interactive demonstration · Click elements or toggle layers to test workspace reactivity</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300 font-mono text-[11px]">
              <span>Dimensions: {roomLengthFt.toFixed(1)}&apos; × {roomWidthFt.toFixed(1)}&apos;</span>
              <span className="text-emerald-400">({calculatedSqFt} sq ft)</span>
            </div>
          </div>
        </div>

        {/* PANE 3: RIGHT SIDEBAR (Selected Object Properties & Material Takeoff Summary) */}
        <div className="col-span-1 lg:col-span-3 bg-slate-950 p-4 space-y-4 text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-200">
              {selectedElement ? "Object Properties" : "Spatial Takeoff"}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {selectedElement ? selectedElement.toUpperCase() : "SCHEDULE"}
            </span>
          </div>

          {/* Selected Object Telemetry Panel */}
          {selectedElement === "walls" && (
            <div className="space-y-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-200 block">Exterior &amp; Partition Walls</span>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Assembly:</span>
                  <span className="text-slate-200">2×6 Stud + 5/8&quot; Gypsum</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Ceiling Height:</span>
                  <span className="text-slate-200">10&apos;-6&quot; AFF</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Surface Finish:</span>
                  <span className="text-slate-200 truncate">{activeWallData.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Fire Rating:</span>
                  <span className="text-emerald-400">1-Hour UL U305</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "windows" && (
            <div className="space-y-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-200 block">South Glazed Aperture</span>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Width:</span>
                  <span className="text-slate-200">14&apos;-6&quot; (174 inches)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Orientation:</span>
                  <span className="text-slate-200">True South 180°</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Glazing Spec:</span>
                  <span className="text-slate-200">Thermal Break Low-E Argon</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Daylight Factor:</span>
                  <span className="text-emerald-400">3.8% (LEED compliant)</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "doors" && (
            <div className="space-y-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-200 block">Egress Entry Door</span>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Door Width:</span>
                  <span className="text-slate-200">32&quot; Clear Egress</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Handing:</span>
                  <span className="text-slate-200">Left-Hand Inswing (90°)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Material:</span>
                  <span className="text-slate-200">Solid White Oak Flush</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Hardware:</span>
                  <span className="text-slate-200">Concealed Pivot Hinge</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "furniture" && (
            <div className="space-y-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-200 block">Furniture &amp; Fixture Blocks</span>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Living:</span>
                  <span className="text-slate-200">Bouclé Curved Sectional</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Center:</span>
                  <span className="text-slate-200">Marble Plinth Table</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Island:</span>
                  <span className="text-slate-200">115&quot; × 60&quot; Quartz Island</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Circulation:</span>
                  <span className="text-emerald-400">38&quot; Min Clearance</span>
                </div>
              </div>
            </div>
          )}

          {/* Editable Dimension Fields (Phase 3: Dimension fields update sample geometry) */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Adjust Room Span
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Length (ft):</label>
                <input
                  type="number"
                  step="0.5"
                  min="18"
                  max="45"
                  value={roomLengthFt}
                  onChange={(e) => setRoomLengthFt(Number(e.target.value) || 28.5)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono text-xs focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Width (ft):</label>
                <input
                  type="number"
                  step="0.5"
                  min="12"
                  max="30"
                  value={roomWidthFt}
                  onChange={(e) => setRoomWidthFt(Number(e.target.value) || 16.67)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono text-xs focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Structured Takeoff Summary Box */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-400 text-xs">
              <span>Materials Subtotal:</span>
              <span className="font-mono text-slate-200">${materialsSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-xs">
              <span>Trade Labour Estimate:</span>
              <span className="font-mono text-slate-300">${laborEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-xs">
              <span>Estimated Tax (8.25%):</span>
              <span className="font-mono text-slate-400">${taxEst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-100 font-semibold text-xs pt-1 border-t border-slate-800/80">
              <span>Estimated Total:</span>
              <span className="font-mono text-amber-400">${finalTakeoffTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Takeoff Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenTrial && onOpenTrial("pro")}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Early Access</span>
              </button>
            </div>

            {downloadNotice && (
              <p className="text-[11px] text-emerald-400 text-center animate-fade-in pt-1">
                {downloadNotice}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: Project Status & Validation Messages */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-3">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Geometry verified · 0 unclosed wall loops</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Calculations based on {calculatedSqFt} sq ft net envelope with 10% cutting waste allowance</span>
        </div>

        <div className="flex items-center space-x-3 text-slate-400">
          <span>Prices illustrative</span>
          <span className="text-slate-600">·</span>
          <span>Sample Project: Residential Suite Level 01</span>
        </div>
      </div>
    </div>
  );
}
