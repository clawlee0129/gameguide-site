import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
