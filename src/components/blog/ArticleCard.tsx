import React from "react";
import Link from "next/link";
import { ArticleListItem } from "../../types/blog";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleListItem;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blog/${article.slug}`} className={styles.Card}>
      <div className={styles.Content}>
        <div className={styles.Meta}>
          <span className={styles.Category}>{article.category}</span>
          <span className={styles.Dot}>·</span>
          <span className={styles.ReadTime}>{article.readingTime} min read</span>
        </div>
        <h3 className={styles.Title}>{article.title}</h3>
        <p className={styles.Excerpt}>{article.excerpt}</p>
        <div className={styles.Footer}>
          <span className={styles.Date}>{formatDate(article.publishedAt)}</span>
          <div className={styles.Stats}>
            <span className={styles.Stat}>{article.views} views</span>
          </div>
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className={styles.Tags}>
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.Tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
