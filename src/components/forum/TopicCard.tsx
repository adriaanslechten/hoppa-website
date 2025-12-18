import React from "react";
import Link from "next/link";
import { Topic } from "../../types/forum";
import { formatDate } from "../../utils/forum";
import styles from "../../pages/forum/Forum.module.css";

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link href={`/forum/${topic.id}`} className={styles.TopicCard}>
      <div className={styles.TopicContent}>
        <h3 className={styles.TopicTitle}>{topic.title}</h3>
        <p className={styles.TopicPreview}>
          {topic.content.substring(0, 150)}
          {topic.content.length > 150 ? "..." : ""}
        </p>
        <div className={styles.TopicMeta}>
          <span>Posted {formatDate(topic.createdAt)}</span>
          {topic.isEdited && <span className={styles.Edited}>• Edited</span>}
        </div>
        <div className={styles.ActionRow}>
          <div className={styles.VoteSection}>
            <span className={styles.VoteButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </span>
            <span className={styles.VoteCount}>{topic.votes}</span>
            <span className={styles.VoteButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </span>
          </div>
          <div className={styles.CommentCount}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{topic.commentCount ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
