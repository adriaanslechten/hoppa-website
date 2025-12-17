import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Fetch all articles from the API
  // Note: In a real production scenario, you might want to fetch this directly from the database
  // or use an internal service method to avoid self-referencing API calls during build/runtime if possible.
  // For now, we'll fetch from the public API endpoint assuming it's available.

  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = ctx.req.headers.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(`${baseUrl}/api/blog/articles?limit=1000`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.items || [];

    const fields = articles.map((article: { slug: string; updatedAt?: string; publishedAt?: string }) => ({
      loc: `${baseUrl}/blog/${article.slug}`,
      lastmod: article.updatedAt || article.publishedAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }));

    return getServerSideSitemapLegacy(ctx, fields);
  } catch (error) {
    console.error('Error generating server-sitemap.xml:', error);
    // Return empty sitemap on error to avoid breaking the build/runtime
    return getServerSideSitemapLegacy(ctx, []);
  }
};

// Default export to prevent next.js errors
export default function Sitemap() {}
