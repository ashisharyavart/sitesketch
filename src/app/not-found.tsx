"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-white dark:bg-[#0a0a0a] text-foreground relative overflow-hidden font-sans">
        {/* Noise background */}
        <div className="noise-bg" />
        
        {/* Grid lines or abstract background details */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Error 404
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-tight text-zinc-900 dark:text-white leading-tight">
              Lost in Space
            </h1>
            
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The page you are looking for doesn't exist, has been moved, or was sketchily drafted. Let's get you back on track.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
