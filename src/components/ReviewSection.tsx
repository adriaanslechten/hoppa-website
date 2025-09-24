// src/components/ReviewsSection.tsx

import React from "react";
import styles from "./ReviewsSection.module.css";
import { testimonials } from "../constants/fixtures";

const ReviewsSection: React.FC = () => {
  // Duplicate content for seamless marquee
  const looped = [...testimonials, ...testimonials];

  return (
    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <div className={styles.header}>
        <h2 id="reviews-heading" className={styles.display}>
          What our users <span className={styles.accent}>say</span>
        </h2>
        <p className={styles.subtagline}>The best way to build a habit — and it's fun too!</p>
      </div>
      <div className={styles.reel} aria-hidden="true">
        <div className={styles.track}>
          {looped.map((testimonial, index) => {
            const variantClass = [styles.itemSm, styles.itemMd, styles.itemLg][index % 3];
            return (
              <div className={`${styles.reviewItem} ${variantClass}`} key={`marquee-${index}`}>
                <div className={styles.reviewInner}>
                  <p className={styles.reviewContent}>"{testimonial.quote}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
