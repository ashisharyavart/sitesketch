"use client";

import React from "react";
import { IntegrationLogos } from "./ArchitecturalSVGs";
import { ArrowRight, ShieldCheck, Code2, Sparkles } from "lucide-react";

interface IntegrationsProps {
  onOpenTrial: () => void;
}

export default function Integrations({ onOpenTrial }: IntegrationsProps) {
  return (
    <section id="integrations" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
            INTEROPERABILITY &amp; EXPORT ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
            Designed to Plug Directly Into Your Architectural Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Never get trapped inside a walled garden. SiteSketch exports native geometry schemas, material schedules, and 3D glTF/IFC files that fit right into your BIM workflow.
          </p>
        </div>

        {/* Integration Grid with Vector Logos */}
        <IntegrationLogos />

        {/* Technical Interoperability Feature Box */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
              <Code2 className="w-4 h-4" />
              <span>IFC 4.3 &amp; DWG SCHEMAS</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">
              Bi-Directional CAD Accuracy
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extruded geometries preserve wall types, door swings, and window rough openings. Export layers ready for drafting in AutoCAD 2026 or Revit.
            </p>
          </div>

          <div className="space-y-3 lg:pl-6 pt-4 lg:pt-0">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4" />
              <span>PBR MATERIAL SHADERS</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">
              Blender &amp; Unreal Engine Ready
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export glTF 2.0 and OBJ packages containing calibrated normal, roughness, metallic, and ambient occlusion texture maps.
            </p>
          </div>

          <div className="space-y-3 lg:pl-6 pt-4 lg:pt-0">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>CLOUD SECURITY ARCHITECTURE</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">
              AES-256 Storage &amp; Zero Retention
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sync automatically to enterprise AWS S3 buckets or Google Drive folders with customer-managed encryption keys.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenTrial}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs transition-all shadow-md cursor-pointer"
          >
            <span>Explore API Documentation &amp; Revit Plugin SDK</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
