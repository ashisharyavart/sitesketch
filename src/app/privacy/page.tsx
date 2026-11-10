import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SiteSketch",
  description: "Privacy policy and data protection practices for the SiteSketch architectural workspace.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-canvas architectural-grid text-slate-900 flex flex-col justify-between font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-slate-200/80">
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
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500">
              SiteSketch · Effective Date: November 2026
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">1. Information We Collect</h2>
              <p>
                SiteSketch collects basic information necessary to provide floorplan editing workspaces, material schedules, and early access accounts:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong className="text-slate-800">Account Information:</strong> Name, professional work email, firm or practice name, and account preferences.</li>
                <li><strong className="text-slate-800">Floorplans and Project Files:</strong> 2D architectural sketches, PDF floorplans, image files (JPG, PNG), and user-entered dimension and finish specifications.</li>
                <li><strong className="text-slate-800">Technical Logs:</strong> Standard web server access logs, error reports, and feature utilization telemetry used to debug and improve workspace performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">2. How We Use Your Data</h2>
              <p>
                Uploaded sketches and project files are processed solely to execute line detection, generate quantity takeoffs, and display previews within your workspace. We do not sell your personal or project data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">3. Security and Storage</h2>
              <p>
                All data transmitted to or from SiteSketch is encrypted in transit using industry-standard TLS. Project files are stored in protected cloud object storage with role-based access controls.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">4. Third-Party Service Providers</h2>
              <p>
                We use reputable third-party cloud infrastructure providers for hosting and managed database services. These providers process data only as instructed to deliver core service functionality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">5. Data Retention and Deletion</h2>
              <p>
                You may request complete deletion of your early access account and associated uploaded files at any time by contacting us. Upon confirmation, data is removed from active databases within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 font-mono">6. Contact</h2>
              <p className="text-xs text-slate-600">
                For questions regarding this privacy policy or your project data, please contact our team at <span className="font-mono text-slate-900 font-medium">privacy@sitesketch.online</span>.
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
