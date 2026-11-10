import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | SiteSketch",
  description: "Terms of service and software licensing agreement for SiteSketch Technologies, Inc.",
};

export default function TermsOfService() {
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
              Terms of service
            </h1>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              SiteSketch Technologies. Last updated: November 2026.
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                1. Acceptance of terms
              </h2>
              <p>
                By registering for an account, activating a trial, or accessing the SiteSketch platform hosted at sitesketch.online, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of an architectural firm or studio, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                2. Software license and studio seats
              </h2>
              <p>
                SiteSketch grants your organization a non-exclusive, non-transferable, subscription-based license to access our cloud-based generative spatial engine, BIM vectorization algorithms, automated Bill of Materials generator, and 360 degree presentation viewers in accordance with your chosen subscription tier.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                3. Customer ownership of design data
              </h2>
              <p>
                You retain all right, title, and interest in and to all architectural schematics, floor plans, 2D sketches, 3D project models, client presentation links, and exported Bill of Materials schedules generated through the Platform. SiteSketch claims no ownership rights over your creative or structural works.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                4. Subscription billing and compute allocations
              </h2>
              <p>
                Subscription fees are billed in advance on a recurring monthly or annual basis. Each plan includes allocated 4K raytracing render allocations. Unused renders do not roll over across monthly billing periods unless explicitly specified under an Enterprise agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                5. Service availability
              </h2>
              <p>
                SiteSketch maintains high availability across cloud rendering and API services. Routine maintenance windows are scheduled outside peak studio working hours.
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
            <Link href="/privacy" className="hover:underline">Privacy policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
