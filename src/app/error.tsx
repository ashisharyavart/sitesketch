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
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-white dark:bg-[#0a0a0a] text-foreground relative overflow-hidden font-sans">
        {/* Noise background */}
        <div className="noise-bg" />
        
        {/* Grid lines or abstract background details */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-red-500 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4 animate-bounce" /> Error 500
            </span>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal tracking-tight text-zinc-900 dark:text-white leading-tight">
              System Overload
            </h1>
            
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Something went wrong behind the scenes. Our digital frameworks encountered an unexpected exception.
            </p>
          </div>

          {/* Diagnostic info */}
          {error.message && (
            <div className="w-full text-left bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900/80 rounded-2xl p-4 font-mono text-xs text-zinc-500 dark:text-zinc-500 max-h-32 overflow-y-auto">
              <span className="text-red-500 font-semibold">Error Message:</span> {error.message}
              {error.digest && (
                <div className="mt-1">
                  <span className="text-zinc-400 dark:text-zinc-600">Digest ID:</span> {error.digest}
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
