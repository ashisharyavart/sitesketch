"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, CheckSquare, Sparkles } from "lucide-react";

interface Project {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  visualComponent: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Aura Dental Clinic",
    industry: "Dental & Healthcare",
    challenge: "Outdated legacy website with zero mobile support, leading to a high appointment drop-off rate and poor local SEO ranking.",
    solution: "Rebuilt with static generation for sub-second speeds. Integrated a frictionless online booking system and structured schema.",
    results: "+140% appointment inquiries, #1 rank for local high-value search terms within 90 days.",
    visualComponent: (
      <div className="relative w-full h-full bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative w-full max-w-[200px] aspect-square rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/50 shadow-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-zinc-400">APPT_01</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-6 w-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 rounded flex items-center px-2">
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">9:30 AM Confirmed</span>
            </div>
          </div>
          <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "project-2",
    title: "Vanguard Real Estate",
    industry: "Luxury Properties",
    challenge: "High-end buyers found their image-heavy portal sluggish. Standard templates failed to reflect the elegant nature of their listings.",
    solution: "Designed an editorial, media-optimized, server-side rendered application with smooth transitions and responsive multi-touch galleries.",
    results: "98% image load optimization, 3x increase in premium buyer session duration.",
    visualComponent: (
      <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900/40 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 border-r border-zinc-200/50 dark:border-zinc-800/30" />
        <div className="relative w-full max-w-[220px] aspect-[4/3] rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
          <div className="h-2/3 bg-zinc-200 dark:bg-zinc-800 relative flex items-center justify-center">
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-zinc-900/80 text-[8px] font-mono text-white tracking-widest">LUXE</div>
            <div className="w-10 h-10 border border-zinc-300 dark:border-zinc-700 rotate-45 flex items-center justify-center" />
          </div>
          <div className="p-3 space-y-1">
            <div className="h-2.5 w-24 bg-zinc-800 dark:bg-zinc-200 rounded" />
            <div className="h-2 w-12 bg-zinc-400 dark:bg-zinc-600 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "project-3",
    title: "Vanguard Juris",
    industry: "Corporate Law Firm",
    challenge: "Struggling to capture leads from corporate executives due to an outdated brand image and slow load speeds on mobile networks.",
    solution: "Created an ultra-minimalist, high-contrast, typographically-restrained web app emphasizing security compliance and instant speed.",
    results: "99 Lighthouse Performance score, 45% increase in online consult scheduling.",
    visualComponent: (
      <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-950/20 flex items-center justify-center p-8 overflow-hidden">
        <div className="relative w-full max-w-[180px] border-l-2 border-zinc-900 dark:border-zinc-100 pl-4 py-2 space-y-3">
          <div className="h-3 w-10 bg-brand-accent rounded-sm" />
          <div className="h-4 w-28 bg-zinc-900 dark:bg-zinc-100" />
          <div className="space-y-1">
            <div className="h-1 w-full bg-zinc-400 dark:bg-zinc-600" />
            <div className="h-1 w-5/6 bg-zinc-400 dark:bg-zinc-600" />
            <div className="h-1 w-2/3 bg-zinc-400 dark:bg-zinc-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "project-4",
    title: "Flowstate AI",
    industry: "SaaS Startup",
    challenge: "Complex product offering resulted in users bouncing off their landing page without realizing the platform's core automation value.",
    solution: "Developed an interactive, motion-rich presentation landing page with custom inline visual graphs mapping the product workflow.",
    results: "65% increase in sign-up conversions, FWA Site of the Day nominee.",
    visualComponent: (
      <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative w-full max-w-[210px] aspect-[16/10] bg-[#121212] border border-zinc-800 rounded-lg p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <span className="text-[7px] font-mono text-zinc-500">pipeline.ai</span>
          </div>
          <div className="flex gap-2 items-center flex-grow py-2">
            <div className="h-8 w-1/3 bg-zinc-800/80 rounded border border-zinc-700/50 flex flex-col justify-center items-center">
              <span className="text-[6px] text-zinc-400">Trigger</span>
              <span className="text-[8px] text-white font-semibold">Web Hook</span>
            </div>
            <div className="h-0.5 flex-grow bg-zinc-700 relative">
              <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <div className="h-8 w-1/3 bg-emerald-950/40 rounded border border-emerald-900/50 flex flex-col justify-center items-center">
              <span className="text-[6px] text-emerald-400">Action</span>
              <span className="text-[8px] text-emerald-300 font-semibold">Sync DB</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "project-5",
    title: "Bark & Purr Clinic",
    industry: "Veterinary Medicine",
    challenge: "Losing pet-parent client acquisitions to regional aggregators due to absence of local search footprint and difficult UX on mobile.",
    solution: "Designed a clean, compassionate mobile-first layout. Optimized Google Local Business profiles and integrated Structured Local Schema.",
    results: "+210% organic search reach, became top-rated veterinary clinic in local metro area.",
    visualComponent: (
      <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-900/30 flex items-center justify-center p-8 overflow-hidden">
        <div className="relative w-full max-w-[190px] bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-3 flex gap-3 shadow-md">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold">
            🐾
          </div>
          <div className="flex-grow space-y-1.5">
            <div className="h-3 w-20 bg-zinc-800 dark:bg-zinc-200 rounded" />
            <div className="h-2 w-28 bg-zinc-300 dark:bg-zinc-700 rounded" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-[10px]">★</span>
              ))}
              <span className="text-[8px] text-zinc-400 font-medium">(4.9)</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "project-6",
    title: "Studio Forma",
    industry: "Architecture & Design",
    challenge: "Portfolio did not scale visually on premium monitors, with jagged image renders and laggy scroll mechanics.",
    solution: "Created an immersive, hardware-accelerated image viewer using canvas elements, high-resolution source rendering, and subtle parallax.",
    results: "Featured in Godly and CallToInspiration, average session depth increased by 220%.",
    visualComponent: (
      <div className="relative w-full h-full bg-[#161616] flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-4 border border-zinc-800 flex flex-col justify-between p-3">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-zinc-500">FORMA_STUDIO</span>
            <span className="text-[9px] font-mono text-zinc-500">06 / 2026</span>
          </div>
          <div className="w-full flex justify-center py-4">
            <div className="h-12 w-20 border border-zinc-700 flex items-center justify-center relative">
              <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-800" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800" />
            </div>
          </div>
          <div className="h-2 w-12 bg-zinc-700" />
        </div>
      </div>
    ),
  },
];

export default function FeaturedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
              Selected Projects
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            A small curation of businesses we have transformed through clean engineering, custom AI integrations, and technical SEO.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer flex flex-col bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 rounded-3xl overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Visual Card Canvas */}
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-zinc-100 dark:border-zinc-900 relative">
                {project.visualComponent}
                {/* Floating Detail Trigger */}
                <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-white/95 dark:bg-zinc-900/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                  <ArrowUpRight className="h-4 w-4 text-zinc-900 dark:text-white" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-accent">
                    {project.industry}
                  </span>
                  <h3 className="text-xl font-medium text-zinc-900 dark:text-white mt-1 group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-6 border-t border-zinc-200/50 dark:border-zinc-800/40 pt-4 space-y-1 text-xs">
                  <span className="text-zinc-400 dark:text-zinc-500 font-mono block">RESULTS</span>
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {project.results}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Details */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Visual Header */}
              <div className="aspect-[2/1] w-full border-b border-zinc-200 dark:border-zinc-800">
                {activeProject.visualComponent}
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
                    Case Study — {activeProject.industry}
                  </span>
                  <h3 className="text-3xl font-serif font-normal text-zinc-900 dark:text-white mt-1">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <CheckSquare className="h-3 w-3 text-red-500" />
                      The Challenge
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-emerald-500" />
                      Our Solution
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-brand-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      Key Outcomes
                    </h4>
                    <p className="text-sm text-emerald-900 dark:text-emerald-200 font-semibold mt-0.5">
                      {activeProject.results}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold transition"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
