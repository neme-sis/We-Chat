import React, { useState } from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import { FcGoogle } from "react-icons/fc";
import "../styles/UserAuth.scss";
import { Route, Routes } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
const UserAuth = ({children, ...props}) => {
  function signInAuthWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <>
      <div className="sign-in-container">
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
              <p>Sign in with Google</p>
            </button>
          </div>
        </div>
        <div className="sign-in-container-image"></div>
      </div>
    </>
  );
};

export default UserAuth;
