import React from "react";

import HeroSection from "../../components/HeroSection";
import AppOverviewSection from "../../components/AppOverviewSection";
import FeaturesSection from "../../components/FeatureSection";
import PricingSection from "../../components/PricingSection";
import CTASection from "../../components/CTASection";
import ReviewsSection from "../../components/ReviewSection";
import FooterSection from "../../components/FooterSection";

export const HomeScreen: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AppOverviewSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <ReviewsSection />
      <FooterSection />
    </>
  );
};

export default HomeScreen;
