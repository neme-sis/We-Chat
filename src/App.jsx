import React from "react";
import "./styles/App.scss";
import Chat from "./pages/Chat";
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import UserAuth from "./pages/UserAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import { useFirebaseSignUp } from "./config/firebaseConfig";
import PageLoader from "./components/PageLoader";
import AlertComponent from "./components/AlertComponent";
import { initialState, reducer } from "./reducer/reducer";
import {
  HIDE_ALERT,
  HIDE_GLOBAL_LOADING,
  SHOW_ALERT,
  SHOW_GLOBAL_LOADING,
} from "./Types/ActionTypes";

export const GlobalContext = React.createContext({});

function App() {
  const user = useFirebaseSignUp();
  let routes = "";
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [store, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let timeout = null;
    if (initialLoading)
      timeout = setTimeout(() => {
        setInitialLoading(false);
      }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [initialLoading]);

  let alertClosingTimeout = null;

  React.useEffect(() => {
    if (store.alertComponent.isShowing) {
      alertClosingTimeout = setTimeout(() => {
        dispatch({ type: HIDE_ALERT });
      }, 3000);
    }

    return () => {
      clearTimeout(alertClosingTimeout);
    };
  }, [store.alertComponent.isShowing]);

  const closeAlert = () => {
    dispatch({ type: HIDE_ALERT });
    clearTimeout(alertClosingTimeout);
  };

  const setIsGloballyLoading = (isLoading) => {
    if (isLoading) dispatch({ type: SHOW_GLOBAL_LOADING });
    else dispatch({ type: HIDE_GLOBAL_LOADING });
  };

  const setAlertData = (alertData) => {
    dispatch({ type: SHOW_ALERT, payload: alertData });
  };

  if (user) {
    routes = (
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route
          path="auth/signin"
          element={
            <UserAuth>
              <SignInModal />
            </UserAuth>
          }
        ></Route>
        <Route
          path="auth/signup"
          element={
            <UserAuth>
              <SignUpModal />
            </UserAuth>
          }
        ></Route>

        <Route path="*" element={<Navigate to="/auth/signin" />}></Route>
      </Routes>
    );
  }

  return (
    <GlobalContext.Provider value={{ setIsGloballyLoading, setAlertData }}>
      <div className="App">
        <AlertComponent {...store.alertComponent} onClose={closeAlert} />
        {(initialLoading ||
          store.isGloballyLoading ||
          (!user && localStorage.getItem("logged-in-user"))) && <PageLoader />}
        {routes}
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
