// src/components/AppOverviewSection.tsx

import React from "react";
import Image from "next/image";
import styles from "./AppOverviewSection.module.css";
import Button from "./Button"; // Ensure the path is correct
import appOverviewImage from "/public/yoga.jpg"; // Adjust the path as needed

const AppOverviewSection: React.FC = () => {
  return (
    <section className={styles.appOverview} aria-labelledby="app-overview-heading">
      <div className={styles.imageContainer}>
        <Image src={appOverviewImage} alt="Hoppa App Overview" layout="responsive" className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2 id="app-overview-heading" className={styles.heading}>
          Transform Your Fitness Journey with Hoppa
        </h2>
        <p className={styles.description}>
          Hoppa brings personalized workouts and real-time coaching right to your smartphone. Leverage AI-powered pose
          detection and gamified routines to stay motivated and on track.
        </p>
        <Button
          onPress={() => {
            /* Define your download action here */
          }}
          title="Download Now"
        />
      </div>
    </section>
  );
};

export default AppOverviewSection;
