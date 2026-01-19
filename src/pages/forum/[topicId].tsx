import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
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
import { CommentCard } from "../../components/forum/CommentCard";
import { Topic, Comment } from "../../types/forum";
import styles from "./Forum.module.css";

const API_URL = process.env.API_URL;

interface TopicDetailPageProps {
  initialTopic: Topic | null;
  initialComments: Comment[];
}

const TopicDetailPage: React.FC<TopicDetailPageProps> = ({ initialTopic, initialComments }) => {
  const router = useRouter();
  const { topicId } = router.query;
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");

  // Use client-side fetch to get fresh data after initial SSG render
  const {
    data: fetchedTopic,
    isLoading: topicLoading,
    error: topicError,
  } = useGetTopicQuery(topicId as string, {
    skip: !topicId || typeof topicId !== "string" || !!initialTopic,
  });

  const { data: fetchedComments } = useGetCommentsQuery(
    { topicId: topicId as string },
    {
      skip: !topicId || typeof topicId !== "string" || initialComments.length > 0,
    }
  );

  const [voteTopic] = useVoteTopicMutation();
  const [createComment, { isLoading: posting }] = useCreateCommentMutation();

  // Use initial SSG data or fetched data
  const topic = initialTopic || fetchedTopic;
  const comments = initialComments.length > 0 ? initialComments : (fetchedComments || []);
  const error = topicError ? "Failed to load topic. Please try again." : null;

  const handleVote = async (value: 1 | -1) => {
    if (!user || !topic) {
      router.push("/login");
      return;
    }

    try {
      await voteTopic({
        topicId: topic.id,
        userId: user.uid,
        value,
      }).unwrap();
    } catch (err) {
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
      await createComment({
        userId: user.uid,
        topicId,
        content: newComment,
        parentId: null,
      }).unwrap();

      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // Handle fallback loading state
  if (router.isFallback || (!topic && topicLoading)) {
    return <div className={styles.Loading}>Loading...</div>;
  }

  // Handle topic not found
  if (!topic) {
    return (
      <div className={styles.Container}>
        <div className={styles.Error}>Topic not found</div>
        <Link href="/forum" className={styles.BackLink}>
          Back to Forum
        </Link>
      </div>
    );
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
    dateModified: topic.createdAt,
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
        <title>{topic.title} | Hoppa Community Forum</title>
        <meta name="title" content={`${topic.title} | Hoppa Community Forum`} />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://hoppa.fit/forum/${topicId}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hoppa.fit/forum/${topicId}`} />
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="https://hoppa.fit/forum-og-image.jpg" />
        <meta property="og:site_name" content="Hoppa" />
        <meta property="article:published_time" content={topic.createdAt} />
        <meta property="article:section" content="Fitness" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`https://hoppa.fit/forum/${topicId}`} />
        <meta property="twitter:title" content={topic.title} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content="https://hoppa.fit/forum-og-image.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className={styles.Container}>
        <Link href="/forum" className={styles.BackLink}>
          Back to Forum
        </Link>

        {error && <div className={styles.Error}>{error}</div>}

        <div className={styles.TopicDetail}>
          <div className={styles.TopicDetailGrid}>
            <div className={styles.ActionRow}>
              <div className={styles.VoteSection}>
                <button
                  type="button"
                  onClick={() => handleVote(1)}
                  className={styles.VoteButton}
                  title={user ? "Upvote" : "Login to vote"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6"/>
                  </svg>
                </button>
                <span className={styles.VoteCount}>{topic.votes}</span>
                <button
                  type="button"
                  onClick={() => handleVote(-1)}
                  className={styles.VoteButton}
                  title={user ? "Downvote" : "Login to vote"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <div className={styles.CommentCount}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{comments.length}</span>
              </div>
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
                Login to join the conversation
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

// Pre-render top 20 topics at build time (scale limit)
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(`${API_URL}/forum/topics?sort=top&limit=20`);
    const topics = await response.json();

    const paths = topics.map((topic: Topic) => ({
      params: { topicId: topic.id },
    }));

    return {
      paths,
      fallback: "blocking", // Other topics render on-demand, then cache
    };
  } catch (error) {
    console.error("Error fetching topics for static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// Fetch topic and comments at build time with ISR
export const getStaticProps: GetStaticProps<TopicDetailPageProps> = async ({ params }) => {
  const topicId = params?.topicId as string;

  if (!topicId) {
    return { notFound: true };
  }

  try {
    // Fetch topic and comments in parallel
    const [topicResponse, commentsResponse] = await Promise.all([
      fetch(`${API_URL}/forum/topics/${topicId}`),
      fetch(`${API_URL}/forum/topics/${topicId}/comments`),
    ]);

    if (!topicResponse.ok) {
      return { notFound: true };
    }

    const topic = await topicResponse.json();
    const comments = commentsResponse.ok ? await commentsResponse.json() : [];

    return {
      props: {
        initialTopic: topic,
        initialComments: comments,
      },
      // Revalidate every 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error("Error fetching topic:", error);
    return { notFound: true };
  }
};
