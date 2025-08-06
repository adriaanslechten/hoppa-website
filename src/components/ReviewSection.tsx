// src/components/ReviewsSection.tsx

import React from "react";
import styles from "./ReviewsSection.module.css";

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      content: "Hoppa has transformed my fitness routine. The real-time feedback is amazing!",
      author: "Alex M.",
    },
    {
      content: "I love the gamified workouts. Keeps me motivated every day.",
      author: "Sarah K.",
    },
    {
      content: "The adaptive learning system is fantastic. I've seen real progress!",
      author: "Jordan P.",
    },
  ];

  return (
    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className={styles.heading}>
        What Our Users Say
      </h2>
      <div className={styles.carousel}>
        {reviews.map((review, index) => (
          <div className={styles.reviewItem} key={index}>
            <p className={styles.reviewContent}>"{review.content}"</p>
            <h4 className={styles.author}>- {review.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
