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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white font-sans antialiased justify-center items-center">
        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-red-500 flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Fatal Error
            </span>
            <h1 className="text-5xl font-serif tracking-tight leading-tight">
              A Fatal Error Occurred
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The application encountered a critical exception in the root shell.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="h-4 w-4" /> Reload Shell
          </button>
        </div>
      </body>
    </html>
  );
}
