// src/store/reducers/homeReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../../components/Card";
import { AsyncState } from "../types/types";

export interface AsyncIndicators<Err = unknown> {
  state: AsyncState;
  error?: Err;
}

export interface State {
  homeProfileAsync: AsyncIndicators;
  data: CardProps[];
  currentPage: number;
}

export const initialState: State = {
  homeProfileAsync: {
    state: "INITIAL",
  },
  data: [],
  currentPage: 1,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getHomeData: (state) => {
      state.homeProfileAsync = {
        state: "LOADING",
        error: undefined,
      };
      state.data = [];
      state.currentPage = 1;
    },
    getHomeDataSuccess: (state, action: PayloadAction<CardProps[]>) => {
      state.homeProfileAsync = {
        state: "SUCCESS",
        error: undefined,
      };
      state.data = action.payload;
      state.currentPage = 1;
    },
    getHomeDataFailure: (state, action: PayloadAction<string>) => {
      state.homeProfileAsync = {
        state: "FAILURE",
        error: action.payload,
      };
    },
    getMoreHomeData: (state, action: PayloadAction<number>) => {
      state.homeProfileAsync = {
        state: "LOADING",
        error: undefined,
      };
    },
    getMoreHomeDataSuccess: (state, action: PayloadAction<CardProps[]>) => {
      state.homeProfileAsync = {
        state: "SUCCESS",
        error: undefined,
      };
      state.data = [...state.data, ...action.payload];
      state.currentPage = state.currentPage + 1;
    },
    getMoreHomeDataFailure: (state, action: PayloadAction<string>) => {
      state.homeProfileAsync = {
        state: "FAILURE",
        error: action.payload,
      };
    },
  },
});

export const {
  getHomeData,
  getHomeDataSuccess,
  getHomeDataFailure,
  getMoreHomeData,
  getMoreHomeDataSuccess,
  getMoreHomeDataFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
