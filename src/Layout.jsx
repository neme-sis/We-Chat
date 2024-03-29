import React, { Fragment } from "react";
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
import { useSelector } from "react-redux";

const Layout = () => {
  const user = useFirebaseSignUp();
  let routes = "";
  const [initialLoading, setInitialLoading] = React.useState(true);
  const isGloballyLoading = useSelector(
    (state) => state.globalNotifications.isGloballyLoading
  );

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
    <Fragment>
      <AlertComponent />
      {(initialLoading ||
        isGloballyLoading ||
        (!user && localStorage.getItem("logged-in-user"))) && <PageLoader />}
      {routes}
    </Fragment>
  );
};

export default Layout;
