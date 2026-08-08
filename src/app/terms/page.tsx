import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions | SiteSketch",
  description: "Terms and Conditions for SiteSketch.online. Read our agreement before using our services.",
};

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-900/80 pb-8">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
              Legal Agreement
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white">
              Terms & Conditions
            </h1>
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              Last Updated: August 8, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            <p>
              Welcome to SiteSketch.online. By accessing or using our website and website development services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">1. Agreement to Terms</h2>
              <p>
                By using our site or engaging our services, you confirm your acceptance of these Terms and Conditions. If you do not agree to these terms, please do not use our site or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">2. Intellectual Property</h2>
              <p>
                All content, layout designs, code frameworks, assets, and branding materials featured on this site are the intellectual property of SiteSketch, unless otherwise stated. You may not copy, reproduce, republish, or distribute any part of this site without our explicit prior written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">3. Services & Scope</h2>
              <p>
                Our services include website design, Next.js engineering, AI automation configurations, and search engine optimization. The exact scope, timeline, deliverables, and fees for any project will be governed by a separate, signed Service Agreement between SiteSketch and the client.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">4. User Responsibilities</h2>
              <p>
                You agree to use our website and services only for lawful purposes. You are responsible for ensuring that any information or brief you provide to us does not violate third-party copyrights, trademarks, or privacy rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">5. Limitation of Liability</h2>
              <p>
                In no event shall SiteSketch, its founder, or partners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of this website, its content, or any design services shipped.
              </p>
            </section>

            <section className="space-y-4 pb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">6. Governing Law</h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
