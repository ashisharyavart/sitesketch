"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Menu,
  X,
  FileSpreadsheet,
  Sun,
  PenTool,
  Palette,
  HardHat,
  MonitorPlay,
  Download,
  Share2,
  ChevronDown,
  Cpu,
  Loader2,
  CheckCircle2,
  UploadCloud,
  FileCheck2
} from "lucide-react";

export default function Home() {
  // Navigation & Mobile Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("pro");
  const [workEmail, setWorkEmail] = useState("");
  const [modalStep, setModalStep] = useState<"form" | "provisioning" | "success">("form");
  const [provisionProgress, setProvisionProgress] = useState(0);

  // Pricing Toggle
  const [isAnnual, setIsAnnual] = useState(true);

  // Interactive Before/After Hero Slider
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeLighting, setActiveLighting] = useState<"daylight" | "sunset" | "overcast">("daylight");
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive Live Feature Demo Tab Switcher
  const [activeFeatureTab, setActiveFeatureTab] = useState<"vectorizer" | "lighting" | "bom" | "materials" | "viewer">("lighting");
  const [kelvin, setKelvin] = useState(4000);
  const [selectedFloor, setSelectedFloor] = useState<"oak" | "concrete" | "walnut">("oak");
  const [selectedRoom, setSelectedRoom] = useState<"living" | "kitchen" | "master">("living");
  const [copiedBom, setCopiedBom] = useState(false);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Before/After Drag Handlers
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleOpenTrial = (tier: string = "pro", email: string = "") => {
    setSelectedTier(tier);
    if (email) setWorkEmail(email);
    setModalStep("form");
    setProvisionProgress(0);
    setTrialModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail) return;
    setModalStep("provisioning");
    let p = 10;
    const interval = setInterval(() => {
      p += 25;
      setProvisionProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setModalStep("success");
        }, 400);
      }
    }, 450);
  };

  const handleCopyBom = () => {
    setCopiedBom(true);
    setTimeout(() => setCopiedBom(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Background Architectural Blueprint Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[350px] bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />

      {/* ========================================================= */}
      {/* 1. NAVBAR                                                 */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/25 blur-md rounded-xl group-hover:bg-cyan-500/40 transition-all" />
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 relative z-10 transition-transform group-hover:scale-105"
              >
                <polygon
                  points="20,2 36,11 36,29 20,38 4,29 4,11"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  strokeDasharray="2 1.5"
                  fill="#111827"
                />
                <path
                  d="M12 28L20 8L28 28"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="15" y1="21" x2="25" y2="21" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="8" r="2.2" fill="#06B6D4" />
                <polygon points="20,33 17,27 23,27" fill="#F59E0B" />
                <circle cx="20" cy="21" r="1.5" fill="#38BDF8" />
              </svg>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                SiteSketch
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 hidden sm:inline">
                SaaS v2.4
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 p-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <a href="#features" className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all">
              Features
            </a>
            <a href="#spatial-engine" className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all">
              Spatial Engine
            </a>
            <a href="#pricing" className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all">
              Pricing
            </a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all">
              FAQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleOpenTrial("starter")}
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => handleOpenTrial("pro")}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => handleOpenTrial("pro")}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Free Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-[#0B0F17] border-b border-slate-800 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Features
            </a>
            <a
              href="#spatial-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Spatial Engine
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenTrial("pro");
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs text-center"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION & STUDIO CANVAS                           */}
      {/* ========================================================= */}
      <section id="spatial-engine" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Title & Action Bar */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span>⚡ Spatial Engine v2.4 Beta Live — Generative BIM &amp; Photoreal Renders</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Turn Rough Floor Sketches into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
                Photorealistic Spaces
              </span>{" "}
              in Seconds.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              SiteSketch transforms hand-drawn pencil schematics, CAD layouts, and raw job-site shells into immersive 3D interior renders, material schedules, and automated cost estimates.
            </p>

            {/* Action Bar */}
            <div className="pt-2 max-w-xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOpenTrial("pro", workEmail);
                }}
                className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]"
              >
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="Enter your studio work email..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm whitespace-nowrap flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get 5 Free Studio Renders</span>
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  No credit card required
                </span>
                <span>•</span>
                <span>Direct DWG / IFC BIM export</span>
                <span>•</span>
                <span>0.8s GPU Raytracing</span>
              </div>
            </div>
          </div>

          {/* High-Fidelity Hero Visual Asset: SiteSketch Studio Canvas Frame */}
          <div className="relative rounded-2xl border border-slate-700/60 bg-slate-950 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)] overflow-hidden">
            {/* Studio Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800" />
                <span className="font-mono text-cyan-400 font-bold text-[11px]">
                  SiteSketch Studio
                </span>
                <span className="text-slate-500 hidden sm:inline">/</span>
                <span className="font-mono text-slate-300 text-[11px] hidden sm:inline">
                  Res_Nordic_Living_Room_4K.skx
                </span>
              </div>

              <div className="flex items-center space-x-3 font-mono text-[10px]">
                <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>GPU ENGINE v2.4 ONLINE</span>
                </div>
                <button
                  onClick={() => handleOpenTrial("pro")}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  Launch Canvas
                </button>
              </div>
            </div>

            {/* 3-Pane Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[480px]">
              {/* Left Pane: 2D Hand-drawn blueprint floor plan with annotations (col-span-3) */}
              <div className="hidden xl:flex xl:col-span-3 flex-col bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    2D Raw Pencil Schematic
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    INPUT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tracing paper scan uploaded from job site. Spatial OCR parsed structural double walls, 14&apos;-6&quot; window opening, and 312 sq ft living perimeter.
                </p>

                {/* Hand drawn sketch vector preview */}
                <div className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] bg-[#0D1524] p-3 flex flex-col justify-between font-mono text-[10px]">
                  <div className="flex justify-between text-cyan-400">
                    <span>SPAN: 28&apos;-6&quot;</span>
                    <span>OCR: 99.4%</span>
                  </div>
                  <div className="border border-dashed border-cyan-500/40 p-4 rounded text-center space-y-1">
                    <div className="text-slate-200 font-bold">LIVING SUITE</div>
                    <div className="text-amber-400 text-[9px]">312 SQ. FT. // HERRINGBONE OAK</div>
                    <div className="text-slate-500 text-[9px]">DOOR SWING: 90° ARCH DETECTED</div>
                  </div>
                  <div className="text-slate-400 text-[9px] flex justify-between">
                    <span>WALLS: 6 LOAD-BEARING</span>
                    <span className="text-emerald-400">VECTORIZED</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-[11px] font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Finished Ceiling:</span>
                    <span className="text-slate-200">10&apos;-6&quot; Aff.</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                    <span>Glazed Mullion:</span>
                    <span className="text-slate-200">Slim Steel Low-E</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Design Token:</span>
                    <span className="text-amber-400 font-semibold">Scandinavian Modern</span>
                  </div>
                </div>
              </div>

              {/* Middle Pane: Interactive Before/After Split Comparison Slider (col-span-6) */}
              <div className="col-span-1 lg:col-span-8 xl:col-span-6 flex flex-col bg-slate-950 p-4 sm:p-5">
                <div className="flex items-center justify-between pb-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="font-mono font-semibold text-slate-200 uppercase tracking-wider">
                      Interactive Before / After Viewport
                    </span>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setActiveLighting("daylight")}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        activeLighting === "daylight"
                          ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      Daylight 4000K
                    </button>
                    <button
                      onClick={() => setActiveLighting("sunset")}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        activeLighting === "sunset"
                          ? "bg-amber-500/20 text-amber-300 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      Golden 2700K
                    </button>
                  </div>
                </div>

                {/* Draggable Comparison Canvas */}
                <div
                  ref={containerRef}
                  onMouseMove={(e) => isDragging && handleMove(e.clientX)}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchMove={(e) => e.touches.length > 0 && handleMove(e.touches[0].clientX)}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-2xl bg-slate-950"
                >
                  {/* Right Background: 4K Photoreal Scandinavian Living Room */}
                  <div className="absolute inset-0 w-full h-full bg-[#161E2E] flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/50 text-amber-400 font-mono text-[10px] font-bold">
                        OUTPUT: 4K PHOTOREAL SCANDINAVIAN
                      </span>
                    </div>

                    {/* Architectural scene representation */}
                    <div className="space-y-4">
                      <div className="h-28 rounded-lg bg-gradient-to-r from-slate-800/80 via-slate-700/50 to-amber-900/20 border border-slate-700/60 p-4 flex flex-col justify-end">
                        <span className="text-xs font-bold text-white">Curved Bouclé Sectional &amp; Fluted Wall</span>
                        <span className="text-[10px] font-mono text-cyan-300">
                          Raytraced Bounces: 128 SPP • {activeLighting === "sunset" ? "2700K Warm Sunset" : "4000K Natural Daylight"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          Floor: Select European White Oak
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          Plinth: Honed Carrara Marble
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left Foreground: 2D Hand-drawn Napkin Blueprint */}
                  <div
                    className="absolute inset-0 h-full overflow-hidden bg-[#0D1524] border-r-2 border-cyan-400"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="p-6 h-full flex flex-col justify-between min-w-[320px]">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/50 text-cyan-400 font-mono text-[10px] font-bold">
                          INPUT: NAPKIN BLUEPRINT SCHEMATIC
                        </span>
                      </div>
                      <div className="space-y-3 font-mono text-xs text-slate-300">
                        <div className="border border-dashed border-cyan-400/60 p-3 rounded bg-slate-900/60">
                          <div className="text-cyan-400 font-bold">PENCIL SCHEMATIC LAYER</div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            Outer perimeter 28&apos;-6&quot; × 16&apos;-8&quot; • 90° Door Swing • Glazed Wall
                          </div>
                        </div>
                        <div className="text-[10px] text-amber-400">
                          OCR Vector Extrusion: Active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drag Handle Icon */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <span className="text-[10px] font-bold">⟷</span>
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
                    Drag slider left/right to inspect transition
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Preset: Scandinavian Daylight 4K</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> BIM Parametric Synced
                  </span>
                </div>
              </div>

              {/* Right Pane: Auto-generated Bill of Materials (BOM) card (col-span-3) */}
              <div className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Auto Bill of Materials (BOM)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Surface takeoffs calculated instantaneously from detected room boundaries and architectural finishes.
                </p>

                {/* Itemized Line Items */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span className="truncate pr-1">01. Herringbone White Oak</span>
                      <span className="text-amber-400 font-bold">$4,524</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>312 sq. ft.</span>
                      <span>$14.50 / sq. ft.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span className="truncate pr-1">02. Bouclé Curved Sectional</span>
                      <span className="text-amber-400 font-bold">$3,850</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 Unit (Custom Radius)</span>
                      <span>Specified</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span className="truncate pr-1">03. Fluted Acoustic Millwork</span>
                      <span className="text-amber-400 font-bold">$2,952</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>180 sq. ft. wall span</span>
                      <span>$16.40 / sq. ft.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-200">
                      <span className="truncate pr-1">04. Carrara Marble Plinth</span>
                      <span className="text-amber-400 font-bold">$1,280</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Honed waterfall edge</span>
                      <span>1 Unit</span>
                    </div>
                  </div>
                </div>

                {/* Subtotal & Action buttons */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-cyan-400 font-bold">
                    <span>Total Project Takeoff:</span>
                    <span>$12,606.00</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <button
                      onClick={handleCopyBom}
                      className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{copiedBom ? "Exported!" : "Export CSV"}</span>
                    </button>
                    <button
                      onClick={() => handleOpenTrial("pro")}
                      className="py-1.5 px-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Push to Revit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-8 border-t border-slate-800 space-y-4 text-center">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Trusted by 1,400+ interior designers, BIM modelers, and residential developers worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 text-slate-300 font-mono text-xs uppercase font-semibold">
              <span className="hover:text-cyan-400 transition-colors">STUDIO FORMA</span>
              <span className="hover:text-amber-400 transition-colors">APEX LIVING</span>
              <span className="hover:text-cyan-400 transition-colors">STRUCTURA DESIGN</span>
              <span className="hover:text-amber-400 transition-colors">VERTEX BUILD</span>
              <span className="hover:text-cyan-400 transition-colors">ARCHETYPE LABS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LIVE FEATURE GRID (6 CORE SAAS CAPABILITIES)          */}
      {/* ========================================================= */}
      <section id="features" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
              CORE PRODUCT CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              B2B Spatial Architecture Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Bridging hand-drawn concepts and 4K photorealistic spatial reality with millimeter BIM accuracy.
            </p>
          </div>

          {/* Interactive Feature Demo Tabs */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 overflow-x-auto gap-2">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 shrink-0">
                <Cpu className="w-4 h-4" /> TEST LIVE CAPABILITIES:
              </span>
              <div className="flex gap-2 text-xs font-mono shrink-0">
                <button
                  onClick={() => setActiveFeatureTab("lighting")}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeFeatureTab === "lighting"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Multi-Kelvin Lighting
                </button>
                <button
                  onClick={() => setActiveFeatureTab("materials")}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeFeatureTab === "materials"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Finish Swapping
                </button>
                <button
                  onClick={() => setActiveFeatureTab("bom")}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeFeatureTab === "bom"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Live Takeoffs
                </button>
              </div>
            </div>

            {/* Interactive Demo Content */}
            {activeFeatureTab === "lighting" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Photorealistic Multi-Environment Lighting</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adjust the Kelvin slider to observe real-time photon bounce calculations from warm 2700K dusk to 6500K overcast noon.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-cyan-400 font-bold">
                      <span>CORRELATED TEMPERATURE:</span>
                      <span>{kelvin} KELVIN</span>
                    </div>
                    <input
                      type="range"
                      min="2200"
                      max="6500"
                      step="100"
                      value={kelvin}
                      onChange={(e) => setKelvin(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>2200K Golden Sunset</span>
                      <span>4000K Daylight</span>
                      <span>6500K Overcast</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#161E2E] p-6 text-center space-y-3">
                  <div className="text-xs font-mono text-amber-400">
                    CALIBRATED LIGHTING PROFILE: {kelvin < 3200 ? "GOLDEN HOUR RAYTRACE" : "NATURAL DAYLIGHT 4K"}
                  </div>
                  <div className="h-28 rounded-lg border border-slate-700 bg-gradient-to-r from-slate-800 via-slate-700 to-amber-900/30 flex items-center justify-center text-xs font-mono text-slate-300">
                    Solar Azimuth Angle: 38° • Soft Ambient Diffuse
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === "materials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Material &amp; Finish Swapping Sandbox</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Toggle PBR materials with single clicks while keeping volumetric shadows intact.
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <span className="text-slate-400 block">FLOOR FINISH:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["oak", "concrete", "walnut"] as const).map((mat) => (
                        <button
                          key={mat}
                          onClick={() => setSelectedFloor(mat)}
                          className={`py-2 px-2 rounded-lg border capitalize transition-all cursor-pointer ${
                            selectedFloor === mat
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                              : "bg-slate-950 border-slate-800 text-slate-400"
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-3 font-mono text-xs">
                  <div className="text-cyan-400 font-bold">ACTIVE PBR SHADER GRAPH:</div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-slate-200">Floor: {selectedFloor.toUpperCase()} FINISH</div>
                    <div className="text-slate-400 text-[10px]">Roughness: 0.28 • Normal Map: 4K Tangent</div>
                    <div className="text-emerald-400 text-[10px]">✓ Real-time Diffuse Reflections Calculated</div>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === "bom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Automated Bill of Materials (BOM) Takeoffs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Select a zone to inspect auto-calculated takeoffs and unit cost schedules.
                  </p>
                  <div className="flex gap-2 text-xs font-mono">
                    {(["living", "kitchen", "master"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRoom(r)}
                        className={`flex-1 py-2 rounded-lg border capitalize transition-all cursor-pointer ${
                          selectedRoom === r
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        {r} Suite
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2 text-amber-400 font-bold">
                    <span>ZONE: {selectedRoom.toUpperCase()}</span>
                    <span>IFC 4.3 VERIFIED</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Hardwood / Flooring Takeoff</span>
                    <span>{selectedRoom === "living" ? "$4,524.00" : "$3,600.00"}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Custom Millwork &amp; Paneling</span>
                    <span>{selectedRoom === "living" ? "$2,952.00" : "$2,450.00"}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-cyan-400">
                    <span>Zone Total:</span>
                    <span>{selectedRoom === "living" ? "$12,606.00" : "$6,050.00"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6 Core Product Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-cyan-400 w-fit group-hover:scale-105 transition-transform">
                  <PenTool className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 w-fit">
                  SPATIAL OCR 2.4
                </div>
                <h3 className="text-lg font-bold text-white">2D Pencil &amp; CAD Vectorization</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload phone photos of tracing paper, napkin sketches, or raw DWG/PDF files. Our spatial neural net automatically recognizes load-bearing walls, door swings, and window rough openings.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>Vector Extraction</span>
                <span>AutoCAD / Revit</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-amber-400 w-fit group-hover:scale-105 transition-transform">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 w-fit">
                  KELVIN SCHEDULER
                </div>
                <h3 className="text-lg font-bold text-white">Photorealistic Multi-Environment Lighting</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instantly toggle daylight orientation, golden-hour exterior radiance, or interior ambient spot-lighting schemes calibrated to real Kelvin temperatures.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-amber-400">
                <span>2700K - 6500K</span>
                <span>Physical Raytracing</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-cyan-400 w-fit group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 w-fit">
                  AUTOMATED ESTIMATING
                </div>
                <h3 className="text-lg font-bold text-white">Automated Bill of Materials (BOM) Takeoffs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stop manual spatial calculations. SiteSketch parses the design and outputs an itemized spreadsheet of flooring square footage, paint coverage, and fixture counts.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>CSV / PDF / IFC</span>
                <span>Manufacturer Catalogs</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-amber-400 w-fit group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 w-fit">
                  PBR SANDBOX
                </div>
                <h3 className="text-lg font-bold text-white">Material &amp; Finish Swapping Sandbox</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Test herringbone oak versus polished concrete flooring, or carrara marble versus matte quartz countertops with one click, preserving natural room shadows and reflections.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-amber-400">
                <span>Real-Time PBR</span>
                <span>Normal &amp; Roughness</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-cyan-400 w-fit group-hover:scale-105 transition-transform">
                  <HardHat className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 w-fit">
                  SITE STAGING
                </div>
                <h3 className="text-lg font-bold text-white">Raw Framing-to-Finish Site Staging</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Snap a photo of an unfinished concrete shell or wooden stud framing on-site. SiteSketch aligns 3D design finishes precisely over the physical site geometry for client walk-ins.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>Laser Level Sync</span>
                <span>Job-Site AR Ready</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 text-amber-400 w-fit group-hover:scale-105 transition-transform">
                  <MonitorPlay className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 w-fit">
                  CLIENT PANORAMA
                </div>
                <h3 className="text-lg font-bold text-white">360° Interactive Client Web Viewers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Share secure, browser-based 360° panoramic viewer links with homeowners and stakeholders. Enable digital markup, annotations, and instant design finish approvals without downloads.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-amber-400">
                <span>Zero Client Installs</span>
                <span>Markup &amp; Approvals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. STEP-BY-STEP PRODUCTION FLOW                           */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 relative bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
              STEP-BY-STEP FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              From Concept to Construction Spec
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Upload Blueprint ➔ Spatial Analysis ➔ Material Tuning ➔ Export Renders &amp; BOM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 relative group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-700">01</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-semibold">STEP 01</span>
                <h3 className="text-base font-bold text-white">Upload Blueprint</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag and drop 2D tracing paper sketches, architectural napkin doodles, PDF construction sets, or raw on-site photos.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-500">
                Supports: JPG, PNG, PDF, DXF
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 relative group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-700">02</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-semibold">STEP 02</span>
                <h3 className="text-base font-bold text-white">Spatial Analysis</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Neural vision engine recognizes wall thickness, extrudes ceiling heights, tags room perimeters, and isolates fenestration openings.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-500">
                Execution: &lt;1.2s on Cloud GPU
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 relative group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-700">03</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400 font-semibold">STEP 03</span>
                <h3 className="text-base font-bold text-white">Material Tuning</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick an architectural mood preset (Minimalist, Japandi, Industrial, Coastal) or inject custom vendor material finishes and lighting schemes.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-500">
                Custom PBR Texture Tokens
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 relative group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-700">04</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-semibold">STEP 04</span>
                <h3 className="text-base font-bold text-white">Export Renders &amp; BOM</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download 4K Ultra-HD renders, dispatch interactive 360° client web viewer links, and export synchronized material spreadsheets.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-500">
                Direct Sync: Revit, AutoCAD, CSV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PRICING CARDS (STARTER, PRO, ENTERPRISE)               */}
      {/* ========================================================= */}
      <section id="pricing" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
              TRANSPARENT SAAS LICENSING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Self-Serve Software Plans
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              14-day full platform access. No setup fees or local hardware required.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center">
              <div className="flex items-center p-1 rounded-full bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                    !isAnnual ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isAnnual
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isAnnual ? "bg-slate-950 text-cyan-400" : "bg-cyan-950 text-cyan-300"
                  }`}>
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Starter</h3>
                  <p className="text-xs text-slate-400 mt-1">For solo interior designers and freelance draftsmen.</p>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    ${isAnnual ? 24 : 29}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>25 High-Resolution Renders / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>2D Sketch &amp; CAD Vectorization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Standard 1080p Export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>3 Active Project Workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Community Support &amp; Cloud Storage</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleOpenTrial("starter")}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Start Free 14-Day Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pro Studio Plan (Highlighted) */}
            <div className="rounded-2xl bg-slate-900 border-2 border-cyan-400 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_0_50px_-10px_rgba(6,182,212,0.35)] relative lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Pro Studio</h3>
                  <p className="text-xs text-slate-400 mt-1">For growing design practices, boutique architecture studios, and contractors.</p>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    ${isAnnual ? 64 : 79}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white">150 Ultra-HD 4K Renders / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Automated Bill of Materials (BOM) &amp; Takeoffs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Raw Framing-to-Finish Site Staging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Unlimited Project Workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Interactive 360° Client Viewer Links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Priority GPU Cloud Rendering Queue</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleOpenTrial("pro")}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
                >
                  <span>Claim 14-Day Pro Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Enterprise</h3>
                  <p className="text-xs text-slate-400 mt-1">For commercial architectural firms and multi-site developers.</p>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    ${isAnnual ? 159 : 199}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Unlimited 4K &amp; 8K Spatial Renders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Multi-Seat Team Seats (Up to 10 included)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Dedicated High-Throughput API &amp; Webhook Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Custom Material &amp; Vendor Catalog Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Enterprise SSO, Role-Based Controls &amp; SLA</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleOpenTrial("enterprise")}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Deploy Enterprise Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FAQ & FOOTER                                           */}
      {/* ========================================================= */}
      <section id="faq" className="py-20 sm:py-28 relative bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Architectural &amp; Software Details
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Can SiteSketch interpret rough pencil drawings and site measurements?",
                a: "Yes. The vision engine parses hand-drawn floor plans, elevation sketches, and dimensional handwritten notations into clean geometry. Our spatial OCR model recognizes door swings, load-bearing walls, and window openings from phone snapshots of tracing paper, napkins, or job-site sketches."
              },
              {
                q: "How does the Bill of Materials (BOM) get calculated?",
                a: "When a render is produced, SiteSketch segments spatial planes and furniture models, cross-referencing floor areas and fixture volumes against industry standard dimensional guidelines. It calculates square footages for flooring, wall coverage for millwork or paint, linear dimensions for baseboards, and generates an itemized, exportable CSV/PDF schedule."
              },
              {
                q: "Can I export my project to AutoCAD or Revit?",
                a: "Pro and Enterprise tiers include direct spatial schema exports compatible with DXF/DWG formats and common 3D packages. You can download clean 2D vector CAD drawings, IFC 4.3 BIM parametric models, and glTF 2.0 PBR asset packages ready for AutoCAD, Revit, SketchUp, and Blender."
              },
              {
                q: "Is my proprietary design data secure?",
                a: "Yes. Projects are encrypted at rest with AES-256 and processed in isolated cloud containers. Your designs and proprietary architectural files are never used to train public models. Enterprise workspaces also support dedicated AWS S3 bucket synchronization with customer-managed keys."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global SaaS Footer */}
      <footer className="border-t border-slate-800 bg-[#0B0F17] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center space-x-3">
                <span className="text-xl font-bold text-white tracking-tight">SiteSketch</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                  SaaS Platform
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                The generative spatial engine turning rough concepts into photorealistic environments and accurate project takeoffs.
              </p>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM CLOUD OPERATIONAL • AES-256 ENCRYPTED
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#spatial-engine" className="hover:text-cyan-400 transition-colors">Spatial Engine</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Framing Staging</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">BOM Generator</a></li>
                <li><button onClick={() => handleOpenTrial("enterprise")} className="hover:text-cyan-400 transition-colors cursor-pointer text-left">API Documentation</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Design Token Library</a></li>
                <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Community Showcase</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Legal &amp; Company</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                <li><a href="#spatial-engine" className="hover:text-cyan-400 transition-colors">Security Architecture</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
            <p>© 2026 SiteSketch Technologies, Inc. All rights reserved.</p>
            <div className="text-cyan-400">sitesketch.online</div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 7. WORKING TRIAL / BETA ACTIVATION MODAL                   */}
      {/* ========================================================= */}
      {trialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] p-6 sm:p-8 overflow-hidden">
            <button
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {modalStep === "form" && (
              <form onSubmit={handleModalSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Launch Studio Beta
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                      {selectedTier} Plan Trial
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Instant GPU workspace • 5 Free Renders • No credit card required
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    STUDIO WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@archstudio.design"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Activate Free Studio License</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center text-[11px] font-mono text-slate-500">
                  AES-256 Encrypted • Never trained on public models
                </div>
              </form>
            )}

            {modalStep === "provisioning" && (
              <div className="py-8 text-center space-y-5 font-mono">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">ALLOCATING SPATIAL GPU NODE...</h4>
                  <p className="text-xs text-slate-400">Loading generative BIM weights &amp; provisioning credits</p>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${provisionProgress}%` }} />
                </div>
              </div>
            )}

            {modalStep === "success" && (
              <div className="py-6 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Workspace Provisioned!</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Token dispatched to <span className="text-cyan-400">{workEmail}</span>
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-left font-mono text-xs">
                  <span className="text-slate-400 text-[10px]">ACTIVE STUDIO KEY:</span>
                  <div className="text-cyan-300 select-all mt-1">sk_live_992f8a4e_arch_7b82x4</div>
                </div>
                <button
                  onClick={() => setTrialModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-cyan-400"
                >
                  Enter Studio Canvas
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
