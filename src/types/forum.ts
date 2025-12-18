// Forum types - synced from backend: hoppa/service/external/types/forum.ts

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  isDeleted: boolean;
  isEdited: boolean;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  userId: string;
  votes: number;
  createdAt: string;
  isDeleted: boolean;
  isEdited: boolean;
  commentCount?: number;
}

// API Request/Response types
export interface CreateTopicDto {
  userId: string;
  title: string;
  content: string;
}

export interface VoteTopicDto {
  userId: string;
  value: 1 | -1;
  topicId: string;
}

export interface UpdateTopicDto {
  topicId: string;
  userId: string;
  title?: string;
  content?: string;
}

export interface DeleteTopicDto {
  topicId: string;
  userId: string;
}

export interface CreateCommentDto {
  userId: string;
  topicId: string;
  content: string;
  parentId?: string | null;
}

export interface UpdateCommentDto {
  commentId: string;
  userId: string;
  content: string;
}

export interface DeleteCommentDto {
  commentId: string;
  userId: string;
}

export interface GetTopicsParams {
  sort?: "new" | "hot" | "top";
  limit?: number;
  page?: number;
}

export interface GetCommentsParams {
  topicId: string;
}
