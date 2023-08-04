import React from "react";
import { auth } from "../config/firebaseConfig";
import "../styles/ChatMessage.scss";

const ChatMessage = ({ message, showDetail }) => {
  const { text, uid, photoURL, displayName } = message;
  const textClass = auth.currentUser.uid === uid ? "sent" : "recieved";

  if (uid === "spcltxt") return <></>; //testing

  return (
    <div
      className={`chat chat-${textClass}`}
      style={{ marginTop: showDetail ? "1.5rem" : "0.5rem" }}
    >
      {showDetail && (
        <div className={`user-details user-details-${textClass}`}>
          <img src={photoURL} alt="" />
          <p className={`user-name ${textClass}-user-name`}>
            ~{textClass === "sent" ? "You" : displayName}
          </p>
        </div>
      )}
      <p className={`user-message user-message-${textClass}`}>{text}</p>
    </div>
  );
};

export default ChatMessage;
