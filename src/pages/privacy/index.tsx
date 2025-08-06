// pages/privacy.tsx

import React from "react";
import styles from "./Privacy.module.css";
import FooterSection from "../../components/FooterSection";
import TopNavBar from "../../components/TopNavBar";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

interface PrivacyPolicyProps {
  content: string;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyProps> = ({ content }) => {
  return (
    <>
      <TopNavBar />
      <main className={styles.privacyContainer}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </main>
      <FooterSection />
    </>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content", "privacy.md");
  const content = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      content,
    },
  };
}

export default PrivacyPolicyScreen;
