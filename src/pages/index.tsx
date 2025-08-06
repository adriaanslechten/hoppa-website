import React from "react";
import { HomeScreen } from "./home/HomeScreen";
import { useRouter } from "next/router";

const HomeContainer: React.FC = () => {
  const router = useRouter();

  return <HomeScreen />;
};

export default HomeContainer;
