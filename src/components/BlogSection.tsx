import React from "react";
import Link from "next/link";
import { useGetLatestArticlesQuery } from "../store/api/blogApi";
import { ArticleCard } from "./blog/ArticleCard";
import { ArticleListItem } from "../types/blog";
import styles from "./BlogSection.module.css";

interface BlogSectionProps {
  initialArticles?: ArticleListItem[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ initialArticles }) => {
  // Only fetch client-side if no initial data was provided (SSR fallback)
  const shouldFetch = !initialArticles || initialArticles.length === 0;
  const { data: fetchedArticles = [], isLoading } = useGetLatestArticlesQuery(3, {
    skip: !shouldFetch,
  });

  const articles = initialArticles && initialArticles.length > 0 ? initialArticles : fetchedArticles;

  return (
    <section className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Blog</span>
          <h2 id="blog-heading" className={styles.heading}>
            Latest Articles
          </h2>
          <p className={styles.subtitle}>
            Tips, guides, and insights to help you on your fitness journey
          </p>
        </div>

        {shouldFetch && isLoading ? (
          <div className={styles.loading}>Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className={styles.empty}>No articles yet. Check back soon!</div>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllLink}>
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
