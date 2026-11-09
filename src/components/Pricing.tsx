"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";

interface PricingProps {
  onOpenTrial: (tier?: string) => void;
}

export default function Pricing({ onOpenTrial }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      id: "starter",
      name: "Starter Studio",
      monthlyPrice: 29,
      annualPrice: 24,
      target: "Solo interior designers and freelance draftsmen.",
      highlighted: false,
      ctaText: "Start Free 14-Day Trial",
      ctaTier: "starter",
      features: [
        "25 High-Resolution Renders / month",
        "2D Sketch & CAD Vectorization",
        "Standard 1080p Export",
        "3 Active Project Workspaces",
        "Community Support & Standard Cloud Storage"
      ]
    },
    {
      id: "pro",
      name: "Professional Firm",
      badge: "MOST POPULAR",
      monthlyPrice: 79,
      annualPrice: 64,
      target: "Growing design practices, boutique architecture studios, and contractors.",
      highlighted: true,
      ctaText: "Claim 14-Day Pro Trial",
      ctaTier: "pro",
      features: [
        "150 Ultra-HD 4K Renders / month",
        "Automated Bill of Materials (BOM) & Takeoff Exports",
        "Raw Framing-to-Finish Site Staging",
        "Unlimited Project Workspaces",
        "Interactive 360° Client Viewer Links",
        "Priority GPU Cloud Rendering Queue"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise & Development Teams",
      monthlyPrice: 199,
      annualPrice: 159,
      target: "Large commercial architectural firms and multi-site real estate developers.",
      highlighted: false,
      ctaText: "Deploy Enterprise Workspace",
      ctaTier: "enterprise",
      features: [
        "Unlimited 4K & 8K Ultra-HD Spatial Renders",
        "Multi-Seat Team Collaboration (Up to 10 Seats included)",
        "Custom Material & Vendor Catalog Integration",
        "Dedicated High-Throughput API Access & Webhook Feeds",
        "Enterprise SSO, Role-Based Access Controls & SLA"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
            TRANSPARENT SAAS SUBSCRIPTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Flexible Licensing for Every Studio Size
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            All plans include a 14-day fully-featured trial. No hardware setups or local GPUs required.
          </p>

          {/* Interactive Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="flex items-center p-1 rounded-full bg-slate-900 border border-slate-800 backdrop-blur-md">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  !isAnnual
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isAnnual
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>Annual Billing</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isAnnual
                      ? "bg-slate-950 text-cyan-400"
                      : "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Clean Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-slate-900 border-2 border-cyan-400 shadow-[0_0_50px_-10px_rgba(6,182,212,0.35)] scale-100 lg:-translate-y-2 z-10"
                    : "bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono text-[10px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{tier.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{tier.target}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-100 font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / month {isAnnual ? "(billed annually)" : ""}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      WHAT&apos;S INCLUDED:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-cyan-400" : "text-slate-400"}`} />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => onOpenTrial(tier.ctaTier)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      tier.highlighted
                        ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center mt-2.5">
                    <span className="text-[10px] font-mono text-slate-500">
                      14-day free trial • Cancel anytime
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-slate-400 text-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>SOC2 Type II &amp; AES-256 Cloud Security</span>
          </div>
          <div className="hidden sm:inline text-slate-700">•</div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Zero Public Model Training on Studio Assets</span>
          </div>
          <div className="hidden sm:inline text-slate-700">•</div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>99.9% GPU Cloud Availability SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

