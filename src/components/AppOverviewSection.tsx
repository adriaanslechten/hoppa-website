// src/components/AppOverviewSection.tsx

import React from "react";
import Image from "next/image";
import styles from "./AppOverviewSection.module.css";
import Button from "./Button";

const AppOverviewSection: React.FC = () => {
  return (
    <section className={styles.appOverview} aria-labelledby="app-overview-heading">
      <div className={styles.imageContainer}>
        <Image
          src="/overview-section.png"
          alt="Hoppa App Overview"
          width={300}
          height={300}
          sizes="(min-width: 100px) 50vw, (min-width: 300px) 70vw, 90vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 id="app-overview-heading" className={styles.heading}>
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
