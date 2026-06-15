import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameGuide - Your Ultimate Gaming Guide",
  description: "Expert game guides, builds, and walkthroughs for the hottest games. Find walkthroughs, boss strategies, best builds, and secrets for Elden Ring, Baldur's Gate 3, Zelda: Tears of the Kingdom, and more.",
  openGraph: {
    title: "GameGuide - Your Ultimate Gaming Guide",
    description: "Expert game guides, builds, and walkthroughs for the hottest games",
    url: "https://gameguide.guide",
    siteName: "GameGuide",
    images: [
      {
        url: "https://gameguide.guide/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GameGuide - Your Ultimate Gaming Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameGuide - Your Ultimate Gaming Guide",
    description: "Expert game guides, builds, and walkthroughs for the hottest games",
    images: ["https://gameguide.guide/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4051053911004228"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased text-white font-sans">
        {children}
      </body>
    </html>
  );
}
