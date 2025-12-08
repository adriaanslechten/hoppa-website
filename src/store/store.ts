import { configureStore } from "@reduxjs/toolkit";
import { forumApi } from "./api/forumApi";
import { blogApi } from "./api/blogApi";

export const store = configureStore({
  reducer: {
    // Add the RTK Query API reducers
    [forumApi.reducerPath]: forumApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(forumApi.middleware, blogApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
