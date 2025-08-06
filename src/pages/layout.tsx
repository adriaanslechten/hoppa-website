// src/pages/RootLayout.tsx

import styles from "./Layout.module.css"; // Ensure this path is correct
import TopNavBar from "../components/TopNavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavBar />
      <div className={styles.mainContent}>{children}</div>
    </>
  );
}
