// src/store/actions/homeActions.ts
import { CardProps } from "../../components/Card";
import { EVENTS } from "./actionTypes";

export const getHomeData = () => ({
  type: EVENTS.GET_HOME_DATA,
});

export const getHomeDataSuccess = (data: CardProps[]) => ({
  type: EVENTS.GET_HOME_DATA_SUCCESS,
  payload: data,
});

export const getHomeDataFailure = (error: string) => ({
  type: EVENTS.GET_HOME_DATA_FAILURE,
  payload: error,
});

export const getMoreHomeData = (page: number) => ({
  type: EVENTS.GET_MORE_HOME_DATA,
  payload: page,
});

export const getMoreHomeDataSuccess = (data: CardProps[]) => ({
  type: EVENTS.GET_MORE_HOME_DATA_SUCCESS,
  payload: data,
});

export const getMoreHomeDataFailure = (error: string) => ({
  type: EVENTS.GET_MORE_HOME_DATA_FAILURE,
  payload: error,
});

export type HomeAction =
  | ReturnType<typeof getHomeData>
  | ReturnType<typeof getHomeDataSuccess>
  | ReturnType<typeof getHomeDataFailure>
  | ReturnType<typeof getMoreHomeData>
  | ReturnType<typeof getMoreHomeDataSuccess>
  | ReturnType<typeof getMoreHomeDataFailure>;
