"use client";

import React from "react";
import { ShieldCheck, Zap, Heart } from "lucide-react";

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    icon: <Zap className="h-5 w-5 text-brand-accent" />,
    title: "Technical Rigor",
    description: "Sub-second load times, clean semantic typography, zero dependencies bloating, and optimized schemas are our code standard.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-brand-accent" />,
    title: "Editorial Quality",
    description: "We reject typical cookie-cutter SaaS templates. Every grid, border, and interaction is designed to feel custom-tailored.",
  },
  {
    icon: <Heart className="h-5 w-5 text-brand-accent" />,
    title: "Radical Partnership",
    description: "We work directly as an extension of your growth team, providing honest strategy updates, transparent copy, and strict milestones.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#080808]/40"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Founders Story and Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Portrait Box */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative text-center space-y-4 z-10">
                {/* Clean minimalist abstract silhouette representing the founder */}
                <div className="h-32 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-brand-accent mx-auto flex items-center justify-center text-4xl grayscale">
                  👤
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Ashish Jaiswal</h4>
                  <p className="text-xs font-mono text-brand-accent">Founder & Lead Engineer</p>
                </div>
                <p className="text-[11px] text-zinc-400 max-w-[200px] leading-normal">
                  Over a decade engineering visual interfaces and custom automation backends.
                </p>
              </div>
            </div>
          </div>

          {/* Copy Story */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight leading-tight">
                Designed to earn trust.
              </h2>
            </div>
            
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Sitesketch.ai was founded to challenge the paradigm of mediocre website design. We noticed too many agencies shipping sluggish, cookie-cutter templates that fail to engage premium clients or capture organic keywords.
            </p>
            
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We bridge the gap between creative visual artistry and precise Next.js engineering. By embedding semantic SEO structures directly into our design architecture and layering in custom AI assistants, we construct websites that serve as automated growth platforms.
            </p>

            <blockquote className="border-l-2 border-brand-accent pl-6 italic text-zinc-800 dark:text-zinc-200 text-lg font-serif">
              &ldquo;Our mission is to help ambitious companies command premium rates, build absolute buyer authority, and automate operational workflows.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Agency Values */}
        <div className="pt-12 border-t border-zinc-200/60 dark:border-zinc-900/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val) => (
              <div key={val.title} className="space-y-4 p-4 rounded-2xl">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
