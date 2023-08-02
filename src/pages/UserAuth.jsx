import React, { useState } from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import { FcGoogle } from "react-icons/fc";
import "../styles/UserAuth.scss";

const UserAuth = ({ children, ...props }) => {
  async function signInAuthWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await firebase.auth().signInWithPopup(provider);
      if (res.user) localStorage.setItem("logged-in-user", true);
    } catch (err) {
      console.log(err);
    }
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
