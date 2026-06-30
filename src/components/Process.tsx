"use client";

import React from "react";
import { motion } from "framer-motion";

interface Step {
  num: string;
  title: string;
  description: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Discovery & Alignment",
    description: "We deep-dive into your business model, target demographics, and current technical debt to find hidden leverage points.",
    details: ["Stakeholder interviews", "Competitor indexing", "SEO keyword footprint mapping"],
  },
  {
    num: "02",
    title: "Strategic Blueprinting",
    description: "We deliver a comprehensive roadmap outlining architecture design, AI integration points, and high-impact SEO structures.",
    details: ["Information architecture layout", "Automation flow diagrams", "Technical project scope validation"],
  },
  {
    num: "03",
    title: "High-Fidelity Design",
    description: "We handcraft editorial, bespoke UI/UX designs mapping exactly to your brand image. No templates, ever.",
    details: ["Custom interactive wireframes", "Unique typography selections", "Fluid prototype walkthroughs"],
  },
  {
    num: "04",
    title: "Precision Engineering",
    description: "Our developers translate design sheets into clean Next.js/Tailwind codebases with zero visual compromises and optimized speed.",
    details: ["Next.js App Router structures", "Hardware-accelerated animations", "Responsive breakpoint tests"],
  },
  {
    num: "05",
    title: "Validation & Launch",
    description: "We push the codebase through heavy Lighthouse speed diagnostics, accessibility protocols, and index setups.",
    details: ["95+ core web vital audit", "Schema and JSON-LD check", "Structured sitemap generation"],
  },
  {
    num: "06",
    title: "Continuous Growth",
    description: "We manage and scale your site, run local SEO updates, update content, and integrate new AI assistants as your business scales.",
    details: ["A/B landing page testing", "Local SEO audits", "Monthly analytics reports"],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
            Our Process
          </h2>
          <p className="max-w-md mx-auto text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            A linear, six-stage workflow designed for transparent execution, clean engineering, and consistent business growth.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-100 dark:border-zinc-900 ml-4 md:ml-12 pl-8 md:pl-16 space-y-16 py-4">
          {STEPS.map((step, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={step.num}
              className="relative group"
            >
              {/* Timeline Indicator Badge */}
              <div className="absolute -left-[53px] md:-left-[89px] top-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-900 dark:text-white group-hover:border-brand-accent transition-all duration-300">
                {step.num}
              </div>

              {/* Step Info Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-white group-hover:text-brand-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Specific Deliverables List */}
                <div className="lg:col-span-7 flex flex-wrap gap-2 lg:pl-10">
                  {step.details.map((detail) => (
                    <span
                      key={detail}
                      className="px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/80 text-xs font-mono text-zinc-600 dark:text-zinc-400"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
