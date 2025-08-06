// pages/terms.tsx

import React from "react";
import styles from "./Terms.module.css";
import FooterSection from "../../components/FooterSection";
import TopNavBar from "../../components/TopNavBar";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

interface TermsProps {
  content: string;
}

const TermsScreen: React.FC<TermsProps> = ({ content }) => {
  return (
    <>
      <TopNavBar />
      <main className={styles.termsContainer}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
      <FooterSection />
    </>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content", "terms.md");
  const content = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      content,
    },
  };
}

export default TermsScreen;
