import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | SiteSketch",
  description: "Privacy Policy for SiteSketch.online. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-900/80 pb-8">
            <span className="text-xs font-mono tracking-widest uppercase text-brand-accent">
              Legal Information
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              Last Updated: August 8, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            <p>
              At SiteSketch.online (referred to as "we", "us", or "our"), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website or use our services.
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">1. Information We Collect</h2>
              <p>
                We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, fill out a form, subscribe to our newsletter, or in connection with other activities, services, features, or resources we make available.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> Name, job title, and business name.</li>
                <li><strong>Contact Data:</strong> Email address, phone number, and mailing address.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and platform.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to operate, maintain, and improve our services. Specifically, we use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalize user experiences and deliver tailored design solutions.</li>
                <li>Process discovery calls, design briefs, and project consultations.</li>
                <li>Send periodic emails regarding your orders or subscription updates.</li>
                <li>Improve our website performance, layout, and search engine optimization.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">3. Data Security</h2>
              <p>
                We implement robust security measures, including SSL encryption and restricted access controls, to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">4. Cookies Policy</h2>
              <p>
                Our site uses "cookies" to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about you. You can choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">5. Your Legal Rights</h2>
              <p>
                Depending on your location, you may have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, portability, or to object to processing.
              </p>
            </section>

            <section className="space-y-4 pb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our practices, please contact us at:
              </p>
              <p className="font-mono text-xs bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900/80">
                Email: privacy@sitesketch.online<br />
                Address: 100 Pine St Suite 1250, San Francisco, CA 94111, US
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
