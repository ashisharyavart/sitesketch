import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SiteSketch",
  description: "Privacy policy and architectural data protection architecture for SiteSketch Technologies, Inc.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2" style={{ background: "var(--color-paper)", borderColor: "var(--color-ink)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              SiteSketch
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-medium" style={{ color: "var(--color-ink-2)" }}>
            <Link href="/" className="hover:underline">← Back to Overview</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-16 sm:py-20 px-6 sm:px-12">
        <div
          className="max-w-3xl mx-auto space-y-10 p-8 sm:p-12"
          style={{
            background: "var(--color-plate)",
            border: "var(--rule-bar) solid var(--color-ink)",
            boxShadow: "var(--shadow-card)"
          }}
        >
          {/* Header */}
          <div className="space-y-2 border-b-2 pb-6" style={{ borderColor: "var(--color-ink)" }}>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy policy
            </h1>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              SiteSketch Technologies. Effective date: November 2026.
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8 text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                1. Information we collect
              </h2>
              <p>
                As a B2B Software-as-a-Service provider, SiteSketch Technologies collects information necessary to provision studio workspaces, render 3D environments, and maintain cloud GPU pipelines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Studio account information:</strong> Name, professional work email, architectural firm name, billing address, and seat allocations.</li>
                <li><strong>Customer project data:</strong> 2D architectural blueprints, PDF drawing sets, CAD (.DWG/.DXF) files, raw jobsite photos, material specifications, and annotations uploaded to your workspace.</li>
                <li><strong>Platform telemetry:</strong> GPU compute duration, rendering resolution selections, API request rates, and browser technical specifications.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                2. Spatial data processing
              </h2>
              <p>
                Spatial inputs uploaded to SiteSketch are processed strictly within isolated containerized cloud environments. Once vectorization, volumetric extrusion, and Kelvin lighting rendering passes are executed, outputs are stored securely within your private workspace storage bucket.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                3. Security architecture and storage
              </h2>
              <p>
                All data transmitted to or from SiteSketch is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Enterprise customers can configure customer-managed encryption keys (CMEK) and direct automated sync to dedicated AWS S3 or Google Cloud storage vaults.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                4. Infrastructure providers
              </h2>
              <p>
                We do not sell personal or project data. We partner with industry infrastructure providers solely for cloud compute, secure hosting, content delivery, and payment processing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                5. Data deletion and export
              </h2>
              <p>
                Studio administrators can permanently delete workspaces, rendering histories, and project models at any time through the Studio Settings console. Upon account termination, all customer data is wiped from primary storage volumes within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                6. Contact legal
              </h2>
              <p className="text-xs">
                For security inquiries, DPA requests, or SOC2 audit reports, contact our privacy engineering team at security@sitesketch.online.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 py-8 text-xs" style={{ borderColor: "var(--color-ink)", background: "var(--color-paper)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ color: "var(--color-muted)" }}>SiteSketch Technologies.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/terms" className="hover:underline">Terms of service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
