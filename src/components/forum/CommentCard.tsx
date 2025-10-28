import React from "react";
import { Comment } from "../../types/forum";
import { formatDate } from "../../utils/forum";
import styles from "../../pages/forum/Forum.module.css";

interface CommentCardProps {
  comment: Comment;
  displayName: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment, displayName }) => {
  return (
    <div className={styles.CommentCard}>
      <div className={styles.CommentHeader}>
        <span className={styles.CommentAuthor}>{displayName}</span>
        <span className={styles.CommentDate}>{formatDate(comment.createdAt)}</span>
        {comment.isEdited && <span className={styles.Edited}>(edited)</span>}
      </div>
      <p className={styles.CommentContent}>{comment.content}</p>
    </div>
  );
};
