import React from "react";

import HeroSection from "../../components/HeroSection";
import AppOverviewSection from "../../components/AppOverviewSection";
import FeaturesSection from "../../components/FeatureSection";
import CTASection from "../../components/CTASection";
import ReviewsSection from "../../components/ReviewSection";
import FooterSection from "../../components/FooterSection";

export const HomeScreen: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AppOverviewSection />
      <FeaturesSection />
      <CTASection />
      <ReviewsSection />
      <FooterSection />
    </>
  );
};

export default HomeScreen;
