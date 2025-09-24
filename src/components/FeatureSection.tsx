import React from "react";
import Image from "next/image";
import styles from "./FeaturesSection.module.css";
import Button from "./Button";
import { useInView } from "../hooks/useInView";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Interactive Game Mode",
      description: "Engage with guided exercise campaigns customized for your needs.",
    },
    {
      title: "Real-Time Pose Detection",
      description: "Monitor your movements and receive instant feedback for proper form.",
    },
    {
      title: "Adaptive Learning System",
      description: "Exercises become progressively challenging as you improve.",
    },
    {
      title: "Progress Tracking",
      description: "Visual charts and summaries display your progress over time.",
    },
    {
      title: "Combined Workouts",
      description: "Workouts and recovery exercises targeting specific muscle groups.",
    },
    {
      title: "Community Support",
      description: "Connect with fellow users to stay motivated and share achievements.",
    },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({ rootMargin: "-15% 0px" });
  const { ref: imageRef, inView: imageInView } = useInView({ rootMargin: "-10% 0px" });

  return (
    <section ref={sectionRef} className={styles.features} aria-labelledby="features-heading">
      <div className={`${styles.leftContent} ${sectionInView ? styles.reveal : styles.hidden}`}>
        <h2 id="features-heading" className={styles.heading}>
          Discover Our Key Features
        </h2>
        <p className={styles.subtitle}>Designed to help you achieve your fitness goals with ease and efficiency.</p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              className={`${styles.featureItem} ${sectionInView ? styles.reveal : styles.hidden}`}
              style={{ transitionDelay: `${index * 90}ms` }}
              key={index}
            >
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div ref={imageRef} className={`${styles.rightImage} ${imageInView ? styles.revealRight : styles.hiddenRight}`}>
        <Image
          src="/feature-section.jpg"
          alt="Features Overview"
          width={250}
          height={250}
          sizes="(min-width: 100px) 50vw, (min-width: 300px) 70vw, 90vw"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
