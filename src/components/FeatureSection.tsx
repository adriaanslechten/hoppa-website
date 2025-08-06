import React from "react";
import Image from "next/image";
import styles from "./FeaturesSection.module.css";
import Button from "./Button"; // Ensure the path is correct
import featuresImage from "/public/overview_section.jpg"; // Adjust the path as needed

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

  return (
    <section className={styles.features} aria-labelledby="features-heading">
      <div className={styles.leftContent}>
        <h2 id="features-heading" className={styles.heading}>
          Discover Our Key Features
        </h2>
        <p className={styles.subtitle}>Designed to help you achieve your fitness goals with ease and efficiency.</p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div className={styles.featureItem} key={index}>
              {/* If using images/icons for features, uncomment and adjust accordingly */}
              {/* <Image
                src={feature.image}
                alt={`${feature.title} Icon`}
                width={80}
                height={80}
                className={styles.featureImage}
              /> */}
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
        {/* <Button
          onPress={() => {
          }}
          title="Learn More"
        /> */}
      </div>
      <div className={styles.rightImage}>
        <Image
          src={featuresImage}
          alt="Features Overview"
          layout="responsive"
          width={500} // Adjust based on actual image dimensions
          height={400} // Adjust based on actual image dimensions
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
