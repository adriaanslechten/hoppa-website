// src/components/NavBar.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./TopNavBar.module.css";

const TopNavBar: React.FC = () => {
  const router = useRouter();
  const { user, logout, loading } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/");
    }
  };

  return (
    <nav className={`${styles.NavBar} ${isScrolled ? styles.scrolled : styles.atTop}`}>
      <div className={styles.NavInner}>
        <Link href="/" passHref>
          <div className={styles.Brand}>Hoppa</div>
        </Link>

        <ul className={styles.NavList}>
          <li className={styles.NavItem}>
            <Link href="/forum" passHref>
              <div className={`${styles.NavLink} ${router.pathname.startsWith("/forum") ? styles.active : ""}`}>
                Forum
              </div>
            </Link>
          </li>
          <li className={styles.NavItem}>
            <Link href="/blog" passHref>
              <div className={`${styles.NavLink} ${router.pathname.startsWith("/blog") ? styles.active : ""}`}>
                Blog
              </div>
            </Link>
          </li>
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
          {!loading && (
            <li className={styles.NavItem}>
              {user ? (
                <div className={styles.UserMenu}>
                  <span className={styles.UserEmail}>{user.email}</span>
                  <button onClick={handleLogout} className={styles.LogoutButton}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" passHref>
                  <div className={styles.CtaButton} aria-label="Sign up now">
                    <span className={styles.NavLabelDesktop}>Sign up now</span>
                    <span className={styles.NavLabelMobile}>Sign up</span>
                  </div>
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(TopNavBar);
