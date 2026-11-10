"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  CheckCircle2,
  X,
  Menu
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(true);

  // Interactive Planner Modal State
  const [plannerModalOpen, setPlannerModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Living and dining layout");
  const [selectedStyle, setSelectedStyle] = useState("Scandinavian minimalist");
  const [emailInput, setEmailInput] = useState("");
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  const roomOptions = [
    { name: "Living and dining layout", code: "RM-480", sqft: 480, height: "3.2m", openings: "2 doors, 3 windows" },
    { name: "Master suite", code: "RM-620", sqft: 620, height: "3.4m", openings: "1 door, 4 windows" },
    { name: "Open kitchen", code: "RM-340", sqft: 340, height: "2.9m", openings: "2 openings, 2 windows" },
    { name: "Studio office", code: "RM-510", sqft: 510, height: "3.6m", openings: "1 pivot door, glazed wall" },
  ];

  const styleOptions = [
    { name: "Scandinavian minimalist", code: "MAT-01", wood: "White oak herringbone", wall: "Warm limewash", kelvin: "5000K natural" },
    { name: "Japandi warm", code: "MAT-02", wood: "Hinoki cedar planks", wall: "Clay plaster", kelvin: "4200K soft diffuse" },
    { name: "Bauhaus industrial", code: "MAT-03", wood: "Polished concrete", wall: "Brushed steel and brick", kelvin: "5500K studio day" },
    { name: "Modern atelier", code: "MAT-04", wood: "Reclaimed French oak", wall: "Chalk matte finish", kelvin: "3800K golden glow" },
  ];

  const currentRoom = roomOptions.find((r) => r.name === selectedRoom) || roomOptions[0];
  const currentStyle = styleOptions.find((s) => s.name === selectedStyle) || styleOptions[0];

  const handleOpenPlanner = (initialPreset?: string) => {
    if (initialPreset === "Scandinavian Suite") {
      setSelectedRoom("Living and dining layout");
      setSelectedStyle("Scandinavian minimalist");
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
    <div className="min-h-screen flex flex-col justify-between" style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}>
      {/* 1. SLAB NAVIGATION */}
      <header className="sticky top-0 z-40 border-b-2" style={{ background: "var(--color-paper)", borderColor: "var(--color-ink)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              SiteSketch
            </span>
            <span
              className="text-xs px-1.5 py-0.5 border"
              style={{
                fontFamily: "var(--font-outlier)",
                borderColor: "var(--color-rule)",
                color: "var(--color-muted)"
              }}
            >
              v2.4
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--color-ink-2)" }}>
            <a href="#pipeline" className="hover:text-black transition-colors">
              Pipeline
            </a>
            <a href="#capabilities" className="hover:text-black transition-colors">
              Capabilities
            </a>
            <a href="#materials" className="hover:text-black transition-colors">
              Materials
            </a>
            <a href="#pricing" className="hover:text-black transition-colors">
              Pricing
            </a>
            <button
              onClick={() => handleOpenPlanner()}
              className="hover:text-black transition-colors cursor-pointer text-left"
            >
              Sign in
            </button>
          </nav>

          {/* Primary Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleOpenPlanner()}
              className="btn-primary"
            >
              Launch studio canvas
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-inherit"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 py-5 border-t-2 space-y-4 text-sm font-medium"
            style={{ background: "var(--color-plate)", borderColor: "var(--color-ink)" }}
          >
            <a
              href="#pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:underline"
            >
              Pipeline
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:underline"
            >
              Capabilities
            </a>
            <a
              href="#materials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:underline"
            >
              Materials
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:underline"
            >
              Pricing
            </a>
            <div className="pt-3 border-t flex flex-col gap-2.5" style={{ borderColor: "var(--color-rule)" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPlanner();
                }}
                className="btn-secondary w-full"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPlanner();
                }}
                className="btn-primary w-full"
              >
                Launch studio canvas
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO: CORRIDOR POSTURE */}
      <section className="py-14 sm:py-20 lg:py-24 border-b-2" style={{ borderColor: "var(--color-rule)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Seven-word headline, one sentence, actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1
              className="font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                lineHeight: "1.02",
                maxWidth: "16ch"
              }}
            >
              Sketch before you build.
            </h1>

            <p
              className="lead"
              style={{
                fontSize: "var(--text-lead)",
                lineHeight: "1.45",
                color: "var(--color-ink-2)",
                maxWidth: "46ch"
              }}
            >
              Turn rough pencil schematics into photorealistic interior renders and automated material takeoffs.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleOpenPlanner("Hero Plan")}
                className="btn-primary"
              >
                Start studio plan
              </button>
              <a
                href="#sample-spec"
                className="btn-secondary"
              >
                Inspect sample takeoff
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Specimen Plate */}
          <div id="sample-spec" className="lg:col-span-6">
            <div
              className="p-6 sm:p-8 relative"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              {/* Plate Header */}
              <div
                className="flex items-center justify-between pb-4 border-b-2"
                style={{ borderColor: "var(--color-ink)" }}
              >
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
                    Specification plate
                  </span>
                  <div className="font-bold text-base sm:text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    Scandinavian suite renovation
                  </div>
                </div>
                <div
                  className="px-2 py-1 text-xs border"
                  style={{
                    fontFamily: "var(--font-outlier)",
                    borderColor: "var(--color-rule)",
                    color: "var(--color-accent)"
                  }}
                >
                  ST-0480
                </div>
              </div>

              {/* Specification Table Rows */}
              <div className="divide-y" style={{ borderColor: "var(--color-rule)" }}>
                <div className="py-3.5 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--color-muted)" }}>Floorplan envelope</span>
                  <span className="font-medium">
                    Living and dining area (<span style={{ fontFamily: "var(--font-outlier)" }}>480 sq ft</span>)
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--color-muted)" }}>Structural clear span</span>
                  <span className="font-medium" style={{ fontFamily: "var(--font-outlier)" }}>
                    3.2m ceiling span
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--color-muted)" }}>Primary finish</span>
                  <span className="font-medium">European white oak herringbone</span>
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--color-muted)" }}>Solar exposure</span>
                  <span className="font-medium">
                    South-facing natural (<span style={{ fontFamily: "var(--font-outlier)" }}>5000K</span>)
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--color-muted)" }}>Automated takeoff</span>
                  <span className="font-medium" style={{ color: "var(--color-accent)" }}>
                    BOM takeoff ready
                  </span>
                </div>
              </div>

              {/* Plate Footer */}
              <div
                className="pt-5 mt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{ borderColor: "var(--color-rule)" }}
              >
                <div className="text-xs" style={{ color: "var(--color-muted)" }}>
                  Derived from raw scan in <span style={{ fontFamily: "var(--font-outlier)" }}>0.84s</span>
                </div>
                <button
                  onClick={() => handleOpenPlanner("Scandinavian Suite")}
                  className="btn-secondary whitespace-nowrap"
                  style={{ minHeight: "38px", padding: "0 var(--space-md)" }}
                >
                  Configure space
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW PIPELINE */}
      <section id="pipeline" className="py-16 sm:py-24 border-b-2" style={{ borderColor: "var(--color-rule)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-section)" }}
            >
              The four-stage spatial pipeline.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "var(--color-ink-2)" }}>
              From initial pencil layout to automated schedules and BIM export.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div
              className="p-6 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div
                className="text-xs"
                style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}
              >
                01. INPUT
              </div>
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                Describe and scan
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Upload tracing paper schematics, CAD floorplans, or raw jobsite framing photos.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="p-6 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div
                className="text-xs"
                style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}
              >
                02. GEOMETRY
              </div>
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                Neural vectorization
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Spatial engines extrude watertight 3D walls, ceiling spans, and door openings.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="p-6 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div
                className="text-xs"
                style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}
              >
                03. MATERIAL
              </div>
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                Materialize finishes
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Assign calibrated physical timber, honed stone, and solar angles with raytracing.
              </p>
            </div>

            {/* Step 4 */}
            <div
              className="p-6 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div
                className="text-xs"
                style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}
              >
                04. TAKEOFF
              </div>
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                Export schedules
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Download itemized Bill of Materials schedules with square footages and 4K renders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE CAPABILITIES (SPECIFICATION LEDGER) */}
      <section id="capabilities" className="py-16 sm:py-24 border-b-2" style={{ borderColor: "var(--color-rule)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-section)" }}
            >
              Built for architecture studios.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "var(--color-ink-2)" }}>
              Engineered specifically for architectural production workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capability 1 */}
            <div
              className="p-8 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="text-xs" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                FEATURE 01 · VECTOR
              </div>
              <h3 className="font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                Pencil-to-CAD vectorizer
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Converts hand-drawn schematics into millimeter-accurate vector DXF and DWG geometry. Supports IFC schemas ready for Revit and Archicad import.
              </p>
            </div>

            {/* Capability 2 */}
            <div
              className="p-8 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="text-xs" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                FEATURE 02 · LIGHTING
              </div>
              <h3 className="font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                Photoreal daylighting simulator
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Calibrates physical solar angles, seasonal azimuths, and Kelvin warmth from 3000K to 6500K with multi-bounce physical raytracing.
              </p>
            </div>

            {/* Capability 3 */}
            <div
              className="p-8 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="text-xs" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                FEATURE 03 · TAKEOFFS
              </div>
              <h3 className="font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                Automated bill of materials
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Calculates real-time flooring areas, drywall linear footage, plaster coverage, and fixture schedules generated directly from the visual model.
              </p>
            </div>

            {/* Capability 4 */}
            <div
              className="p-8 space-y-3"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="text-xs" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                FEATURE 04 · STAGING
              </div>
              <h3 className="font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                Framing-to-finish site staging
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Upload photos of raw timber studs or concrete slabs. SiteSketch overlays drywall, trim, flooring, and lighting fixtures for immediate client approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MATERIAL SPECIMENS (AUTHENTIC PHOTOGRAPHY) */}
      <section id="materials" className="py-16 sm:py-24 border-b-2" style={{ borderColor: "var(--color-rule)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-section)" }}
            >
              Curated material catalogs.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "var(--color-ink-2)" }}>
              Physical materials photographed flat-on for accurate architectural surface rendering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Material 1 */}
            <div
              className="overflow-hidden"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="relative aspect-[16/10] w-full border-b-2" style={{ borderColor: "var(--color-ink)" }}>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Marble_Kymi_Euboea_Greece.jpg/1280px-Marble_Kymi_Euboea_Greece.jpg"
                  alt="Split face of pale grey and white marble with layered texture"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                    MARBLE SPECIMEN
                  </span>
                  <span style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                    ST-094
                  </span>
                </div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  Honed red marble quarry veneer
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                  Deep natural iron veining with calibrated physical roughness and diffuse scattering.
                </p>
              </div>
            </div>

            {/* Material 2 */}
            <div
              className="overflow-hidden"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="relative aspect-[16/10] w-full border-b-2" style={{ borderColor: "var(--color-ink)" }}>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Interior_of_Camille_Pissarro_s_studio_at_%C3%89ragny-sur-Epte_-_2026.jpg/1280px-Interior_of_Camille_Pissarro_s_studio_at_%C3%89ragny-sur-Epte_-_2026.jpg"
                  alt="Empty sunlit artist studio with timber beam and wooden floor"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                    TIMBER SPECIMEN
                  </span>
                  <span style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                    WD-412
                  </span>
                </div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  European white oak boards
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                  Quarter-sawn wide planks with satin polyurethane reflectance and natural daylight warmth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section id="pricing" className="py-16 sm:py-24 border-b-2" style={{ borderColor: "var(--color-rule)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-xl space-y-4">
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-section)" }}
            >
              Predictable studio plans.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "var(--color-ink-2)" }}>
              Transparent pricing with allocated 4K raytracing passes.
            </p>

            {/* Toggle */}
            <div
              className="inline-flex items-center p-1 border"
              style={{ borderColor: "var(--color-ink)", background: "var(--color-plate)" }}
            >
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                  !isAnnual ? "text-white" : "hover:text-black"
                }`}
                style={{
                  background: !isAnnual ? "var(--color-ink)" : "transparent",
                  color: !isAnnual ? "var(--color-paper)" : "var(--color-ink)"
                }}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  isAnnual ? "text-white" : "hover:text-black"
                }`}
                style={{
                  background: isAnnual ? "var(--color-ink)" : "transparent",
                  color: isAnnual ? "var(--color-paper)" : "var(--color-ink)"
                }}
              >
                Annual (save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div
              className="p-8 flex flex-col justify-between"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="space-y-4">
                <div className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
                  Starter
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    ${isAnnual ? "23" : "29"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>/ month</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                  For solo architects and independent interior planners.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>25 4K photoreal renders per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>2D pencil and blueprint vectorizer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Standard PDF sheet export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Email customer support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Starter Plan")}
                className="btn-secondary w-full mt-8"
              >
                Start starter plan
              </button>
            </div>

            {/* Pro Studio (Recommended) */}
            <div
              className="p-8 flex flex-col justify-between relative"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>
                    Pro Studio (Recommended)
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 border"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent)"
                    }}
                  >
                    POPULAR
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    ${isAnnual ? "63" : "79"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>/ month</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                  For growing architecture firms and design studios.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span>150 4K photoreal renders per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span>Automated bill of materials schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span>Interactive 360 degree client web viewer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span>Framing-to-finish site staging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <span>Priority GPU compute queue</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Pro Studio Plan")}
                className="btn-primary w-full mt-8"
              >
                Start Pro Studio trial
              </button>
            </div>

            {/* Enterprise */}
            <div
              className="p-8 flex flex-col justify-between"
              style={{
                background: "var(--color-plate)",
                border: "var(--rule-bar) solid var(--color-ink)",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="space-y-4">
                <div className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
                  Enterprise
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    ${isAnnual ? "159" : "199"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>/ month</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                  Custom material libraries, API access, and dedicated seats.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Unlimited 4K photoreal renders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Custom PBR manufacturer catalogs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Revit BIM and webhook API sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-ink)" }} />
                    <span>Dedicated account architect support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenPlanner("Enterprise Plan")}
                className="btn-secondary w-full mt-8"
              >
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COLOPHON & FOOTER */}
      <footer className="py-12 border-t-2" style={{ borderColor: "var(--color-ink)", background: "var(--color-paper)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>
                SiteSketch Technologies
              </div>
              <p style={{ color: "var(--color-muted)" }}>
                Cloud generative architectural engine and automated bill of materials takeoff platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-medium">
              <a href="#pipeline" className="hover:underline">Pipeline</a>
              <a href="#capabilities" className="hover:underline">Capabilities</a>
              <a href="#materials" className="hover:underline">Materials</a>
              <a href="#pricing" className="hover:underline">Pricing</a>
              <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              <Link href="/terms" className="hover:underline">Terms of service</Link>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderColor: "var(--color-rule)", color: "var(--color-muted)" }}
          >
            <p data-credits>
              Photographs: <a href="https://commons.wikimedia.org/wiki/File:Marble_Kymi_Euboea_Greece.jpg" className="underline" target="_blank" rel="noreferrer">Jebulon</a> (CC0), <a href="https://commons.wikimedia.org/wiki/File:Interior_of_Camille_Pissarro_s_studio_at_%C3%89ragny-sur-Epte_-_2026.jpg" className="underline" target="_blank" rel="noreferrer">AlexDS05</a> (CC0).
            </p>
            <div>
              2026 SiteSketch Technologies. Built with Hallmark design system.
            </div>
          </div>
        </div>
      </footer>

      {/* 8. FLOOR-COMPLIANT COOKIE NOTICE */}
      {cookieBannerVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-2 shadow-lg"
          style={{ background: "var(--color-plate)", borderColor: "var(--color-ink)" }}
        >
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm">
            <p className="leading-snug" style={{ color: "var(--color-ink-2)" }}>
              <strong style={{ color: "var(--color-ink)" }}>We use one cookie to keep you signed in.</strong> It cannot be read by scripts. We use no analytics and no advertising, so declining changes nothing about how this site behaves.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setCookieBannerVisible(false)}
                className="btn-primary"
                style={{ minHeight: "36px", padding: "0 var(--space-md)", fontSize: "var(--text-xs)" }}
              >
                Accept cookie
              </button>
              <button
                onClick={() => setCookieBannerVisible(false)}
                className="btn-secondary"
                style={{ minHeight: "36px", padding: "0 var(--space-md)", fontSize: "var(--text-xs)" }}
              >
                Decline
              </button>
              <Link
                href="/privacy"
                className="underline underline-offset-2"
                style={{ color: "var(--color-muted)" }}
              >
                Read details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 9. INTERACTIVE PLANNER MODAL */}
      {plannerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "color-mix(in oklch, var(--color-ink) 50%, transparent)" }}
        >
          <div
            className="max-w-lg w-full p-6 sm:p-8 relative space-y-6"
            style={{
              background: "var(--color-plate)",
              border: "var(--rule-bar) solid var(--color-ink)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <button
              onClick={() => setPlannerModalOpen(false)}
              className="absolute top-5 right-5 p-1 hover:opacity-70 transition-opacity"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!plannerSubmitted ? (
              <>
                <div className="space-y-1">
                  <div className="text-xs" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                    SPATIAL STUDIO CONFIGURATION
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    Select room and material parameters
                  </h3>
                  <p className="text-xs" style={{ color: "var(--color-ink-2)" }}>
                    Configure the architectural volume to calculate real-time bill of materials takeoffs.
                  </p>
                </div>

                {/* Room Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold block">Room footprint</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {roomOptions.map((room) => (
                      <button
                        key={room.name}
                        onClick={() => setSelectedRoom(room.name)}
                        className="text-left p-3 border text-xs cursor-pointer transition-colors"
                        style={{
                          background: selectedRoom === room.name ? "var(--color-paper)" : "var(--color-plate)",
                          borderColor: selectedRoom === room.name ? "var(--color-ink)" : "var(--color-rule)",
                          borderWidth: selectedRoom === room.name ? "var(--rule-bar)" : "var(--rule-hair)"
                        }}
                      >
                        <div className="font-medium truncate">{room.name}</div>
                        <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                          {room.sqft} sq ft · {room.height}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Finish Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold block">Material schedule</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {styleOptions.map((style) => (
                      <button
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        className="text-left p-3 border text-xs cursor-pointer transition-colors"
                        style={{
                          background: selectedStyle === style.name ? "var(--color-paper)" : "var(--color-plate)",
                          borderColor: selectedStyle === style.name ? "var(--color-ink)" : "var(--color-rule)",
                          borderWidth: selectedStyle === style.name ? "var(--rule-bar)" : "var(--rule-hair)"
                        }}
                      >
                        <div className="font-medium truncate">{style.name}</div>
                        <div className="text-xs mt-0.5" style={{ fontFamily: "var(--font-outlier)", color: "var(--color-muted)" }}>
                          {style.kelvin}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Takeoff Spec */}
                <div
                  className="p-4 border text-xs space-y-2"
                  style={{
                    background: "var(--color-paper-2)",
                    borderColor: "var(--color-rule)"
                  }}
                >
                  <div className="flex justify-between items-center text-xs" style={{ color: "var(--color-muted)" }}>
                    <span style={{ fontFamily: "var(--font-outlier)" }}>ESTIMATED TAKEOFF SCHEDULE</span>
                    <span className="font-bold" style={{ color: "var(--color-accent)" }}>VALIDATED</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-muted)" }}>Flooring:</span>
                    <span className="font-medium">{currentStyle.wood} ({currentRoom.sqft} sq ft)</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-muted)" }}>Wall surface:</span>
                    <span className="font-medium">{currentStyle.wall} (840 sq ft)</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-muted)" }}>Lighting pass:</span>
                    <span className="font-medium">{currentStyle.kelvin} raytrace</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handlePlannerSubmit} className="space-y-3 pt-2">
                  <label htmlFor="studio-email" className="text-xs font-semibold block">
                    Studio work email for instant access
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="studio-email"
                      type="email"
                      required
                      placeholder="architect@atelier.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-grow px-3 py-2 text-xs border bg-white focus:outline-none"
                      style={{
                        borderColor: "var(--color-ink)",
                        color: "var(--color-ink)"
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ minHeight: "38px" }}
                    >
                      Launch canvas
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto border-2"
                  style={{ borderColor: "var(--color-ink)", background: "var(--color-paper)" }}
                >
                  <CheckCircle2 className="w-6 h-6" style={{ color: "var(--color-accent)" }} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    Studio workspace provisioned
                  </h4>
                  <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--color-ink-2)" }}>
                    We have configured your workspace for <strong>{selectedRoom}</strong> with <strong>{selectedStyle}</strong>. A verification token has been sent to <strong>{emailInput}</strong>.
                  </p>
                </div>
                <div
                  className="p-3 border text-xs max-w-xs mx-auto"
                  style={{
                    fontFamily: "var(--font-outlier)",
                    borderColor: "var(--color-rule)",
                    background: "var(--color-paper)"
                  }}
                >
                  TOKEN: SKETCH-ALPHA-8924
                </div>
                <button
                  onClick={() => setPlannerModalOpen(false)}
                  className="btn-primary"
                >
                  Enter studio canvas
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
