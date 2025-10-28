import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  useGetTopicQuery,
  useGetCommentsQuery,
  useVoteTopicMutation,
  useCreateCommentMutation,
} from "../../store/api/forumApi";
import { getCommentDisplayName, formatDate } from "../../utils/forum";
import { CommentCard } from "./components/CommentCard";
import styles from "./Forum.module.css";

const TopicDetailPage: React.FC = () => {
  const router = useRouter();
  const { topicId } = router.query;
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");

  // RTK Query hooks - automatic loading and caching!
  const {
    data: topic,
    isLoading: loading,
    isFetching,
    error: topicError,
  } = useGetTopicQuery(topicId as string, {
    skip: !topicId || typeof topicId !== "string",
  });

  const { data: comments = [] } = useGetCommentsQuery(
    { topicId: topicId as string },
    {
      skip: !topicId || typeof topicId !== "string",
    }
  );

  const [voteTopic] = useVoteTopicMutation();
  const [createComment, { isLoading: posting }] = useCreateCommentMutation();

  const error = topicError ? "Failed to load topic. Please try again." : null;

  const handleVote = async (value: 1 | -1) => {
    if (!user || !topic) {
      router.push("/login");
      return;
    }

    try {
      // RTK Query mutation - automatically updates cache!
      await voteTopic({
        topicId: topic.id,
        userId: user.uid,
        value,
      }).unwrap();
    } catch (err: any) {
      console.error("Error voting:", err);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!newComment.trim() || !topicId || typeof topicId !== "string") return;

    try {
      // RTK Query mutation - automatically updates cache!
      await createComment({
        userId: user.uid,
        topicId,
        content: newComment,
        parentId: null,
      }).unwrap();

      setNewComment("");
      // No need to manually reload - RTK Query invalidates cache automatically!
    } catch (err: any) {
      console.error("Error posting comment:", err);
    }
  };

  // Show loading during initial load, fetching, or if we just don't have data yet
  if (loading || isFetching || !topic) {
    // Only show error if we have an actual error AND we're done loading
    if (topicError && !loading && !isFetching) {
      return (
        <div className={styles.Container}>
          <div className={styles.Error}>Topic not found</div>
          <Link href="/forum" className={styles.BackLink}>
            Back to Forum
          </Link>
        </div>
      );
    }

    return <div className={styles.Loading}>Loading...</div>;
  }

  // SEO: Generate dynamic meta description from topic content
  const metaDescription = topic.content.length > 155 ? topic.content.substring(0, 155) + "..." : topic.content;

  // SEO: Structured data for the discussion thread
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: topic.title,
    text: topic.content,
    datePublished: topic.createdAt,
    dateModified: topic.isEdited ? topic.updatedAt : topic.createdAt,
    author: {
      "@type": "Person",
      name: `User ${topic.userId.substring(0, 8)}`,
    },
    url: `https://hoppa.fit/forum/${topicId}`,
    discussionUrl: `https://hoppa.fit/forum/${topicId}`,
    commentCount: comments.length,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: comments.length,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: topic.votes,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Hoppa",
      logo: {
        "@type": "ImageObject",
        url: "https://hoppa.fit/logo.png",
      },
    },
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{topic.title} | Hoppa Community Forum</title>
        <meta name="title" content={`${topic.title} | Hoppa Community Forum`} />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://hoppa.fit/forum/${topicId}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hoppa.fit/forum/${topicId}`} />
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="https://hoppa.fit/forum-og-image.jpg" />
        <meta property="og:site_name" content="Hoppa" />
        <meta property="article:published_time" content={topic.createdAt} />
        {topic.isEdited && <meta property="article:modified_time" content={topic.updatedAt} />}
        <meta property="article:section" content="Fitness" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`https://hoppa.fit/forum/${topicId}`} />
        <meta property="twitter:title" content={topic.title} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content="https://hoppa.fit/forum-og-image.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className={styles.Container}>
        <Link href="/forum" className={styles.BackLink}>
          Back to Forum
        </Link>

        {error && <div className={styles.Error}>{error}</div>}

        <div className={styles.TopicDetail}>
          <div className={styles.TopicDetailGrid}>
            <div className={styles.VoteSection}>
              <button onClick={() => handleVote(1)} className={styles.VoteButton} disabled={!user}>
                ↑
              </button>
              <span className={styles.VoteCount}>{topic.votes}</span>
              <button onClick={() => handleVote(-1)} className={styles.VoteButton} disabled={!user}>
                ↓
              </button>
            </div>
            <div className={styles.TopicDetailContent}>
              <div className={styles.TopicHeader}>
                <h1 className={styles.TopicDetailTitle}>{topic.title}</h1>
                <div className={styles.TopicMeta}>
                  <span>Posted {formatDate(topic.createdAt)}</span>
                  {topic.isEdited && <span className={styles.Edited}>• Edited</span>}
                </div>
              </div>
              <div className={styles.TopicBody}>
                <p className={styles.TopicText}>{topic.content}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.CommentsSection}>
          <h2 className={styles.CommentsTitle}>Comments ({comments.length})</h2>

          {user ? (
            <form onSubmit={handlePostComment} className={styles.CommentForm}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={styles.CommentInput}
                placeholder="Write a comment..."
                rows={4}
                disabled={posting}
              />
              <button type="submit" className={styles.SubmitButton} disabled={posting || !newComment.trim()}>
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className={styles.LoginPrompt}>
              <Link href="/login" className={styles.LoginLink}>
                Sign in to comment
              </Link>
            </div>
          )}

          <div className={styles.CommentsList}>
            {comments.length === 0 ? (
              <div className={styles.Empty}>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  displayName={getCommentDisplayName(comment.userId, user)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicDetailPage;
