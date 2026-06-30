"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How long does a custom website take to build?",
    answer: "Typically, a custom high-end marketing website takes 4 to 8 weeks from discovery to launch. This timeline varies based on requirements like complex animations, extensive page structures, custom API configurations, or custom AI agent database setups. We establish strict deadlines during stage two of our strategic process.",
  },
  {
    question: "How much does a custom website cost?",
    answer: "Our projects start at $5,000 for bespoke landing pages and $10,000 for full marketing portals. Because we build custom Next.js configurations that perform under 1s load speeds, with customized copywriting and SEO structures, each quote is custom-tailored to the business's goals, features, and scale.",
  },
  {
    question: "Do you provide search engine optimization (SEO)?",
    answer: "Yes, complete on-page and technical SEO are integrated into all our Next.js builds. We optimize heading structures, configure JSON-LD schemas (Local Business, Organization, FAQ, Product schemas), build custom robots.txt and sitemap.xml files, and structure copy specifically to index on modern search engines (Google, Bing) and AI search engines (ChatGPT, Gemini, Perplexity).",
  },
  {
    question: "Can you redesign existing websites?",
    answer: "Yes. We audit your existing website, map current page rankings to prevent loss of backlink equity, and design a modern, fast Next.js replacement. We ensure path redirects (301) are correctly set up so your organic keyword ranking transitions smoothly without interruption.",
  },
  {
    question: "Do you build custom AI automations and database integrations?",
    answer: "Yes, AI agent workflows are one of our core specialties. We design custom AI chatbots trained on your internal product files, voice agents for scheduling calls, and automate complex workflows to sync your web lead captures directly with your CRM, slack, or billing platforms.",
  },
  {
    question: "Will my website be mobile friendly and responsive?",
    answer: "Absolutely. Every interface we build is designed mobile-first. We rigorously test responsiveness on various device viewports (smartphones, tablets, notebooks, and large 4K displays) to guarantee perfect visual spacing, touch targets, and typography layouts.",
  },
  {
    question: "Do you offer website maintenance and support?",
    answer: "Yes, we offer ongoing maintenance SLA plans that cover secure hosting configuration, regular database backups, uptime monitoring, security patching, and standard layout content edits so you never have to worry about downtime or bugs.",
  },
  {
    question: "Can I update the content myself after launch?",
    answer: "Yes. Depending on your preference, we can integrate a headless content management system (such as Sanity, Contentful, or Strapi) that allows your marketing team to edit blogs, projects, and text fields without editing source code.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, we work with enterprise and startup clients globally. Our primary offices are located in the US and India, but our operations and asynchronous tools allow us to seamlessly collaborate across any timezone.",
  },
  {
    question: "How do we get started with Sitesketch.ai?",
    answer: "You can get started by clicking the 'Book a Discovery Call' button to schedule a 15-minute call. On the call, we will align on your project scope, target timeline, and budget. Within 48 hours, we'll provide a customized project proposal and timeline blueprint.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto text-sm text-zinc-500 dark:text-zinc-400">
            Clear, transparent answers about our design systems, pricing details, SEO integration, and timeline protocols.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900/30"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-medium text-zinc-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100/50 dark:border-zinc-900/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
