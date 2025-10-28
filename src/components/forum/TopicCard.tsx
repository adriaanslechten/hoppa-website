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
      <div className={styles.TopicVotes}>
        <span className={styles.VoteCount}>{topic.votes}</span>
        <span className={styles.VoteLabel}>votes</span>
      </div>
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
      </div>
    </Link>
  );
};
