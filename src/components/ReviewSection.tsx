// src/components/ReviewsSection.tsx

import React from "react";
import styles from "./ReviewsSection.module.css";
import { testimonials } from "../constants/fixtures";

const ReviewsSection: React.FC = () => {

  return (
    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className={styles.heading}>
        What Our Users Say
      </h2>
      <div className={styles.carousel}>
        {testimonials.map((testimonial, index) => (
          <div className={styles.reviewItem} key={index}>
            <p className={styles.reviewContent}>"{testimonial.quote}"</p>
            <h4 className={styles.author}>- {testimonial.name}</h4>
            <div className={styles.rating}>
              {'⭐'.repeat(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
