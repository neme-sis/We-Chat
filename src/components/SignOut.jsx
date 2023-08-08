import React from "react";
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication

import { FiLogOut } from "react-icons/fi";
import { GlobalContext } from "../App";
import { auth } from "../config/firebaseConfig";
import { DANGER } from "../Types/AlertTypes";

const SignOut = () => {
  const { setAlertData } = React.useContext(GlobalContext);
  function signOutFromApp() {
    try {
      auth.signOut();
      localStorage.removeItem("logged-in-user");
    } catch (error) {
      console.log(error);
      const msg = error.code
        ?.split("/")[1]
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      setAlertData({
        isShowing: true,
        type: DANGER,
        title: "Unable to sign out",
        description: msg,
      });
    }
  }
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    auth.currentUser && (
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
