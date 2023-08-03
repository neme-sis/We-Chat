import React from "react";
import "../styles/PageLoader.scss";
import pageLogo from "../assets/PageLogo.png";

const PageLoader = () => {
  return (
    <div className="we-chat-loader-wrapper">
      <img src={pageLogo} alt="" className="we-chat-logo_loader"/>
      <h4 className="we-chat-loader">
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
