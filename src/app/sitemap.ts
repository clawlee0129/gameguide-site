import { MetadataRoute } from "next";
import { sampleGames, sampleGuides } from "@/data/sampleData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gameguide.guide";
  const languages = ["en", "zh"];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    // Home
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "daily",
      priority: 1.0,
    });
    entries.push({
      url: baseUrl,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "daily",
      priority: 1.0,
    });

    // Games list
    entries.push({
      url: `${baseUrl}/${lang}/games`,
      lastModified: new Date("2026-06-14"),
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
      lastModified: new Date("2026-06-14"),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Individual guide pages
    for (const guide of sampleGuides) {
      entries.push({
        url: `${baseUrl}/${lang}/guides/${guide.slug}`,
        lastModified: new Date("2026-06-15"),
        changeFrequency: "weekly",
        priority: 0.7,
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
  }

  return entries;
}
