"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-28 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 font-mono text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>RENDER PIPELINE EXCEPTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Spatial Computation Interrupted
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while executing the spatial engine pipeline. Our telemetry has logged the incident.
          </p>

          {error.message && (
            <div className="w-full text-left bg-slate-900 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-400 max-h-28 overflow-y-auto">
              <span className="text-amber-400 font-semibold">Error:</span> {error.message}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Restart Node
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs hover:border-slate-700 transition-colors"
            >
              <Home className="w-4 h-4" /> Return to Studio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
