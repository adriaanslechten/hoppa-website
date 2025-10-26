import { configureStore } from "@reduxjs/toolkit";
import { forumApi } from "./api/forumApi";

export const store = configureStore({
  reducer: {
    // Add the RTK Query API reducer
    [forumApi.reducerPath]: forumApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forumApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
