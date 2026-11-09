"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteSketchLogo } from "./ArchitecturalSVGs";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenTrial?: (tier?: string) => void;
  onOpenChangelog?: () => void;
}

export default function Navbar({
  onOpenTrial = () => {},
  onOpenChangelog = () => {}
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Spatial Engine", href: "/#spatial-engine" },
    { name: "Features", href: "/#features" },
    { name: "Workflow", href: "/#workflow" },
    { name: "Integrations", href: "/#integrations" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <SiteSketchLogo className="w-8 h-8" />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                SiteSketch
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 text-cyan-400 border border-slate-700/80">
                v2.4
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 p-1 rounded-full bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenChangelog}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Changelog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onOpenTrial("signin")}
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              onClick={() => onOpenTrial("trial")}
              className="relative group overflow-hidden px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => onOpenTrial("trial")}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Free Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-900 font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChangelog();
              }}
              className="px-3 py-2 rounded-lg text-sm text-left text-slate-300 hover:text-amber-400 hover:bg-slate-900 font-medium flex items-center justify-between"
            >
              <span>Changelog</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                v2.4 Live
              </span>
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial("signin");
              }}
              className="w-full py-2.5 rounded-lg border border-slate-800 text-slate-300 text-xs font-semibold text-center hover:bg-slate-900"
            >
              Sign In to Studio
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial("trial");
              }}
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold text-center shadow-lg"
            >
              Start Free Trial (5 Renders)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
