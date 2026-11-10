import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | SiteSketch",
  description: "Terms of Service and Software-as-a-Service Licensing Agreement for SiteSketch Technologies, Inc.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] architectural-grid text-slate-900 flex flex-col justify-between font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded border-2 border-slate-900 flex items-center justify-center p-0.5 bg-white shadow-2xs">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                <div className="bg-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
                <div className="border border-slate-900 rounded-[0.5px]"></div>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SiteSketch</span>
          </Link>

          <div className="flex items-center space-x-4 text-xs font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900">← Back to Overview</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-xs font-mono tracking-wider uppercase text-slate-500 font-semibold">
              SOFTWARE-AS-A-SERVICE (SAAS) AGREEMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-slate-500">
              SiteSketch Technologies, Inc. • Last Updated: November 2026
            </p>
          </div>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">1. Acceptance of SaaS Terms</h2>
              <p>
                By registering for an account, activating a trial, or accessing the SiteSketch platform hosted at sitesketch.online, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of an architectural firm or studio, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">2. Software License &amp; Studio Seats</h2>
              <p>
                SiteSketch grants your organization a non-exclusive, non-transferable, subscription-based license to access our cloud-based generative spatial engine, BIM vectorization algorithms, automated Bill of Materials (BOM) generator, and 360° client presentation web viewers in accordance with your chosen subscription tier.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">3. Intellectual Property &amp; Ownership</h2>
              <p>
                <strong className="text-slate-900">Customer Retains 100% Ownership:</strong> You retain all right, title, and interest in and to all architectural schematics, floor plans, 2D sketches, 3D project models, client presentation links, and exported Bill of Materials schedules generated through the Platform. SiteSketch claims no ownership rights over your creative or structural works.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">4. Subscription Billing &amp; Fair Compute</h2>
              <p>
                Subscription fees are billed in advance on a recurring monthly or annual basis. Each plan includes allocated 4K raytracing render allocations. Unused renders do not roll over across monthly billing periods unless explicitly specified under an Enterprise agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">5. Service Availability &amp; SLA</h2>
              <p>
                SiteSketch targets a 99.9% uptime availability for our cloud rendering and API services. Maintenance windows are scheduled outside peak studio working hours.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 SiteSketch Technologies, Inc. All rights reserved.</span>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
