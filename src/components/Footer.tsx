"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#080808] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Pitch */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <a href="#home" className="flex items-center gap-2 focus:outline-none">
              <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                sitesketch
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                <span className="text-xs font-mono font-normal opacity-50">.ai</span>
              </span>
            </a>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              We design and engineer bespoke web interfaces, automated intelligence pipelines, and organic growth architectures that transform brands into market authorities.
            </p>
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
              CRAFTED WITH PRECISION • 2026 SITESKETCH
            </div>
          </div>

          {/* Quick links & Contact details */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-600">Links</h4>
              <ul className="space-y-2.5">
                {["Home", "Work", "Services", "Process", "About", "FAQ"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-600">Connect</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "X / Twitter", href: "https://x.com" },
                  { label: "Instagram", href: "https://instagram.com" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-accent dark:hover:text-brand-accent transition-colors group"
                    >
                      {item.label}
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              Receive Design & Tech Insights
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Subscribe to get modern UI inspiration, AI growth case studies, and web design tips directly in your inbox. No spam, ever.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all pr-24"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all"
              >
                Subscribe
              </button>
            </form>
            
            {subscribed && (
              <span className="text-xs text-brand-accent font-medium mt-1 animate-fade-in">
                Thank you for subscribing! Keep an eye on your inbox.
              </span>
            )}
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="border-t border-zinc-100 dark:border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} Sitesketch.ai. All rights reserved. Registered agency.
          </p>
          <div className="flex space-x-6">
            <a
              href="#privacy"
              className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
