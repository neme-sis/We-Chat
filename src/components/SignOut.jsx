import React from "react";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import { FiLogOut } from "react-icons/fi";

const SignOut = () => {
  function signOutFromApp() {
    firebase.auth().signOut();
    localStorage.removeItem("logged-in-user");
  }
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    firebase.auth().currentUser && (
      <button
        onClick={signOutFromApp}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FiLogOut size={30} color={isHovered ? "#a5a2b2" : "#ffffff"} />
      </button>
    )
  );
};

export default SignOut;
