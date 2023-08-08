import React, { useContext, useState } from "react";
import "../styles/SignUpModal.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { GlobalContext } from "../App";

const SignUpModal = () => {
  const [userInput, setUserInput] = useState({
    userPassword: "",
    userEmail: "",
    firstName: "",
    lastName: "",
  });
  const { setIsGloballyLoading, setAlertData } = useContext(GlobalContext);
  async function signInWithEmailManually(e) {
    e.preventDefault();
    setIsGloballyLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInput.userEmail,
        userInput.userPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: `${userInput.firstName} ${userInput.lastName}`,
        photoURL:
          "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
      });
      setIsGloballyLoading(false);
      setAlertData({
        isShowing: true,
        type: "SUCCESS",
        title: "Successfully signed up",
        description: `Welcome ${userInput.firstName} ${userInput.lastName}`,
      });
    } catch (err) {
      console.log(err);
      setAlertData({
        isShowing: true,
        type: "DANGER",
        title: "Unable to sign up",
        description: err.message,
      });
    }
    setIsGloballyLoading(false);
  }
  return (
    <>
      <h2 className="sign-up-header">Sign Up</h2>
      <div className="user-inputs-container-sign-up">
        <div className="user-detail-input-sub-container">
          <div className="user-detail-input user-detail-input-sub">
            <input
              type="text"
              className="user-detail user-detail-first-name"
              name="user-first-name"
              id="user-first-name"
              placeholder="Enter Your First Name..."
              value={userInput.firstName}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
            <label htmlFor="user-first-name" className="input-label">
              First Name
            </label>
          </div>
          <div className="user-detail-input user-detail-input-sub">
            <input
              type="text"
              className="user-detail user-detail-last-name"
              name="user-last-name"
              id="user-last-name"
              placeholder="Enter Your Last Name..."
              value={userInput.lastName}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
            <label htmlFor="user-last-name" className="input-label">
              Last Name
            </label>
          </div>
        </div>
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
          Sign Up
        </button>
        <p className="sign-in-redirector">
          Already have an account? <Link to={"/auth/signin"}>Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default SignUpModal;
