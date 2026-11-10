"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface FAQProps {
  onOpenTrial: () => void;
}

export default function FAQ({ onOpenTrial }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can SiteSketch interpret rough pencil drawings and site measurements?",
      a: "Yes. The vision engine parses hand-drawn floor plans, elevation sketches, and dimensional handwritten notations into clean geometry. Our spatial OCR model recognizes door swings, load-bearing double walls, and window openings from phone snapshots of tracing paper, napkins, or job-site sketches."
    },
    {
      q: "How does the Bill of Materials (BOM) get calculated?",
      a: "When a render is produced, SiteSketch segments spatial planes and furniture models, cross-referencing floor areas and fixture volumes against industry standard dimensional guidelines. It calculates square footages for flooring, wall coverage for millwork or paint, linear dimensions for baseboards, and generates an itemized, exportable CSV/PDF schedule."
    },
    {
      q: "Can I export my project to AutoCAD or Revit?",
      a: "Pro and Enterprise tiers include direct spatial schema exports compatible with DXF/DWG formats and common 3D packages. You can download clean 2D vector CAD drawings, IFC 4.3 BIM parametric models, and glTF 2.0 PBR asset packages ready for AutoCAD, Revit, SketchUp, and Blender."
    },
    {
      q: "Is my proprietary design data secure?",
      a: "Yes. Projects are encrypted in transit via TLS and stored in secure cloud storage. Your drawings and proprietary floorplan files remain your exclusive property and are never shared or made public."
    },
    {
      q: "How does the floorplan line detection work?",
      a: "SiteSketch analyzes uploaded sketches and floorplans to identify wall perimeters, interior partition runs, window openings, and door swings. You can review and adjust dimensions directly within the interactive workspace before generating preliminary quantity takeoffs."
    },
    {
      q: "Can I invite team members and clients to view designs?",
      a: "Yes. Pro plans include interactive 360° client panoramic viewer links that open in any mobile or desktop browser without software downloads or logins. Clients can leave digital feedback pins and approve material finishes directly on the canvas."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 tracking-wider uppercase font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Architectural &amp; Software Answers
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about spatial accuracy, BIM interoperability, and platform security.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact CTA */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <h4 className="text-base font-bold text-slate-100">
            Ready to test your first napkin sketch?
          </h4>
          <p className="text-xs text-slate-400 font-mono">
            Get instant access to the Spatial Engine v2.4 Beta with 5 free high-resolution renders.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenTrial}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch SiteSketch Studio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
