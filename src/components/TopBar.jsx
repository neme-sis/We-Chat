import React from "react";
import "../styles/TopBar.scss";
import { auth } from "../config/firebaseConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";
import inlineLogo from "../assets/PageLogoInline.png";
import SignOut from "./SignOut";

const TopBar = () => {
  return (
    // <header className="App-header">
    //   <h2>
    //     We Chat
    //     <img src={auth.currentUser.photoURL} alt="" />
    //     <span>
    //       <SignOut />
    //     </span>
    //   </h2>
    // </header>
    <div className="top-bar">
      <LazyLoadImage src={inlineLogo} height={35} className="top-bar-logo" />
      <div className="top-bar-right">
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
