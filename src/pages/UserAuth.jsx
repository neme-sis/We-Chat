import React from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import { FcGoogle } from "react-icons/fc";
import "../styles/UserAuth.scss";
import { DANGER } from "../Types/AlertTypes";
import { showAlert } from "../reducer/globalNotificationsReducer";
import { useDispatch, useSelector } from "react-redux";
import ThemeTogglerButton from "../components/ThemeTogglerButton";
import TopBar from "../components/TopBar";

const UserAuth = ({ children, ...props }) => {
  const dispatch = useDispatch();
  async function signInAuthWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await firebase.auth().signInWithPopup(provider);
      if (res.user) localStorage.setItem("logged-in-user", true);
    } catch (err) {
      console.log(err);
      dispatch(
        showAlert({
          type: DANGER,
          description:
            "Check your internet connection or Please try again later",
          title: "Error signing in with Google",
        })
      );
    }
  }
  
  const theme = useSelector((state) => state.globalNotifications.theme);

  return (
    <>
      <TopBar notSignedIn/>
      <div className={`sign-in-container sign-in-container-${theme}`}>
        <div className="sign-in-container-content">
          <div className="sign-user-container">
            {children}
            <div className="option-or">
              <span></span>
              <p>or</p>
              <span></span>
            </div>
            <button
              type="button"
              className="login-with-google-btn"
              onClick={signInAuthWithGoogle}
            >
              <FcGoogle size={"30px"} />
              <p>Sign In with Google</p>
            </button>
          </div>
        </div>
        <div className="sign-in-container-image"></div>
      </div>
    </>
  );
};

export default UserAuth;
