"use client";

import React from "react";
import { Sparkles, ArrowUpRight, Search, Code } from "lucide-react";

export default function SEOContent() {
  return (
    <section
      id="seo-insights"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Industry Authority
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
              Web Engineering & SEO
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            A comprehensive guide to building trust, authority, and organic traffic through custom digital engineering.
          </p>
        </div>

        {/* Detailed Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Story column - spans 2 cols */}
          <div className="lg:col-span-2 space-y-8 text-zinc-600 dark:text-zinc-400 font-sans">
            <p className="text-lg leading-relaxed text-zinc-900 dark:text-zinc-200 font-serif">
              SiteSketch.online is a premium digital design and web engineering firm that acts as the <strong>best website development company</strong> for modern businesses and creative professionals. In today's digital economy, an online presence is no longer just a digital business card; it is the primary engine for building authority, generating high-quality leads, and scaling operations. We specialize in high-end, responsive <strong>website development</strong> that merges visual storytelling with clean, performant Next.js code. Our mission is to build digital products that command trust, drive user engagement, and rank organically on search engines.
            </p>

            <p className="text-base leading-relaxed">
              As a client-first provider of <strong>website development services</strong>, we address the unique needs of diverse niches and professional industries. We understand that a cookie-cutter SaaS template or sluggish builder site will not help you stand out. Whether you are an architectural firm seeking dedicated <strong>interior design website development</strong> or a creative looking for a premium <strong>photographer portfolio website</strong>, our custom-engineered solutions are designed to turn casual visitors into lifelong clients. We reject bloated themes that degrade performance, instead handcrafting every grid, border, and interaction from the ground up to achieve sub-second load times.
            </p>

            <p className="text-base leading-relaxed">
              For local enterprises looking to dominate local search results and attract high-value clients, we operate as a dedicated <strong>local business website developer</strong>. We construct custom search-engine-optimized landing pages and full marketing portals that help local businesses command premium rates and stand out in their geographic markets. Furthermore, we are recognized as a leading <strong>real state website developer</strong>, creating responsive property showcase platforms, interactive map integrations, and lead capture systems that connect real estate brokerages with affluent buyers. By focusing on fast-loading interfaces and semantic markup, we help real estate agents rank for local search queries and convert visitors into property showings.
            </p>

            <p className="text-base leading-relaxed">
              A major focus of our work is building high-converting <strong>portfolio websites</strong>. We believe a <strong>portfolio website</strong> should do more than just display static images—it should narrate a journey of expertise, craftsmanship, and trust. For instance, our <strong>interior designer portfolio website</strong> layouts are meticulously structured to showcase spatial aesthetics, high-resolution textures, and detailed project case studies, while preserving sub-second page loads. Similarly, when we build a <strong>photographer portfolio website</strong>, we optimize image compression pipelines and implement native lazy-loading interfaces to ensure that beautiful imagery loads instantly, without compromising on site speed or visual fidelity.
            </p>

            <p className="text-base leading-relaxed">
              In addition to visual design and structural SEO, we integrate custom AI automation features into our client projects. For modern agencies, service providers, and local business platforms, static forms are no longer sufficient. We engineer custom AI chatbots trained on your business data, allowing your site to engage prospects, pre-qualify leads, and capture contact information 24/7. By pairing advanced <strong>website development</strong> with intelligent user-experience features, we transform standard portfolios and corporate portals into dynamic, self-optimizing pipelines that nurture clients from their very first visit.
            </p>
          </div>

          {/* Sidebar Feature Column */}
          <div className="lg:col-span-1 space-y-8 font-sans">
            {/* Tech Stack card */}
            <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 space-y-6">
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-brand-accent">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Uncompromising Engineering
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                As the <strong>best website development company</strong> in the industry, our engineering standard is uncompromising. We build on modern stacks using Next.js and React, styling with vanilla CSS for absolute control, and tailoring micro-interactions using framer-motion to create an immersive, tactile feel.
              </p>
            </div>

            {/* SEO Framework card */}
            <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 space-y-6">
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-brand-accent">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Technical SEO Audits
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Every <strong>website development</strong> project we undertake is embedded with advanced on-page and technical SEO frameworks. This includes optimized header hierarchies, structured semantic HTML, and automated JSON-LD schemas that ensure your site is readable not only by human eyes but also by search engine crawlers and modern AI-driven search models.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion Callout */}
        <div className="mt-16 md:mt-24 bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-[#0c0c0c] dark:to-[#080808] border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 font-sans">
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-2xl font-serif text-zinc-900 dark:text-white">
              Ready to elevate your online authority?
            </h3>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Whether you need a <strong>real state website developer</strong> to scale your brokerage, a <strong>local business website developer</strong> to boost foot traffic, or a stunning <strong>interior designer portfolio website</strong> to close high-end residential commissions, SiteSketch.online provides the engineering precision and design mastery to bring your vision to life. Our <strong>portfolio website</strong> services are trusted by designers, photographers, developers, and local businesses alike because we design with a single purpose: to build absolute trust. Contact us today to explore how our specialized <strong>website development services</strong> can elevate your brand.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Work with us <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
