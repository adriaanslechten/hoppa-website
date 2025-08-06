import heroImage from "/public/hero-image.jpg"; // Adjust the relative path as needed

import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import Button from "./Button";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.imageContainer}>
        <Image
          src={heroImage}
          alt="Hoppa App"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.heroTitle}>Jump into fitness with Hoppa! 🚀</h1>
        <p className={styles.subtitle}>Stay Fit, Recover, and Thrive</p>
        <p className={styles.description}>A new way to stay fit or get back in shape, all from your mobile device.</p>
        <Button onPress={() => {}} title="Get the App Now" />
      </div>
    </section>
  );
};

export default HeroSection;
