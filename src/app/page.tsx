"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Layers,
  Sun,
  FileSpreadsheet,
  Check,
  CheckCircle2,
  Menu,
  X,
  Ruler,
  Building2
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(true);

  // Interactive Planner Modal State
  const [plannerModalOpen, setPlannerModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Living & Dining Layout");
  const [selectedStyle, setSelectedStyle] = useState("Scandinavian Minimalist");
  const [emailInput, setEmailInput] = useState("");
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  const roomOptions = [
    { name: "Living & Dining Layout", sqft: 480, height: "10'-6\"", openings: "2 Doors · 3 Windows" },
    { name: "Master Penthouse Suite", sqft: 620, height: "11'-0\"", openings: "1 Door · 4 Windows" },
    { name: "Modern Open Kitchen", sqft: 340, height: "9'-6\"", openings: "2 Openings · 2 Windows" },
    { name: "Architectural Studio Office", sqft: 510, height: "12'-0\"", openings: "1 Pivot Door · Glazed Wall" },
  ];

  const styleOptions = [
    { name: "Scandinavian Minimalist", wood: "White Oak Herringbone", wall: "Warm Limewash", kelvin: "5000K Natural" },
    { name: "Japandi Warm", wood: "Hinoki Cedar Planks", wall: "Clay Plaster", kelvin: "4200K Soft Diffuse" },
    { name: "Bauhaus Industrial", wood: "Polished Concrete", wall: "Brushed Steel & Brick", kelvin: "5500K Studio Day" },
    { name: "Modern Farmhouse", wood: "Reclaimed French Oak", wall: "Chalk Matte Finish", kelvin: "3800K Golden Glow" },
  ];

  const currentRoom = roomOptions.find((r) => r.name === selectedRoom) || roomOptions[0];
  const currentStyle = styleOptions.find((s) => s.name === selectedStyle) || styleOptions[0];

  const handleOpenPlanner = (initialPreset?: string) => {
    if (initialPreset === "Scandinavian Suite") {
      setSelectedRoom("Living & Dining Layout");
      setSelectedStyle("Scandinavian Minimalist");
    }
    setPlannerSubmitted(false);
    setPlannerModalOpen(true);
  };

  const handlePlannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setPlannerSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] architectural-grid text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 flex flex-col justify-between">
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            {/* Minimalist Wireframe Icon */}
            <div className="w-6 h-6 rounded border-2 border-slate-900 flex items-center justify-center p-0.5 bg-white shadow-2xs group-hover:border-slate-700 transition-colors">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                <div className="bg-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              SiteSketch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-600">
            <a href="#workflow" className="hover:text-slate-900 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <button
              onClick={() => handleOpenPlanner()}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleOpenPlanner()}
              className="bg-slate-900 hover:bg-black text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Start your plan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 bg-white border-b border-slate-200 space-y-3 text-sm font-medium text-slate-700 shadow-lg">
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-slate-900"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-slate-900"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-slate-900"
            >
              Pricing
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPlanner();
                }}
                className="py-2 text-center text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPlanner();
                }}
                className="py-2 text-center bg-slate-900 text-white font-semibold rounded-lg hover:bg-black"
              >
                Start your plan
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (2-COLUMN REFERENCE REPLICATION) */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-slate-900 leading-[1.12]">
              <span className="relative inline-block mr-2 sm:mr-3">
                {/* Red Hand-Drawn Pencil Loop Around "Sketch" */}
                <svg
                  className="absolute -inset-x-3.5 sm:-inset-x-4 -inset-y-3 sm:-inset-y-3.5 w-[calc(100%+28px)] sm:w-[calc(100%+32px)] h-[calc(100%+24px)] sm:h-[calc(100%+28px)] pointer-events-none text-red-500 fill-none"
                  viewBox="0 0 160 64"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 18 36 C 14 18, 54 8, 108 9 C 148 10, 156 26, 146 42 C 132 58, 48 60, 18 48 C 6 42, 6 22, 34 14 C 68 6, 134 11, 150 25"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.94"
                  />
                </svg>
                Sketch
              </span>
              your space before you build it
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              SiteSketch transforms hand-drawn pencil schematics, floorplans, and raw site photos into photorealistic 3D interior renders, material takeoffs, and automated spec sheets.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleOpenPlanner("Hero Plan")}
                className="bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Start your plan
              </button>
              <a
                href="#workflow"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                See the builder
              </a>
            </div>
          </div>

          {/* Right Column: The Taped Blueprint Spec Card */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Top Masking Tape Piece */}
            <div
              className="absolute w-28 h-6 bg-[#EADECC]/90 border border-[#D5C5AF] -top-3 left-1/2 -translate-x-1/2 -rotate-1 rounded-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.06)] z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Spec Card Container */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7 relative">
              {/* Header Row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                  SCANDINAVIAN SUITE · ELEVATION
                </span>
                <span className="text-[11px] font-bold tracking-wider text-[#C0392B] uppercase">
                  RECOMMENDED
                </span>
              </div>

              {/* 4 Item Rows with Icons & Checkmarks */}
              <div className="divide-y divide-slate-100">
                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <LayoutGrid className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">Living &amp; Dining Layout (480 sq ft)</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <Layers className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">Herringbone White Oak &amp; Limewash Finish</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">Natural 5000K Ambient Daylighting</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">Auto-Generated BOM &amp; Fixture List</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              </div>

              {/* Footer: Handwritten Terracotta Red Note + Sketched Curved Arrow + Action Button */}
              <div className="pt-5 mt-2 flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <span className="font-caveat text-lg sm:text-xl text-[#C0392B] italic tracking-wide">
                    picked from your room type &amp; floor specs
                  </span>
                  {/* Sketched Hand-Drawn Red Doodle Arrow */}
                  <svg
                    className="w-9 h-6 text-[#C0392B] stroke-current fill-none -rotate-6 inline-block shrink-0 ml-1.5"
                    viewBox="0 0 48 32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M 4 24 C 18 24, 28 20, 40 8" />
                    <path d="M 32 6 L 42 7 L 41 17" />
                  </svg>
                </div>

                <button
                  onClick={() => handleOpenPlanner("Scandinavian Suite")}
                  className="shrink-0 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Try the planner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP LINEAR WORKFLOW (DESCRIBE, PLAN, BUILD, PUBLISH) */}
      <section id="workflow" className="py-16 sm:py-20 border-t border-slate-200/80 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              LINEAR SPATIAL PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              From rough sketch to client-ready spec sheet in 4 steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Describe & Sketch */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                01. DESCRIBE &amp; SKETCH
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload any rough input</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Snap a phone photo of hand-drawn floor sketches, architectural napkin notes, or rough CAD shells.
              </p>
            </div>

            {/* Step 2: Plan & Extrude */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                02. PLAN &amp; EXTRUDE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Neural vector geometry</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Spatial algorithms automatically extrude 2D lines into watertight 3D walls, ceiling spans, and door openings.
              </p>
            </div>

            {/* Step 3: Build & Materialize */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                03. BUILD &amp; MATERIALIZE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real architectural finishes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select real PBR materials (oak herringbone, Carrara marble, limewash) with physically calibrated 5000K daylighting.
              </p>
            </div>

            {/* Step 4: Publish & Takeoff */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                04. PUBLISH &amp; TAKEOFF
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated BOM &amp; 4K export</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Download itemized Bill of Materials with exact square footages, fixture schedules, and client web walkthroughs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Built specifically for modern architecture studios.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pencil-to-CAD Vectorizer</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Convert messy freehand pencil floorplans into millimeter-accurate vector DXF/DWG files and IFC-standard architectural geometry ready for Revit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Photoreal Daylighting Simulator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Calibrate accurate solar angles, southern exposures, and ambient Kelvin warmth (3000K to 6500K) with multi-bounce physical raytracing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Bill of Materials (BOM) Takeoffs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Auto-generate flooring square footages, drywall linear runs, paint coverage estimates, and itemized lighting fixture schedules straight from your model.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Framing-to-Finish Site Staging</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Snap photos of raw jobsite wood framing or bare concrete slabs. SiteSketch overlays drywall, trim, flooring, and millwork for immediate owner presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Predictable studio plans.
            </h2>
            <p className="text-sm text-slate-600">
              Scale your spatial pipeline without complex per-minute compute charges.
            </p>

            {/* Annual Toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  !isAnnual ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 ${
                  isAnnual ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500">Starter</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900">${isAnnual ? "23" : "29"}</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600">
                  Ideal for solo architects and independent interior planners.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>25 4K Photoreal renders / mo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Pencil &amp; Blueprint vectorizer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Standard PDF export</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Email customer support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Starter Plan")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Start Starter Plan
              </button>
            </div>

            {/* Pro Studio (Recommended) */}
            <div className="bg-white rounded-xl border-2 border-slate-900 p-6 sm:p-7 shadow-md relative flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Most Popular
              </span>

              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase text-slate-900">Pro Studio</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900">${isAnnual ? "63" : "79"}</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600">
                  For growing architecture firms and interior design studios.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-800 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>150 4K Photoreal renders / mo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Automated Bill of Materials (BOM)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Interactive 360° client web viewer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Framing-to-finish staging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Priority GPU compute queue</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Pro Studio Plan")}
                className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Start Pro Studio Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500">Enterprise</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900">${isAnnual ? "159" : "199"}</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-600">
                  Custom material libraries, API access, and dedicated team seats.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Unlimited 4K renders</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Custom PBR manufacturer catalogs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Revit BIM &amp; Webhook API sync</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Dedicated account architect &amp; SLA</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Enterprise Plan")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMAL FOOTER */}
      <footer className="border-t border-slate-200 py-10 bg-white text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-5 h-5 rounded border border-slate-900 flex items-center justify-center p-0.5 bg-white">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                <div className="bg-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
              </div>
            </div>
            <span className="font-semibold text-slate-900">SiteSketch Technologies</span>
            <span>·</span>
            <span>© 2026 All rights reserved</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#workflow" className="hover:text-slate-800 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-slate-800 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-800 transition-colors">
              Pricing
            </a>
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      {/* 7. EXACT COOKIE BANNER REPLICATION (MATCHING SCREENSHOT) */}
      {cookieBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-3 px-4 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              <strong className="text-slate-900 font-semibold">We use one cookie.</strong> It keeps you signed in, and it cannot be read by scripts. We use no analytics and no advertising, so declining changes nothing about how this site behaves — your answer is recorded either way.
            </p>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setCookieBannerVisible(false)}
                className="bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                Accept cookies
              </button>
              <button
                onClick={() => setCookieBannerVisible(false)}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                Decline
              </button>
              <Link
                href="/privacy"
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                or read the details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 8. INTERACTIVE PLANNER MODAL */}
      {plannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-5">
            <button
              onClick={() => setPlannerModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!plannerSubmitted ? (
              <>
                <div>
                  <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                    INTERACTIVE SPATIAL PLANNER
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                    Configure your space preview
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Select your architectural parameters to test the automated takeoff engine.
                  </p>
                </div>

                {/* Room Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Room Type &amp; Footprint</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roomOptions.map((room) => (
                      <button
                        key={room.name}
                        onClick={() => setSelectedRoom(room.name)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          selectedRoom === room.name
                            ? "border-slate-900 bg-slate-50 font-semibold text-slate-900"
                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                        }`}
                      >
                        <div className="truncate">{room.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{room.sqft} sq ft · {room.height}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Architectural Material Finish</label>
                  <div className="grid grid-cols-2 gap-2">
                    {styleOptions.map((style) => (
                      <button
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          selectedStyle === style.name
                            ? "border-slate-900 bg-slate-50 font-semibold text-slate-900"
                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                        }`}
                      >
                        <div className="truncate">{style.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{style.kelvin}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Takeoff Card Preview */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-500 text-[10px]">
                    <span>AUTOMATED TAKEOFF ESTIMATE</span>
                    <span className="text-emerald-700 font-bold">READY</span>
                  </div>
                  <div className="flex justify-between text-slate-800">
                    <span>Flooring Material:</span>
                    <span className="font-semibold">{currentStyle.wood} ({currentRoom.sqft} sq ft)</span>
                  </div>
                  <div className="flex justify-between text-slate-800">
                    <span>Wall Treatment:</span>
                    <span className="font-semibold">{currentStyle.wall} (840 sq ft)</span>
                  </div>
                  <div className="flex justify-between text-slate-800">
                    <span>Daylighting:</span>
                    <span className="font-semibold">{currentStyle.kelvin} Raytracing</span>
                  </div>
                </div>

                {/* Studio Email Input */}
                <form onSubmit={handlePlannerSubmit} className="space-y-3 pt-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Studio Work Email for Instant Canvas Access
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="alex@studio-arch.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-grow px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
                    >
                      Launch Canvas
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Studio Space Canvas Initialized!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    We&apos;ve provisioned your workspace with <strong>{selectedRoom}</strong> in <strong>{selectedStyle}</strong>. A magic link has been sent to <strong>{emailInput}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 max-w-xs mx-auto">
                  SESSION_TOKEN: SKETCH-ALPHA-8924
                </div>
                <button
                  onClick={() => setPlannerModalOpen(false)}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
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
