import React, { useContext, useState } from "react";
import "../styles/SignUpModal.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { DANGER, SUCCESS, WARNING } from "../Types/AlertTypes";
import { useDispatch } from "react-redux";
import {
  hideGlobalLoading,
  showAlert,
  showGlobalLoading,
} from "../reducer/globalNotificationsReducer";

const SignUpModal = () => {
  const [userInput, setUserInput] = useState({
    userPassword: "",
    userEmail: "",
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();
  function validateInput() {
    if (!userInput.firstName || !userInput.lastName) {
      return dispatch(
        showAlert({
          type: WARNING,
          title: "Valid credentials required",
          description: "Please enter your first and last name",
        })
      );
    }
    if (!userInput.userEmail || !userInput.userPassword) {
      return dispatch(
        showAlert({
          isShowing: true,
          type: WARNING,
          title: "Valid credentials required",
          description: "Please enter your email and password",
        })
      );
    }
    if (userInput.userPassword.length < 6) {
      return dispatch(
        showAlert({
          isShowing: true,
          type: WARNING,
          title: "Weak Password",
          description: "Password must be at least 6 characters long",
        })
      );
    }
    return true;
  }

  async function signInWithEmailManually(e) {
    e.preventDefault();
    if (!validateInput()) return;
    dispatch(showGlobalLoading());
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
      dispatch(hideGlobalLoading());
      dispatch(
        showAlert({
          isShowing: true,
          type: SUCCESS,
          title: "Successfully signed up",
          description: `Welcome ${userInput.firstName} ${userInput.lastName}`,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        showAlert({
          isShowing: true,
          type: DANGER,
          title: "Unable to sign up",
          description: err.message,
        })
      );
    }
    dispatch(hideGlobalLoading());
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
