import React from "react";
import { GetStaticProps } from "next";
import { HomeScreen } from "./home/HomeScreen";
import { ArticleListItem } from "../types/blog";

const API_URL = process.env.API_URL;

interface HomePageProps {
  initialArticles: ArticleListItem[];
}

const HomeContainer: React.FC<HomePageProps> = ({ initialArticles }) => {
  return <HomeScreen initialArticles={initialArticles} />;
};

export default HomeContainer;

// Fetch blog articles at build time with ISR
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const response = await fetch(`${API_URL}/blog/articles/latest?limit=3`);
    const articles = await response.json();

    return {
      props: {
        initialArticles: articles || [],
      },
      // Revalidate every 5 minutes
      revalidate: 300,
    };
  } catch (error) {
    console.error("Error fetching latest articles for homepage:", error);
    return {
      props: {
        initialArticles: [],
      },
      revalidate: 60, // Retry sooner on error
    };
  }
};
