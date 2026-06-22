import { sampleGuides } from "@/data/sampleData";

export async function GET() {
  const baseUrl = "https://gameguide.guide";
  const now = new Date().toUTCString();

  // Sort by published date desc, take latest 20
  const latestGuides = [...sampleGuides]
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, 20);

  const items = latestGuides
    .map(
      (guide) => `
    <item>
      <title><![CDATA[${guide.title}]]></title>
      <link>${baseUrl}/en/guides/${guide.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/guides/${guide.slug}</guid>
      <description><![CDATA[${guide.description}]]></description>
      <pubDate>${new Date(guide.publishedDate + "T00:00:00Z").toUTCString()}</pubDate>
      <category>${guide.category}</category>
      ${guide.image ? `<enclosure url="${baseUrl}${guide.image}" type="image/jpeg" />` : ""}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GameGuide - Expert Game Walkthroughs &amp; Strategy Guides</title>
    <link>${baseUrl}</link>
    <description>Expert game walkthroughs, character builds, boss strategies, and in-depth guides for the most popular games.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
