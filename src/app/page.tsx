"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Menu,
  X,
  FileSpreadsheet,
  Sun,
  PenTool,
  HardHat,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro Firm");
  const [emailInput, setEmailInput] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const showcaseStages = [
    {
      id: 0,
      title: "2D Pencil Line-Art",
      subtitle: "Pencil elevation & floorplan sketch",
      badge: "Stage 01 · Input",
      details: "Raw scan of tracing paper schematic. Dimensions extracted: 28'-6\" x 16'-8\" with 10'-6\" ceiling height.",
      stats: "6 Walls · 2 Door Arcs · 1 Window",
      graphic: (
        <div className="h-44 sm:h-52 rounded-lg bg-[#070B12] border border-slate-800 p-4 font-mono text-[11px] flex flex-col justify-between select-none">
          <div className="flex justify-between items-center text-slate-500 text-[10px]">
            <span>SCAN_INPUT_402.JPG</span>
            <span className="text-cyan-400">OCR ACCURACY: 99.4%</span>
          </div>
          <div className="border border-dashed border-slate-700/80 p-3 rounded bg-slate-900/40 space-y-1">
            <div className="flex justify-between text-slate-200 font-semibold">
              <span>[LIVING_AREA_312_SQFT]</span>
              <span className="text-amber-400">HERRINGBONE_OAK</span>
            </div>
            <p className="text-[10px] text-slate-400">Outer boundaries recognized. 90° inward door swing detected.</p>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>Wall Thickness: 6&quot; Exterior</span>
            <span className="text-emerald-400">Status: Vectorized</span>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "AI Geometry Extrusion",
      subtitle: "Auto-detected walls & door swings",
      badge: "Stage 02 · Analysis",
      details: "Boundary extrusion algorithm converts 2D lines into watertight 3D volumes ready for Revit/AutoCAD export.",
      stats: "312 sq ft volume · 14.5 lin ft glazing",
      graphic: (
        <div className="h-44 sm:h-52 rounded-lg bg-[#070B12] border border-slate-800 p-4 font-mono text-[11px] flex flex-col justify-between select-none">
          <div className="flex justify-between items-center text-slate-500 text-[10px]">
            <span>EXTRUSION_ENGINE_V2</span>
            <span className="text-cyan-400">LATENCY: 0.8s</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Structural Assembly</span>
              <span className="text-slate-200 font-bold">6 Double Walls</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Clear Ceiling Span</span>
              <span className="text-slate-200 font-bold">10&apos;-6&quot; Aff.</span>
            </div>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>IFC 4.3 BIM Parameter Schema</span>
            <span className="text-cyan-400">Mapped</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "4K Photoreal Interior",
      subtitle: "Oak herringbone, natural 5000K daylight",
      badge: "Stage 03 · Synthesis",
      details: "Physical multi-bounce raytracing calibrates accurate sun angles, diffuse window falloff, and realistic PBR material sheen.",
      stats: "5000K Daylight · PBR European Oak",
      graphic: (
        <div className="h-44 sm:h-52 rounded-lg bg-gradient-to-br from-[#121A29] via-[#0E1522] to-[#080D16] border border-slate-800 p-4 flex flex-col justify-between select-none">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-slate-400">RAYTRACED 4K UHD</span>
            <span className="text-amber-400 font-bold">5000K NATURAL DAYLIGHT</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 backdrop-blur-sm">
            <div className="text-xs font-bold text-white">Scandinavian Minimalist Suite</div>
            <p className="text-[10px] text-slate-400 font-mono">Bouclé curved sectional, fluted oak millwork, honed Carrara marble plinth.</p>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Diffuse Shadows: Physically Modeled</span>
            <span className="text-emerald-400">128 SPP</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Auto BOM Takeoff",
      subtitle: "Flooring: 420 sq ft | Paint: 850 sq ft | 6 Fixtures",
      badge: "Stage 04 · Spec Handoff",
      details: "Instant trade-ready schedule detailing material square footages, linear trims, and verified procurement estimates.",
      stats: "Total Project Takeoff: $12,606.00",
      graphic: (
        <div className="h-44 sm:h-52 rounded-lg bg-[#070B12] border border-slate-800 p-3.5 font-mono text-[10px] flex flex-col justify-between select-none">
          <div className="flex justify-between text-slate-400 pb-1 border-b border-slate-800">
            <span>SCHEDULE LINE ITEM</span>
            <span>QTY</span>
            <span>EST. COST</span>
          </div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span className="truncate pr-2">01. European White Oak Hardwood</span>
              <span className="text-slate-400">420 sq ft</span>
              <span className="text-amber-400">$6,090</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate pr-2">02. Fluted Wall Acoustic Paneling</span>
              <span className="text-slate-400">180 sq ft</span>
              <span className="text-amber-400">$2,952</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate pr-2">03. Monolithic Marble Plinth Table</span>
              <span className="text-slate-400">1 Unit</span>
              <span className="text-amber-400">$1,280</span>
            </div>
          </div>
          <div className="pt-1.5 border-t border-slate-800 flex justify-between font-bold text-cyan-400">
            <span>Total Estimated Materials:</span>
            <span>$10,322.00</span>
          </div>
        </div>
      )
    }
  ];

  const handleOpenModal = (plan = "Pro Firm") => {
    setSelectedPlan(plan);
    setModalSuccess(false);
    setModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setModalSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-200 antialiased font-sans selection:bg-cyan-500/25 selection:text-cyan-300">
      {/* 1. MINIMAL HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#090D14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
              S
            </div>
            <span className="text-base font-bold text-white tracking-tight">SiteSketch</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-slate-400">
            <a href="#spatial-engine" className="hover:text-white transition-colors">
              Spatial Engine
            </a>
            <a href="#bom" className="hover:text-white transition-colors">
              BOM &amp; Takeoffs
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleOpenModal("Starter")}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => handleOpenModal("Pro Firm")}
              className="px-3.5 py-1.5 rounded-full bg-white text-slate-950 font-semibold text-xs hover:bg-slate-200 transition-colors shadow-sm cursor-pointer"
            >
              Start Free Studio Beta
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-[#090D14] border-b border-slate-800 space-y-3 text-xs">
            <a
              href="#spatial-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-slate-300 hover:text-white"
            >
              Spatial Engine
            </a>
            <a
              href="#bom"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-slate-300 hover:text-white"
            >
              BOM &amp; Takeoffs
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-slate-300 hover:text-white"
            >
              Workflow
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-slate-300 hover:text-white"
            >
              Pricing
            </a>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenModal("Starter");
                }}
                className="py-2 text-center text-slate-300 border border-slate-800 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenModal("Pro Firm");
                }}
                className="py-2 text-center bg-white text-slate-950 font-semibold rounded-lg"
              >
                Start Free Studio Beta
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="spatial-engine" className="pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SiteSketch Spatial Engine v2.0 Beta</span>
          </div>

          {/* Headline (H1) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Sketch your space before you build it.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            SiteSketch transforms hand-drawn pencil floorplans and raw site photos into photorealistic 3D interior renders, material takeoffs, and automated spec sheets.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleOpenModal("Pro Firm")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Start your plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#showcase"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>See the spatial builder</span>
            </a>
          </div>
        </div>

        {/* Interactive / Visual Showcase Card */}
        <div id="showcase" className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
          <div className="rounded-xl border border-slate-800 bg-[#0C111C] p-5 sm:p-7 shadow-xl space-y-6">
            {/* Top Tag Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono font-medium text-slate-300">
                  Blueprint · Scandinavian Suite Renovation
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Studio Spec ID #402-N
              </span>
            </div>

            {/* Split View / Step Tab Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {showcaseStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id as 0 | 1 | 2 | 3)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    activeStage === stage.id
                      ? "bg-slate-800 border-cyan-500/60 text-white shadow-sm"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400">{stage.badge}</div>
                  <div className="text-xs font-semibold truncate mt-0.5">{stage.title}</div>
                </button>
              ))}
            </div>

            {/* Active Stage Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-1">
              <div className="md:col-span-5 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
                  {showcaseStages[activeStage].badge}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {showcaseStages[activeStage].title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {showcaseStages[activeStage].details}
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-300 border-t border-slate-800">
                  Key Metric: <span className="text-amber-400">{showcaseStages[activeStage].stats}</span>
                </div>
              </div>

              <div className="md:col-span-7">
                {showcaseStages[activeStage].graphic}
              </div>
            </div>

            {/* Bottom Planner Link */}
            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-500">
                picked from your room type &amp; architectural style
              </span>
              <button
                onClick={() => handleOpenModal("Pro Firm")}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Try the planner</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (CLEAN 4-STEP LINEAR FLOW) */}
      <section id="workflow" className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#070B11]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Production Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From draft to spec in four steps.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A frictionless linear pipeline built for architectural practices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="w-8 h-8 rounded bg-slate-800 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-white">01. Sketch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Snap and upload any hand-drawn pencil plan, blueprint, or empty room photo.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="w-8 h-8 rounded bg-slate-800 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-white">02. Extrude</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Neural spatial detection automatically aligns walls, ceiling heights, and door rough openings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="w-8 h-8 rounded bg-slate-800 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-white">03. Materialize</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Swap real materials (walnut vs. oak, quartz vs. granite) and adjust natural sun lighting.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="w-8 h-8 rounded bg-slate-800 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-white">04. Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly download 4K spatial walkthroughs, client web links, and itemized Bill-of-Materials (BOM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOCUSED CORE FEATURES (4 HIGH-SIGNAL CARDS) */}
      <section id="bom" className="py-20 sm:py-24 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Everything you need — nothing you don&apos;t.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              High-signal tools replacing repetitive manual drafting cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded bg-slate-800 text-cyan-400">
                  <PenTool className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">VECTOR CAD</span>
              </div>
              <h3 className="text-base font-bold text-white">Pencil-to-CAD Vectorizer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Converts hand-drawn sketches into scaled, editable vector layouts compatible with AutoCAD (.dwg) and Revit (.rvt).
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded bg-slate-800 text-amber-400">
                  <Sun className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">RAYTRACING</span>
              </div>
              <h3 className="text-base font-bold text-white">Photoreal Daylighting Simulator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accurately projects daylight orientation and ambient interior lighting calibrated to physical Kelvin temperatures.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded bg-slate-800 text-cyan-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">TAKEOFFS</span>
              </div>
              <h3 className="text-base font-bold text-white">Instant Bill-of-Materials (BOM)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates itemized square-footage takeoffs and trade-ready fixture lists with one-click export to CSV and PDF schedules.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded bg-slate-800 text-emerald-400">
                  <HardHat className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">JOB SITE</span>
              </div>
              <h3 className="text-base font-bold text-white">Framing-to-Finish Site Staging</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overlay finished 3D interior designs directly over photos of raw studs and drywall for client on-site approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELF-SERVE SAAS PRICING BRACKET (CLEAN & COMPACT) */}
      <section id="pricing" className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#070B11]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Simple, transparent subscriptions.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                14-day free trial on all plans. Cancel anytime.
              </p>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 self-start sm:self-auto text-xs">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  !isAnnual ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  isAnnual ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-mono">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Starter</h3>
                  <p className="text-xs text-slate-400 mt-1">Solo draftsmen &amp; designers.</p>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-3xl font-bold text-white">${isAnnual ? 24 : 29}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>25 Spatial Renders / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>2D Vectorization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Standard 1080p Export</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenModal("Starter")}
                className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Start Free Plan
              </button>
            </div>

            {/* Pro Firm (Highlighted) */}
            <div className="p-6 rounded-xl border-2 border-cyan-400/80 bg-[#0E1524] flex flex-col justify-between space-y-6 relative shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">Pro Firm</h3>
                    <p className="text-xs text-slate-400 mt-1">Boutique studios &amp; remodelers.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    POPULAR
                  </span>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-3xl font-bold text-white">${isAnnual ? 64 : 79}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white">150 4K Ultra-HD Renders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Automated BOM Exports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Framing Overlay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Client Web Links</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenModal("Pro Firm")}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Try the Canvas
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0C111C] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Enterprise</h3>
                  <p className="text-xs text-slate-400 mt-1">Architectural practices.</p>
                </div>
                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-3xl font-bold text-white">${isAnnual ? 159 : 199}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Unlimited Renders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Custom Materials Library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Webhooks &amp; API Pipeline</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenModal("Enterprise")}
                className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                View Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMAL FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#090D14] py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-white font-bold">
              <div className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-mono text-[10px]">
                S
              </div>
              <span>SiteSketch</span>
            </div>

            <nav className="flex flex-wrap items-center gap-6 text-slate-400">
              <a href="#spatial-engine" className="hover:text-white transition-colors">
                Spatial Engine
              </a>
              <button
                onClick={() => handleOpenModal("Changelog")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Changelog
              </button>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={() => handleOpenModal("Starter")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
            <p>© 2026 SiteSketch Technologies. All rights reserved.</p>
            <span>Autonomous Spatial Architecture Platform</span>
          </div>
        </div>
      </footer>

      {/* Self-Serve Studio Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-xl bg-[#0C111C] border border-slate-800 p-6 space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!modalSuccess ? (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Start Studio Beta</h3>
                  <p className="text-xs text-slate-400">
                    Access {selectedPlan} workspace instantly. No credit card required.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    WORK EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="architect@firm.design"
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Activate Free Trial
                </button>
              </form>
            ) : (
              <div className="py-4 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Workspace Provisioned</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Authentication token sent to {emailInput}.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
