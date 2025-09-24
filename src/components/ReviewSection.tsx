// src/components/ReviewsSection.tsx

import React from "react";
import styles from "./ReviewsSection.module.css";
import { testimonials } from "../constants/fixtures";

const ReviewsSection: React.FC = () => {
  // Duplicate content for seamless marquee
  const looped = [...testimonials, ...testimonials];

  return (
    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className={styles.heading}>
        What Our Users Say
      </h2>
      <div className={styles.reel} aria-hidden="true">
        <div className={styles.track} style={{ ["--duration" as any]: "45s" }}>
          {looped.map((testimonial, index) => (
            <div className={styles.reviewItem} key={`marquee-${index}`}>
              <div className={styles.reviewInner}>
                <p className={styles.reviewContent}>"{testimonial.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
