/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://hoppa.fit",
  generateRobotsTxt: false, // We manage robots.txt manually for AI crawlers
  generateIndexSitemap: false,
  exclude: ["/api/*", "/server-sitemap.xml", "/admin/*", "/login"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL || "https://hoppa.fit"}/server-sitemap.xml`,
    ],
  },
  autoLastmod: true,
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    let priority = 0.7;
    let changefreq = "weekly";

    // Homepage - highest priority
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }
    // Blog index - high priority, updates frequently
    else if (path === "/blog") {
      priority = 0.9;
      changefreq = "daily";
    }
    // Blog posts - good priority
    else if (path.startsWith("/blog/")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // Forum index - high priority, active community
    else if (path === "/forum") {
      priority = 0.9;
      changefreq = "daily";
    }
    // Forum topics - good priority
    else if (path.startsWith("/forum/")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // Legal pages - lower priority, rarely change
    else if (path === "/privacy" || path === "/terms") {
      priority = 0.3;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
