"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import Workflow from "@/components/Workflow";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import TrialModal from "@/components/TrialModal";
import WalkthroughModal from "@/components/WalkthroughModal";
import ChangelogModal from "@/components/ChangelogModal";

export default function Home() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("pro");
  const [userEmail, setUserEmail] = useState<string>("");
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);

  const handleOpenTrial = (tier: string = "pro", email: string = "") => {
    setSelectedTier(tier);
    if (email) setUserEmail(email);
    setTrialModalOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://sitesketch.online/#software",
        "name": "SiteSketch",
        "alternateName": "SiteSketch Spatial Engine",
        "applicationCategory": "DesignApplication, MultimediaApplication",
        "operatingSystem": "Web Browser, Cloud SaaS",
        "description":
          "SiteSketch transforms hand-drawn pencil schematics, CAD layouts, and raw job-site shells into immersive 3D interior renders, material schedules, and automated cost estimates.",
        "offers": {
          "@type": "Offer",
          "price": "24.00",
          "priceCurrency": "USD",
          "priceValidUntil": "2027-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.92",
          "ratingCount": "1420"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://sitesketch.online/#organization",
        "name": "SiteSketch Technologies, Inc.",
        "url": "https://sitesketch.online",
        "logo": "https://sitesketch.online/favicon.svg",
        "sameAs": [
          "https://twitter.com/sitesketch",
          "https://github.com/sitesketch",
          "https://linkedin.com/company/sitesketch"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* JSON-LD Rich Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenTrial={handleOpenTrial}
        onOpenChangelog={() => setChangelogOpen(true)}
      />

      {/* Main SaaS Sections */}
      <main>
        {/* 1. Hero Section with Studio Canvas & Interactive Before/After Slider */}
        <Hero
          onOpenTrial={handleOpenTrial}
          onOpenWalkthrough={() => setWalkthroughOpen(true)}
        />

        {/* 2. Core Product Features (Maximized B2B Feature Grid + Live Demo Tab Switcher) */}
        <FeaturesGrid onOpenTrial={handleOpenTrial} />

        {/* 3. Production Pipeline (How It Works 4-Step Pipeline + Style Presets) */}
        <Workflow onOpenTrial={() => handleOpenTrial("pro")} />

        {/* 4. Integration Ecosystem Section (Revit, AutoCAD, Blender, SketchUp, Figma, AWS) */}
        <Integrations onOpenTrial={() => handleOpenTrial("enterprise")} />

        {/* 5. Transparent SaaS Pricing Bracket (Starter Studio, Professional Firm, Enterprise) */}
        <Pricing onOpenTrial={handleOpenTrial} />

        {/* 6. FAQ Section (Architectural & Software Focus) */}
        <FAQ onOpenTrial={() => handleOpenTrial("pro")} />
      </main>

      {/* Global Architectural SaaS Footer */}
      <Footer
        onOpenTrial={handleOpenTrial}
        onOpenChangelog={() => setChangelogOpen(true)}
      />

      {/* Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        defaultTier={selectedTier}
        defaultEmail={userEmail}
      />

      <WalkthroughModal
        isOpen={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
        onOpenTrial={() => {
          setWalkthroughOpen(false);
          handleOpenTrial("pro");
        }}
      />

      <ChangelogModal
        isOpen={changelogOpen}
        onClose={() => setChangelogOpen(false)}
        onOpenTrial={() => {
          setChangelogOpen(false);
          handleOpenTrial("pro");
        }}
      />
    </div>
  );
}
