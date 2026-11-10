"use client";

import React, { useState, useEffect } from "react";
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
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Download,
  CreditCard,
  ArrowUp,
  AlertCircle,
  RefreshCw,
  UploadCloud,
  FileText,
  ArrowRight,
  Sparkles
} from "lucide-react";
import StudioCanvas from "@/components/StudioCanvas";
import ComparisonSlider from "@/components/ComparisonSlider";
import {
  PencilFloorplanSketchSVG,
  CadFloorplanVectorSVG,
  SolarStudyDiagramSVG
} from "@/components/ArchitecturalSVGs";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<"dual" | "sketch" | "vector">("dual");
  const [daylightViewMode, setDaylightViewMode] = useState<"render" | "diagram">("render");

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "register" | "forgot">("signin");

  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"Starter" | "Pro Studio" | "Enterprise">("Pro Studio");

  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [specPlannerModalOpen, setSpecPlannerModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Auth Form State
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authShowPassword, setAuthShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authStatusMessage, setAuthStatusMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Studio Onboarding State
  const [onboardingProjectName, setOnboardingProjectName] = useState("Nordic Loft Renovation");
  const [onboardingRoomType, setOnboardingRoomType] = useState("Living & Dining Layout");
  const [onboardingStyle, setOnboardingStyle] = useState("Scandinavian Minimalist");
  const [onboardingEmail, setOnboardingEmail] = useState("");
  const [onboardingFileSelected, setOnboardingFileSelected] = useState<string | null>("sample-blueprint-scan.pdf");
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [onboardingStatusMessage, setOnboardingStatusMessage] = useState("");
  const [onboardingError, setOnboardingError] = useState("");

  // Spec Planner State (Taped Spec Card)
  const [specArea, setSpecArea] = useState(480);
  const [specFinish, setSpecFinish] = useState("Herringbone White Oak");
  const [specWall, setSpecWall] = useState("Warm Limewash");
  const [specKelvin, setSpecKelvin] = useState(5000);
  const [specDownloadSuccess, setSpecDownloadSuccess] = useState(false);

  // Contact Support State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactStatusMessage, setContactStatusMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  // Architectural Features Interactive Inspector State
  const [activeFeatureTab, setActiveFeatureTab] = useState<"vectorizer" | "daylight" | "bom" | "staging">("vectorizer");
  const [vectorLayer, setVectorLayer] = useState<"all" | "walls" | "doors" | "windows" | "dims">("all");
  // Phase 5 Independent Lighting Controls
  const [skyCondition, setSkyCondition] = useState<"clear" | "partly" | "overcast">("clear");
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "noon" | "evening">("noon");
  const [daylightKelvin, setDaylightKelvin] = useState<number>(5000);
  const [bomRoomPreset, setBomRoomPreset] = useState<"living" | "suite" | "studio">("living");
  const [stagingStep, setStagingStep] = useState<"framing" | "rough" | "finished">("finished");
  const [dxfExportSuccess, setDxfExportSuccess] = useState(false);

  // Cookie banner local persistence check
  useEffect(() => {
    const consent = localStorage.getItem("sitesketch_cookie_consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCookieBannerVisible(true);
    }
  }, []);

  const handleCookieConsent = (accepted: boolean) => {
    localStorage.setItem("sitesketch_cookie_consent", accepted ? "accepted" : "declined");
    setCookieBannerVisible(false);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Helper to scroll smoothly to any section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 1. AUTH HANDLERS
  const handleOpenAuth = (mode: "signin" | "register" | "forgot" = "signin") => {
    setAuthMode(mode);
    setAuthError("");
    setAuthStatusMessage("");
    setAuthModalOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthStatusMessage("");

    if (!validateEmail(authEmail)) {
      setAuthError("Please enter a valid studio email address.");
      return;
    }

    if (authMode !== "forgot" && authPassword.length < 8) {
      setAuthError("Password must be at least 8 characters long.");
      return;
    }

    if (authMode === "register" && !authName.trim()) {
      setAuthError("Please enter your full name or architectural studio title.");
      return;
    }

    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      if (authMode === "signin") {
        setAuthStatusMessage(
          "Authentication Service Notice: Backend authentication provider (NextAuth.js / Supabase) is currently in development mode. No remote user session was established. To inspect studio capabilities, proceed via 'Start your plan' or test the Interactive Studio."
        );
      } else if (authMode === "register") {
        setAuthStatusMessage(
          "Studio Registration Notice: Workspace registration recorded for staging verification. Production database integration (`DATABASE_URL`) is required to persist credentials. Our accounts team has logged your reservation."
        );
      } else {
        setAuthStatusMessage(
          `Password Reset Notice: A password recovery dispatch request has been queued for ${authEmail}. Production SMTP mailer configuration is required to transmit actual tokens.`
        );
      }
    }, 750);
  };

  // 2. PRICING COMING SOON MODAL HANDLER
  const handleOpenPricing = (plan: "Starter" | "Pro Studio" | "Enterprise") => {
    setSelectedPlan(plan);
    setPricingModalOpen(true);
  };

  // Prevent background scrolling and handle Escape key for Pricing / Coming Soon Modal
  useEffect(() => {
    if (pricingModalOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setPricingModalOpen(false);
        }
      };
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [pricingModalOpen]);

  // 3. STUDIO ONBOARDING HANDLERS
  const handleOpenOnboarding = () => {
    setOnboardingStatusMessage("");
    setOnboardingError("");
    setOnboardingModalOpen(true);
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingError("");

    if (!validateEmail(onboardingEmail)) {
      setOnboardingError("Please enter a valid studio email address.");
      return;
    }

    setOnboardingLoading(true);
    setTimeout(() => {
      setOnboardingLoading(false);
      setOnboardingStatusMessage(
        `Studio Workspace Initialized: Project '${onboardingProjectName}' (${onboardingRoomType}) has been staged with ${onboardingStyle} specifications. Early access request recorded for ${onboardingEmail}. Our team will reach out with workspace credentials.`
      );
    }, 800);
  };

  // 4. PRELIMINARY BILL OF MATERIALS (BOM) CSV EXPORT HANDLER (Phase 4)
  const handleExportCSV = () => {
    const csvRows = [
      ["SiteSketch - Preliminary Bill of Materials (BOM) Takeoff"],
      ["Project", "Residential Suite - Level 01 Plan (Sheet A-101)"],
      ["Enclosed Area", `${specArea} sq ft (28'-6\" x 16'-8\", Ceiling: 10'-6\" AFF)`],
      ["Date", new Date().toISOString().split("T")[0]],
      ["Status", "Preliminary Quantity Takeoff (Illustrative benchmark pricing)"],
      [""],
      ["Item", "Category", "Specification", "Quantity", "Unit", "Unit Price ($)", "Estimated Total ($)", "Status / Confidence"],
      [
        "Select European White Oak Herringbone",
        "Flooring",
        "5/8\" Engineered, UV Ultra-Matte Lacquer (includes 10% cutting waste)",
        "528",
        "sq ft",
        "14.50",
        "7656.00",
        "Measured (CAD geometry + 10% waste)"
      ],
      [
        "Warm Mineral Limewash",
        "Wall finishes",
        "Roman breathable matte formula over 5/8\" Type X Gypsum",
        "860",
        "sq ft",
        "4.20",
        "3612.00",
        "Measured (Perimeter x 10'-6\" AFF)"
      ],
      [
        "Level 5 Smooth Acoustic Plaster",
        "Ceiling",
        "Flat white acoustic absorption ceiling finish",
        "480",
        "sq ft",
        "5.80",
        "2784.00",
        "Measured (Reflected ceiling plan)"
      ],
      [
        "Ultra-Slim Thermal Break Glazing Aperture",
        "Doors and windows",
        "14'-6\" Southern exposure, Low-E double glazing",
        "14.5",
        "lin ft",
        "145.00",
        "2102.50",
        "Measured (CAD wall schedule)"
      ],
      [
        "Solid Core White Oak Flush Egress Door",
        "Doors and windows",
        "32\" x 84\" opening, concealed pivot hinges",
        "1",
        "unit",
        "680.00",
        "680.00",
        "Counted (Architectural door schedule)"
      ],
      [
        "Recessed Architectural LED Downlights",
        "Lighting",
        "12V 4000K CRI 95+ trimless fixtures",
        "6",
        "units",
        "85.00",
        "510.00",
        "Counted (Reflected lighting plan)"
      ],
      [
        "Spun Brass Minimalist Dining Pendant",
        "Lighting",
        "Dimmable 24V integrated driver (3000K)",
        "1",
        "unit",
        "520.00",
        "520.00",
        "Counted (Fixture schedule)"
      ],
      [
        "Open Kitchen Island with Quartz Slab",
        "Fixtures",
        "Custom 115\" x 60\" waterfall fabrication and bar seating",
        "1",
        "unit",
        "3400.00",
        "3400.00",
        "Illustrative specification"
      ],
      [
        "Scandinavian Boucle Curved Sectional Sofa",
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
        "Beveled edge honed natural stone plinth base",
        "1",
        "unit",
        "1150.00",
        "1150.00",
        "Illustrative specification"
      ],
      [""],
      ["Material Subtotal", "", "", "", "", "", "26264.50", "Sum of preliminary material packages"],
      ["Trade Labour Estimate", "", "Illustrative trade installation ($18.50/sq ft benchmark)", "480", "sq ft", "18.50", "8880.00", "Estimated trade benchmark"],
      ["Waste Allowance (10% Flooring Included)", "", "Standard layout cut factor (48 sq ft)", "", "", "", "696.00", "Included in flooring schedule"],
      ["Contingency (5%)", "", "Unforeseen site conditions & variations", "", "", "", "1757.23", "Standard preliminary contingency"],
      ["Estimated Tax (8.25%)", "", "Estimated municipal sales tax on taxable materials", "", "", "", "2166.82", "Jurisdictional estimate"],
      ["Final Estimated Project Total", "", "", "", "", "", "39068.55", "Comprehensive preliminary estimate"]
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sitesketch-preliminary-bom-takeoff-480sqft.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSpecDownloadSuccess(true);
    setTimeout(() => setSpecDownloadSuccess(false), 3500);
  };

  // 5. DXF CAD SAMPLE EXPORT HANDLER (For Features Section)
  const handleExportDXF = () => {
    const dxfContent = `0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n0\nLINE\n8\nWALLS\n10\n0.0\n20\n0.0\n11\n8686.8\n21\n0.0\n0\nLINE\n8\nWALLS\n10\n8686.8\n20\n0.0\n11\n8686.8\n21\n5080.0\n0\nLINE\n8\nWALLS\n10\n8686.8\n20\n5080.0\n11\n0.0\n21\n5080.0\n0\nLINE\n8\nWALLS\n10\n0.0\n20\n5080.0\n11\n0.0\n21\n0.0\n0\nENDSEC\n0\nEOF\n`;
    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitesketch-vector-living-suite.dxf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDxfExportSuccess(true);
    setTimeout(() => setDxfExportSuccess(false), 3500);
  };

  // 6. CONTACT SUPPORT HANDLER
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactStatusMessage("");

    if (!contactName.trim()) {
      setContactError("Please enter your name.");
      return;
    }
    if (!validateEmail(contactEmail)) {
      setContactError("Please enter a valid email address.");
      return;
    }
    if (!contactMessage.trim()) {
      setContactError("Please provide an inquiry message.");
      return;
    }

    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactStatusMessage(
        `Support Inquiry Logged: Thank you, ${contactName}. Your inquiry regarding architectural integrations has been queued. Studio engineering will review and reply to ${contactEmail} within one business day.`
      );
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-canvas architectural-grid text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 flex flex-col justify-between">
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
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
            <a href="#workflow" className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded px-1">
              How it works
            </a>
            <a href="#builder" className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded px-1">
              Studio Builder
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded px-1">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded px-1">
              Pricing
            </a>
            <button
              onClick={() => handleOpenAuth("signin")}
              className="hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded px-1"
            >
              Sign in
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleOpenOnboarding}
              className="bg-slate-900 hover:bg-black text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Start your plan
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
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
              href="#builder"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-slate-900"
            >
              Studio Builder
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
                  handleOpenAuth("signin");
                }}
                className="py-2 text-center text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenOnboarding();
                }}
                className="py-2 text-center bg-slate-900 text-white font-semibold rounded-lg hover:bg-black cursor-pointer"
              >
                Start your plan
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (PHASE 7 REDESIGN) */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clear Architectural Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.12] font-sans">
              Turn floorplans into better-designed spaces.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
              Upload architectural sketches and floorplans, review spatial layouts, explore materials, and prepare project estimates in one workspace.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection("builder")}
                className="bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Explore the workspace
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("workflow")}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-2xs inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Drawing Sheet & Transformation Viewport */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Architectural Drawing Sheet */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
              {/* Sheet Header */}
              <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="flex items-center space-x-2 font-sans">
                  <span className="font-semibold text-slate-800">Sheet A-101</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600">Level 01 Suite ({specArea} sq ft)</span>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("dual")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      heroViewMode === "dual"
                        ? "bg-white text-slate-900 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Dual view
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("sketch")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      heroViewMode === "sketch"
                        ? "bg-white text-slate-900 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Pencil sketch
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("vector")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      heroViewMode === "vector"
                        ? "bg-white text-slate-900 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Vector CAD
                  </button>
                </div>
              </div>

              {/* Drawing Viewport Canvas */}
              <div className="relative aspect-[600/420] bg-[#232624] overflow-hidden">
                {heroViewMode === "dual" && (
                  <div className="w-full h-full">
                    <ComparisonSlider showControls={false} />
                  </div>
                )}

                {heroViewMode === "sketch" && (
                  <div className="w-full h-full relative">
                    <PencilFloorplanSketchSVG className="w-full h-full" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#F8F7F2]/90 border border-[#D8D5CB] text-xs text-[#292C29] font-sans shadow-xs">
                      Pencil field sketch
                    </div>
                  </div>
                )}

                {heroViewMode === "vector" && (
                  <div className="w-full h-full relative bg-[#232624]">
                    <CadFloorplanVectorSVG className="w-full h-full" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1A1C1A]/90 border border-[#3D403A] text-xs text-[#F8F7F2] font-sans shadow-xs">
                      Detected vector CAD
                    </div>
                  </div>
                )}
              </div>

              {/* Architectural Specification Summary */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 space-y-3 font-sans">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 text-[11px] block">Usable floor envelope:</span>
                    <span className="font-semibold text-slate-900">{specArea} sq ft</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 text-[11px] block">Finish specification:</span>
                    <span className="font-semibold text-slate-900 truncate block">{specFinish}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 text-[11px] block">Wall surface:</span>
                    <span className="font-semibold text-slate-900 truncate block">{specWall}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 text-[11px] block">Aperture orientation:</span>
                    <span className="font-semibold text-slate-900">South 180° glazing</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">
                    Parameters extracted from floor layout
                  </span>
                  <button
                    type="button"
                    onClick={() => setSpecPlannerModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    Configure room specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP LINEAR WORKFLOW (PHASE 7) */}
      <section id="workflow" className="py-16 sm:py-20 border-t border-slate-200/80 bg-white/60 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              From floorplan to project estimate in four steps.
            </h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              A structured design workflow connecting initial hand-drawn sketches to vector drawings, finish specifications, and costed schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                01 — Upload your floorplan.
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">Upload floorplan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload architectural sketches, phone scans, or existing drawings in JPG, PNG, or PDF format.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                02 — Review your layout.
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">Review layout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review detected wall boundaries, door swings, and window openings with editable dimensions and layer controls.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                03 — Explore materials and finishes.
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">Select materials</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select real flooring, wall surface finishes, and fixture specifications with realistic texture previews and lighting conditions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
                04 — Prepare your project estimate.
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">Prepare estimate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate an itemized preliminary bill of materials with material subtotals, waste allowances, and CSV export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ARCHITECTURAL WORKSPACE (REFINED ARCHITECTURAL STUDIO PALETTE) */}
      <section id="builder" className="py-16 sm:py-24 border-t border-[#D8D5CB] bg-[#F1EEE6] text-[#292C29] font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#292C29]">
                Interactive architectural workspace
              </h2>
              <p className="text-[#74756E] text-sm leading-relaxed">
                Review automatic floorplan line detection, toggle drawing layers, inspect material specifications, and export preliminary schedules.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={handleOpenOnboarding}
                className="bg-[#292C29] hover:bg-[#1A1C1A] text-[#F8F7F2] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777B64]"
              >
                Upload your floorplan
              </button>
              <button
                type="button"
                onClick={() => handleOpenPricing("Pro Studio")}
                className="border border-[#D8D5CB] bg-[#F8F7F2] hover:bg-[#E8E5DC] text-[#292C29] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777B64]"
              >
                Request early access
              </button>
            </div>
          </div>

          {/* Embedded Full Studio Canvas Component */}
          <StudioCanvas onOpenTrial={(tier) => handleOpenPricing(tier === "pro" ? "Pro Studio" : "Starter")} />
        </div>
      </section>

      {/* 5. FEATURES SECTION (HALLMARK APPLIED: NO EYEBROWS, SENTENCE CASE, HIGH CRAFT INTERACTIVE INSPECTOR) */}
      <section id="features" className="py-16 sm:py-24 border-t border-slate-200/80 bg-canvas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Hallmark Section Header (No tracked eyebrows, direct sentence-case heading) */}
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tools built for architectural workflows.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Review detected drawing geometry, preview natural daylight angles, and quantify preliminary material takeoffs directly from your floorplans.
            </p>
          </div>

          {/* Interactive Capability Switcher */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Tab Navigation Strip */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveFeatureTab("vectorizer")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  activeFeatureTab === "vectorizer"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Ruler className="w-4 h-4 text-slate-700" />
                <span>Editable Floorplan Geometry</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFeatureTab("daylight")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  activeFeatureTab === "daylight"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Sun className="w-4 h-4 text-slate-700" />
                <span>Lighting &amp; Orientation Preview</span>
              </button>

              <button
                onClick={() => setActiveFeatureTab("bom")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  activeFeatureTab === "bom"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-700" />
                <span>Preliminary Bill of Materials (BOM)</span>
              </button>

              <button
                onClick={() => setActiveFeatureTab("staging")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  activeFeatureTab === "staging"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>Construction &amp; Finish Planning</span>
              </button>
            </div>

            {/* Tab 1: Editable Floorplan Geometry (Phase 6) */}
            {activeFeatureTab === "vectorizer" && (
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Editable floorplan geometry from hand drawings.
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    SiteSketch reviews hand-drawn pencil sketches, scans, and PDF floorplans, converting them into clean vector drawings with wall boundaries, door swings, and dimension strings.
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Inspect Vector Layer Controls:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setVectorLayer("all")}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          vectorLayer === "all"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        All Layers
                      </button>
                      <button
                        onClick={() => setVectorLayer("walls")}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          vectorLayer === "walls"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Wall Boundaries
                      </button>
                      <button
                        onClick={() => setVectorLayer("doors")}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          vectorLayer === "doors"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Door Swings
                      </button>
                      <button
                        onClick={() => setVectorLayer("windows")}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          vectorLayer === "windows"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Glazed Aperture
                      </button>
                      <button
                        onClick={() => setVectorLayer("dims")}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          vectorLayer === "dims"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Dimension Strings
                      </button>
                    </div>
                  </div>

                  {/* Telemetry Row */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Drawing scale:</span>
                      <span className="font-semibold text-slate-800">1/4&quot; = 1&apos;-0&quot;</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Export format:</span>
                      <span className="font-semibold text-slate-800">DXF / SVG</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Snapping:</span>
                      <span className="font-semibold text-slate-800">90.0° Ortho</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleExportDXF}
                      className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-black text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{dxfExportSuccess ? "Downloaded Sample DXF!" : "Download Sample DXF Vector CAD"}</span>
                    </button>
                  </div>
                </div>

                {/* Right Interactive Vector Visualizer */}
                <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden shadow-inner font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-xs bg-slate-400" />
                      <span className="text-slate-200 font-medium">Sheet A-101 · Level 01 Plan</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 text-xs">Sample Vector Preview</span>
                    </div>
                    <span className="text-slate-400 text-xs">Scale: 1/4&quot; = 1&apos;-0&quot;</span>
                  </div>

                  <div className="relative aspect-[600/420] w-full rounded-lg overflow-hidden my-3 border border-slate-800 bg-slate-950">
                    <CadFloorplanVectorSVG
                      className="w-full h-full"
                      showWalls={vectorLayer === "all" || vectorLayer === "walls"}
                      showDoors={vectorLayer === "all" || vectorLayer === "doors"}
                      showWindows={vectorLayer === "all" || vectorLayer === "windows"}
                      showDimensions={vectorLayer === "all" || vectorLayer === "dims"}
                      showFurniture={vectorLayer === "all"}
                      showRoomLabels={vectorLayer === "all"}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                    <span>Sample project: Residential Suite (480 sq ft)</span>
                    <span className="text-slate-300 font-medium">Interactive vector geometry</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Lighting & Orientation Preview (Phase 5: Separated Controls) */}
            {activeFeatureTab === "daylight" && (
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Preview daylight conditions across your floorplan.
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Review how daylight enters the space based on window aperture orientation, sky conditions, and time of day. This lighting preview helps visualize ambient illumination and shadow patterns before rendering.
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* Control 1: Sky Conditions */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-700 block">Sky Condition:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSkyCondition("clear")}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            skyCondition === "clear"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => setSkyCondition("partly")}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            skyCondition === "partly"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Partly cloudy
                        </button>
                        <button
                          type="button"
                          onClick={() => setSkyCondition("overcast")}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            skyCondition === "overcast"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Overcast
                        </button>
                      </div>
                    </div>

                    {/* Control 2: Time of Day */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-700 block">Time of Day:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setTimeOfDay("morning");
                            setDaylightKelvin(2700);
                          }}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            timeOfDay === "morning"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Morning
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTimeOfDay("noon");
                            setDaylightKelvin(5000);
                          }}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            timeOfDay === "noon"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Noon
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTimeOfDay("evening");
                            setDaylightKelvin(2700);
                          }}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-center ${
                            timeOfDay === "evening"
                              ? "bg-slate-900 text-white border-slate-900 font-medium"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Evening
                        </button>
                      </div>
                    </div>

                    {/* Control 3: Colour Temperature */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-700 block">Colour Temperature:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[2700, 4000, 5000, 6500].map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setDaylightKelvin(k)}
                            className={`text-xs px-2 py-1.5 rounded-lg border transition-colors cursor-pointer text-center font-mono ${
                              daylightKelvin === k
                                ? "bg-slate-900 text-white border-slate-900 font-semibold"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {k}K
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Orientation & Environmental Inputs */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Orientation:</span>
                      <span className="font-semibold text-slate-800">South (180°)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Direct Illuminance:</span>
                      <span className="font-semibold text-slate-800">
                        {skyCondition === "overcast" ? "320 Lux" : timeOfDay === "morning" ? "850 Lux" : "1,250 Lux"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Solar Altitude:</span>
                      <span className="font-semibold text-slate-800">
                        {skyCondition === "overcast" ? "Diffuse" : timeOfDay === "morning" ? "28° low sun" : "58° solar noon"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden shadow-inner font-sans">
                  {/* Viewport Header */}
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 text-xs gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-xs bg-slate-400" />
                      <span className="text-slate-200 font-medium">Lighting preview: South exposure</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-amber-400 font-mono">{daylightKelvin}K</span>
                    </div>

                    <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setDaylightViewMode("render")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          daylightViewMode === "render"
                            ? "bg-slate-800 text-slate-100 font-medium"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Interior preview
                      </button>
                      <button
                        type="button"
                        onClick={() => setDaylightViewMode("diagram")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          daylightViewMode === "diagram"
                            ? "bg-slate-800 text-slate-100 font-medium"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Solar diagram (Lux)
                      </button>
                    </div>
                  </div>

                  {/* Viewport Body */}
                  {daylightViewMode === "render" ? (
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden my-3 border border-slate-800 bg-slate-900">
                      <img
                        src="/images/architectural-daylight.jpg"
                        alt="Architectural daylight lighting preview"
                        className="w-full h-full object-cover transition-[filter] duration-300"
                        style={{
                          filter:
                            skyCondition === "overcast" || daylightKelvin >= 6500
                              ? "saturate(0.8) brightness(1.02) hue-rotate(4deg)"
                              : timeOfDay === "morning" || daylightKelvin <= 3000
                              ? "sepia(0.3) saturate(1.25) brightness(0.92)"
                              : "contrast(1.04) brightness(1.0)"
                        }}
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/85 border border-slate-800 text-xs text-slate-200 font-sans shadow-sm">
                        {skyCondition === "overcast"
                          ? "Overcast · Diffuse Sky"
                          : timeOfDay === "morning"
                          ? "Morning Sun · 28° Alt"
                          : "Solar Noon · 58° Alt"}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden my-3 border border-slate-800 bg-slate-900">
                      <SolarStudyDiagramSVG kelvin={daylightKelvin} />
                    </div>
                  )}

                  {/* Viewport Footer */}
                  <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                    <span>Aperture: 14&apos;-6&quot; south glazing · 10&apos;-6&quot; AFF ceiling</span>
                    <span className="text-slate-300">Interactive lighting preview</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Rebuilt Structured Bill of Materials (BOM) Section (Phase 4) */}
            {activeFeatureTab === "bom" && (
              <div className="p-6 sm:p-8 space-y-6 font-sans">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-2xl space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-900">
                      Structured preliminary quantity takeoffs.
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Itemized takeoff table for the sample Residential Suite (480 sq ft net). Quantities are derived directly from floorplan dimensions with standard trade waste allowances.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-black text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{specDownloadSuccess ? "Takeoff CSV Downloaded!" : "Export Takeoff (CSV)"}</span>
                    </button>
                  </div>
                </div>

                {/* Structured 8-Column BOM Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <th className="py-2.5 px-3">Item</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Specification</th>
                        <th className="py-2.5 px-3 text-right">Quantity</th>
                        <th className="py-2.5 px-3">Unit</th>
                        <th className="py-2.5 px-3 text-right">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Estimated Total</th>
                        <th className="py-2.5 px-3">Status / Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Select European White Oak</td>
                        <td className="py-2.5 px-3">Flooring</td>
                        <td className="py-2.5 px-3 text-slate-500">Herringbone 5/8&quot; engineered (10% waste incl.)</td>
                        <td className="py-2.5 px-3 text-right font-mono">528</td>
                        <td className="py-2.5 px-3 text-slate-500">sq ft</td>
                        <td className="py-2.5 px-3 text-right font-mono">$14.50</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$7,656.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Measured (CAD + 10% waste)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Warm Mineral Limewash</td>
                        <td className="py-2.5 px-3">Wall finishes</td>
                        <td className="py-2.5 px-3 text-slate-500">Roman breathable matte over 5/8&quot; Type X Gypsum</td>
                        <td className="py-2.5 px-3 text-right font-mono">860</td>
                        <td className="py-2.5 px-3 text-slate-500">sq ft</td>
                        <td className="py-2.5 px-3 text-right font-mono">$4.20</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$3,612.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Measured (Perimeter × 10&apos;-6&quot;)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Level 5 Smooth Acoustic Plaster</td>
                        <td className="py-2.5 px-3">Ceiling</td>
                        <td className="py-2.5 px-3 text-slate-500">Flat white acoustic absorption system</td>
                        <td className="py-2.5 px-3 text-right font-mono">480</td>
                        <td className="py-2.5 px-3 text-slate-500">sq ft</td>
                        <td className="py-2.5 px-3 text-right font-mono">$5.80</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$2,784.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Measured (Reflected ceiling)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Ultra-Slim Thermal Break Glazing</td>
                        <td className="py-2.5 px-3">Doors &amp; windows</td>
                        <td className="py-2.5 px-3 text-slate-500">14&apos;-6&quot; south aperture, Low-E argon double glazed</td>
                        <td className="py-2.5 px-3 text-right font-mono">14.5</td>
                        <td className="py-2.5 px-3 text-slate-500">lin ft</td>
                        <td className="py-2.5 px-3 text-right font-mono">$145.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$2,102.50</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Measured (Wall schedule)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Solid Core White Oak Egress Door</td>
                        <td className="py-2.5 px-3">Doors &amp; windows</td>
                        <td className="py-2.5 px-3 text-slate-500">32&quot; × 84&quot; flush door, concealed pivot hardware</td>
                        <td className="py-2.5 px-3 text-right font-mono">1</td>
                        <td className="py-2.5 px-3 text-slate-500">unit</td>
                        <td className="py-2.5 px-3 text-right font-mono">$680.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$680.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Counted (Door schedule)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Recessed LED Downlights</td>
                        <td className="py-2.5 px-3">Lighting</td>
                        <td className="py-2.5 px-3 text-slate-500">12V 4000K CRI 95+ trimless fixtures</td>
                        <td className="py-2.5 px-3 text-right font-mono">6</td>
                        <td className="py-2.5 px-3 text-slate-500">units</td>
                        <td className="py-2.5 px-3 text-right font-mono">$85.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$510.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Counted (Lighting plan)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Spun Brass Dining Pendant</td>
                        <td className="py-2.5 px-3">Lighting</td>
                        <td className="py-2.5 px-3 text-slate-500">Dimmable 24V integrated driver (3000K)</td>
                        <td className="py-2.5 px-3 text-right font-mono">1</td>
                        <td className="py-2.5 px-3 text-slate-500">unit</td>
                        <td className="py-2.5 px-3 text-right font-mono">$520.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$520.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-emerald-700">Counted (Fixture schedule)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Open Kitchen Island with Quartz Slab</td>
                        <td className="py-2.5 px-3">Fixtures</td>
                        <td className="py-2.5 px-3 text-slate-500">Custom 115&quot; × 60&quot; waterfall edge fabrication</td>
                        <td className="py-2.5 px-3 text-right font-mono">1</td>
                        <td className="py-2.5 px-3 text-slate-500">unit</td>
                        <td className="py-2.5 px-3 text-right font-mono">$3,400.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$3,400.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-amber-700">Illustrative estimate</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Scandinavian Bouclé Curved Sectional</td>
                        <td className="py-2.5 px-3">Furniture</td>
                        <td className="py-2.5 px-3 text-slate-500">Custom 3-piece radius, high-resilience foam core</td>
                        <td className="py-2.5 px-3 text-right font-mono">1</td>
                        <td className="py-2.5 px-3 text-slate-500">unit</td>
                        <td className="py-2.5 px-3 text-right font-mono">$3,850.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$3,850.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-amber-700">Illustrative estimate</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-medium text-slate-900">Monolithic Marble Plinth Table</td>
                        <td className="py-2.5 px-3">Furniture</td>
                        <td className="py-2.5 px-3 text-slate-500">Beveled edge honed stone table base</td>
                        <td className="py-2.5 px-3 text-right font-mono">1</td>
                        <td className="py-2.5 px-3 text-slate-500">unit</td>
                        <td className="py-2.5 px-3 text-right font-mono">$1,150.00</td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-900">$1,150.00</td>
                        <td className="py-2.5 px-3 text-[11px] text-amber-700">Illustrative estimate</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-50/90 border-t border-slate-200 text-xs text-slate-800">
                      <tr>
                        <td colSpan={6} className="py-2 px-3 font-semibold text-right">Materials Subtotal:</td>
                        <td className="py-2 px-3 font-mono font-bold text-right text-slate-900">$26,264.50</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">Sum of materials</td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="py-2 px-3 text-slate-600 text-right">Trade Labour Estimate ($18.50/sq ft benchmark):</td>
                        <td className="py-2 px-3 font-mono text-right text-slate-800">$8,880.00</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">Estimated trade rate</td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="py-2 px-3 text-slate-600 text-right">Waste Allowance (10% Flooring Included):</td>
                        <td className="py-2 px-3 font-mono text-right text-slate-600">($696.00)</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">Included in schedule</td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="py-2 px-3 text-slate-600 text-right">Contingency (5%):</td>
                        <td className="py-2 px-3 font-mono text-right text-slate-800">$1,757.23</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">Preliminary reserve</td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="py-2 px-3 text-slate-600 text-right">Estimated Sales Tax (8.25%):</td>
                        <td className="py-2 px-3 font-mono text-right text-slate-800">$2,166.82</td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">Taxable materials</td>
                      </tr>
                      <tr className="border-t border-slate-300 bg-slate-100 font-bold">
                        <td colSpan={6} className="py-2.5 px-3 text-right text-slate-900">Final Estimated Project Total:</td>
                        <td className="py-2.5 px-3 font-mono text-right text-slate-900 text-sm">$39,068.55</td>
                        <td className="py-2.5 px-3 text-[11px] text-slate-600">USD benchmark</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <p className="text-[11px] text-slate-500 leading-normal">
                  Note: Preliminary estimate for design planning purposes only. Illustrative prices do not represent formal contractor bids or supplier quotations. Contractors must verify all field dimensions on site prior to material procurement.
                </p>
              </div>
            )}

            {/* Tab 4: Construction & Finish Planning (Phase 2 & Phase 3) */}
            {activeFeatureTab === "staging" && (
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Track spaces through each phase of construction.
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Review how structural framing, rough-in mechanical routing, and final surface finishes assemble across your floorplan.
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Toggle construction phase progression:
                    </span>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setStagingStep("framing")}
                        className={`text-xs px-3.5 py-2 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          stagingStep === "framing"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>Phase 1: Structural wall framing</span>
                        <span className="text-[11px] opacity-75 font-sans">Framing layout</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStagingStep("rough")}
                        className={`text-xs px-3.5 py-2 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          stagingStep === "rough"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>Phase 2: Rough-in openings &amp; drywall</span>
                        <span className="text-[11px] opacity-75 font-sans">Perimeter verified</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStagingStep("finished")}
                        className={`text-xs px-3.5 py-2 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          stagingStep === "finished"
                            ? "bg-slate-900 text-white border-slate-900 font-medium"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>Phase 3: Completed architectural finishes</span>
                        <span className="text-[11px] opacity-75 font-sans">Final finishes</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden shadow-inner font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-200 font-medium">
                      Phase preview: {stagingStep === "framing" ? "Structural framing" : stagingStep === "rough" ? "Drywall & MEP rough-in" : "Completed finishes"}
                    </span>
                    <span className="text-emerald-400 font-medium">Perspective aligned</span>
                  </div>

                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden my-3 border border-slate-800 bg-slate-900">
                    {stagingStep === "framing" && (
                      <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-amber-200/90 font-sans space-y-2">
                        <Building2 className="w-12 h-12 text-amber-500 stroke-[1.5]" />
                        <span className="text-sm font-semibold">Structural timber stud layout</span>
                        <span className="text-xs text-amber-400/80">36 studs, 2 door openings, 480 sq ft subfloor</span>
                      </div>
                    )}
                    {stagingStep === "rough" && (
                      <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-200 font-sans space-y-2">
                        <Layers className="w-12 h-12 text-slate-400 stroke-[1.5]" />
                        <span className="text-sm font-semibold">Drywall and electrical rough-in</span>
                        <span className="text-xs text-slate-400">5/8&quot; Type X gypsum partitions with rough-in junction points</span>
                      </div>
                    )}
                    {stagingStep === "finished" && (
                      <img
                        src="/images/architectural-modernist.jpg"
                        alt="Completed modern architectural living interior"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                    <span>Construction planning sequence</span>
                    <span className="text-slate-200 font-medium">Level 01 Suite</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION (PHASE 8: FIXED LOGIC & HONEST TIERS) */}
      <section id="pricing" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white/50 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Transparent pricing for studios of every scale.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Choose the plan that fits your practice. All annual subscriptions include a 20% discount.
            </p>

            {/* Monthly vs Annual Billing Toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  !isAnnual ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  isAnnual ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual billing</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Starter Plan Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-500 block">Starter</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">
                    ${isAnnual ? "23" : "29"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">
                  {isAnnual ? "$276 billed annually" : "Billed monthly, cancel anytime"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For independent architects and interior design consultants.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Up to 15 floorplan reviews per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Editable 2D vector geometry preview</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Preliminary quantity takeoff &amp; CSV export</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Standard material finishes catalog</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Single user workspace</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPricing("Starter")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Request early access
              </button>
            </div>

            {/* Pro Studio (Recommended) */}
            <div className="bg-white rounded-xl border-2 border-slate-900 p-6 sm:p-7 shadow-md relative flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
                Recommended for studios
              </span>

              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-900 block">Pro Studio</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">
                    ${isAnnual ? "63" : "79"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">
                  {isAnnual ? "$756 billed annually" : "Billed monthly, cancel anytime"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For growing architecture firms and design studios.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-800 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Up to 100 floorplan reviews per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Vector CAD drawing exports (DXF)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Structured Bill of Materials (BOM) &amp; CSV export</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Lighting and orientation previews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>3 studio team seats</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPricing("Pro Studio")}
                className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Request early access
              </button>
            </div>

            {/* Enterprise Plan Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-slate-500 block">Enterprise</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">
                    ${isAnnual ? "159" : "199"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500">
                  {isAnnual ? "$1,908 billed annually" : "Billed monthly, cancel anytime"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For large multi-office practices requiring custom finish catalogs.
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Unlimited floorplan reviews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Custom material catalogs &amp; supplier pricing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Multi-team project workspaces</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Dedicated onboarding and support desk</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPricing("Enterprise")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Contact for early access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION (PHASE 7) */}
      <section className="py-20 sm:py-24 border-t border-slate-200 bg-white text-center font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Start planning your next project.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Upload your floorplans, review spatial layouts, test materials, and generate preliminary project estimates with SiteSketch.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenOnboarding}
              className="bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Request early access
            </button>
          </div>
        </div>
      </section>

      {/* 8. MINIMAL FOOTER */}
      <footer className="border-t border-slate-200 py-10 bg-white text-xs text-slate-500 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
              <a href="#builder" className="hover:text-slate-800 transition-colors">
                Studio Workspace
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
              <button
                onClick={() => setContactModalOpen(true)}
                className="hover:text-slate-800 transition-colors cursor-pointer"
              >
                Support
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            <span>SiteSketch · Architectural workspace and floorplan estimation</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 8. FUNCTIONAL COOKIE BANNER WITH PERSISTENCE */}
      {cookieBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-3 px-4 sm:px-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              <strong className="text-slate-900 font-semibold">We use one cookie.</strong> It keeps you signed in, and it cannot be read by scripts. We use no analytics and no advertising, so declining changes nothing about how this site behaves.
            </p>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => handleCookieConsent(true)}
                className="bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                Accept cookies
              </button>
              <button
                onClick={() => handleCookieConsent(false)}
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

      {/* 9. AUTHENTICATION MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative space-y-5">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close authentication modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                {authMode === "signin"
                  ? "Studio authentication"
                  : authMode === "register"
                  ? "Account registration"
                  : "Credential recovery"}
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                {authMode === "signin"
                  ? "Sign in to SiteSketch"
                  : authMode === "register"
                  ? "Create your studio account"
                  : "Reset your password"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {authMode === "signin"
                  ? "Access your architectural canvases, cloud renders, and material takeoffs."
                  : authMode === "register"
                  ? "Join leading architecture studios generating photoreal spaces in seconds."
                  : "Enter your registered work email to receive password recovery instructions."}
              </p>
            </div>

            {/* Error Message Box */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {/* Backend Integration Status Notice */}
            {authStatusMessage && (
              <div className="p-3.5 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg space-y-1.5 font-mono">
                <div className="font-bold text-[11px] text-slate-900 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>BACKEND INTEGRATION REPORT</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 font-sans">
                  {authStatusMessage}
                </p>
              </div>
            )}

            {!authStatusMessage ? (
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                {authMode === "register" && (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name &amp; Studio Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin, Principal Architect"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Studio Work Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="architect@studio.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {authMode !== "forgot" && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      {authMode === "signin" && (
                        <button
                          type="button"
                          onClick={() => handleOpenAuth("forgot")}
                          className="text-[11px] text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={authShowPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setAuthShowPassword(!authShowPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                        aria-label={authShowPassword ? "Hide password" : "Show password"}
                      >
                        {authShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {authLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" />}
                  <span>
                    {authMode === "signin"
                      ? "Sign In to Studio"
                      : authMode === "register"
                      ? "Create Studio Workspace"
                      : "Send Reset Link"}
                  </span>
                </button>

                {/* Third-Party Provider Notice */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(
                        "Google OAuth Integration Notice: GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET environment variables are pending configuration in .env.local."
                      );
                    }}
                    className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google Studio</span>
                  </button>
                </div>

                {/* Footer Switcher */}
                <div className="text-center pt-2 text-xs text-slate-500">
                  {authMode === "signin" ? (
                    <span>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => handleOpenAuth("register")}
                        className="text-slate-900 font-semibold underline cursor-pointer"
                      >
                        Create studio account
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => handleOpenAuth("signin")}
                        className="text-slate-900 font-semibold underline cursor-pointer"
                      >
                        Sign in
                      </button>
                    </span>
                  )}
                </div>
              </form>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Close &amp; Return to Overview
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. PRICING COMING SOON ANNOUNCEMENT MODAL */}
      {pricingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs overflow-y-auto"
          onClick={() => setPricingModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-heading"
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-5 my-auto font-sans text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPricingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Tasteful Eyebrow */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8E5DC] text-[#777B64] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#E8E5DC] text-[#777B64]">
                COMING SOON
              </span>
            </div>

            {/* Headings & Description */}
            <div className="space-y-1.5">
              <h3 id="coming-soon-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Something exciting is on its way.
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                SiteSketch plans are launching soon.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
                We&apos;re putting the finishing touches on our subscription experience. Our paid plans will be available soon. Stay tuned!
              </p>
            </div>

            {/* Selected Plan Breakdown Card */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Selected tier</span>
                  <span className="text-base font-bold text-slate-900">{selectedPlan}</span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 mb-1">
                    {isAnnual ? "Annual Billing (-20%)" : "Monthly Billing"}
                  </span>
                  <div className="text-sm font-bold text-slate-900 tabular-nums">
                    {selectedPlan === "Starter"
                      ? isAnnual ? "$23 / mo" : "$29 / mo"
                      : selectedPlan === "Pro Studio"
                      ? isAnnual ? "$63 / mo" : "$79 / mo"
                      : isAnnual ? "$159 / mo" : "$199 / mo"}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-1.5">
                <span>
                  Commitment:{" "}
                  <strong className="text-slate-700 font-medium">
                    {isAnnual
                      ? selectedPlan === "Starter"
                        ? "$276 billed annually"
                        : selectedPlan === "Pro Studio"
                        ? "$756 billed annually"
                        : "$1,908 billed annually"
                      : "Billed month-to-month"}
                  </strong>
                </span>
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70 text-[11px] font-medium">
                  Not yet available for purchase
                </span>
              </div>

              <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-200/60">
                Your selected plan is not yet active. No payment has been collected.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-medium text-xs sm:text-sm py-2.5 rounded-lg cursor-not-allowed text-center select-none"
              >
                Launching Soon
              </button>
              <button
                type="button"
                onClick={() => setPricingModalOpen(false)}
                className="w-full bg-slate-900 hover:bg-black text-white font-medium text-xs sm:text-sm py-2.5 rounded-lg transition-colors cursor-pointer text-center shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. STUDIO ONBOARDING MODAL (RESOLVES MEDIA_1794310628274_63D6C3E8) */}
      {onboardingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-5">
            <button
              onClick={() => setOnboardingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close onboarding modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                Studio workspace setup
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Initialize your spatial project
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Upload a hand-drawn floor schematic or CAD drawing to begin neural vectorization.
              </p>
            </div>

            {/* Error Message Box */}
            {onboardingError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{onboardingError}</span>
              </div>
            )}

            {/* Vectorization Complete State with Action Buttons */}
            {onboardingStatusMessage ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg space-y-1.5 font-mono">
                  <div className="font-bold text-[11px] text-slate-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PIPELINE DISPATCH REPORT</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 font-sans">
                    {onboardingStatusMessage}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOnboardingModalOpen(false);
                      scrollToSection("builder");
                    }}
                    className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <span>Enter Live Studio Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Project Takeoff (CSV)</span>
                  </button>
                </div>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setOnboardingModalOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer"
                  >
                    Close &amp; Return to Overview
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOnboardingSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Project / Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardingProjectName}
                    onChange={(e) => setOnboardingProjectName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Room Classification
                    </label>
                    <select
                      value={onboardingRoomType}
                      onChange={(e) => setOnboardingRoomType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    >
                      <option>Living &amp; Dining Layout</option>
                      <option>Master Suite</option>
                      <option>Open Concept Kitchen</option>
                      <option>Executive Studio Office</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Target Material Palette
                    </label>
                    <select
                      value={onboardingStyle}
                      onChange={(e) => setOnboardingStyle(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    >
                      <option>Scandinavian Minimalist</option>
                      <option>Japandi Warm Wood</option>
                      <option>Bauhaus Industrial</option>
                      <option>Modern Farmhouse</option>
                    </select>
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Input Schematic / Blueprint Photo
                  </label>
                  <label className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-slate-900 transition-colors bg-slate-50/60 cursor-pointer block">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setOnboardingFileSelected(e.target.files?.[0]?.name || null)}
                    />
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs font-medium text-slate-700">
                      {onboardingFileSelected ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" /> {onboardingFileSelected} (Click to change file)
                        </span>
                      ) : (
                        "Click to browse hand-drawn sketch, PNG, JPG, or PDF"
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Supports phone scans up to 50MB (automatic perspective calibration)
                    </p>
                  </label>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Studio Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@atelier-design.com"
                    value={onboardingEmail}
                    onChange={(e) => setOnboardingEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={onboardingLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {onboardingLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" />}
                  <span>Launch Spatial Vectorization</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 12. ROOM SPEC PLANNER MODAL (TRY THE PLANNER / LIVE CSV EXPORT) */}
      {specPlannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-5">
            <button
              onClick={() => setSpecPlannerModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close spec planner modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                Interactive spec planner
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Tune your architectural parameters
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Adjust physical dimensions to recalculate the Bill of Materials in real time.
              </p>
            </div>

            {/* Slider Control for Square Footage */}
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">Floor Envelope Area</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">{specArea} sq ft</span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="20"
                value={specArea}
                onChange={(e) => setSpecArea(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>300 sq ft</span>
                <span>750 sq ft</span>
                <span>1200 sq ft</span>
              </div>
            </div>

            {/* Material Finishes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Flooring Specification
                </label>
                <select
                  value={specFinish}
                  onChange={(e) => setSpecFinish(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                >
                  <option>Herringbone White Oak</option>
                  <option>Wide-Plank French Walnut</option>
                  <option>Honed Carrara Marble</option>
                  <option>Polished Architectural Concrete</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Wall Finish
                </label>
                <select
                  value={specWall}
                  onChange={(e) => setSpecWall(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                >
                  <option>Warm Limewash</option>
                  <option>Venetian Clay Plaster</option>
                  <option>Honed Chalk Matte</option>
                  <option>Raw Exposed Concrete</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Solar Temperature
                </label>
                <select
                  value={specKelvin}
                  onChange={(e) => setSpecKelvin(Number(e.target.value))}
                  className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                >
                  <option value={3800}>3800K Golden Morning</option>
                  <option value={5000}>5000K Natural South Day</option>
                  <option value={6200}>6200K Diffuse Overcast</option>
                </select>
              </div>
            </div>

            {/* Live Calculated Takeoff Table */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-500 pb-1.5 border-b border-slate-200">
                <span>CALCULATED BOM SCHEDULE</span>
                <span className="text-emerald-700 font-bold">LIVE REAL-TIME</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Flooring (+10% waste):</span>
                <span className="font-semibold text-slate-900 tabular-nums">{Math.round(specArea * 1.1)} sq ft</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Drywall Partition Area:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{Math.round(specArea * 2.8)} sq ft</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Paint ({specWall}):</span>
                <span className="font-semibold text-slate-900 tabular-nums">{Math.ceil((specArea * 2.8) / 350)} gallons</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>LED Fixture Units:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{Math.max(4, Math.round(specArea / 75))} units</span>
              </div>
            </div>

            {/* Download Actual CSV Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleExportCSV}
                className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <Download className="w-4 h-4" />
                <span>Export Real CSV Takeoff Sheet</span>
              </button>
              {specDownloadSuccess && (
                <p className="text-[11px] text-emerald-700 text-center font-medium">
                  ✓ Takeoff CSV successfully generated and downloaded to your machine!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 13. CONTACT SUPPORT MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative space-y-4">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close contact modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                Studio inquiry &amp; support
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Contact SiteSketch Desk
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Reach our architectural engineering team for API integration or pilot onboarding.
              </p>
            </div>

            {contactError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{contactError}</span>
              </div>
            )}

            {contactStatusMessage ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg space-y-1.5 font-mono">
                  <div className="font-bold text-[11px] text-slate-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>INQUIRY QUEUED</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 font-sans">
                    {contactStatusMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Chen"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Studio Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@studio-chen.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Message / Technical Question
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your studio workflow or custom Revit BIM integration needs..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {contactLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" />}
                  <span>Submit Studio Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
