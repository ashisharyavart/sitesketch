"use client";

import React, { useState } from "react";
import ComparisonSlider from "./ComparisonSlider";
import { CadFloorplanVectorSVG } from "./ArchitecturalSVGs";
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
      color: "bg-[#74756E]"
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
      color: "bg-[#D8D5CB]"
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
    <div className="relative w-full rounded-2xl border border-[#D8D5CB] bg-[#F1EEE6] shadow-sm overflow-hidden font-sans">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#E8E5DC] border-b border-[#D8D5CB] text-xs gap-3">
        {/* Left: Document Info & Sample Tag */}
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#78866D] ring-2 ring-[#78866D]/20" />
          <div className="flex items-center space-x-2">
            <span className="text-[#292C29] font-semibold text-xs">
              Residential Suite · Sheet A-101
            </span>
            <span className="text-[#74756E] text-xs hidden sm:inline">
              ({calculatedSqFt} sq ft · Scale 1/4&quot; = 1&apos;-0&quot;)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#F8F7F2] text-[#74756E] border border-[#D8D5CB] text-[10px] font-mono">
              Sample Project
            </span>
          </div>
        </div>

        {/* Center: Workspace Mode Switcher */}
        <div className="flex items-center bg-[#F1EEE6] p-1 rounded-lg border border-[#D8D5CB] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "workspace"
                ? "bg-[#777B64] text-[#F8F7F2] font-medium shadow-xs"
                : "text-[#74756E] hover:text-[#292C29]"
            }`}
          >
            CAD Workspace
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "compare"
                ? "bg-[#777B64] text-[#F8F7F2] font-medium shadow-xs"
                : "text-[#74756E] hover:text-[#292C29]"
            }`}
          >
            Sketch vs CAD
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("materials")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "materials"
                ? "bg-[#777B64] text-[#F8F7F2] font-medium shadow-xs"
                : "text-[#74756E] hover:text-[#292C29]"
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
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D8D5CB] bg-[#F8F7F2] hover:bg-[#E8E5DC] text-[#292C29] text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777B64]"
          >
            <Download className="w-3.5 h-3.5 text-[#74756E]" />
            <span>Export Takeoff (CSV)</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenTrial && onOpenTrial("pro")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#292C29] hover:bg-[#1A1C1A] text-[#F8F7F2] font-medium text-xs transition-colors cursor-pointer"
          >
            <span>Request Early Access</span>
          </button>
        </div>
      </div>

      {/* Main 3-Pane Architectural Studio Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D8D5CB] min-h-[520px]">
        {/* PANE 1: LEFT SIDEBAR (Project Navigation & Active Layer Toggles) */}
        <div className="col-span-1 lg:col-span-3 bg-[#F8F7F2] p-4 space-y-5 text-xs text-[#292C29]">
          {/* Project Source Block */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#74756E] uppercase tracking-wider block">
              Project Source
            </span>
            <div className="p-2.5 rounded-lg bg-[#F1EEE6] border border-[#D8D5CB] space-y-1">
              <div className="flex items-center justify-between text-[#292C29] font-medium">
                <span className="truncate">pencil-suite-scan-01.jpg</span>
                <span className="text-[10px] text-[#78866D] bg-[#78866D]/15 px-1.5 py-0.5 rounded border border-[#78866D]/30 font-medium">
                  Detected
                </span>
              </div>
              <p className="text-[11px] text-[#74756E] leading-snug">
                Hand-drawn graphite on 1/4&quot; grid paper. 480 sq ft exterior perimeter identified.
              </p>
            </div>
          </div>

          {/* Interactive Layer Visibility Controls (Actually changes the drawing) */}
          <div className="space-y-2.5 pt-2 border-t border-[#E3E0D7]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#74756E] uppercase tracking-wider">
                Drawing Layers
              </span>
              <span className="text-[10px] text-[#74756E]">Toggle visibility</span>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#777B64]" />
                  <span className="text-[#292C29] font-medium">Exterior &amp; Partition Walls</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerWalls}
                  onChange={(e) => setLayerWalls(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#B47757]" />
                  <span className="text-[#292C29] font-medium">Glazed Window Aperture</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerWindows}
                  onChange={(e) => setLayerWindows(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#78866D]" />
                  <span className="text-[#292C29] font-medium">Egress Door Swings</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerDoors}
                  onChange={(e) => setLayerDoors(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#A39E93]" />
                  <span className="text-[#292C29] font-medium">Spatial CAD Blocks</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerFurniture}
                  onChange={(e) => setLayerFurniture(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#74756E]" />
                  <span className="text-[#292C29] font-medium">Dimension Strings</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerDimensions}
                  onChange={(e) => setLayerDimensions(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-[#E8E5DC]/60 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#9E9B90]" />
                  <span className="text-[#292C29] font-medium">Room Labels &amp; Areas</span>
                </div>
                <input
                  type="checkbox"
                  checked={layerRoomLabels}
                  onChange={(e) => setLayerRoomLabels(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#D8D5CB] bg-[#F8F7F2] accent-[#777B64] cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Quick Selection Filter */}
          <div className="space-y-2 pt-2 border-t border-[#E3E0D7]">
            <span className="text-[11px] font-semibold text-[#74756E] uppercase tracking-wider block">
              Inspect Object Geometry
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedElement("walls")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "walls"
                    ? "bg-[#777B64] text-[#F8F7F2] font-medium border border-[#777B64]"
                    : "bg-[#E8E5DC] text-[#74756E] hover:text-[#292C29] border border-[#D8D5CB]"
                }`}
              >
                Exterior Walls
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("windows")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "windows"
                    ? "bg-[#777B64] text-[#F8F7F2] font-medium border border-[#777B64]"
                    : "bg-[#E8E5DC] text-[#74756E] hover:text-[#292C29] border border-[#D8D5CB]"
                }`}
              >
                South Glazing
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("doors")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "doors"
                    ? "bg-[#777B64] text-[#F8F7F2] font-medium border border-[#777B64]"
                    : "bg-[#E8E5DC] text-[#74756E] hover:text-[#292C29] border border-[#D8D5CB]"
                }`}
              >
                Egress Door
              </button>
              <button
                type="button"
                onClick={() => setSelectedElement("furniture")}
                className={`px-2 py-1.5 rounded text-left transition-colors cursor-pointer truncate ${
                  selectedElement === "furniture"
                    ? "bg-[#777B64] text-[#F8F7F2] font-medium border border-[#777B64]"
                    : "bg-[#E8E5DC] text-[#74756E] hover:text-[#292C29] border border-[#D8D5CB]"
                }`}
              >
                Island &amp; Sofa
              </button>
            </div>
          </div>
        </div>

        {/* PANE 2: CENTRAL WORKSPACE (Canvas + Zoom/Pan + Before/After Comparison) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col bg-[#F1EEE6] p-4 space-y-3">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between border-b border-[#D8D5CB] pb-2 text-xs">
            <div className="flex items-center space-x-2 text-[#74756E]">
              <span className="font-semibold text-[#292C29]">
                {activeTab === "workspace"
                  ? "Interactive CAD Vector Viewport"
                  : activeTab === "compare"
                  ? "Field Sketch vs CAD Overlay"
                  : "Materials Specification Matrix"}
              </span>
            </div>

            {/* Zoom / Pan Action Pill */}
            {activeTab === "workspace" && (
              <div className="flex items-center bg-[#F8F7F2] border border-[#D8D5CB] rounded-lg p-0.5 space-x-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 rounded text-[#74756E] hover:text-[#292C29] hover:bg-[#E8E5DC] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 font-mono text-[11px] text-[#292C29] min-w-[42px] text-center">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 rounded text-[#74756E] hover:text-[#292C29] hover:bg-[#E8E5DC] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-3 bg-[#D8D5CB] mx-0.5" />
                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-1 rounded text-[#74756E] hover:text-[#292C29] hover:bg-[#E8E5DC] cursor-pointer"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Canvas Viewport Body */}
          <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-xl border border-[#D8D5CB] bg-[#232624] min-h-[380px]">
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
              <div className="w-full p-2 bg-[#F1EEE6]">
                <ComparisonSlider showControls={true} />
              </div>
            )}

            {activeTab === "materials" && (
              <div className="w-full h-full p-4 space-y-4 bg-[#F8F7F2] overflow-y-auto">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#292C29]">Select Room Materials &amp; Finishes</h4>
                  <p className="text-xs text-[#74756E]">
                    Switch finishes to update specifications and recalculate quantity takeoff schedules.
                  </p>
                </div>

                {/* Flooring Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#292C29]">Flooring Specification:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {flooringOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFlooring(opt.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedFlooring === opt.id
                            ? "bg-[#F1EEE6] border-[#777B64] ring-1 ring-[#777B64]"
                            : "bg-[#F8F7F2] border-[#D8D5CB] hover:border-[#777B64]/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${opt.color} shrink-0`} />
                          <span className="text-xs font-semibold text-[#292C29] truncate">{opt.name}</span>
                        </div>
                        <span className="text-[11px] text-[#74756E] block">{opt.finish}</span>
                        <span className="text-xs font-mono font-medium text-[#B47757] mt-1 block">
                          ${opt.rate.toFixed(2)} / {opt.unit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wall Finishes Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#292C29]">Wall Surface Specification:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {wallOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWallFinish(opt.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedWallFinish === opt.id
                            ? "bg-[#F1EEE6] border-[#777B64] ring-1 ring-[#777B64]"
                            : "bg-[#F8F7F2] border-[#D8D5CB] hover:border-[#777B64]/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${opt.color} shrink-0`} />
                          <span className="text-xs font-semibold text-[#292C29] truncate">{opt.name}</span>
                        </div>
                        <span className="text-[11px] text-[#74756E] block">{opt.finish}</span>
                        <span className="text-xs font-mono font-medium text-[#B47757] mt-1 block">
                          ${opt.rate.toFixed(2)} / {opt.unit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Countertop Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#292C29]">Kitchen Island Countertop Slab:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCountertop("carrara")}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        selectedCountertop === "carrara"
                          ? "bg-[#F1EEE6] border-[#777B64] ring-1 ring-[#777B64]"
                          : "bg-[#F8F7F2] border-[#D8D5CB] hover:border-[#777B64]/50"
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#292C29] block">Honed Carrara Marble</span>
                      <span className="text-[11px] text-[#74756E]">Natural stone · Mitred edge</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCountertop("quartz")}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        selectedCountertop === "quartz"
                          ? "bg-[#F1EEE6] border-[#777B64] ring-1 ring-[#777B64]"
                          : "bg-[#F8F7F2] border-[#D8D5CB] hover:border-[#777B64]/50"
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#292C29] block">Nero Suede Quartzite</span>
                      <span className="text-[11px] text-[#74756E]">Engineered surface · Non-porous</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Central Workspace Footer: Interactive Demonstration Notice */}
          <div className="flex flex-wrap items-center justify-between text-xs text-[#74756E] border-t border-[#E3E0D7] pt-2 gap-2">
            <div className="flex items-center space-x-1.5 text-[#74756E]">
              <Info className="w-3.5 h-3.5 text-[#74756E]" />
              <span>Interactive demonstration · Click elements or toggle layers to test workspace reactivity</span>
            </div>
            <div className="flex items-center space-x-2 text-[#292C29] font-mono text-[11px]">
              <span>Dimensions: {roomLengthFt.toFixed(1)}&apos; × {roomWidthFt.toFixed(1)}&apos;</span>
              <span className="text-[#78866D] font-semibold">({calculatedSqFt} sq ft)</span>
            </div>
          </div>
        </div>

        {/* PANE 3: RIGHT SIDEBAR (Selected Object Properties & Material Takeoff Summary) */}
        <div className="col-span-1 lg:col-span-3 bg-[#F8F7F2] p-4 space-y-4 text-xs text-[#292C29]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D8D5CB] pb-2">
            <span className="font-semibold text-[#292C29]">
              {selectedElement ? "Object Properties" : "Spatial Takeoff"}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8E5DC] text-[#74756E] border border-[#D8D5CB] font-mono">
              {selectedElement ? selectedElement.toUpperCase() : "SCHEDULE"}
            </span>
          </div>

          {/* Selected Object Telemetry Panel */}
          {selectedElement === "walls" && (
            <div className="space-y-3 bg-[#F1EEE6] p-3 rounded-xl border border-[#D8D5CB]">
              <span className="font-semibold text-[#292C29] block">Exterior &amp; Partition Walls</span>
              <div className="space-y-1.5 text-[#74756E] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Assembly:</span>
                  <span className="text-[#292C29] font-medium">2×6 Stud + 5/8&quot; Gypsum</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Ceiling Height:</span>
                  <span className="text-[#292C29] font-medium">10&apos;-6&quot; AFF</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Surface Finish:</span>
                  <span className="text-[#292C29] font-medium truncate">{activeWallData.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Fire Rating:</span>
                  <span className="text-[#78866D] font-medium">1-Hour UL U305</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "windows" && (
            <div className="space-y-3 bg-[#F1EEE6] p-3 rounded-xl border border-[#D8D5CB]">
              <span className="font-semibold text-[#292C29] block">South Glazed Aperture</span>
              <div className="space-y-1.5 text-[#74756E] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Width:</span>
                  <span className="text-[#292C29] font-medium">14&apos;-6&quot; (174 inches)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Orientation:</span>
                  <span className="text-[#292C29] font-medium">True South 180°</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Glazing Spec:</span>
                  <span className="text-[#292C29] font-medium">Thermal Break Low-E Argon</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Daylight Factor:</span>
                  <span className="text-[#78866D] font-medium">3.8% (LEED compliant)</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "doors" && (
            <div className="space-y-3 bg-[#F1EEE6] p-3 rounded-xl border border-[#D8D5CB]">
              <span className="font-semibold text-[#292C29] block">Egress Entry Door</span>
              <div className="space-y-1.5 text-[#74756E] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Door Width:</span>
                  <span className="text-[#292C29] font-medium">32&quot; Clear Egress</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Handing:</span>
                  <span className="text-[#292C29] font-medium">Left-Hand Inswing (90°)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Material:</span>
                  <span className="text-[#292C29] font-medium">Solid White Oak Flush</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Hardware:</span>
                  <span className="text-[#292C29] font-medium">Concealed Pivot Hinge</span>
                </div>
              </div>
            </div>
          )}

          {selectedElement === "furniture" && (
            <div className="space-y-3 bg-[#F1EEE6] p-3 rounded-xl border border-[#D8D5CB]">
              <span className="font-semibold text-[#292C29] block">Furniture &amp; Fixture Blocks</span>
              <div className="space-y-1.5 text-[#74756E] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Living:</span>
                  <span className="text-[#292C29] font-medium">Bouclé Curved Sectional</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Center:</span>
                  <span className="text-[#292C29] font-medium">Marble Plinth Table</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3E0D7]">
                  <span>Island:</span>
                  <span className="text-[#292C29] font-medium">115&quot; × 60&quot; Quartz Island</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Circulation:</span>
                  <span className="text-[#78866D] font-medium">38&quot; Min Clearance</span>
                </div>
              </div>
            </div>
          )}

          {/* Editable Dimension Fields (Phase 3: Dimension fields update sample geometry) */}
          <div className="space-y-2 pt-1 border-t border-[#E3E0D7]">
            <span className="text-[11px] font-semibold text-[#74756E] uppercase tracking-wider block">
              Adjust Room Span
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-[#74756E] block mb-1">Length (ft):</label>
                <input
                  type="number"
                  step="0.5"
                  min="18"
                  max="45"
                  value={roomLengthFt}
                  onChange={(e) => setRoomLengthFt(Number(e.target.value) || 28.5)}
                  className="w-full bg-[#F8F7F2] border border-[#D8D5CB] rounded px-2 py-1 text-[#292C29] font-mono text-xs focus:border-[#777B64] focus:outline-none focus:ring-1 focus:ring-[#777B64]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#74756E] block mb-1">Width (ft):</label>
                <input
                  type="number"
                  step="0.5"
                  min="12"
                  max="30"
                  value={roomWidthFt}
                  onChange={(e) => setRoomWidthFt(Number(e.target.value) || 16.67)}
                  className="w-full bg-[#F8F7F2] border border-[#D8D5CB] rounded px-2 py-1 text-[#292C29] font-mono text-xs focus:border-[#777B64] focus:outline-none focus:ring-1 focus:ring-[#777B64]"
                />
              </div>
            </div>
          </div>

          {/* Structured Takeoff Summary Box */}
          <div className="pt-2 border-t border-[#E3E0D7] space-y-2">
            <div className="flex justify-between text-[#74756E] text-xs">
              <span>Materials Subtotal:</span>
              <span className="font-mono text-[#292C29]">${materialsSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[#74756E] text-xs">
              <span>Trade Labour Estimate:</span>
              <span className="font-mono text-[#292C29]">${laborEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[#74756E] text-xs">
              <span>Estimated Tax (8.25%):</span>
              <span className="font-mono text-[#74756E]">${taxEst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[#292C29] font-semibold text-xs pt-1 border-t border-[#D8D5CB]">
              <span>Estimated Total:</span>
              <span className="font-mono text-[#B47757] font-bold text-sm">${finalTakeoffTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Takeoff Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg bg-[#292C29] hover:bg-[#1A1C1A] text-[#F8F7F2] text-xs font-medium transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenTrial && onOpenTrial("pro")}
                className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-lg border border-[#D8D5CB] bg-[#F8F7F2] hover:bg-[#E8E5DC] text-[#292C29] text-xs font-medium transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#74756E]" />
                <span>Early Access</span>
              </button>
            </div>

            {downloadNotice && (
              <p className="text-[11px] text-[#78866D] font-medium text-center animate-fade-in pt-1">
                {downloadNotice}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: Project Status & Validation Messages */}
      <div className="px-4 py-2.5 bg-[#E8E5DC] border-t border-[#D8D5CB] flex flex-wrap items-center justify-between text-[11px] text-[#74756E] gap-3">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#292C29]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#78866D]" />
            <span>Geometry verified · 0 unclosed wall loops</span>
          </span>
          <span className="text-[#D8D5CB] hidden sm:inline">|</span>
          <span className="hidden sm:inline">Calculations based on {calculatedSqFt} sq ft net envelope with 10% cutting waste allowance</span>
        </div>

        <div className="flex items-center space-x-3 text-[#74756E]">
          <span>Prices illustrative</span>
          <span className="text-[#D8D5CB]">·</span>
          <span>Sample Project: Residential Suite Level 01</span>
        </div>
      </div>
    </div>
  );
}
