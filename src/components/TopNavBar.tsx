// src/components/NavBar.tsx

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./TopNavBar.module.css";

const TopNavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavList}>
        <li className={styles.NavItem}>
          <Link href="/" passHref>
            <div className={`${styles.NavLink} ${router.pathname === "/" ? styles.active : ""}`}>Home</div>
          </Link>
        </li>
        <li className={styles.NavItem}>
          {/* <Link href="/about" passHref> */}
          {/* <div className={`${styles.NavLink} ${router.pathname === "/about" ? styles.active : ""}`}>About</div> */}
          {/* </Link> */}
          {/* Dropdown menu for About */}
          <ul className={styles.DropdownMenu}>
            {/* <li className={styles.DropdownItem}> */}
            {/* <Link href="/about/contact" passHref>
                <div className={styles.NavLink}>Contact</div>
              </Link>
            </li> */}
            <li className={styles.DropdownItem}>
              <Link href="/about/feedback" passHref>
                <div className={styles.NavLink}>Feedback</div>
              </Link>
            </li>
          </ul>
        </li>
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
      </ul>
    </nav>
  );
};

export default React.memo(TopNavBar);
