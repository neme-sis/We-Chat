import React from "react";
import "../styles/PageLoader.scss";
import pageLogo from "../assets/PageLogo.png";
import { useSelector } from "react-redux";

const PageLoader = () => {
  const theme = useSelector((state) => state.globalNotifications.theme);
  return (
    <div className={`we-chat-loader-wrapper we-chat-loader-wrapper-${theme}`}>
      <div className="we-chat-logo_loader-wrapper">
        <img src={pageLogo} alt="" className="we-chat-logo_loader" />
      </div>
      <h4 className={`we-chat-loader we-chat-loader-${theme}`}>
        {["L", "o", "a", "d", "i", "n", "g"].map((letter, index) => (
          <span
            key={index}
            className={`we-chat-letter we-chat-letter-${index + 1}`}
          >
            {letter}
          </span>
        ))}
      </h4>
    </div>
  );
};

export default PageLoader;
