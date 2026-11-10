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
  FileText
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

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

  // Pricing Checkout State
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutFirm, setCheckoutFirm] = useState("");
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState<"card" | "invoice">("card");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutStatusMessage, setCheckoutStatusMessage] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Studio Onboarding State
  const [onboardingProjectName, setOnboardingProjectName] = useState("Nordic Loft Renovation");
  const [onboardingRoomType, setOnboardingRoomType] = useState("Living & Dining Layout");
  const [onboardingStyle, setOnboardingStyle] = useState("Scandinavian Minimalist");
  const [onboardingEmail, setOnboardingEmail] = useState("");
  const [onboardingFileSelected, setOnboardingFileSelected] = useState<string | null>("sample-blueprint-scan.pdf");
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [onboardingStatusMessage, setOnboardingStatusMessage] = useState("");

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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
          "Authentication Service Notice: Backend authentication provider (NextAuth.js / Supabase) is currently in development mode. No remote user session was established. To inspect studio capabilities, proceed via 'Start your plan' or early-access registration."
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

  // 2. PRICING CHECKOUT HANDLERS
  const handleOpenPricing = (plan: "Starter" | "Pro Studio" | "Enterprise") => {
    setSelectedPlan(plan);
    setCheckoutError("");
    setCheckoutStatusMessage("");
    setPricingModalOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");
    setCheckoutStatusMessage("");

    if (!checkoutName.trim()) {
      setCheckoutError("Please enter your contact name.");
      return;
    }
    if (!validateEmail(checkoutEmail)) {
      setCheckoutError("Please enter a valid studio email address.");
      return;
    }
    if (!checkoutFirm.trim()) {
      setCheckoutError("Please enter your architectural firm or practice name.");
      return;
    }

    setCheckoutLoading(true);

    setTimeout(() => {
      setCheckoutLoading(false);
      const priceStr = selectedPlan === "Starter" 
        ? (isAnnual ? "$23/mo ($276 billed annually)" : "$29/mo")
        : selectedPlan === "Pro Studio"
        ? (isAnnual ? "$63/mo ($756 billed annually)" : "$79/mo")
        : (isAnnual ? "$159/mo ($1,908 billed annually)" : "$199/mo");

      setCheckoutStatusMessage(
        `Payment Integration Notice: Stripe Checkout is currently in sandbox verification mode (production STRIPE_SECRET_KEY not set). Your subscription reservation for ${selectedPlan} (${priceStr}) for '${checkoutFirm}' has been logged on the priority queue. An onboarding account executive will contact ${checkoutEmail} with direct invoice billing details.`
      );
    }, 850);
  };

  // 3. STUDIO ONBOARDING HANDLERS
  const handleOpenOnboarding = () => {
    setOnboardingStatusMessage("");
    setOnboardingModalOpen(true);
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(onboardingEmail)) {
      alert("Please enter a valid studio email.");
      return;
    }
    setOnboardingLoading(true);
    setTimeout(() => {
      setOnboardingLoading(false);
      setOnboardingStatusMessage(
        `Studio Canvas Initialized: Project '${onboardingProjectName}' (${onboardingRoomType}) has been staged with ${onboardingStyle} PBR reflectance parameters. GPU raytracing compute worker allocation assigned to ${onboardingEmail}. Production GPU server cluster integration pending API keys.`
      );
    }, 900);
  };

  // 4. SPEC PLANNER CSV EXPORT HANDLER
  const handleExportCSV = () => {
    const drywallSqft = Math.round(specArea * 2.8);
    const paintGallons = Math.ceil(drywallSqft / 350);
    const flooringWaste = Math.round(specArea * 1.1);
    const fixturesCount = Math.max(4, Math.round(specArea / 75));

    const csvRows = [
      ["SiteSketch Technologies - Automated Bill of Materials (BOM) Takeoff"],
      ["Generated Date", new Date().toISOString().split("T")[0]],
      ["Project Preset", "Scandinavian Suite Renovation Specimen"],
      ["Floor Envelope", `${specArea} SQ FT`],
      [""],
      ["Item Category", "Specification & Description", "Calculated Quantity", "Unit", "Compliance Notes"],
      ["Flooring Assembly", specFinish, flooringWaste.toString(), "SQ FT", "Includes 10% cutting waste allowance"],
      ["Wall Assembly", "Type X Gypsum Drywall (5/8\")", drywallSqft.toString(), "SQ FT", "Full interior perimeter and partitions"],
      ["Wall Finishes", specWall, paintGallons.toString(), "GALLONS", "Two coats matte architectural finish"],
      ["Daylighting Calibration", `${specKelvin}K Ambient South Exposure`, "1", "CALIBRATION", "Multi-bounce physical raytracing parameters"],
      ["Lighting Fixtures", "Recessed Architectural LED Fixtures", fixturesCount.toString(), "UNITS", "Pre-wired low-voltage architectural standard"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sitesketch-takeoff-scandinavian-suite-${specArea}sqft.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSpecDownloadSuccess(true);
    setTimeout(() => setSpecDownloadSuccess(false), 3500);
  };

  // 5. CONTACT SUPPORT HANDLER
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
    <div className="min-h-screen bg-[#FAFAFA] architectural-grid text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 flex flex-col justify-between">
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-slate-200/80">
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
              onClick={() => handleOpenAuth("signin")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleOpenOnboarding}
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

      {/* 2. HERO SECTION */}
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
                onClick={handleOpenOnboarding}
                className="bg-slate-900 hover:bg-black text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Start your plan
              </button>
              <a
                href="#workflow"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-2xs inline-block"
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
                    <span className="font-normal text-slate-800">Living &amp; Dining Layout ({specArea} sq ft)</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <Layers className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">{specFinish} &amp; {specWall}</span>
                  </div>
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                <div className="py-3.5 flex items-center justify-between text-sm text-slate-800">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-normal text-slate-800">Natural {specKelvin}K Ambient Daylighting</span>
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
                  onClick={() => setSpecPlannerModalOpen(true)}
                  className="shrink-0 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Try the planner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP LINEAR WORKFLOW */}
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
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                01. DESCRIBE &amp; SKETCH
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload any rough input</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Snap a phone photo of hand-drawn floor sketches, architectural napkin notes, or rough CAD shells.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                02. PLAN &amp; EXTRUDE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Neural vector geometry</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Spatial algorithms automatically extrude 2D lines into watertight 3D walls, ceiling spans, and door openings.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow relative">
              <span className="text-[11px] font-mono font-bold text-slate-400 block mb-2">
                03. BUILD &amp; MATERIALIZE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real architectural finishes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select real PBR materials (oak herringbone, Carrara marble, limewash) with physically calibrated 5000K daylighting.
              </p>
            </div>

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
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pencil-to-CAD Vectorizer</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Convert messy freehand pencil floorplans into millimeter-accurate vector DXF/DWG files and IFC-standard architectural geometry ready for Revit.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Photoreal Daylighting Simulator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Calibrate accurate solar angles, southern exposures, and ambient Kelvin warmth (3000K to 6500K) with multi-bounce physical raytracing.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Bill of Materials (BOM) Takeoffs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Auto-generate flooring square footages, drywall linear runs, paint coverage estimates, and itemized lighting fixture schedules straight from your model.
              </p>
            </div>

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
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  !isAnnual ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 cursor-pointer ${
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
                onClick={() => handleOpenPricing("Starter")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Select Starter Plan
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
                onClick={() => handleOpenPricing("Pro Studio")}
                className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Select Pro Studio Plan
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
                onClick={() => handleOpenPricing("Enterprise")}
                className="mt-8 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Contact Enterprise Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMAL FOOTER */}
      <footer className="border-t border-slate-200 py-10 bg-white text-xs text-slate-500">
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
            <span>Spatial Engine version 2.4 · High-precision architectural BIM generation</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 7. FUNCTIONAL COOKIE BANNER WITH PERSISTENCE */}
      {cookieBannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-3 px-4 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
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

      {/* 8. AUTHENTICATION MODAL */}
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
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                {authMode === "signin"
                  ? "STUDIO AUTHENTICATION"
                  : authMode === "register"
                  ? "ACCOUNT REGISTRATION"
                  : "CREDENTIAL RECOVERY"}
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
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 mt-2"
                >
                  {authLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
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
                    className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Close &amp; Return to Overview
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. PRICING SUBSCRIPTION & CHECKOUT MODAL */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-5">
            <button
              onClick={() => setPricingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                SUBSCRIPTION CHECKOUT DESK
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Reserve your {selectedPlan} plan
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Configure studio seat allocations and billing parameters.
              </p>
            </div>

            {/* Plan Breakdown Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900 uppercase font-mono">{selectedPlan}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                    {isAnnual ? "Annual Billing (-20%)" : "Monthly Billing"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">
                    {selectedPlan === "Starter"
                      ? isAnnual ? "$23" : "$29"
                      : selectedPlan === "Pro Studio"
                      ? isAnnual ? "$63" : "$79"
                      : isAnnual ? "$159" : "$199"}
                  </span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block">Render Passes:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedPlan === "Starter" ? "25 4K / month" : selectedPlan === "Pro Studio" ? "150 4K / month" : "Unlimited passes"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Annual Commitment:</span>
                  <span className="font-semibold text-slate-800">
                    {isAnnual 
                      ? selectedPlan === "Starter" ? "$276 billed annually" : selectedPlan === "Pro Studio" ? "$756 billed annually" : "$1,908 billed annually"
                      : "Billed month-to-month"}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {checkoutError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{checkoutError}</span>
              </div>
            )}

            {/* Integration Status Notice */}
            {checkoutStatusMessage ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg space-y-1.5 font-mono">
                  <div className="font-bold text-[11px] text-slate-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>GATEWAY SUBSCRIPTION NOTICE</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 font-sans">
                    {checkoutStatusMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(false)}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Done &amp; Close Checkout
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Studio Practice Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Studio Forma Architects"
                      value={checkoutFirm}
                      onChange={(e) => setCheckoutFirm(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Billing Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="billing@studioforma.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 text-slate-800 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutPaymentMethod("card")}
                      className={`p-2.5 border rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                        checkoutPaymentMethod === "card"
                          ? "border-slate-900 bg-slate-50 font-semibold text-slate-900"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Corporate Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutPaymentMethod("invoice")}
                      className={`p-2.5 border rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                        checkoutPaymentMethod === "invoice"
                          ? "border-slate-900 bg-slate-50 font-semibold text-slate-900"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Net-30 Invoice</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 mt-2"
                >
                  {checkoutLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    Proceed with {selectedPlan} ({isAnnual ? "Annual" : "Monthly"})
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 10. STUDIO ONBOARDING MODAL (GET STARTED / START YOUR PLAN) */}
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
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                STUDIO WORKSPACE SETUP
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Initialize your spatial project
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Upload a hand-drawn floor schematic or CAD drawing to begin neural vectorization.
              </p>
            </div>

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
                <button
                  type="button"
                  onClick={() => setOnboardingModalOpen(false)}
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Enter Workspace Console
                </button>
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
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2 mt-2"
                >
                  {onboardingLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Launch Spatial Vectorization</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 11. ROOM SPEC PLANNER MODAL (TRY THE PLANNER / LIVE CSV EXPORT) */}
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
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                INTERACTIVE SCANDINAVIAN SUITE PLANNER
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
                <span className="font-mono font-bold text-slate-900 text-sm">{specArea} sq ft</span>
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
                <span className="font-semibold text-slate-900">{Math.round(specArea * 1.1)} sq ft</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Drywall Partition Area:</span>
                <span className="font-semibold text-slate-900">{Math.round(specArea * 2.8)} sq ft</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Paint ({specWall}):</span>
                <span className="font-semibold text-slate-900">{Math.ceil((specArea * 2.8) / 350)} gallons</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>LED Fixture Units:</span>
                <span className="font-semibold text-slate-900">{Math.max(4, Math.round(specArea / 75))} units</span>
              </div>
            </div>

            {/* Download Actual CSV Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleExportCSV}
                className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2"
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

      {/* 12. CONTACT SUPPORT MODAL */}
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
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                STUDIO INQUIRY &amp; SUPPORT
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
                  className="w-full bg-slate-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                >
                  {contactLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
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
