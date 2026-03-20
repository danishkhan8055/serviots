import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi.js";
import { taskApi } from "./api/taskApi.js";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApi.middleware),
});
