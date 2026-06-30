"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 15,
      },
    },
  };

  const capabilities = [
    "Premium Websites",
    "AI Automations",
    "SEO Systems",
    "Performance Optimization",
  ];

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 bg-white dark:bg-[#0a0a0a]"
    >
      {/* Editorial Grid Gridlines - Subtle lines for premium architectural aesthetics */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-20 dark:opacity-30">
        <div className="border-r border-zinc-200 dark:border-zinc-900 h-full" />
        <div className="border-r border-zinc-200 dark:border-zinc-900 h-full" />
        <div className="border-r border-zinc-200 dark:border-zinc-900 h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Subtle Accent pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-600 dark:bg-zinc-900/50 dark:border-zinc-800 text-xs font-mono tracking-wider uppercase dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
              Intelligence Meets Design
            </span>
          </motion.div>

          {/* Premium editorial headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-zinc-900 dark:text-white leading-[1.05] tracking-tight max-w-4xl"
          >
            Websites engineered to{" "}
            <span className="italic font-light text-zinc-400 dark:text-zinc-500">earn trust</span>
            , generate leads and{" "}
            <span className="relative inline-block text-zinc-900 dark:text-white">
              scale businesses
            </span>
            .
          </motion.h1>

          {/* Subtext capabilities list */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto flex flex-wrap justify-center items-center gap-y-3 gap-x-6 text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium"
          >
            {capabilities.map((cap) => (
              <span key={cap} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-accent flex-shrink-0" />
                {cap}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm transition-all duration-300 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] focus:outline-none"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white font-semibold text-sm transition-all focus:outline-none"
            >
              View Projects
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Decorative premium radial shadows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
