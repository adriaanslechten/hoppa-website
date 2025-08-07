import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import Button from "./Button";

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.imageContainer}>
        <Image
          src="/hero-image.jpg"
          alt="Hoppa App"
          fill
          style={{ 
            objectFit: 'cover', 
            objectPosition: isMobile ? 'center 15%' : 'center center'
          }}
          quality={100}
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.heroTitle}>Jump into fitness with Hoppa!</h1>
        <p className={styles.subtitle}>Stay Fit, Recover, and Thrive</p>
        <p className={styles.description}>A new way to stay fit or get back in shape, all from your mobile device.</p>
        <Button onPress={() => {}} title="Get the App Now" />
      </div>
    </section>
  );
};

export default HeroSection;
