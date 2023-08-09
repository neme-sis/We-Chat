import { configureStore } from "@reduxjs/toolkit";
import globalNotificationsReducer from "./globalNotificationsReducer";

export const store = configureStore({
  reducer: {
    globalNotifications: globalNotificationsReducer,
  },
});
