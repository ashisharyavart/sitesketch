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
    default: "SiteSketch | Best Website Development Company & Portfolio Website Developer",
    template: "%s | SiteSketch"
  },
  description: "SiteSketch is the best website development company delivering premium website development services, real state website developer solutions, local business website developer platforms, and bespoke portfolio websites (interior designer, photographer, etc.).",
  keywords: [
    "website development",
    "website development services",
    "real state website developer",
    "local business website developer",
    "interior design website development",
    "best website development company",
    "photographer portfolio website",
    "interior designer portfolio website",
    "portfolio website"
  ],
  metadataBase: new URL("https://sitesketch.online"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "SiteSketch | Best Website Development Company & Portfolio Website Developer",
    description: "Looking for website development services? SiteSketch is a leading website developer building custom portfolio websites (for interior designers, photographers), real estate, and local business growth engines.",
    url: "https://sitesketch.online",
    siteName: "SiteSketch",
    images: [
      {
        url: "https://sitesketch.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SiteSketch - Creative Digital Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSketch | Best Website Development Company & Portfolio Website Developer",
    description: "Looking for website development services? SiteSketch is a leading website developer building custom portfolio websites (for interior designers, photographers), real estate, and local business growth engines.",
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
