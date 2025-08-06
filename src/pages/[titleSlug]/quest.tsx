import React from "react";
import { useRouter } from "next/router";

const QuestPage = () => {
  const router = useRouter();
  const { titleSlug } = router.query;

  const formatTitle = (slug: string | string[] | undefined): string => {
    if (Array.isArray(slug)) {
      return slug[0]?.replace(/([a-z])([A-Z])/g, "$1 $2") || "";
    }
    return slug?.replace(/([a-z])([A-Z])/g, "$1 $2") || "";
  };

  return (
    <div>
      <h1>Quest for {formatTitle(titleSlug)}</h1>
      <p>More information about the quest will go here.</p>
    </div>
  );
};

export default QuestPage;
