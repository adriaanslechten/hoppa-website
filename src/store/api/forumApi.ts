import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../utils/firebase";
import {
  Topic,
  Comment,
  CreateTopicDto,
  VoteTopicDto,
  UpdateTopicDto,
  DeleteTopicDto,
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
  GetTopicsParams,
  GetCommentsParams,
} from "../../types/forum";

// Track if auth has been checked once
let authChecked = false;

// Helper to wait for auth state to be ready (only on first load)
const waitForAuth = (): Promise<void> => {
  if (authChecked) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // If user is already available, mark as checked and resolve
    if (auth.currentUser) {
      authChecked = true;
      resolve();
      return;
    }

    // Wait for auth state to initialize
    const unsubscribe = auth.onAuthStateChanged(() => {
      authChecked = true;
      unsubscribe();
      resolve();
    });

    // Timeout after 2 seconds to not block indefinitely
    setTimeout(() => {
      authChecked = true;
      unsubscribe();
      resolve();
    }, 2000);
  });
};

// RTK Query API slice for forum
export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers) => {
      try {
        // Wait for auth state to be ready on first request
        await waitForAuth();

        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          headers.set("authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Error getting Firebase token:", error);
      }
      return headers;
    },
  }),
  tagTypes: ["Topic", "Comment"],
  endpoints: (builder) => ({
    // Topics
    getTopics: builder.query<Topic[], GetTopicsParams | void>({
      query: (params) => ({
        url: "/forum/topics",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Topic" as const, id })), { type: "Topic", id: "LIST" }]
          : [{ type: "Topic", id: "LIST" }],
    }),

    getTopic: builder.query<Topic, string>({
      query: (topicId) => `/forum/topics/${topicId}`,
      providesTags: (result, error, id) => [{ type: "Topic", id }],
    }),

    createTopic: builder.mutation<Topic, CreateTopicDto>({
      query: (body) => ({
        url: "/forum/topics",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),

    voteTopic: builder.mutation<Topic, { topicId: string; userId: string; value: 1 | -1 }>({
      query: ({ topicId, userId, value }) => ({
        url: `/forum/topics/${topicId}/vote`,
        method: "PATCH",
        body: { userId, topicId, value },
      }),
      invalidatesTags: (result, error, { topicId }) => [{ type: "Topic", id: topicId }],
    }),

    updateTopic: builder.mutation<Topic, UpdateTopicDto>({
      query: ({ topicId, ...body }) => ({
        url: `/forum/topics/${topicId}`,
        method: "PATCH",
        body: { topicId, ...body },
      }),
      invalidatesTags: (result, error, { topicId }) => [{ type: "Topic", id: topicId }],
    }),

    deleteTopic: builder.mutation<void, DeleteTopicDto>({
      query: ({ topicId, ...body }) => ({
        url: `/forum/topics/${topicId}`,
        method: "DELETE",
        body: { topicId, ...body },
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),

    // Comments
    getComments: builder.query<Comment[], GetCommentsParams>({
      query: (params) => ({
        url: "/forum/comments",
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Comment" as const, id })), { type: "Comment", id: "LIST" }]
          : [{ type: "Comment", id: "LIST" }],
    }),

    createComment: builder.mutation<Comment, CreateCommentDto>({
      query: (body) => ({
        url: "/forum/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),

    updateComment: builder.mutation<Comment, UpdateCommentDto>({
      query: ({ commentId, ...body }) => ({
        url: `/forum/comments/${commentId}`,
        method: "PATCH",
        body: { commentId, ...body },
      }),
      invalidatesTags: (result, error, { commentId }) => [{ type: "Comment", id: commentId }],
    }),

    deleteComment: builder.mutation<void, DeleteCommentDto>({
      query: ({ commentId, ...body }) => ({
        url: `/forum/comments/${commentId}`,
        method: "DELETE",
        body: { commentId, ...body },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetTopicsQuery,
  useGetTopicQuery,
  useCreateTopicMutation,
  useVoteTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = forumApi;
