import React from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

const SignOut = () => {
  function signOutFromApp() {
    firebase.auth().signOut();
  }

  return (
    firebase.auth().currentUser && (
      <button onClick={signOutFromApp}>Sign Out</button>
    )
  );
};

export default SignOut;
