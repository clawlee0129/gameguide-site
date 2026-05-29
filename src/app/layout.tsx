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
  title: {
    default: "GameGuide - Your Ultimate Gaming Guide",
    template: "%s | GameGuide",
  },
  description:
    "Expert game walkthroughs, boss guides, and strategy tips for PC, PlayStation, Xbox, and Nintendo Switch. Master every game with our in-depth guides.",
  keywords: [
    "game guide",
    "walkthrough",
    "boss guide",
    "strategy guide",
    "game tips",
    "PC game guide",
    "游戏攻略",
    "游戏指南",
  ],
  openGraph: {
    type: "website",
    siteName: "GameGuide",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6051039511042875"
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
