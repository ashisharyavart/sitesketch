import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SEOContent from "@/components/SEOContent";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sitesketch.online/#organization",
        "name": "Sitesketch.online",
        "url": "https://sitesketch.online",
        "logo": "https://sitesketch.online/logo.png",
        "sameAs": [
          "https://linkedin.com",
          "https://github.com",
          "https://x.com",
          "https://instagram.com"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://sitesketch.online/#localbusiness",
        "name": "SiteSketch",
        "image": "https://sitesketch.online/og-image.jpg",
        "description": "Best website development company providing premium website development services, real state website developer platforms, local business website developer solutions, and bespoke portfolio websites (for photographers, interior designers, etc.).",
        "url": "https://sitesketch.online",
        "telephone": "+1-415-555-0199",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "100 Pine St Suite 1250",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "postalCode": "94111",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.7925,
          "longitude": -122.4002
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://sitesketch.online/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does a custom website take to build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically, a custom high-end marketing website takes 4 to 8 weeks from discovery to launch. This timeline varies based on requirements like complex animations, extensive page structures, custom API configurations, or custom AI agent database setups."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a custom website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our projects start at $5,000 for bespoke landing pages and $10,000 for full marketing portals. Because we build custom Next.js configurations that perform under 1s load speeds, with customized copywriting and SEO structures, each quote is custom-tailored to the business's goals."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide search engine optimization (SEO)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, complete on-page and technical SEO are integrated into all our Next.js builds. We optimize heading structures, configure JSON-LD schemas, build custom sitemaps, and structure copy specifically to index on modern search engines and AI search engines."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sitesketch.online/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sitesketch.online/"
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Main Page Elements */}
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Statistics />
      <Testimonials />
      <FAQ />
      <About />
      <SEOContent />
      <Contact />
      <Footer />
    </>
  );
}
