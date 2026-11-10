"use client";

import React from "react";
import { SiteSketchLogo } from "./ArchitecturalSVGs";
import { X } from "lucide-react";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial?: () => void;
}

export default function ChangelogModal({ isOpen, onClose, onOpenTrial }: ChangelogModalProps) {
  if (!isOpen) return null;

  const logs = [
    {
      version: "v2.4.0",
      date: "November 2026",
      badge: "Current Beta Release",
      title: "Floorplan Vectorization & Preliminary Takeoff Engine",
      items: [
        "Introduced automatic floorplan line detection for scanned drawings and field sketches.",
        "Separated lighting preview controls with independent sky condition, time of day, and Kelvin options.",
        "Automated preliminary Bill of Materials (BOM) takeoff with 10% standard waste allowances and CSV export.",
        "DXF vector export preview with editable wall and door layer segmentation.",
        "Interactive architectural workspace with zoom, pan, and real-time element selection."
      ]
    },
    {
      version: "v2.3.2",
      date: "October 2026",
      badge: "Maintenance",
      title: "Hand-Drawn Sketch Recognition & Layer Segmentation",
      items: [
        "Enhanced sketch contrast filtering to support rough graphite strokes on grid paper.",
        "Recognizes standard architectural dimension formats (feet and inches).",
        "Distinguishes exterior load-bearing walls from interior partitions.",
        "Added sample DXF vector download support."
      ]
    },
    {
      version: "v2.2.0",
      date: "September 2026",
      badge: "Major Update",
      title: "Material Takeoffs & Construction Planning",
      items: [
        "Standard flooring and wall finishes catalog with illustrative unit pricing.",
        "Multi-stage construction planning preview (framing, rough-in, completed interior).",
        "TLS encrypted transit and secure cloud storage across all workspace files.",
        "Multi-seat studio team accounts for collaborative review."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <SiteSketchLogo className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                SiteSketch Changelog
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  PLATFORM ENGINE
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Continuous architectural rendering and BIM algorithm updates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Log Content */}
        <div className="overflow-y-auto space-y-6 py-5 pr-2">
          {logs.map((log, index) => (
            <div key={index} className="relative pl-6 border-l border-slate-800 space-y-3">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-sm">{log.version}</span>
                <span className="text-slate-500 font-mono text-xs">• {log.date}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {log.badge}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-200">{log.title}</h4>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {log.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs font-mono text-slate-500">
            Powered by SiteSketch Spatial Core
          </span>
          <button
            onClick={() => {
              onClose();
              if (onOpenTrial) onOpenTrial();
            }}
            className="py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Test v2.4 Engine Free
          </button>
        </div>
      </div>
    </div>
  );
}
