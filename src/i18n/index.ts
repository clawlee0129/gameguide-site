const dictionaries: Record<string, Record<string, any>> = {
  en: {
    site: { title: "GameGuide", subtitle: "Your Ultimate Gaming Guide", description: "Expert guides, builds, and walkthroughs for the hottest games" },
    nav: { home: "Home", games: "Games", guides: "Guides", categories: "Categories", search: "Search", lang: "中文" },
    home: {
      featured: "Featured Games", latest: "Latest Guides", trending: "Trending Guides",
      categories: "Browse by Category", viewAll: "View All",
      newsletter: "Stay Updated", newsletterDesc: "Get the latest guides and tips delivered to your inbox.",
      emailPlaceholder: "Enter your email", subscribe: "Subscribe",
      newsletterSuccess: "Thanks for subscribing!", newsletterError: "Something went wrong. Please try again.", newsletterSubmitting: "Subscribing...",
    },
    game: { platforms: "Platforms", rating: "Rating", guides: "Related Guides", noGuides: "No guides yet" },
    guide: {
      readTime: "min read", difficulty: "Difficulty", related: "Related Guides",
      backToGuides: "Back to Guides", backToGames: "Back to Games", views: "views", new: "New",
    },
    categories: { title: "Browse by Category", all: "All" },
    search: { placeholder: "Search games and guides...", noResults: "No results found" },
    footer: {
      about: "GameGuide is your ultimate destination for game walkthroughs, builds, and tips.",
      quickLinks: "Quick Links", followUs: "Follow Us", rights: "All rights reserved.",
      privacy: "Privacy Policy", terms: "Terms of Service", contact: "Contact Us",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: June 14, 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          content: "When you visit GameGuide, we may collect certain information automatically, including your IP address, browser type, device information, and usage data such as pages visited and time spent on the site. If you subscribe to our newsletter, we collect your email address.\n\nWe do not collect any sensitive personal information such as financial data, health information, or government-issued identification.",
        },
        {
          heading: "2. Cookies and Tracking Technologies",
          content: "GameGuide uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.\n\nWe use essential cookies that are necessary for the website to function properly. With your consent, we also use analytics cookies to understand site traffic and advertising cookies to deliver relevant advertisements.",
        },
        {
          heading: "3. Third-Party Services",
          content: "We use the following third-party services that may collect data:\n\nGoogle AdSense: We display advertisements through Google AdSense, which may use cookies to serve personalized ads based on your browsing history. You can opt out of personalized advertising by visiting Google's Ads Settings.\n\nThese third-party services have their own privacy policies governing the use of your information. We encourage you to review their policies.",
        },
        {
          heading: "4. How We Use Your Information",
          content: "We use the information we collect to:\n- Provide and maintain our website\n- Send newsletters and updates (with your consent)\n- Analyze website usage to improve our content and user experience\n- Display relevant advertisements\n- Detect and prevent fraudulent activity",
        },
        {
          heading: "5. Data Sharing and Disclosure",
          content: "We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data with analytics partners. We may disclose information if required by law or to protect our legal rights.",
        },
        {
          heading: "6. Your Rights",
          content: "Depending on your location, you may have the following rights under data protection laws such as GDPR and CCPA:\n- Right to access your personal data\n- Right to rectification of inaccurate data\n- Right to erasure ('right to be forgotten')\n- Right to restrict processing\n- Right to data portability\n- Right to object to processing\n- Right to withdraw consent\n\nTo exercise any of these rights, please contact us using the information provided below.",
        },
        {
          heading: "7. Data Retention",
          content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy. Newsletter subscription data is retained until you unsubscribe. Usage analytics data is retained for a maximum of 26 months.",
        },
        {
          heading: "8. Children's Privacy",
          content: "GameGuide is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us immediately.",
        },
        {
          heading: "9. Changes to This Policy",
          content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last updated' date. Continued use of the site after changes constitutes acceptance of the updated policy.",
        },
        {
          heading: "10. Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at:\nEmail: privacy@gameguide.guide\nWebsite: https://gameguide.guide",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated: June 14, 2026",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          content: "By accessing and using GameGuide ('the Website'), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Website.",
        },
        {
          heading: "2. Content Ownership",
          content: "All guides, articles, images, and other content published on GameGuide are the intellectual property of GameGuide and its authors, unless otherwise stated. You may not reproduce, distribute, or create derivative works from our content without prior written permission.\n\nUser-generated content (such as comments) remains the property of the user, but by posting you grant GameGuide a non-exclusive, royalty-free license to use, display, and distribute that content on the Website.",
        },
        {
          heading: "3. User Conduct",
          content: "When using GameGuide, you agree not to:\n- Post unlawful, harassing, defamatory, or obscene content\n- Attempt to gain unauthorized access to our systems\n- Use the Website for spam, phishing, or other malicious activities\n- Interfere with the proper functioning of the Website\n- Scrape or systematically extract data without permission\n\nWe reserve the right to terminate access for users who violate these terms.",
        },
        {
          heading: "4. Disclaimer of Warranties",
          content: "GameGuide is provided 'as is' without warranties of any kind, either express or implied. While we strive for accuracy in our guides and content, we make no guarantees regarding the completeness, reliability, or timeliness of any information on the Website.\n\nGaming strategies, builds, and walkthroughs may become outdated as games receive updates. Use any information from GameGuide at your own risk.",
        },
        {
          heading: "5. Limitation of Liability",
          content: "To the fullest extent permitted by law, GameGuide and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Website, including but not limited to loss of game progress, data loss, or any other damages.",
        },
        {
          heading: "6. Intellectual Property",
          content: "Game names, logos, and related trademarks mentioned on GameGuide are the property of their respective owners. Reference to these trademarks does not imply endorsement or affiliation with GameGuide.\n\nOur original content, site design, and code are protected by copyright and other intellectual property laws.",
        },
        {
          heading: "7. Third-Party Links",
          content: "The Website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those external sites. Accessing third-party links is at your own risk.",
        },
        {
          heading: "8. Advertising",
          content: "GameGuide displays advertisements through Google AdSense and potentially other advertising networks. We are not responsible for the content of advertisements displayed on the Website. Your interactions with advertisers are between you and the advertiser.",
        },
        {
          heading: "9. Termination",
          content: "We reserve the right to suspend or terminate access to the Website at our sole discretion, without prior notice, for any reason including violation of these Terms of Service. Upon termination, your right to use the Website will immediately cease.",
        },
        {
          heading: "10. Changes to Terms",
          content: "We may modify these Terms of Service at any time. Changes become effective immediately upon posting. Your continued use of the Website after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically.",
        },
        {
          heading: "11. Governing Law",
          content: "These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved through binding arbitration or in courts of competent jurisdiction.",
        },
        {
          heading: "12. Contact",
          content: "For questions about these Terms of Service, please contact us at:\nEmail: legal@gameguide.guide\nWebsite: https://gameguide.guide",
        },
      ],
    },
    cookie: {
      message: "We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic.",
      learnMore: "Learn more",
      acceptAll: "Accept All",
      essentialOnly: "Essential Only",
      lang: "en",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have a question or feedback? We'd love to hear from you.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "What's this about?",
      message: "Message",
      messagePlaceholder: "Tell us more...",
      send: "Send Message",
    },
  },
  zh: {
    site: { title: "GameGuide", subtitle: "你的终极游戏攻略指南", description: "最热门游戏的专家攻略与Build指南" },
    nav: { home: "首页", games: "游戏", guides: "攻略", categories: "分类", search: "搜索", lang: "English" },
    home: {
      featured: "精选游戏", latest: "最新攻略", trending: "热门趋势",
      categories: "按分类浏览", viewAll: "查看全部",
      newsletter: "保持更新", newsletterDesc: "获取最新攻略和技巧，发送到你的邮箱。",
      emailPlaceholder: "输入邮箱", subscribe: "订阅",
      newsletterSuccess: "订阅成功！", newsletterError: "订阅失败，请稍后重试。", newsletterSubmitting: "提交中...",
    },
    game: { platforms: "平台", rating: "评分", guides: "相关攻略", noGuides: "暂无攻略" },
    guide: {
      readTime: "分钟阅读", difficulty: "难度", related: "相关攻略",
      backToGuides: "返回攻略列表", backToGames: "返回游戏列表", views: "次浏览", new: "新",
    },
    categories: { title: "按分类浏览", all: "全部" },
    search: { placeholder: "搜索游戏和攻略...", noResults: "未找到结果" },
    footer: {
      about: "GameGuide 是你获取游戏攻略、Build和技巧的终极目的地。",
      quickLinks: "快速链接", followUs: "关注我们", rights: "版权所有。",
      privacy: "隐私政策", terms: "服务条款", contact: "联系我们",
    },
    privacy: {
      title: "隐私政策",
      lastUpdated: "最后更新: 2026年6月14日",
      sections: [
        {
          heading: "1. 我们收集的信息",
          content: `当您访问 GameGuide 时，我们可能会自动收集某些信息，包括您的 IP 地址、浏览器类型、设备信息以及使用数据（如访问的页面和在网站上停留的时间）。如果您订阅我们的新闻通讯，我们会收集您的电子邮件地址。

我们不收集任何敏感的个人信息，如财务数据、健康信息或政府颁发的身份证明。`,
        },
        {
          heading: "2. 我们如何使用您的信息",
          content: `我们使用收集到的信息来：

- 提供、运营和维护我们的网站
- 改进、个性化和扩展我们的网站
- 了解和分析您如何使用我们的网站
- 开发新产品、服务、功能和功能
- 与您沟通，包括用于客户服务、向您提供更新以及有关网站的其他信息
- 向您发送营销和促销信息（需征得您的同意）
- 防止欺诈活动`,
        },
        {
          heading: "3. Cookie 和跟踪技术",
          content: `我们使用 Cookie 和类似的跟踪技术来跟踪我们网站上的活动并存储某些信息。Cookie 是包含少量数据的文件，可能包含匿名唯一标识符。

您可以将浏览器设置为拒绝所有 Cookie 或在发送 Cookie 时指示。但是，如果您不接受 Cookie，您可能无法使用我们网站的某些部分。`,
        },
        {
          heading: "4. 第三方服务",
          content: `我们可能会使用第三方服务，例如：

- Google Analytics：用于分析网站流量和用户行为
- Google AdSense：用于展示相关广告

这些第三方服务有自己的隐私政策，处理他们收集的数据。`,
        },
        {
          heading: "5. 数据保留与安全",
          content: `我们将在法律允许的范围内保留您的数据，只要是为了实现本隐私政策所述目的所必需。我们采用行业标准的安全措施来保护您的个人信息，但不保证绝对安全。`,
        },
        {
          heading: "6. 儿童隐私",
          content: `我们的网站不针对 13 岁以下的儿童。我们不会有意收集 13 岁以下儿童的个人身份信息。如果您是父母或监护人并且您知道您的孩子向我们提供了个人数据，请与我们联系。`,
        },
        {
          heading: "7. 您的数据权利",
          content: `根据适用的数据保护法，您有权：

- 访问我们持有的关于您的个人数据
- 要求更正不准确的个人数据
- 要求删除您的个人数据
- 反对或限制处理您的个人数据
- 数据可移植性

要行使这些权利，请通过以下方式联系我们：privacy@gameguide.guide`,
        },
        {
          heading: "8. 本隐私政策的更改",
          content: `我们可能会不时更新我们的隐私政策。我们将通过在本页面上发布新的隐私政策来通知您任何更改。建议您定期查看本隐私政策以了解任何更改。`,
        },
        {
          heading: "9. 国际数据传输",
          content: `您的信息可能会被传输到并在您所在国家/地区以外的计算机上维护。通过使用我们的网站，您同意将您的信息传输到这些国家/地区。`,
        },
        {
          heading: "10. 联系我们",
          content: `如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
邮箱：privacy@gameguide.guide
网站：https://gameguide.guide`,
        },
      ],
    },
    terms: {
      title: "服务条款",
      lastUpdated: "最后更新: 2026年6月14日",
      sections: [
        {
          heading: "1. 条款的接受",
          content: `通过访问和使用 GameGuide（"网站"），您同意受这些服务条款（"条款"）的约束。如果您不同意这些条款的任何部分，您不得访问该网站。`,
        },
        {
          heading: "2. 服务描述",
          content: `GameGuide 是一个游戏攻略和指南平台。我们提供游戏攻略、技巧、教程和相关信息。所有信息仅供参考。`,
        },
        {
          heading: "3. 用户行为",
          content: `使用我们的网站时，您同意：

- 不违反任何适用法律或法规
- 不干扰网站的正常运行
- 不尝试未经授权访问我们的系统
- 不对网站进行逆向工程或试图提取源代码
- 不使用任何自动化手段（如爬虫）收集数据`,
        },
        {
          heading: "4. 知识产权",
          content: `网站上的所有内容，包括但不限于文本、图形、标识、图标、图像、音频片段和软件，均为 GameGuide 或其内容供应商的财产，并受国际版权法保护。`,
        },
        {
          heading: "5. 免责声明",
          content: `网站以"现状"和"可用"为基础提供。我们对网站内容的准确性、完整性或可靠性不作任何明示或暗示的保证。游戏信息可能随时更改，我们不保证及时更新。`,
        },
        {
          heading: "6. 责任限制",
          content: `在任何情况下，GameGuide 及其关联公司均不对因使用或无法使用网站而产生的任何间接、附带、特殊、后果性或惩罚性损害承担责任，即使已被告知此类损害的可能性。`,
        },
        {
          heading: "7. 第三方链接",
          content: `我们的网站可能包含指向不属于我们或不受我们控制的第三方网站的链接。我们对任何第三方网站的内容、隐私政策或做法没有控制权，也不承担任何责任。`,
        },
        {
          heading: "8. 帐户安全",
          content: `如果您在网站上创建帐户，您有责任维护该帐户的安全性，并对在您帐户下发生的所有活动负全部责任。`,
        },
        {
          heading: "9. 终止",
          content: `我们保留以任何理由在任何时候终止或暂停您访问网站的权利，无需事先通知或承担责任。`,
        },
        {
          heading: "10. 条款的变更",
          content: `我们保留随时修改这些条款的权利。我们将在本页面上发布更新后的条款。您在发布条款更改后继续使用网站即表示您接受这些更改。`,
        },
        {
          heading: "11. 联系我们",
          content: `如对本服务条款有任何疑问，请通过以下方式联系我们：
邮箱：legal@gameguide.guide
网站：https://gameguide.guide`,
        },
      ],
    },
    cookie: {
      message: "我们使用 Cookie 来增强浏览体验、提供个性化广告并分析流量。",
      learnMore: "了解更多",
      acceptAll: "接受全部",
      essentialOnly: "仅必要",
      lang: "zh",
    },
    contact: {
      title: "联系我们",
      subtitle: "有问题或反馈吗？我们很乐意听取你的意见。",
      name: "姓名",
      namePlaceholder: "你的名字",
      email: "邮箱",
      emailPlaceholder: "your@email.com",
      subject: "主题",
      subjectPlaceholder: "关于什么？",
      message: "留言",
      messagePlaceholder: "告诉我们更多...",
      send: "发送消息",
    },
  },
};

export function getDictionary(lang: string) {
  return dictionaries[lang] || dictionaries.en;
}

export function getLangFromParams(params: { lang: string }): string {
  return ['en', 'zh'].includes(params.lang) ? params.lang : 'en';
}
