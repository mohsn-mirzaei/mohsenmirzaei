import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Instrument_Serif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/lib/site";
import { buildJsonLd } from "@/lib/jsonld";
import { Cursor } from "@/components/providers/Cursor";
import { Preloader } from "@/components/providers/Preloader";
import { TransitionProvider } from "@/components/providers/Transition";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.shortBio,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "profile",
    firstName: site.firstName,
    lastName: site.lastName,
    username: "mohsenmirzaei",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: `${site.name} · Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    creator: "@mohsenmirzaei",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        {/* Server-rendered structured data — present in the initial HTML so AI
            crawlers (which don't run JS) and Google can read it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="noise min-h-dvh bg-ink text-fg">
        <Cursor />
        <Preloader />
        <TransitionProvider>
          <Header />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
        </TransitionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
