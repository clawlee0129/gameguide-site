import { MetadataRoute } from "next";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import { categories } from "@/data/site";

const BASE_URL = "https://gameguide.guide";
const LANGS = ["en", "zh"];

const staticRoutes = ["", "/games", "/guides", "/categories", "/builds", "/map", "/forum"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const gameSlugs = sampleGames.map((g) => g.slug);
  const guideSlugs = sampleGuides.map((g) => g.slug);
  const categorySlugs = categories.map((c) => c.slug);

  for (const lang of LANGS) {
    // Static routes
    for (const route of staticRoutes) {
      const path = `/${lang}${route}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/games" ? 0.9 : 0.8,
      });
    }

    // Game detail pages
    for (const slug of gameSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/games/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });
    }

    // Guide detail pages
    for (const slug of guideSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/guides/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }

    // Category pages
    for (const slug of categorySlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
