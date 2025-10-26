import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGetTopicsQuery, useCreateTopicMutation } from "../../store/api/forumApi";
import styles from "./Forum.module.css";

const ForumListPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const [sort, setSort] = useState<"new" | "hot" | "top">("new");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");

  // RTK Query hooks - automatic loading, error, and data management!
  const { data: topics = [], isLoading: loading, error: queryError } = useGetTopicsQuery({ sort, limit: 50 });

  const [createTopic, { isLoading: creating }] = useCreateTopicMutation();

  // Convert RTK Query error to string
  const error = queryError ? "Failed to load topics. Please try again." : null;

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!newTopicTitle.trim() || !newTopicContent.trim()) {
      return;
    }

    try {
      // RTK Query mutation - automatically updates cache!
      await createTopic({
        userId: user.uid,
        title: newTopicTitle,
        content: newTopicContent,
      }).unwrap();

      setNewTopicTitle("");
      setNewTopicContent("");
      setShowCreateModal(false);
      // No need to manually reload - RTK Query invalidates cache automatically!
    } catch (err: any) {
      console.error("Error creating topic:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  if (authLoading) {
    return <div className={styles.Loading}>Loading...</div>;
  }

  // SEO: Generate structured data for forum
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    name: "Hoppa Community Forum",
    description:
      "Join the Hoppa fitness community. Discuss workouts, share tips, and connect with other fitness enthusiasts.",
    url: "https://hoppa.fit/forum",
    publisher: {
      "@type": "Organization",
      name: "Hoppa",
      logo: {
        "@type": "ImageObject",
        url: "https://hoppa.fit/logo.png",
      },
    },
    discussionUrl: "https://hoppa.fit/forum",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/CommentAction",
      userInteractionCount: topics.length,
    },
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Hoppa Community Forum | Fitness Discussion & Tips</title>
        <meta name="title" content="Hoppa Community Forum | Fitness Discussion & Tips" />
        <meta
          name="description"
          content="Join the Hoppa fitness community. Share workout experiences, get fitness tips, discuss AI pose detection, and connect with fellow fitness enthusiasts."
        />
        <meta
          name="keywords"
          content="fitness forum, workout community, fitness discussion, exercise tips, AI fitness, pose detection community, fitness advice, workout support"
        />
        <link rel="canonical" href="https://hoppa.fit/forum" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hoppa.fit/forum" />
        <meta property="og:title" content="Hoppa Community Forum | Fitness Discussion & Tips" />
        <meta
          property="og:description"
          content="Join the Hoppa fitness community. Share workout experiences and connect with fellow fitness enthusiasts."
        />
        <meta property="og:image" content="https://hoppa.fit/forum-og-image.jpg" />
        <meta property="og:site_name" content="Hoppa" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hoppa.fit/forum" />
        <meta property="twitter:title" content="Hoppa Community Forum | Fitness Discussion & Tips" />
        <meta
          property="twitter:description"
          content="Join the Hoppa fitness community. Share workout experiences and connect with fellow fitness enthusiasts."
        />
        <meta property="twitter:image" content="https://hoppa.fit/forum-og-image.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className={styles.Container}>
        <div className={styles.Header}>
          <span className={styles.Badge}>Community</span>
          <h1 className={styles.Title}>Forum</h1>
          <p className={styles.Subtitle}>Join the conversation with the Hoppa community</p>
        </div>

        <div className={styles.Actions}>
          <div className={styles.SortButtons}>
            <button
              onClick={() => setSort("new")}
              className={`${styles.SortButton} ${sort === "new" ? styles.active : ""}`}
            >
              New
            </button>
            <button
              onClick={() => setSort("hot")}
              className={`${styles.SortButton} ${sort === "hot" ? styles.active : ""}`}
            >
              Hot
            </button>
            <button
              onClick={() => setSort("top")}
              className={`${styles.SortButton} ${sort === "top" ? styles.active : ""}`}
            >
              Top
            </button>
          </div>
          {user && (
            <button onClick={() => setShowCreateModal(true)} className={styles.CreateButton}>
              Create Topic
            </button>
          )}
        </div>

        {error && <div className={styles.Error}>{error}</div>}

        {loading ? (
          <div className={styles.Loading}>Loading topics...</div>
        ) : topics.length === 0 ? (
          <div className={styles.Empty}>
            <p>No topics yet. Be the first to start a conversation!</p>
          </div>
        ) : (
          <div className={styles.TopicsList}>
            {topics.map((topic) => (
              <Link key={topic.id} href={`/forum/${topic.id}`} className={styles.TopicCard}>
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
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className={styles.Modal} onClick={() => setShowCreateModal(false)}>
            <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.ModalTitle}>Create New Topic</h2>
              <form onSubmit={handleCreateTopic}>
                <div className={styles.InputGroup}>
                  <label htmlFor="title" className={styles.Label}>
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    className={styles.Input}
                    placeholder="What's your topic about?"
                    disabled={creating}
                    maxLength={200}
                  />
                </div>
                <div className={styles.InputGroup}>
                  <label htmlFor="content" className={styles.Label}>
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    className={styles.Textarea}
                    placeholder="Share your thoughts..."
                    disabled={creating}
                    rows={8}
                  />
                </div>
                <div className={styles.ModalActions}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className={styles.CancelButton}
                    disabled={creating}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.SubmitButton} disabled={creating}>
                    {creating ? "Creating..." : "Create Topic"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForumListPage;
