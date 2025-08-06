import { combineEpics } from "redux-observable";
import { getHomeDataEpic, getMoreHomeDataEpic } from "./getHomeDataEpic";

export const rootEpic = combineEpics(getHomeDataEpic, getMoreHomeDataEpic);
