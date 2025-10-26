import axios, { AxiosInstance } from "axios";
import { auth } from "../utils/firebase";
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
} from "../types/forum";

// Helper to wait for auth to be ready
const waitForAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve();
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve();
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      unsubscribe();
      resolve();
    }, 5000);
  });
};

// Create axios instance that calls Next.js API routes (not backend directly)
const api: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Firebase auth token to all requests
api.interceptors.request.use(
  async (config) => {
    try {
      // Wait for auth to be ready
      await waitForAuth();

      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Forum API endpoints
export const forumApi = {
  // Topics
  getTopics: async (params?: GetTopicsParams): Promise<Topic[]> => {
    const response = await api.get<Topic[]>("/forum/topics", { params });
    return response.data;
  },

  getTopic: async (topicId: string): Promise<Topic> => {
    const response = await api.get<Topic>(`/forum/topics/${topicId}`);
    return response.data;
  },

  createTopic: async (data: CreateTopicDto): Promise<Topic> => {
    const response = await api.post<Topic>("/forum/topics", data);
    return response.data;
  },

  voteTopic: async (topicId: string, userId: string, value: 1 | -1): Promise<Topic> => {
    const voteData: VoteTopicDto = { userId, topicId, value };
    const response = await api.patch<Topic>(`/forum/topics/${topicId}/vote`, voteData);
    return response.data;
  },

  updateTopic: async (data: UpdateTopicDto): Promise<Topic> => {
    const response = await api.patch<Topic>(`/forum/topics/${data.topicId}`, data);
    return response.data;
  },

  deleteTopic: async (data: DeleteTopicDto): Promise<void> => {
    await api.delete(`/forum/topics/${data.topicId}`, { data });
  },

  // Comments
  getComments: async (params: GetCommentsParams): Promise<Comment[]> => {
    const response = await api.get<Comment[]>("/forum/comments", { params });
    return response.data;
  },

  createComment: async (data: CreateCommentDto): Promise<Comment> => {
    const response = await api.post<Comment>("/forum/comments", data);
    return response.data;
  },

  updateComment: async (data: UpdateCommentDto): Promise<Comment> => {
    const response = await api.patch<Comment>(`/forum/comments/${data.commentId}`, data);
    return response.data;
  },

  deleteComment: async (data: DeleteCommentDto): Promise<void> => {
    await api.delete(`/forum/comments/${data.commentId}`, { data });
  },
};

export default api;
