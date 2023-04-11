import React from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import WeChat from "./WeChat";

const SignIn = () => {
  function signInAuthWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <>
      <WeChat />
      <button onClick={signInAuthWithGoogle} className="signin">
        <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" alt="" />
        Sign In With Google
      </button>
    </>
  );
};

export default SignIn;
