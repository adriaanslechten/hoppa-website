import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useGetArticlesQuery, useGetCategoriesQuery } from "../../store/api/blogApi";
import { ArticleCard } from "../../components/blog/ArticleCard";
import { SortBy, SortOrder, ArticleListItem, CategoryCount, PaginationInfo } from "../../types/blog";
import styles from "./Blog.module.css";

const API_URL = process.env.API_URL;

interface BlogListPageProps {
  initialArticles: ArticleListItem[];
  initialPagination: PaginationInfo | null;
  initialCategories: CategoryCount[];
}

const BlogListPage: React.FC<BlogListPageProps> = ({
  initialArticles,
  initialPagination,
  initialCategories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PUBLISHED_AT);
  const [page, setPage] = useState(1);

  // Only use RTK Query when user interacts (filters/sorts/paginates)
  const shouldFetch = selectedCategory !== undefined || sortBy !== SortBy.PUBLISHED_AT || page !== 1;

  const {
    data: articlesData,
    isLoading: loading,
    error: queryError,
  } = useGetArticlesQuery(
    {
      category: selectedCategory,
      sortBy,
      sortOrder: SortOrder.DESC,
      page,
      limit: 12,
    },
    { skip: !shouldFetch }
  );

  const { data: fetchedCategories } = useGetCategoriesQuery(undefined, {
    skip: initialCategories.length > 0,
  });

  // Use initial data or fetched data
  const articles = shouldFetch ? (articlesData?.items || []) : initialArticles;
  const pagination = shouldFetch ? articlesData?.pagination : initialPagination;
  const categories = fetchedCategories || initialCategories;
  const error = queryError ? "Failed to load articles. Please try again." : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hoppa Fitness Blog",
    description: "Expert fitness tips, workout guides, and health advice from the Hoppa team.",
    url: "https://hoppa.fit/blog",
    publisher: {
      "@type": "Organization",
      name: "Hoppa",
      logo: {
        "@type": "ImageObject",
        url: "https://hoppa.fit/logo.png",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Hoppa Blog | Fitness Tips, Workout Guides & Health Advice</title>
        <meta name="title" content="Hoppa Blog | Fitness Tips, Workout Guides & Health Advice" />
        <meta
          name="description"
          content="Discover expert fitness tips, workout guides, nutrition advice, and health insights from the Hoppa team. Transform your fitness journey with science-backed content."
        />
        <meta
          name="keywords"
          content="fitness blog, workout tips, exercise guides, health advice, nutrition tips, AI fitness, pose detection, workout form"
        />
        <link rel="canonical" href="https://hoppa.fit/blog" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hoppa.fit/blog" />
        <meta property="og:title" content="Hoppa Blog | Fitness Tips, Workout Guides & Health Advice" />
        <meta
          property="og:description"
          content="Discover expert fitness tips, workout guides, and health insights from the Hoppa team."
        />
        <meta property="og:image" content="https://hoppa.fit/blog-og-image.jpg" />
        <meta property="og:site_name" content="Hoppa" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hoppa.fit/blog" />
        <meta property="twitter:title" content="Hoppa Blog | Fitness Tips, Workout Guides & Health Advice" />
        <meta
          property="twitter:description"
          content="Discover expert fitness tips, workout guides, and health insights from the Hoppa team."
        />
        <meta property="twitter:image" content="https://hoppa.fit/blog-og-image.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className={styles.Container}>
        <div className={styles.Header}>
          <span className={styles.Badge}>Blog</span>
          <h1 className={styles.Title}>Fitness Insights</h1>
          <p className={styles.Subtitle}>Expert tips, guides, and advice to help you reach your fitness goals</p>
        </div>

        <div className={styles.Filters}>
          <div className={styles.Categories}>
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`${styles.CategoryButton} ${!selectedCategory ? styles.active : ""}`}
            >
              All
            </button>
            {categories.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.CategoryButton} ${selectedCategory === category ? styles.active : ""}`}
              >
                {category} ({count})
              </button>
            ))}
          </div>

          <div className={styles.SortButtons}>
            <button
              onClick={() => setSortBy(SortBy.PUBLISHED_AT)}
              className={`${styles.SortButton} ${sortBy === SortBy.PUBLISHED_AT ? styles.active : ""}`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy(SortBy.VIEWS)}
              className={`${styles.SortButton} ${sortBy === SortBy.VIEWS ? styles.active : ""}`}
            >
              Popular
            </button>
          </div>
        </div>

        {error && <div className={styles.Error}>{error}</div>}

        {loading ? (
          <div className={styles.Loading}>Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className={styles.Empty}>
            <p>No articles found. Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className={styles.ArticlesGrid}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className={styles.Pagination}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrev}
                  className={styles.PageButton}
                >
                  Previous
                </button>
                <span className={styles.PageInfo}>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!pagination.hasNext}
                  className={styles.PageButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogListPage;

// Fetch initial data at build time with ISR
export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  try {
    // Fetch initial articles (first page, sorted by published date)
    const articlesResponse = await fetch(
      `${API_URL}/blog/articles?sortBy=publishedAt&sortOrder=desc&page=1&limit=12`
    );
    const articlesData = await articlesResponse.json();

    // Fetch categories
    const categoriesResponse = await fetch(`${API_URL}/blog/articles/categories`);
    const categories = await categoriesResponse.json();

    return {
      props: {
        initialArticles: articlesData.items || [],
        initialPagination: articlesData.pagination || null,
        initialCategories: categories || [],
      },
      // Revalidate every 5 minutes (300 seconds)
      revalidate: 300,
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      props: {
        initialArticles: [],
        initialPagination: null,
        initialCategories: [],
      },
      revalidate: 60, // Retry sooner on error
    };
  }
};
