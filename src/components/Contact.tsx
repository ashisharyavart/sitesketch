"use client";

import React, { useState } from "react";
import { Mail, Calendar, MapPin, Send, Check } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Design",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", company: "", service: "Design", message: "" });
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left panel: Info + Calendly and Map */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
                Connect With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
                Let&apos;s build authority.
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                Ready to upgrade your web interfaces, automate your pipelines, or double your search capture? Reach out or book directly.
              </p>
            </div>

            {/* Direct details */}
            <div className="space-y-4 font-medium text-sm">
              <a
                href="mailto:contact@sitesketch.online"
                className="flex items-center gap-3 text-zinc-700 hover:text-brand-accent dark:text-zinc-300 dark:hover:text-brand-accent transition-colors"
              >
                <Mail className="h-5 w-5 text-zinc-400" />
                contact@sitesketch.online
              </a>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <MapPin className="h-5 w-5 text-zinc-400" />
                San Francisco, CA &amp; New Delhi, India
              </div>
            </div>

            {/* Calendly Booking Placeholder Widget */}
            <div className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-brand-accent" />
                <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                  Schedule instantly (15m discovery)
                </h4>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-normal">
                Book a quick discovery slot directly to align on scope, deliverables, and timelines.
              </p>
              
              {/* Calendly scheduler UI simulation */}
              <div className="border border-zinc-200/60 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 p-4 space-y-3">
                <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Select a Date &amp; Time
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Jul 1", "Jul 2", "Jul 3", "Jul 6"].map((day, i) => (
                    <button
                      key={day}
                      type="button"
                      className={`text-center py-2.5 rounded-lg border text-xs font-medium transition ${
                        i === 0
                          ? "border-brand-accent bg-emerald-50/30 text-brand-accent dark:bg-emerald-950/20"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-300 text-zinc-600 dark:border-zinc-900 dark:bg-zinc-900/40 dark:hover:border-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  {["10:00 AM", "2:00 PM"].map((time, i) => (
                    <button
                      key={time}
                      type="button"
                      className={`text-center py-2 rounded-lg border text-xs font-semibold transition ${
                        i === 0
                          ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                          : "border-zinc-100 hover:border-zinc-300 text-zinc-600 dark:border-zinc-900 dark:hover:border-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Map graphic placeholder */}
            <div className="h-44 rounded-3xl border border-zinc-100 dark:border-zinc-900/60 overflow-hidden relative bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 z-10 bg-white dark:bg-zinc-950 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                <MapPin className="h-3 w-3 text-brand-accent animate-bounce" />
                HQ // GLOBAL COVERAGE MAP
              </span>
            </div>

          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-[#080808]/40 border border-zinc-100 dark:border-zinc-900/80 rounded-3xl p-8 lg:p-12 shadow-sm">
            <h3 className="text-2xl font-serif font-normal text-zinc-900 dark:text-white mb-8">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Required Capability
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all appearance-none"
                  >
                    <option value="Design">Bespoke Design &amp; Dev</option>
                    <option value="AI">AI Agents &amp; Chatbots</option>
                    <option value="SEO">Organic &amp; Local SEO</option>
                    <option value="Full">Unified Growth Systems</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  How can we help? *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, target timeline, or workflow bottlenecks."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent text-zinc-900 dark:text-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm transition-all duration-300 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] disabled:bg-emerald-500 disabled:text-white disabled:shadow-none focus:outline-none"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" /> Message Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Inquiry
                  </>
                )}
              </button>

              {submitted && (
                <span className="text-xs text-brand-accent font-semibold block text-center animate-fade-in">
                  Thank you! Our engineering team will review and reply within 24 hours.
                </span>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
