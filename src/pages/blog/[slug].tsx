import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  useGetArticleBySlugQuery,
  useGetRelatedArticlesQuery,
  useIncrementViewsMutation,
} from "../../store/api/blogApi";
import { ArticleCard } from "../../components/blog/ArticleCard";
import styles from "./BlogDetail.module.css";

const BlogDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: article,
    isLoading: loading,
    error: queryError,
  } = useGetArticleBySlugQuery(slug as string, {
    skip: !slug,
  });

  const { data: relatedArticles = [] } = useGetRelatedArticlesQuery(
    { id: article?.id || "", limit: 3 },
    { skip: !article?.id }
  );

  const [incrementViews] = useIncrementViewsMutation();

  // Increment view count on page load
  useEffect(() => {
    if (article?.id) {
      incrementViews(article.id);
    }
  }, [article?.id, incrementViews]);

  const error = queryError ? "Failed to load article. Please try again." : null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate structured data for article
  const structuredData = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.seo?.description || article.excerpt,
        image: article.images?.featured?.url || "https://hoppa.fit/default-blog-image.jpg",
        author: {
          "@type": "Person",
          name: article.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Hoppa",
          logo: {
            "@type": "ImageObject",
            url: "https://hoppa.fit/logo.png",
          },
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://hoppa.fit/blog/${article.slug}`,
        },
        wordCount: article.wordCount,
        articleBody: article.content,
      }
    : null;

  // Generate FAQ structured data if present
  const faqStructuredData =
    article?.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq: { question: string; answer: string }) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  if (!slug) {
    return <div className={styles.Loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        {article && (
          <>
            <title>{article.seo?.title || article.title} | Hoppa Blog</title>
            <meta name="title" content={article.seo?.title || article.title} />
            <meta name="description" content={article.seo?.description || article.excerpt} />
            <meta name="keywords" content={article.seo?.keywords?.join(", ") || article.tags?.join(", ")} />
            <link rel="canonical" href={`https://hoppa.fit/blog/${article.slug}`} />

            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://hoppa.fit/blog/${article.slug}`} />
            <meta property="og:title" content={article.seo?.ogTitle || article.title} />
            <meta property="og:description" content={article.seo?.ogDescription || article.excerpt} />
            <meta
              property="og:image"
              content={article.images?.social?.url || article.images?.featured?.url || "https://hoppa.fit/blog-og.jpg"}
            />
            <meta property="og:site_name" content="Hoppa" />
            <meta property="article:published_time" content={article.publishedAt} />
            <meta property="article:modified_time" content={article.updatedAt} />
            <meta property="article:author" content={article.author.name} />
            <meta property="article:section" content={article.category} />
            {article.tags?.map((tag: string) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}

            <meta property="twitter:card" content={article.seo?.twitterCard || "summary_large_image"} />
            <meta property="twitter:url" content={`https://hoppa.fit/blog/${article.slug}`} />
            <meta property="twitter:title" content={article.seo?.ogTitle || article.title} />
            <meta property="twitter:description" content={article.seo?.ogDescription || article.excerpt} />
            <meta
              property="twitter:image"
              content={article.images?.social?.url || article.images?.featured?.url || "https://hoppa.fit/blog-og.jpg"}
            />

            {structuredData && (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            )}
            {faqStructuredData && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
              />
            )}
          </>
        )}
      </Head>

      <div className={styles.Container}>
        <Link href="/blog" className={styles.BackLink}>
          Back to Blog
        </Link>

        {error && <div className={styles.Error}>{error}</div>}

        {loading ? (
          <div className={styles.Loading}>Loading article...</div>
        ) : !article ? (
          <div className={styles.Error}>Article not found.</div>
        ) : (
          <>
            <article className={styles.Article}>
              <header className={styles.ArticleHeader}>
                <div className={styles.Meta}>
                  <span className={styles.Category}>{article.category}</span>
                  <span className={styles.Dot}>·</span>
                  <span className={styles.ReadTime}>{article.readingTime} min read</span>
                  <span className={styles.Dot}>·</span>
                  <span className={styles.Date}>{formatDate(article.publishedAt)}</span>
                </div>
                <h1 className={styles.Title}>{article.title}</h1>
                <p className={styles.Excerpt}>{article.excerpt}</p>
                <div className={styles.Author}>
                  <div className={styles.AuthorInfo}>
                    <span className={styles.AuthorName}>{article.author.name}</span>
                    {article.author.role && <span className={styles.AuthorRole}>{article.author.role}</span>}
                  </div>
                </div>
              </header>

              {article.images?.featured?.url && (
                <div className={styles.FeaturedImage}>
                  <Image
                    src={article.images.featured.url}
                    alt={article.images.featured.alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    priority
                    className={styles.FeaturedImageInner}
                  />
                </div>
              )}

              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <nav className={styles.TOC}>
                  <h3 className={styles.TOCTitle}>Table of Contents</h3>
                  <ul className={styles.TOCList}>
                    {article.tableOfContents.map((item: { id: string; text: string; level: number }) => (
                      <li
                        key={item.id}
                        className={styles.TOCItem}
                        style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
                      >
                        <a href={`#${item.id}`} className={styles.TOCLink}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className={styles.Content} dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }} />

              {article.faqs && article.faqs.length > 0 && (
                <section className={styles.FAQSection}>
                  <h2 className={styles.FAQTitle}>Frequently Asked Questions</h2>
                  <div className={styles.FAQList}>
                    {article.faqs.map((faq: { question: string; answer: string }, index: number) => (
                      <div key={index} className={styles.FAQItem}>
                        <h3 className={styles.FAQQuestion}>{faq.question}</h3>
                        <p className={styles.FAQAnswer}>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {article.sources && article.sources.length > 0 && (
                <section className={styles.Sources}>
                  <h3 className={styles.SourcesTitle}>Sources</h3>
                  <ul className={styles.SourcesList}>
                    {article.sources.map((source, index) => (
                      <li key={index} className={styles.SourceItem}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className={styles.SourceLink}>
                            {source.title}
                          </a>
                        ) : (
                          <span>{source.title}</span>
                        )}
                        {source.author && <span className={styles.SourceAuthor}> - {source.author}</span>}
                        {source.publication && <span className={styles.SourcePub}>, {source.publication}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <footer className={styles.ArticleFooter}>
                {article.tags && article.tags.length > 0 && (
                  <div className={styles.Tags}>
                    {article.tags.map((tag) => (
                      <span key={tag} className={styles.Tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className={styles.Stats}>
                  <span>{article.views} views</span>
                  <span>·</span>
                  <span>{article.wordCount} words</span>
                </div>
              </footer>
            </article>

            {relatedArticles.length > 0 && (
              <section className={styles.RelatedSection}>
                <h2 className={styles.RelatedTitle}>Related Articles</h2>
                <div className={styles.RelatedGrid}>
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard
                      key={relatedArticle.id}
                      article={{
                        id: relatedArticle.id,
                        title: relatedArticle.title,
                        slug: relatedArticle.slug,
                        excerpt: relatedArticle.excerpt,
                        category: relatedArticle.category,
                        tags: relatedArticle.tags,
                        status: relatedArticle.status,
                        publishedAt: relatedArticle.publishedAt,
                        featured: relatedArticle.featured,
                        readingTime: relatedArticle.readingTime,
                        views: relatedArticle.views,
                        likes: relatedArticle.likes,
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

// Simple markdown to HTML converter
function renderMarkdown(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, "<li>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n/gim, "</p><p>")
    // Line breaks
    .replace(/\n/gim, "<br />");

  // Wrap in paragraphs
  html = "<p>" + html + "</p>";

  // Fix list items by wrapping in ul
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gi, "<ul>$1</ul>");

  // Clean up header IDs
  html = html.replace(/id="([^"]+)"/g, (match, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `id="${id}"`;
  });

  return html;
}

export default BlogDetailPage;
