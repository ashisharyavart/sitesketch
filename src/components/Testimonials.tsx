"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatarUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Michael Turner",
    role: "Owner",
    company: "BrightSmile Dental",
    feedback: "Sitesketch rebuilt our outdated website and improved appointment enquiries significantly. Communication was excellent and the process was straightforward.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Sarah Jenkins",
    role: "Managing Partner",
    company: "Vanguard Juris",
    feedback: "Our corporate law firm needed an interface that projected authority and loaded instantly on mobile. Sitesketch delivered a fast, compliant, and beautifully minimal layout that exceeded our goals.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "David Vance",
    role: "VP of Growth",
    company: "Flowstate AI",
    feedback: "We were struggling to explain our automated billing pipeline. Sitesketch created a fluid, visual landing page with micro-animations. Our sign-up rate jumped by 65% in the first month.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Dr. Elena Patel",
    role: "Chief Veterinarian",
    company: "Bark & Purr Clinic",
    feedback: "Their local SEO strategy put us at the top of local maps search within six weeks. The new booking interface is extremely popular with our clients and has minimized scheduling friction.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Marcus Rostova",
    role: "Principal Architect",
    company: "Studio Forma",
    feedback: "The image loading speed on our new portfolio page is spectacular. The typography is perfect and the scroll-linked transitions feel completely handcrafted. Highly recommended for creative agencies.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Katherine Brooks",
    role: "Director of Marketing",
    company: "Vanguard Real Estate",
    feedback: "As a luxury real estate group, design execution is everything. Sitesketch built a high-performance listing engine that is both visually stunning and highly indexable across search engines.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#080808]/40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
              Client Feedback
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-zinc-900 dark:text-white tracking-tight">
              Testimonials
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            Real feedback from owners, growth leaders, and creative directors who chose bespoke development over templates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-900/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative"
            >
              {/* Review content */}
              <div className="space-y-6">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.feedback}&rdquo;
                </blockquote>
              </div>

              {/* Profile details */}
              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900/80 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.avatarUrl}
                  alt={`${testimonial.name} profile portrait`}
                  className="h-12 w-12 rounded-full object-cover grayscale border border-zinc-200 dark:border-zinc-800"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {testimonial.role}, <span className="font-mono text-brand-accent">{testimonial.company}</span>
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
