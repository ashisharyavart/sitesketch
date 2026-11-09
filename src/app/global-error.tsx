"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans antialiased justify-center items-center">
        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-amber-400 flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Fatal Shell Error
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Spatial Engine Exception
            </h1>
            <p className="text-sm text-slate-400">
              The application encountered a critical runtime exception in the root shell.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Reload Studio Shell
          </button>
        </div>
      </body>
    </html>
  );
}
