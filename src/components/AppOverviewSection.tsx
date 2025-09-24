// src/components/AppOverviewSection.tsx

import React from "react";
import Image from "next/image";
import styles from "./AppOverviewSection.module.css";
import Button from "./Button";
import { useInView } from "../hooks/useInView";

const AppOverviewSection: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({ rootMargin: "-15% 0px" });
  const { ref: contentRef, inView: contentInView } = useInView({ rootMargin: "-15% 0px" });

  return (
    <section className={styles.appOverview} aria-labelledby="app-overview-heading">
      <div ref={imageRef} className={`${styles.imageContainer} ${imageInView ? styles.reveal : styles.hidden}`}>
        <Image src="/yoga.jpg" alt="Hoppa App Overview" width={500} height={400} className={styles.image} />
      </div>
      <div ref={contentRef} className={`${styles.content} ${contentInView ? styles.reveal : styles.hidden}`}>
        <h2 id="app-overview-heading" className={`${styles.heading} ${styles.headingAccent}`}>
          Transform Your Fitness Journey with Hoppa
        </h2>
        <p className={styles.description}>
          Hoppa brings personalized workouts and real-time coaching right to your smartphone. Leverage AI-powered pose
          detection and gamified routines to stay motivated and on track.
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onPress={() => {
              /* Define your download action here */
            }}
            title="Download Now"
          />
        </div>
      </div>
    </section>
  );
};

export default AppOverviewSection;
