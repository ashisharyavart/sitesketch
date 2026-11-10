import type { Metadata, Viewport } from "next";
import { Syne, Onest, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";
import "./globals.css";

const syne = Syne({
  variable: "--font-display-custom",
  subsets: ["latin"],
  weight: ["700"],
});

const onest = Onest({
  variable: "--font-body-custom",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-outlier-custom",
  subsets: ["latin"],
  weight: ["500"],
});

export const viewport: Viewport = {
  themeColor: "#F5F3ED",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "SiteSketch | Generative Architectural Engine & Automated BOM",
    template: "%s | SiteSketch",
  },
  description:
    "SiteSketch transforms hand-drawn pencil schematics, CAD layouts, and raw job-site shells into immersive 3D interior renders, material schedules, and automated cost estimates.",
  keywords: [
    "generative architectural software",
    "hand drawn sketch to 3D",
    "BIM automation",
    "automated bill of materials",
    "architectural visualization",
    "interior design renders",
    "photorealistic spatial rendering",
    "architectural takeoffs",
    "Revit CAD integration",
    "SiteSketch"
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
    title: "SiteSketch | From Hand-Drawn Sketch to Photorealistic Spatial Reality",
    description:
      "A cloud-based generative architectural, interior visualization, and automated Bill-of-Materials (BOM) platform built for architects, interior design studios, and general contractors.",
    url: "https://sitesketch.online",
    siteName: "SiteSketch",
    images: [
      {
        url: "https://sitesketch.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SiteSketch Spatial Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSketch | Generative Architectural Visualization SaaS",
    description:
      "Transform rough pencil sketches into 4K photorealistic architectural spaces, material schedules, and automated cost estimates.",
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
      className={`${syne.variable} ${onest.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MV6KTJNX06"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MV6KTJNX06');
          `}
        </Script>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow relative z-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
