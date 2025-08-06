import { Epic } from "redux-observable";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { EVENTS } from "../action/actionTypes";
import * as actions from "../action/actionsCreators";

export const getHomeDataEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    map((action) => {
      if (action.type === EVENTS.GET_HOME_DATA) {
        // Mock data for now
        const mockData = [
          { id: 1, title: "Sample Card 1", description: "Description 1" },
          { id: 2, title: "Sample Card 2", description: "Description 2" },
        ];
        return actions.getHomeDataSuccess(mockData);
      }
      return { type: "NO_OP" };
    })
  );

export const getMoreHomeDataEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    map((action) => {
      if (action.type === EVENTS.GET_MORE_HOME_DATA) {
        // Mock data for now
        const mockData = [
          { id: 3, title: "Sample Card 3", description: "Description 3" },
          { id: 4, title: "Sample Card 4", description: "Description 4" },
        ];
        return actions.getMoreHomeDataSuccess(mockData);
      }
      return { type: "NO_OP" };
    })
  );
