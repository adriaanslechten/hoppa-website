// Blog types - synced from backend: hoppa/service/src/blog/dto/article.dto.ts

export enum ArticleStatus {
  DRAFT = "draft",
  PENDING_REVIEW = "pending_review",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum ArticleFormat {
  STANDARD = "standard",
  LISTICLE = "listicle",
  HOW_TO = "how-to",
  REVIEW = "review",
  COMPARISON = "comparison",
  GUIDE = "guide",
}

export enum SortBy {
  PUBLISHED_AT = "publishedAt",
  CREATED_AT = "createdAt",
  VIEWS = "views",
  LIKES = "likes",
  TITLE = "title",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

// Core types
export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  role?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface ArticleImage {
  url: string;
  alt: string;
}

export interface ArticleImages {
  featured?: ArticleImage;
  social?: ArticleImage;
  thumbnail?: ArticleImage;
  infographic?: ArticleImage;
  gallery?: ArticleImage[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Source {
  title: string;
  url?: string;
  author?: string;
  publication?: string;
  date?: string;
  type?: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
}

export interface GenerationMetadata {
  pipelineVersion?: string;
  model?: string;
  totalCost?: number;
  generatedAt?: string;
  qualityScore?: number;
  factCheckScore?: number;
}

// Full article type
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords?: string[];
  status: ArticleStatus;
  publishedAt?: string;
  scheduledAt?: string;
  featured: boolean;
  author: Author;
  seo: SEOMetadata;
  images?: ArticleImages;
  tableOfContents?: TOCItem[];
  faqs?: FAQItem[];
  sources?: Source[];
  structuredData?: Record<string, unknown>;
  views: number;
  likes: number;
  readingTime: number;
  wordCount: number;
  relatedArticles?: RelatedArticle[];
  format: ArticleFormat;
  isDeleted: boolean;
  isEdited: boolean;
  generationMetadata?: GenerationMetadata;
  createdAt: string;
  updatedAt: string;
}

// List item type (lighter version for listings)
export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: string;
  publishedAt?: string;
  featured: boolean;
  readingTime: number;
  views: number;
  likes: number;
  // Optional thumbnail for card display
  thumbnail?: ArticleImage;
}

// Pagination types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedArticlesResponse {
  items: ArticleListItem[];
  pagination: PaginationInfo;
}

// Query params
export interface GetArticlesParams {
  status?: ArticleStatus;
  category?: string;
  tag?: string;
  authorId?: string;
  featured?: boolean;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

// Category and tag counts
export interface CategoryCount {
  category: string;
  count: number;
}

export interface TagCount {
  tag: string;
  count: number;
}
