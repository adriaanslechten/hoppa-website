import { User } from "firebase/auth";

/**
 * Generate display name for a comment author
 * Uses display name if available, otherwise falls back to anonymous ID
 */
export const getCommentDisplayName = (commentUserId: string, currentUser: User | null): string => {
  const isCurrentUserComment = currentUser?.uid === commentUserId;
  const userIdShort = commentUserId.substring(0, 8);

  // Use displayName if available, otherwise fall back to Anon ID
  if (isCurrentUserComment && currentUser?.displayName) {
    return `${currentUser.displayName} (You)`;
  } else if (isCurrentUserComment) {
    return `Anon${userIdShort} (You)`;
  }

  return `Anon${userIdShort}`;
};

/**
 * Format relative date strings
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
