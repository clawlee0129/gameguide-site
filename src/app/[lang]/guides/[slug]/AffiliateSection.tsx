import AffiliateCard from "@/components/AffiliateCard";

interface Game {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  platforms?: string[];
}

interface AffiliateSectionProps {
  game: Game;
  lang: string;
}

const GAME_AFFILIATE_MAP: Record<string, { asin?: string; relatedAsin?: string; guideAsin?: string }> = {
  "elden-ring": {
    asin: "B09QG8VYPY",
    relatedAsin: "B0BZ6ZCRSF",
    guideAsin: "3869931124",
  },
  "baldurs-gate-3": {
    asin: "B0C6H8X2YQ",
    relatedAsin: "B0CJ5F2NLW",
    guideAsin: "2412800090",
  },
  "zelda-totk": {
    asin: "B097SPLQPR",
    relatedAsin: "B0CN3QSNNF",
    guideAsin: "191333001X",
  },
  "genshin-impact": {
    relatedAsin: "B0B9QRST2P",
    guideAsin: "B0CGM29CB3",
  },
  "cyberpunk-2077": {
    asin: "B08X16GM91",
    relatedAsin: "B0CJ5X4VLW",
    guideAsin: "150671999X",
  },
  "hogwarts-legacy": {
    asin: "B0BV5TNRWN",
    relatedAsin: "B0CNS3VG14",
    guideAsin: "1338767656",
  },
};

export default function AffiliateSection({ game, lang }: AffiliateSectionProps) {
  const mapping = GAME_AFFILIATE_MAP[game.slug];
  if (!mapping) return null;

  const gameTitle = lang === "zh" ? game.titleZh : game.title;
  const products: { title: string; image: string; url: string; price?: string; store: string }[] = [];

  // Game purchase link
  if (mapping.asin) {
    products.push({
      title: `${gameTitle}`,
      image: `/images/games/${game.slug}.jpg`,
      url: `https://www.amazon.com/dp/${mapping.asin}?tag=gameguide-20`,
      price: "Check Price on Amazon",
      store: "Amazon",
    });
  } else if (game.slug === "genshin-impact") {
    products.push({
      title: `${gameTitle} (Free to Play)`,
      image: `/images/games/${game.slug}.jpg`,
      url: `https://www.amazon.com/s?k=Genshin+Impact+merchandise&tag=gameguide-20`,
      price: "Free to Play — Shop Merch",
      store: "Amazon",
    });
  }

  // Related accessories
  if (mapping.relatedAsin) {
    const isPS5Game = game.platforms?.includes("PS5");
    const accessoryLabel = isPS5Game ? "Gaming Controller" : "Gaming Gear";
    products.push({
      title: `Recommended ${accessoryLabel} for ${gameTitle}`,
      image: `/images/games/${game.slug}.jpg`,
      url: `https://www.amazon.com/dp/${mapping.relatedAsin}?tag=gameguide-20`,
      store: "Amazon",
    });
  }

  // Strategy guide / art book
  if (mapping.guideAsin) {
    products.push({
      title: `${gameTitle} Strategy Guide & Art Book`,
      image: `/images/games/${game.slug}.jpg`,
      url: `https://www.amazon.com/dp/${mapping.guideAsin}?tag=gameguide-20`,
      store: "Amazon",
    });
  }

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-200 dark:border-[#2a2a2a]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recommended Products</h2>
      <div className="max-w-[820px] space-y-3">
        {products.map((p, idx) => (
          <AffiliateCard key={idx} {...p} />
        ))}
      </div>
      <p className="text-[10px] text-gray-400 dark:text-[#666] mt-3">
        As an Amazon Associate, GameGuide earns from qualifying purchases.
      </p>
    </section>
  );
}
