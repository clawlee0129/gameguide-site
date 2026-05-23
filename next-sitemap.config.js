/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gameguidepro.com',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    // Higher priority for main pages
    if (path === '/') {
      return { loc: path, changefreq: 'daily', priority: 1.0 };
    }
    if (path === '/games') {
      return { loc: path, changefreq: 'daily', priority: 0.9 };
    }
    if (path.startsWith('/games/')) {
      return { loc: path, changefreq: 'weekly', priority: 0.8 };
    }
    if (path.startsWith('/guides/')) {
      return { loc: path, changefreq: 'weekly', priority: 0.8 };
    }
    return config;
  },
};