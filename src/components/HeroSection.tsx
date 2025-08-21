import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import Button from "./Button";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            AI-POWERED FITNESS COMPANION
          </div>
          <h1 id="hero-heading" className={styles.heroTitle}>
            Jump into fitness with <span className={styles.accent}>Hoppa!</span>
          </h1>
          <h2 className={styles.subtitle}>Stay Fit, Recover, and Thrive</h2>
          <p className={styles.description}>
            Transform your fitness journey with AI-powered pose detection, gamified workouts, and personalized training. A new way to stay fit or get back in shape, all from your mobile device.
          </p>
          <div className={styles.buttonContainer}>
            <Button onPress={() => {}} title="Get the App Now" />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/ai-pose-detection.png"
            alt="AI-powered pose detection technology showing exercise form analysis"
            width={600}
            height={600}
            quality={100}
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
