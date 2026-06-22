import type { Metadata } from "next";
import Script from "next/script";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GameGuide - Expert Game Walkthroughs, Builds & Strategy Guides",
  description: "Expert game walkthroughs, character builds, boss strategies, and in-depth guides for the most popular games.",
  alternates: {
    canonical: "https://gameguide.guide",
    types: {
      "application/rss+xml": "https://gameguide.guide/feed.xml",
    },
  },
  openGraph: {
    title: "GameGuide - Expert Game Walkthroughs, Builds & Strategy Guides",
    description: "Expert game walkthroughs, character builds, boss strategies, and in-depth guides for the most popular games.",
    url: "https://gameguide.guide",
    siteName: "GameGuide",
    images: [
      {
        url: "https://gameguide.guide/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GameGuide - Expert Game Walkthroughs, Builds & Strategy Guides",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameGuide - Expert Game Walkthroughs, Builds & Strategy Guides",
    description: "Expert game walkthroughs, character builds, boss strategies, and in-depth guides for the most popular games.",
    images: ["https://gameguide.guide/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4051053911004228"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GameGuide",
              url: "https://gameguide.guide",
              logo: "https://gameguide.guide/images/og-image.jpg",
              description: "Expert game walkthroughs, character builds, boss strategies, and in-depth guides for the most popular games.",
              sameAs: [
                "https://twitter.com/gameguide",
                "https://www.reddit.com/r/gameguide",
                "https://youtube.com/@gameguide",
                "https://discord.gg/gameguide",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GameGuide",
              url: "https://gameguide.guide",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gameguide.guide/en/guides?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BE3H8SMWCV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BE3H8SMWCV');
          `}
        </Script>
      </body>
    </html>
  );
}
