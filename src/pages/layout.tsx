// src/pages/RootLayout.tsx

import styles from "./layout.module.css"; // Fixed path case
import TopNavBar from "../components/TopNavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavBar />
      <div className={styles.mainContent}>{children}</div>
    </>
  );
}
