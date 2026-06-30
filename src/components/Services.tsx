"use client";

import React from "react";
import {
  Laptop,
  Layers,
  MessageSquare,
  Mic,
  GitBranch,
  Search,
  MapPin,
  FileCode,
  ShieldCheck,
  BarChart3,
  Zap,
} from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: <Laptop className="h-5 w-5" />,
    title: "Premium Website Design",
    description: "Individually handcrafted layouts, unique typographic hierarchy, and custom scroll mechanics that make your brand stand out from templated competitors.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "High-Converting Landing Pages",
    description: "Highly targeted single-page experiences built for performance, copy-optimized for maximum lead capture, and responsive across all viewports.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "AI Chatbots & Agents",
    description: "Intelligent support agents trained on your business data. Resolves 80%+ of typical questions instantly while qualifying premium leads.",
  },
  {
    icon: <Mic className="h-5 w-5" />,
    title: "Voice AI Integration",
    description: "Automated, conversational voice agents built to handle call routing, appointment scheduling, and customer inquiries on the phone.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Workflow Automation",
    description: "Sync your CRM, email campaigns, billing platform, and database in real-time, removing human friction and saving thousands of manual hours.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Bespoke Organic SEO",
    description: "Complete organic visibility strategy targeting high-intent keywords that direct qualified traffic straight to your website.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Local SEO Systems",
    description: "Rank #1 in maps. Optimization of Google Business profiles, citation directories, and location pages to bring local customers through your door.",
  },
  {
    icon: <FileCode className="h-5 w-5" />,
    title: "Technical SEO Audits",
    description: "Clean semantic markup, optimized schema tags, robots.txt management, dynamic sitemaps, and indexing strategies for AI search platforms.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Website Maintenance & Support",
    description: "Continuous hosting, security patches, plugin management, daily database backups, and instant bug fixes to keep your portal running smoothly.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Analytics & Attribution",
    description: "Transparent, real-time dashboards mapping search behavior, CTA click-through rates, booking logs, and customer journey attribution.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Performance Optimization",
    description: "Speed audits, image lazy loading, script bundling, CSS purging, and edge content delivery that delivers 95+ Core Web Vitals scores.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#080808]/40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
              Bespoke Services
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            From design to automation, we provide full-lifecycle systems to build authority, capture customers, and automate operational workflows.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-900/80 rounded-3xl p-8 hover:border-brand-accent/30 dark:hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Icon Container */}
                <div className="h-10 w-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300">
                  {service.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
