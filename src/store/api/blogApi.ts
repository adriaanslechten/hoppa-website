import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BlogArticle,
  ArticleListItem,
  PaginatedArticlesResponse,
  GetArticlesParams,
  CategoryCount,
  TagCount,
} from "../../types/blog";

// RTK Query API slice for blog
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Article", "Category", "Tag"],
  endpoints: (builder) => ({
    // Get paginated list of published articles
    getArticles: builder.query<PaginatedArticlesResponse, GetArticlesParams | void>({
      query: (params) => ({
        url: "/blog/articles",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Article" as const, id })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
    }),

    // Get single article by slug
    getArticleBySlug: builder.query<BlogArticle, string>({
      query: (slug) => `/blog/articles/slug/${slug}`,
      providesTags: (result) => (result ? [{ type: "Article", id: result.id }] : []),
    }),

    // Get featured articles
    getFeaturedArticles: builder.query<BlogArticle[], number | void>({
      query: (limit) => ({
        url: "/blog/articles/featured",
        params: limit ? { limit } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Article" as const, id })),
              { type: "Article", id: "FEATURED" },
            ]
          : [{ type: "Article", id: "FEATURED" }],
    }),

    // Get latest articles
    getLatestArticles: builder.query<ArticleListItem[], number | void>({
      query: (limit) => ({
        url: "/blog/articles/latest",
        params: limit ? { limit } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Article" as const, id })),
              { type: "Article", id: "LATEST" },
            ]
          : [{ type: "Article", id: "LATEST" }],
    }),

    // Get all categories with counts
    getCategories: builder.query<CategoryCount[], void>({
      query: () => "/blog/articles/categories",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),

    // Get all tags with counts
    getTags: builder.query<TagCount[], void>({
      query: () => "/blog/articles/tags",
      providesTags: [{ type: "Tag", id: "LIST" }],
    }),

    // Get related articles
    getRelatedArticles: builder.query<BlogArticle[], { id: string; limit?: number }>({
      query: ({ id, limit }) => ({
        url: `/blog/articles/${id}/related`,
        params: limit ? { limit } : undefined,
      }),
      providesTags: (result, error, { id }) => [{ type: "Article", id: `RELATED_${id}` }],
    }),

    // Increment view count (fire-and-forget)
    incrementViews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/blog/articles/${id}/view`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useGetFeaturedArticlesQuery,
  useGetLatestArticlesQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useGetRelatedArticlesQuery,
  useIncrementViewsMutation,
} = blogApi;
