import React, { useState } from "react";
import "../styles/SignInModal.scss";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { GlobalContext } from "../App";

const SignInModal = () => {
  const [userInput, setUserInput] = useState({
    userPassword: "",
    userEmail: "",
  });
  const { setIsGloballyLoading } = React.useContext(GlobalContext);
  async function signInWithEmailManually(e) {
    e.preventDefault();
    setIsGloballyLoading(true);
    await signInWithEmailAndPassword(
      auth,
      userInput.userEmail,
      userInput.userPassword
    );
    setIsGloballyLoading(false);
  }
  return (
    <>
      <h2 className="sign-in-header">Sign In</h2>
      <div className="user-inputs-container">
        <div className="user-detail-input">
          <input
            type="email"
            className="user-detail user-detail-email"
            name="user-email"
            id="user-email"
            placeholder="Enter Your Email..."
            value={userInput.userEmail}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                userEmail: e.target.value,
              }))
            }
          />
          <label htmlFor="user-email" className="input-label">
            Email
          </label>
        </div>
        <div className="user-detail-input">
          <input
            type="password"
            className="user-detail user-detail-password"
            name="user-password"
            id="user-password"
            placeholder="Enter Your Password..."
            value={userInput.userPassword}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                userPassword: e.target.value,
              }))
            }
          />
          <label htmlFor="user-password" className="input-label">
            Password
          </label>
        </div>
        <button
          onClick={signInWithEmailManually}
          className="sign-in-manual-button"
        >
          Sign In
        </button>
        <p className="sign-up-redirector">
          Don't have an account? <Link to={"/auth/signup"}>Create one</Link>
        </p>
      </div>
    </>
  );
};

export default SignInModal;
