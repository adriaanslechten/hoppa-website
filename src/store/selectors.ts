// src/store/selectors/homeSelectors.ts

import { RootState } from "./store";

export const getHomeDataAsync = (state: RootState) => state.home.homeProfileAsync;

export const getHomeData = (state: RootState) => state.home.data;

export const getCurrentPage = (state: RootState) => state.home.currentPage;
