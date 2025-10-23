import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slice/Dashboard";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
