import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
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
    default: "GameGuide Pro - Expert Game Walkthroughs & Guides",
    template: "%s | GameGuide Pro",
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
    siteName: "GameGuide Pro",
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
    name: 'GameGuide Pro',
    url: 'https://gameguidepro.com',
    description: 'Expert game walkthroughs, boss guides, and strategy tips for PC, PlayStation, Xbox, and Nintendo Switch.',
    publisher: {
      '@type': 'Organization',
      name: 'GameGuide Pro',
      logo: 'https://gameguidepro.com/logo.png',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gameguidepro.com/search?q={search_term_string}',
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
      </head>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// Updated: 2026-05-26 - Phase 3 i18n
