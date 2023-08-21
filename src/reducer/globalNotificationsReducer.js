import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertComponent: {
    isShowing: false,
    type: null,
    title: "",
    description: "",
  },
  isGloballyLoading: false,
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
  },
});

export const { showAlert, hideAlert, showGlobalLoading, hideGlobalLoading } =
  globalNotificationsReducer.actions;
export default globalNotificationsReducer.reducer;
