import React from "react";
import "./styles/App.scss";
import Chat from "./components/Chat";
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import UserAuth from "./pages/UserAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import { useFirebaseSignUp } from "./config/firebaseConfig";

function App() {
  const user = useFirebaseSignUp();
  let routes = "";

  if (!user && localStorage.getItem("logged-in-user"))
    return <div className="App">Loading...</div>;

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

  return <div className="App">{routes}</div>;
}

export default App;
