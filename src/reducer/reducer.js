import {
  HIDE_ALERT,
  HIDE_GLOBAL_LOADING,
  SHOW_ALERT,
  SHOW_GLOBAL_LOADING,
} from "../Types/ActionTypes";

export const initialState = {
  alertComponent: {
    isShowing: false,
    type: null,
    title: "",
    description: "",
  },
  isGloballyLoading: false,
  messagesLimitList: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alertComponent: {
          isShowing: true,
          type: action.payload.type,
          title: action.payload.title,
          description: action.payload.description,
        },
      };
    case HIDE_ALERT:
      return {
        ...state,
        alertComponent: {
          ...state.alertComponent,
          isShowing: false,
        },
      };
    case SHOW_GLOBAL_LOADING:
      return {
        ...state,
        isGloballyLoading: true,
      };
    case HIDE_GLOBAL_LOADING:
      return {
        ...state,
        isGloballyLoading: false,
      };
    default:
      return state;
  }
}
