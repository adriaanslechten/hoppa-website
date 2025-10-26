import React from "react";
import styles from "./PricingSection.module.css";

const PricingSection: React.FC = () => {
  return (
    <section className={styles.pricing} aria-labelledby="pricing-heading">
      <div className={styles.container}>
        <div className={styles.pricingCard}>
          <div className={styles.cardHeader}>
            <h2 id="pricing-heading" className={styles.cardTitle}>
              Hoppa Premium
            </h2>
            <p className={styles.cardSubtitle}>Transform your fitness journey</p>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              $9.99
              <span className={styles.period}>/month</span>
            </div>
            <p className={styles.annualPrice}>or $99/year (save $20)</p>
          </div>

          <button className={styles.upgradeButton}>Upgrade to Premium</button>

          <div className={styles.freeOption}>
            <p className={styles.freeText}>
              <strong>Start Free</strong> • No credit card required
            </p>
          </div>
        </div>

        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className={styles.featureTitle}>AI-Assisted Personalization</h3>
              <p className={styles.featureDescription}>
                Get personalized goals, campaigns, and workouts tailored to your fitness level and objectives.
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className={styles.featureTitle}>Custom Workouts</h3>
              <p className={styles.featureDescription}>
                Create your own workouts by composing different exercises together to match your specific needs.
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className={styles.featureTitle}>Multiple Campaigns</h3>
              <p className={styles.featureDescription}>
                Run up to 3 different campaigns simultaneously, each tailored to different fitness goals and use cases.
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className={styles.featureTitle}>Real-Time Pose Detection</h3>
              <p className={styles.featureDescription}>Track your movements and count your repetitions real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
