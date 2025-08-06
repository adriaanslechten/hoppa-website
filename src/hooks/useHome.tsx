import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { State } from "../store/reducers/index";
import * as actions from "../store/action/actionsCreators";
import { CardProps } from "../components/Card";

export const useHome = (initialData?: CardProps[]) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: State) => state.home.data);
  const homeProfileAsync = useAppSelector((state: State) => state.home.homeProfileAsync);
  const currentPage = useAppSelector((state: State) => state.home.currentPage);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      dispatch(actions.getHomeData());
    } else {
      // Hydrate initial data
      dispatch(actions.getHomeDataSuccess(initialData));
    }
  }, [dispatch, initialData]);

  const refreshData = () => {
    dispatch(actions.getHomeData());
  };

  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(actions.getMoreHomeData(nextPage));
  };

  const error = useAppSelector((state: State) => state.home.homeProfileAsync.error);

  return {
    data: data, // Always return data from Redux state
    homeProfileAsync,
    refreshData,
    loadMoreData,
    error,
  };
};
