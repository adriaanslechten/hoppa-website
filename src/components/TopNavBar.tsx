// src/components/NavBar.tsx

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./TopNavBar.module.css";

const TopNavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.NavBar}>
      <div className={styles.NavInner}>
        <Link href="/" passHref>
          <div className={styles.Brand}>Hoppa</div>
        </Link>

        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <Link href="/terms" passHref>
              <div className={`${styles.NavLink} ${router.pathname === "/terms" ? styles.active : ""}`}>
                Terms and Privacy
              </div>
            </Link>
            <ul className={styles.DropdownMenu}>
              <li className={styles.DropdownItem}>
                <Link href="/terms" passHref>
                  <div className={styles.NavLink}>T&C</div>
                </Link>
              </li>
              <li className={styles.DropdownItem}>
                <Link href="/privacy" passHref>
                  <div className={styles.NavLink}>Privacy</div>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.NavItem}>
            <Link href="/login" passHref>
              <div className={styles.CtaButton} aria-label="Sign up now">
                Sign up now
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(TopNavBar);
