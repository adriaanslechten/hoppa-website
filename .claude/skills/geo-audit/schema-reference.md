# Structured Data / Schema.org Reference

## Current State

The site has basic SoftwareApplication schema in `layout.tsx`. This needs expansion.

## Required Schemas

### 1. Organization Schema (Global)

Add to `layout.tsx` alongside existing schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hoppa.fit/#organization",
  "name": "Hoppa",
  "url": "https://hoppa.fit",
  "logo": {
    "@type": "ImageObject",
    "url": "https://hoppa.fit/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "AI-powered fitness app with real-time pose detection",
  "foundingDate": "2024",
  "sameAs": [
    "https://apps.apple.com/app/hoppa",
    "https://play.google.com/store/apps/details?id=com.hoppa",
    "https://twitter.com/hoppa",
    "https://www.linkedin.com/company/hoppa"
  ]
}
```

### 2. WebSite Schema (Global)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hoppa.fit/#website",
  "name": "Hoppa",
  "url": "https://hoppa.fit",
  "publisher": {
    "@id": "https://hoppa.fit/#organization"
  },
  "inLanguage": "en-US"
}
```

### 3. Enhanced SoftwareApplication (Update existing)

```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "https://hoppa.fit/#app",
  "name": "Hoppa",
  "description": "AI-powered fitness app with real-time pose detection for form correction, gamified workouts, and personalized training",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS 14+, Android 10+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@id": "https://hoppa.fit/#organization"
  },
  "featureList": [
    "Real-time AI pose detection",
    "Automatic rep counting",
    "Form correction feedback",
    "Gamified workout campaigns",
    "Personalized training plans",
    "Recovery exercises"
  ],
  "screenshot": [
    "https://hoppa.fit/screenshots/workout.png",
    "https://hoppa.fit/screenshots/pose-detection.png"
  ]
}
```

### 4. Article Schema (For Blog Posts)

Create a reusable component or add to each blog page:

```tsx
// components/ArticleSchema.tsx
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  publishedDate,
  modifiedDate,
  image,
  authorName = 'Hoppa Team',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `https://hoppa.fit/blog/${slug}`,
    image: image.startsWith('http') ? image : `https://hoppa.fit${image}`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hoppa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hoppa.fit/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hoppa.fit/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 5. FAQPage Schema

For pages with FAQ content:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Hoppa's AI pose detection work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hoppa uses on-device machine learning to analyze your body position through your phone's camera. The AI identifies key body points and compares your form against ideal exercise positions, providing real-time feedback without sending any video data to external servers."
      }
    },
    {
      "@type": "Question",
      "name": "What exercises does Hoppa support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hoppa supports a wide range of bodyweight exercises including squats, push-ups, lunges, planks, and more. The app continuously adds new exercises and workout routines."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hoppa suitable for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Hoppa is designed for all fitness levels. Beginners benefit from real-time form correction to learn proper technique, while advanced users can track performance and progress through challenging campaigns."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the pose detection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hoppa's pose detection achieves high accuracy for supported exercises when the camera has a clear view of your full body. Accuracy improves with good lighting and appropriate camera positioning."
      }
    },
    {
      "@type": "Question",
      "name": "Does Hoppa work offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the core pose detection and workout features work offline. The AI runs entirely on your device. An internet connection is only needed for syncing progress, accessing the community forum, and downloading new content."
      }
    }
  ]
}
```

### 6. BreadcrumbList Schema

For navigation context:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://hoppa.fit"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://hoppa.fit/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Article Title",
      "item": "https://hoppa.fit/blog/article-slug"
    }
  ]
}
```

## Implementation Pattern

Create a utility file for schema generation:

```tsx
// utils/schema.ts
export const organizationSchema = { /* ... */ };
export const websiteSchema = { /* ... */ };
export const appSchema = { /* ... */ };

export function generateArticleSchema(article: Article) { /* ... */ }
export function generateFAQSchema(faqs: FAQ[]) { /* ... */ }
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) { /* ... */ }
```

Then use in layout or pages:

```tsx
<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        organizationSchema,
        websiteSchema,
        appSchema,
      ]),
    }}
  />
</Head>
```

## Validation

Test schemas at:
- https://search.google.com/test/rich-results
- https://validator.schema.org/
