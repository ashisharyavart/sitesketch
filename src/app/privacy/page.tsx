import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | SiteSketch",
  description: "Privacy Policy and architectural data protection architecture for SiteSketch Technologies, Inc.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4 border-b border-slate-800 pb-8">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
              TRUST &amp; ARCHITECTURAL DATA SECURITY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-slate-400">
              SiteSketch Technologies, Inc. • Effective Date: November 2026
            </p>
          </div>

          {/* Core Architectural Data Protection Guarantee */}
          <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
            <h3 className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wide">
              🔒 The SiteSketch Enterprise Design Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your architectural schematics, floor plans, 3D models, site photographs, and proprietary client documents are encrypted at rest with AES-256. SiteSketch strictly operates under a zero-leak policy: <strong>Your design data is never sold, shared with third parties, or used to train public foundation models.</strong>
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">1. Information We Collect</h2>
              <p>
                As a B2B Software-as-a-Service (SaaS) provider, SiteSketch Technologies, Inc. collects information necessary to provision studio workspaces, render 3D environments, and maintain cloud GPU pipelines:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-slate-400">
                <li><strong className="text-slate-200">Studio Account Information:</strong> Name, professional work email, architecture/interior design firm name, billing address, and team seat allocations.</li>
                <li><strong className="text-slate-200">Customer Project Data:</strong> 2D architectural blueprints, PDF drawing sets, CAD (.DWG/.DXF) files, raw job-site photographs, material specifications, and client markup annotations uploaded to your workspace.</li>
                <li><strong className="text-slate-200">Platform Telemetry:</strong> GPU compute duration, rendering resolution selections, API request rates, and browser technical specifications to optimize real-time 360° viewer performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">2. How We Process Spatial Data</h2>
              <p>
                Spatial inputs uploaded to SiteSketch are processed strictly within isolated containerized cloud environments. Once vectorization, volumetric extrusion, and Kelvin lighting rendering passes are executed, outputs are stored securely within your private workspace storage bucket.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">3. Security Architecture &amp; Storage</h2>
              <p>
                All data transmitted to or from SiteSketch is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Enterprise customers can configure customer-managed encryption keys (CMEK) and direct automated sync to dedicated AWS S3 or Google Cloud storage vaults.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">4. Third-Party Infrastructure</h2>
              <p>
                We do not sell personal or project data. We partner with industry-leading infrastructure providers (e.g. AWS, Cloudflare, Stripe) solely for cloud compute, secure hosting, content delivery, and payment processing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">5. Data Deletion &amp; Export</h2>
              <p>
                Studio administrators can permanently delete workspaces, rendering histories, and project models at any time through the Studio Settings console. Upon account termination, all customer data is wiped from primary storage volumes within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-100 font-mono">6. Contact Legal</h2>
              <p className="text-xs text-slate-400">
                For security inquiries, DPA requests, or SOC2 audit reports, contact our privacy engineering team at <span className="text-cyan-400 font-mono">security@sitesketch.online</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
