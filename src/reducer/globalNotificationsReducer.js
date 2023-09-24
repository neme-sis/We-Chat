import { createSlice } from "@reduxjs/toolkit";
import { DARK, LIGHT } from "../Types/AlertTypes";

const initialState = {
  alertComponent: {
    isShowing: false,
    type: null,
    title: "",
    description: "",
  },
  isGloballyLoading: false,
  theme: localStorage.getItem("theme") || LIGHT,
};

const globalNotificationsReducer = createSlice({
  name: "globalNotifications",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alertComponent = {
        isShowing: true,
        type: action.payload.type,
        title: action.payload.title,
        description: action.payload.description,
      };
    },
    hideAlert: (state) => {
      state.alertComponent = {
        ...state.alertComponent,
        isShowing: false,
      };
    },
    showGlobalLoading: (state) => {
      state.isGloballyLoading = true;
    },
    hideGlobalLoading: (state) => {
      state.isGloballyLoading = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === LIGHT ? DARK : LIGHT;
    },
  },
});

export const { showAlert, hideAlert, showGlobalLoading, hideGlobalLoading, toggleTheme } =
  globalNotificationsReducer.actions;
export default globalNotificationsReducer.reducer;
