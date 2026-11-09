"use client";

import React from "react";
import Link from "next/link";
import { SiteSketchLogo } from "./ArchitecturalSVGs";

interface FooterProps {
  onOpenTrial?: (tier?: string) => void;
  onOpenChangelog?: () => void;
}

export default function Footer({ onOpenTrial, onOpenChangelog }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 pt-16 pb-12 relative overflow-hidden">
      {/* Background blueprint subtle grid */}
      <div className="absolute inset-0 blueprint-dots opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Tagline (col-span-2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <SiteSketchLogo className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                SiteSketch
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                SaaS v2.4
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The generative spatial engine turning rough concepts into photorealistic environments and accurate project takeoffs.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM CLOUD OPERATIONAL
              </span>
              <span>•</span>
              <span>AES-256 ENCRYPTED</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#spatial-engine" className="hover:text-cyan-400 transition-colors">
                  Spatial Engine
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  Framing Staging
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  BOM Generator
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenTrial && onOpenTrial("enterprise")}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  API Documentation
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span>System Status</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#workflow" className="hover:text-cyan-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-cyan-400 transition-colors">
                  Design Token Library
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  Community Showcase
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenChangelog}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Changelog</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800">
                    v2.4
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Legal &amp; Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#spatial-engine" className="hover:text-cyan-400 transition-colors">
                  About SiteSketch
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#integrations" className="hover:text-cyan-400 transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Cookie Settings
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© 2026 SiteSketch Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Cloud Spatial Architecture</span>
            <span>•</span>
            <span>Autonomous BOM Intelligence</span>
            <span>•</span>
            <span className="text-cyan-400">sitesketch.online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
