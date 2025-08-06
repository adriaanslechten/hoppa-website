// FooterSection.tsx

import React from "react";
import styles from "./FooterSection.module.css";

const FooterSection: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Hoppa. All rights reserved.</p>
    </footer>
  );
};

export default FooterSection;
