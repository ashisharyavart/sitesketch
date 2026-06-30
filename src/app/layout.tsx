import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Sitesketch.online | Premium Web Design, AI Automation & SEO Agency",
    template: "%s | Sitesketch.online"
  },
  description: "Sitesketch.online builds high-end websites, automated workflows, custom AI chatbots, and robust SEO systems engineered to earn trust, generate leads and scale businesses.",
  metadataBase: new URL("https://sitesketch.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sitesketch.online | Premium Web Design, AI Automation & SEO Agency",
    description: "Bespoke digital design and intelligence systems handcrafted for modern enterprises. We engineer websites to earn trust and scale businesses.",
    url: "https://sitesketch.online",
    siteName: "Sitesketch.online",
    images: [
      {
        url: "https://sitesketch.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sitesketch.online - Creative Digital Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitesketch.online | Premium Web Design, AI Automation & SEO Agency",
    description: "Bespoke digital design and intelligence systems handcrafted for modern enterprises.",
    images: ["https://sitesketch.online/og-image.jpg"],
    creator: "@sitesketch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-light-bg text-foreground dark:bg-dark-bg transition-colors duration-300">
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <div className="noise-bg" />
            <main className="flex-grow relative z-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
