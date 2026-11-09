"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-28 relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>ERROR 404 // SPATIAL COORDINATE NOT FOUND</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
            Off the Blueprint
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            The spatial coordinates or architectural canvas you are trying to access does not exist or has been relocated.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Home className="w-4 h-4" /> Return to Studio
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Viewport
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
