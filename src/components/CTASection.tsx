// src/components/CTASection.tsx

import React from "react";
import styles from "./CTASection.module.css";
// Optional: Import your custom Button component
// import Button from "./Button";

const CTASection: React.FC = () => {
  return (
    <section className={styles.cta} aria-labelledby="cta-heading">
      <h2 id="cta-heading" className={styles.heading}>
        Ready to Get Started?
      </h2>
      <p className={styles.subtitle}>Join Hoppa today and start your journey to better fitness and recovery.</p>
      {/* Optional: Use your custom Button component */}
      {/* <Button onPress={() => { /* Define your action here */
      /* }} title="Join Hoppa Today" /> */}

      {/* Using standard button as per your current implementation */}
      <button className={styles.ctaButton}>Join Hoppa Today</button>
    </section>
  );
};

export default CTASection;
