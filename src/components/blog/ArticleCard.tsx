import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleListItem } from "../../types/blog";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleListItem;
}

// Category-based gradient backgrounds for placeholder
const categoryGradients: Record<string, string> = {
  fitness: "linear-gradient(135deg, #e83f6f 0%, #f45b69 100%)",
  nutrition: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)",
  wellness: "linear-gradient(135deg, #9C27B0 0%, #E040FB 100%)",
  recovery: "linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)",
  mindset: "linear-gradient(135deg, #FF9800 0%, #FFC107 100%)",
  default: "linear-gradient(135deg, #f4d03f 0%, #e83f6f 100%)",
};

// Category icons (simple emoji-based for now)
const categoryIcons: Record<string, string> = {
  fitness: "💪",
  nutrition: "🥗",
  wellness: "🧘",
  recovery: "🔄",
  mindset: "🧠",
  default: "📖",
};

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

  const categoryLower = article.category?.toLowerCase() || "default";
  const gradient = categoryGradients[categoryLower] || categoryGradients.default;
  const icon = categoryIcons[categoryLower] || categoryIcons.default;

  return (
    <Link href={`/blog/${article.slug}`} className={styles.Card}>
      <div className={styles.ImageWrapper}>
        {article.thumbnail?.url ? (
          <Image
            src={article.thumbnail.url}
            alt={article.thumbnail.alt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className={styles.Image}
          />
        ) : (
          <div className={styles.PlaceholderImage} style={{ background: gradient }}>
            <span className={styles.PlaceholderIcon}>{icon}</span>
          </div>
        )}
        <div className={styles.ImageOverlay} />
        <span className={styles.CategoryBadge}>{article.category}</span>
      </div>
      <div className={styles.Content}>
        <div className={styles.Meta}>
          <span className={styles.ReadTime}>
            <svg className={styles.Icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {article.readingTime} min read
          </span>
          <span className={styles.Dot}>·</span>
          <span className={styles.Views}>
            <svg className={styles.Icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {article.views}
          </span>
        </div>
        <h3 className={styles.Title}>{article.title}</h3>
        <p className={styles.Excerpt}>{article.excerpt}</p>
        <div className={styles.Footer}>
          <span className={styles.Date}>
            <svg className={styles.Icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(article.publishedAt)}
          </span>
          <span className={styles.ReadMore}>
            Read more
            <svg className={styles.ArrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};
