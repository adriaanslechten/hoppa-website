# Technical GEO Fixes Reference

## 1. Create llms.txt

Create file at `public/.well-known/llms.txt`:

```markdown
# Hoppa - AI-Powered Fitness App

> Hoppa is a mobile fitness application using AI-powered pose detection to provide real-time workout feedback, gamified exercise experiences, and personalized training programs.

## About

Hoppa transforms fitness training through computer vision and machine learning. The app analyzes user movements in real-time, providing instant feedback on exercise form and counting repetitions automatically.

## Key Features

- **AI Pose Detection**: Real-time computer vision analyzes exercise form
- **Gamified Workouts**: Progress through campaigns with achievement systems
- **Personalized Training**: Adaptive recommendations based on performance
- **Recovery Exercises**: Guided mobility and stretching routines
- **Community Forum**: Discuss fitness topics with other users

## Target Audience

- Fitness enthusiasts wanting form feedback
- Home workout users without a trainer
- Beginners learning proper exercise technique
- Athletes tracking workout performance

## Technical Approach

Uses on-device machine learning for privacy-preserving pose estimation. No video data leaves the user's device.

## Pages

- Homepage: https://hoppa.fit
- Blog: https://hoppa.fit/blog
- Community Forum: https://hoppa.fit/forum
- Privacy Policy: https://hoppa.fit/privacy
- Terms of Service: https://hoppa.fit/terms

## App Downloads

- iOS: [App Store Link]
- Android: [Play Store Link]

## Contact

Website: https://hoppa.fit
```

Also create `public/llms.txt` as a symlink or copy for discoverability.

## 2. Update robots.txt

Replace `public/robots.txt` with:

```
# Hoppa Fitness - robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# AI Search Engine Crawlers - Explicitly Allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

# Sitemap
Sitemap: https://hoppa.fit/sitemap.xml

# LLMs.txt - AI-readable site summary
# https://hoppa.fit/.well-known/llms.txt
```

**IMPORTANT**: Current robots.txt has wrong sitemap URL (`hoppa-fitness.com` instead of `hoppa.fit`).

## 3. Fix Sitemap

Update `next-sitemap.config.js` to ensure:

```javascript
module.exports = {
  siteUrl: 'https://hoppa.fit',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],

  // Add dynamic routes
  additionalPaths: async (config) => {
    const paths = [];

    // Add blog posts dynamically
    // const posts = await fetchBlogPosts();
    // posts.forEach(post => paths.push({ loc: `/blog/${post.slug}` }));

    // Add forum topics dynamically
    // const topics = await fetchForumTopics();
    // topics.forEach(topic => paths.push({ loc: `/forum/${topic.slug}` }));

    return paths;
  },

  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/forum') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/forum/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

Run `npx next-sitemap` after build to regenerate.

## 4. Verify Static Rendering

Check that key pages use SSG or SSR:

```typescript
// For static pages (blog posts, forum topics)
export async function getStaticProps() {
  // Fetch data at build time
  return { props: { ... }, revalidate: 3600 };
}

// For dynamic pages
export async function getServerSideProps() {
  // Fetch data per request
  return { props: { ... } };
}
```

AI crawlers typically cannot execute JavaScript, so client-only rendered content may not be indexed.

## 5. Add Canonical URLs

Ensure each page has a canonical URL in the `<Head>`:

```tsx
<link rel="canonical" href={`https://hoppa.fit${router.asPath}`} />
```

## Validation Commands

```bash
# Check robots.txt
curl https://hoppa.fit/robots.txt

# Check llms.txt
curl https://hoppa.fit/.well-known/llms.txt
curl https://hoppa.fit/llms.txt

# Test AI crawler access
curl -A "GPTBot" https://hoppa.fit/
curl -A "PerplexityBot" https://hoppa.fit/
curl -A "ClaudeBot" https://hoppa.fit/

# Validate sitemap
curl https://hoppa.fit/sitemap.xml
```
