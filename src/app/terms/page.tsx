import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | SiteSketch",
  description: "Terms of Service and Software-as-a-Service Licensing Agreement for SiteSketch Technologies, Inc.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4 border-b border-slate-800 pb-8">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
              SOFTWARE-AS-A-SERVICE (SAAS) AGREEMENT
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-slate-400">
              SiteSketch Technologies, Inc. • Last Updated: November 2026
            </p>
          </div>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">1. Acceptance of SaaS Terms</h2>
              <p>
                By registering for an account, activating a trial, or accessing the SiteSketch platform (the &quot;Platform&quot; or &quot;Service&quot;) hosted at sitesketch.online, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of an architectural firm, studio, or corporate entity, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">2. Software License &amp; Studio Seats</h2>
              <p>
                SiteSketch grants your organization a non-exclusive, non-transferable, subscription-based license to access our cloud-based generative spatial engine, BIM vectorization algorithms, automated Bill of Materials (BOM) generator, and 360° client presentation web viewers in accordance with your chosen subscription tier.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">3. Intellectual Property &amp; Ownership</h2>
              <p>
                <strong>Customer Retains 100% Ownership:</strong> You retain all right, title, and interest in and to all architectural schematics, floor plans, 2D sketches, 3D project models, client presentation links, and exported Bill of Materials schedules generated through the Platform. SiteSketch claims no ownership rights over your creative or structural works.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">4. Architectural &amp; Engineering Disclaimer</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                SiteSketch provides generative spatial visualization and automated preliminary takeoff estimates for conceptual and design development purposes. All exported Bill of Materials (BOM) figures, dimensions, structural layouts, and material schedules should be independently reviewed and verified by a licensed professional architect, structural engineer, or certified general contractor prior to physical procurement, construction, or fabrication.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">5. Subscriptions, Free Trials &amp; Cancellations</h2>
              <p>
                Subscriptions are billed on a recurring monthly or annual basis as selected upon checkout. Free trials provide full platform access for 14 days or up to the allotted trial rendering quota. You may cancel your subscription at any time via the Studio Billing console, with access continuing until the end of your current billing period.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">6. Platform Availability &amp; SLA</h2>
              <p>
                SiteSketch strives to maintain a 99.9% uptime SLA for cloud GPU rendering infrastructure. Maintenance windows are scheduled outside peak North American and European business hours whenever possible.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">7. Contact &amp; Legal Notices</h2>
              <p className="text-xs text-slate-400">
                Inquiries regarding enterprise licensing or custom service level agreements should be directed to <span className="text-cyan-400 font-mono">enterprise@sitesketch.online</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
