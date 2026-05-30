import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gameguide.guide"),
  title: {
    default: "GameGuide - Your Ultimate Gaming Guide",
    template: "%s | GameGuide",
  },
  description:
    "Discover expert game walkthroughs, boss strategies, build guides, and hidden secrets for PC, PlayStation, Xbox, and Nintendo Switch. From Elden Ring to Baldur's Gate 3 — master every game with our in-depth, community-driven guides.",
  keywords: [
    "game guide",
    "walkthrough",
    "boss guide",
    "strategy guide",
    "game tips",
    "PC game guide",
    "console game guide",
    "RPG guide",
    "FPS guide",
    "soulslike guide",
    "build guide",
    "achievement guide",
    "游戏攻略",
    "游戏指南",
    "Boss攻略",
    "配装指南",
  ],
  openGraph: {
    type: "website",
    siteName: "GameGuide",
    locale: "en_US",
    title: "GameGuide - Your Ultimate Gaming Guide",
    description:
      "Discover expert game walkthroughs, boss strategies, build guides, and hidden secrets for PC, PlayStation, Xbox, and Nintendo Switch.",
    url: "https://gameguide.guide",
    images: [
      {
        url: "https://gameguide.guide/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GameGuide - Your Ultimate Gaming Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameGuide - Your Ultimate Gaming Guide",
    description:
      "Discover expert game walkthroughs, boss strategies, build guides, and hidden secrets for PC, PlayStation, Xbox, and Nintendo Switch.",
    images: ["https://gameguide.guide/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GameGuide',
    url: 'https://gameguide.guide',
    description: 'Expert game walkthroughs, boss guides, and strategy tips for PC, PlayStation, Xbox, and Nintendo Switch.',
    publisher: {
      '@type': 'Organization',
      name: 'GameGuide',
      logo: 'https://gameguide.guide/logo.png',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gameguide.guide/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <meta name="google-adsense-account" content="ca-pub-4051053911004228" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4051053911004228"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <GoogleAnalytics gaId="G-6K8LMPZ5SY" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// Updated: 2026-05-26 - Phase 3 i18n
