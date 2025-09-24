// src/components/NavBar.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./TopNavBar.module.css";

const TopNavBar: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.NavBar} ${isScrolled ? styles.scrolled : styles.atTop}`}>
      <div className={styles.NavInner}>
        <Link href="/" passHref>
          <div className={styles.Brand}>Hoppa</div>
        </Link>

        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <Link href="/terms" passHref>
              <div className={`${styles.NavLink} ${router.pathname === "/terms" ? styles.active : ""}`}>
                <span className={styles.NavLabelDesktop}>Terms and Privacy</span>
                <span className={styles.NavLabelMobile}>Legal</span>
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
                <span className={styles.NavLabelDesktop}>Sign up now</span>
                <span className={styles.NavLabelMobile}>Sign up</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(TopNavBar);
