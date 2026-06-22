import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Games - GameGuide",
  description: "Browse all games with expert guides, builds, and walkthroughs.",
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
