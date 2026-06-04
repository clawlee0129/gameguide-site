const dictionaries: Record<string, Record<string, any>> = {
  en: {
    site: { title: "GameGuide", subtitle: "Your Ultimate Gaming Guide", description: "Expert guides, builds, and walkthroughs for the hottest games" },
    nav: { home: "Home", games: "Games", guides: "Guides", categories: "Categories", search: "Search", lang: "中文" },
    home: {
      featured: "Featured Games", latest: "Latest Guides", popular: "Popular Guides",
      categories: "Browse by Category", viewAll: "View All",
      newsletter: "Stay Updated", newsletterDesc: "Get the latest guides and tips to your inbox.",
      emailPlaceholder: "Enter your email", subscribe: "Subscribe",
    },
    game: { platforms: "Platforms", rating: "Rating", guides: "Related Guides", noGuides: "No guides yet" },
    guide: {
      readTime: "min read", difficulty: "Difficulty", related: "Related Guides",
      backToGuides: "Back to Guides", backToGames: "Back to Games",
    },
    categories: { title: "Browse by Category", all: "All" },
    search: { placeholder: "Search games and guides...", noResults: "No results found" },
    footer: {
      about: "GameGuide is your ultimate destination for game walkthroughs, builds, and tips.",
      quickLinks: "Quick Links", followUs: "Follow Us", rights: "All rights reserved.",
    },
  },
  zh: {
    site: { title: "GameGuide", subtitle: "你的终极游戏攻略指南", description: "最热门游戏的专家攻略与Build指南" },
    nav: { home: "首页", games: "游戏", guides: "攻略", categories: "分类", search: "搜索", lang: "English" },
    home: {
      featured: "精选游戏", latest: "最新攻略", popular: "热门攻略",
      categories: "按分类浏览", viewAll: "查看全部",
      newsletter: "保持更新", newsletterDesc: "获取最新攻略和技巧，发送到你的邮箱。",
      emailPlaceholder: "输入邮箱", subscribe: "订阅",
    },
    game: { platforms: "平台", rating: "评分", guides: "相关攻略", noGuides: "暂无攻略" },
    guide: {
      readTime: "分钟阅读", difficulty: "难度", related: "相关攻略",
      backToGuides: "返回攻略列表", backToGames: "返回游戏列表",
    },
    categories: { title: "按分类浏览", all: "全部" },
    search: { placeholder: "搜索游戏和攻略...", noResults: "未找到结果" },
    footer: {
      about: "GameGuide 是你获取游戏攻略、Build和技巧的终极目的地。",
      quickLinks: "快速链接", followUs: "关注我们", rights: "版权所有。",
    },
  },
};

export function getDictionary(lang: string) {
  return dictionaries[lang] || dictionaries.en;
}

export function getLangFromParams(params: { lang: string }): string {
  return ['en', 'zh'].includes(params.lang) ? params.lang : 'en';
}
