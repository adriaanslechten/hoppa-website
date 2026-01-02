import React from "react";

import HeroSection from "../../components/HeroSection";
import AppOverviewSection from "../../components/AppOverviewSection";
import FeaturesSection from "../../components/FeatureSection";
import PricingSection from "../../components/PricingSection";
import BlogSection from "../../components/BlogSection";
import CTASection from "../../components/CTASection";
import ReviewsSection from "../../components/ReviewSection";
import FooterSection from "../../components/FooterSection";
import { ArticleListItem } from "../../types/blog";

interface HomeScreenProps {
  initialArticles?: ArticleListItem[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ initialArticles }) => {
  return (
    <>
      <HeroSection />
      <AppOverviewSection />
      <FeaturesSection />
      <PricingSection />
      <BlogSection initialArticles={initialArticles} />
      <CTASection />
      <ReviewsSection />
      <FooterSection />
    </>
  );
};

export default HomeScreen;
