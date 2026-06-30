"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  detail: string;
}

const STATS: StatItem[] = [
  {
    value: "150+",
    label: "Projects Delivered",
    detail: "Handcrafted web applications built to precision specifications.",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    detail: "Long-term relationships rooted in engineering excellence.",
  },
  {
    value: "4.9★",
    label: "Average Rating",
    detail: "Top-tier client rating across verified directories.",
  },
  {
    value: "99%",
    label: "System Uptime",
    detail: "Consistent edge delivery for high-performance hosting.",
  },
];

export default function Statistics() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white dark:bg-[#0a0a0a] border-b border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 dark:divide-zinc-900">
          {STATS.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={stat.label}
              className="flex flex-col space-y-3 pt-8 sm:pt-0 sm:pl-8 lg:pl-10 first:pt-0 first:pl-0"
            >
              <span className="text-5xl md:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-[200px]">
                  {stat.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
