import React from "react";
import "../styles/TopBar.scss";
import { auth } from "../config/firebaseConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";
import inlineLogo from "../assets/PageLogoInline.png";
import SignOut from "./SignOut";
import ThemeTogglerButton from "./ThemeTogglerButton";
import { useSelector } from "react-redux";

const TopBar = () => {
  const theme = useSelector((state) => state.globalNotifications.theme);
  return (
    <div className={`top-bar top-bar-${theme}`}>
      <LazyLoadImage src={inlineLogo} height={35} className="top-bar-logo" />
      <div className="top-bar-right">
        <div className="theme-toggler-button">
          <ThemeTogglerButton />
        </div>
        <LazyLoadImage
          src={auth.currentUser.photoURL}
          alt=""
          className="top-bar-profile-pic"
          height={30}
        />
        <div className="top-bar-sign-out">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
