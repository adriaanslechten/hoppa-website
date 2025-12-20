import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { visit } from "unist-util-visit";
import {
  useGetArticleBySlugQuery,
  useGetRelatedArticlesQuery,
  useIncrementViewsMutation,
} from "../../store/api/blogApi";
import { ArticleCard } from "../../components/blog/ArticleCard";
import styles from "./BlogDetail.module.css";

// Remark plugin to transform [1], [2], etc. into footnote elements
function remarkFootnotes() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      const footnoteRegex = /\[(\d+)\]/g;
      const text = node.value as string;

      if (!footnoteRegex.test(text)) return;

      // Reset regex
      footnoteRegex.lastIndex = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newNodes: any[] = [];
      let lastIndex = 0;
      let match;

      while ((match = footnoteRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }

        // Add the footnote as HTML
        newNodes.push({
          type: "html",
          value: `<sup class="footnote-ref" data-footnote="${match[1]}">${match[1]}</sup>`,
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }

      if (newNodes.length > 0 && parent && index !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parent as any).children.splice(index, 1, ...newNodes);
      }
    });
  };
}

// Helper to check for specific content in ReactNode
const isAtAGlance = (children: ReactNode): boolean => {
  if (!children) return false;

  // Recursively check children
  const checkNode = (node: ReactNode): boolean => {
    if (typeof node === 'string') {
      return node.toLowerCase().includes('at a glance');
    }

    if (Array.isArray(node)) {
      return node.some(checkNode);
    }

    if (React.isValidElement(node)) {
      // Check children of the element
      const props = node.props as { children?: ReactNode };
      return checkNode(props.children);
    }

    return false;
  };

  return checkNode(children);
};

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

  // Local state for parsed content and sources
  const [displayContent, setDisplayContent] = React.useState("");
  const [displaySources, setDisplaySources] = React.useState<any[]>([]);
  const [displayTakeaways, setDisplayTakeaways] = React.useState<string[]>([]);

  // Parse content and sources
  useEffect(() => {
    if (!article) return;

    let content = article.content;
    let sources = article.sources || [];

    // If no structured sources, try to extract from markdown
    if (sources.length === 0 && content.match(/##\s*References/i)) {
      const parts = content.split(/##\s*References/i);
      if (parts.length > 1) {
        content = parts[0];
        const refsRaw = parts[1].trim();
        const extractedSources = refsRaw
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => {
            // Keep the original text including [1], [2] etc
            return { title: line.trim() };
          });

        if (extractedSources.length > 0) {
          sources = extractedSources;
        }
      }
    }

    // Extract Key Takeaways
    // Matches "## Key Takeaways" (case insensitive) and everything until the next "##" or end of string
    const takeawaysMatch = content.match(/#{1,3}\s*Key Takeaways([\s\S]*?)(?=(?:#{1,3}\s|$))/i);
    let takeaways: string[] = [];

    if (takeawaysMatch && takeawaysMatch[1]) {
      const takeawaysRaw = takeawaysMatch[1].trim();
      takeaways = takeawaysRaw
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('*'))
        .map(line => line.replace(/^[-*]\s*/, '').trim());

      // Remove from content
      content = content.replace(/#{1,3}\s*Key Takeaways[\s\S]*?(?=(?:#{1,3}\s|$))/i, '');
    }

    // Remove FAQ section from markdown if it exists (to avoid duplication with structured FAQ)
    // Use string splitting instead of replace for better reliability
    const faqRegex = /#{1,3}\s*Frequently Asked Questions/i;
    if (content.match(faqRegex)) {
      const parts = content.split(faqRegex);
      if (parts.length > 0) {
        content = parts[0];
      }
    }

    setDisplayContent(content);
    setDisplaySources(sources);
    setDisplayTakeaways(takeaways);
  }, [article]);

  // Increment view count on page load
  useEffect(() => {
    if (article?.id) {
      incrementViews(article.id);
    }
  }, [article?.id, incrementViews]);

  // Add click handlers for footnotes
  useEffect(() => {
    const handleFootnoteClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('footnote-ref')) {
        const sourcesSection = document.querySelector('[class*="Sources"]');
        if (sourcesSection) {
          sourcesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleFootnoteClick);
    return () => document.removeEventListener('click', handleFootnoteClick);
  }, []);

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
                  <div className={styles.AuthorAvatar}>
                    {article.author.name.charAt(0)}
                  </div>
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

                      <div className={styles.Content}>
                        <ReactMarkdown
                          remarkPlugins={[remarkFootnotes]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            h1: ({ node, ...props }) => <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                            h2: ({ node, ...props }) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                            h3: ({ node, ...props }) => <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                            img: ({ node, ...props }) => (
                              <div className={styles.ImageContainer}>
                                <img {...props} className={styles.MarkdownImage} alt={props.alt || ''} />
                                {props.title && <span className={styles.ImageCaption}>{props.title}</span>}
                              </div>
                            ),
                            blockquote: ({ node, children, ...props }) => {
                              const isBox = isAtAGlance(children);
                              return (
                                <blockquote className={isBox ? styles.SummaryBox : styles.PullQuote} {...props}>
                                  {children}
                                </blockquote>
                              );
                            },
                          }}
                        >
                          {displayContent}
                        </ReactMarkdown>
                      </div>

                      {displayTakeaways.length > 0 && (
                        <section className={styles.KeyTakeaways}>
                          <h2 className={styles.KeyTakeawaysTitle}>Key Takeaways</h2>
                          <ul className={styles.KeyTakeawaysList}>
                            {displayTakeaways.map((takeaway, index) => (
                              <li key={index} className={styles.KeyTakeawaysItem}>
                                {takeaway}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

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

                      {displaySources.length > 0 && (
                        <section className={styles.Sources}>
                          <h3 className={styles.SourcesTitle}>Sources</h3>
                          <ul className={styles.SourcesList}>
                            {displaySources.map((source, index) => (
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
                        image: relatedArticle.images?.thumbnail?.url || relatedArticle.images?.featured?.url,
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

export default BlogDetailPage;
