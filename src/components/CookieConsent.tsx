import React, { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";
import {
  hasAnalyticsConsent,
  setAnalyticsConsent,
  initializeAnalytics,
} from "../analytics";
import { trackCookieConsent } from "../analytics/events";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentValue = localStorage.getItem("hoppa_analytics_consent");
    if (consentValue === null) {
      // No choice made yet, show banner
      setShowBanner(true);
    } else if (consentValue === "true") {
      // User previously accepted, initialize analytics
      initializeAnalytics();
    }
  }, []);

  const handleAccept = async () => {
    setAnalyticsConsent(true);
    setShowBanner(false);
    await initializeAnalytics();
    trackCookieConsent(true);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          We use cookies to improve your experience and analyze site traffic.
          By clicking &quot;Accept&quot;, you consent to our use of cookies.
        </p>
        <div className={styles.buttons}>
          <button className={styles.declineButton} onClick={handleDecline}>
            Decline
          </button>
          <button className={styles.acceptButton} onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
