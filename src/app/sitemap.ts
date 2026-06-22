import { MetadataRoute } from "next";
import { sampleGames, sampleGuides } from "@/data/sampleData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gameguide.guide";
  const languages = ["en", "zh"];

  const entries: MetadataRoute.Sitemap = [];

  // Base URL
  entries.push({
    url: baseUrl,
    lastModified: new Date("2026-06-17"),
    changeFrequency: "daily",
    priority: 1.0,
  });

  for (const lang of languages) {
    const dayOffset = lang === "en" ? 0 : 1;

    // Home
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(`2026-06-${17 - dayOffset}`),
      changeFrequency: "daily",
      priority: 1.0,
    });

    // Games list
    entries.push({
      url: `${baseUrl}/${lang}/games`,
      lastModified: new Date("2026-06-16"),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Individual game pages
    for (const game of sampleGames) {
      entries.push({
        url: `${baseUrl}/${lang}/games/${game.slug}`,
        lastModified: new Date("2026-06-15"),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Guides list
    entries.push({
      url: `${baseUrl}/${lang}/guides`,
      lastModified: new Date("2026-06-17"),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Individual guide pages
    for (const guide of sampleGuides) {
      const lastMod = guide.updatedDate
        ? new Date(guide.updatedDate + "T00:00:00Z")
        : new Date("2026-06-15");
      entries.push({
        url: `${baseUrl}/${lang}/guides/${guide.slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly",
        priority: 0.7,
        images: guide.image
          ? [`${baseUrl}${guide.image}`]
          : undefined,
      });
    }

    // Categories
    entries.push({
      url: `${baseUrl}/${lang}/categories`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "weekly",
      priority: 0.6,
    });

    // Privacy
    entries.push({
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.3,
    });

    // Terms
    entries.push({
      url: `${baseUrl}/${lang}/terms`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.3,
    });

    // Contact
    entries.push({
      url: `${baseUrl}/${lang}/contact`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  return entries;
}
