import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SiteSketch",
  description: "Privacy Policy and architectural data protection architecture for SiteSketch Technologies, Inc.",
};

export default function PrivacyPolicy() {
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
              TRUST &amp; ARCHITECTURAL DATA SECURITY
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-slate-500">
              SiteSketch Technologies, Inc. • Effective Date: November 2026
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">1. Information We Collect</h2>
              <p>
                As a B2B Software-as-a-Service (SaaS) provider, SiteSketch Technologies, Inc. collects information necessary to provision studio workspaces, render 3D environments, and maintain cloud GPU pipelines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong className="text-slate-800">Studio Account Information:</strong> Name, professional work email, architecture/interior design firm name, billing address, and team seat allocations.</li>
                <li><strong className="text-slate-800">Customer Project Data:</strong> 2D architectural blueprints, PDF drawing sets, CAD (.DWG/.DXF) files, raw job-site photographs, material specifications, and client markup annotations uploaded to your workspace.</li>
                <li><strong className="text-slate-800">Platform Telemetry:</strong> GPU compute duration, rendering resolution selections, API request rates, and browser technical specifications to optimize real-time 360° viewer performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">2. How We Process Spatial Data</h2>
              <p>
                Spatial inputs uploaded to SiteSketch are processed strictly within isolated containerized cloud environments. Once vectorization, volumetric extrusion, and Kelvin lighting rendering passes are executed, outputs are stored securely within your private workspace storage bucket.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">3. Security Architecture &amp; Storage</h2>
              <p>
                All data transmitted to or from SiteSketch is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Enterprise customers can configure customer-managed encryption keys (CMEK) and direct automated sync to dedicated AWS S3 or Google Cloud storage vaults.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">4. Third-Party Infrastructure</h2>
              <p>
                We do not sell personal or project data. We partner with industry-leading infrastructure providers (e.g. AWS, Cloudflare, Stripe) solely for cloud compute, secure hosting, content delivery, and payment processing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">5. Data Deletion &amp; Export</h2>
              <p>
                Studio administrators can permanently delete workspaces, rendering histories, and project models at any time through the Studio Settings console. Upon account termination, all customer data is wiped from primary storage volumes within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">6. Contact Legal</h2>
              <p className="text-xs text-slate-600">
                For security inquiries, DPA requests, or SOC2 audit reports, contact our privacy engineering team at <span className="font-mono text-slate-900 font-medium">security@sitesketch.online</span>.
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
            <Link href="/terms" className="hover:text-slate-800">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
