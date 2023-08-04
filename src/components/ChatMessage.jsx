import React from "react";
import { auth } from "../config/firebaseConfig";
import "../styles/ChatMessage.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ChatMessage = ({ message, showDetail, isLastMessage, dropArrow }) => {
  const { text, uid, photoURL, displayName } = message;
  const textClass = auth.currentUser.uid === uid ? "sent" : "recieved";
  const lastMessageRef = React.useRef();

  function createObserver() {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(lastMessageRef.current);
  }

  function handleIntersect(entries) {
    if (!dropArrow) return;
    if (entries[0].isIntersecting) {
      dropArrow.style.display = "none";
    } else {
      dropArrow.style.display = "flex";
    }
  }

  React.useEffect(() => {
    if (lastMessageRef.current) createObserver();
  }, [lastMessageRef.current]);

  if (uid === "spcltxt") return <></>; //testing

  return (
    <div
      className={`chat chat-${textClass} ${
        isLastMessage ? "last-message" : ""
      }`}
      style={{ marginTop: showDetail ? "1.5rem" : "0.5rem" }}
      ref={(el) => {
        if (isLastMessage) lastMessageRef.current = el;
      }}
    >
      {showDetail && (
        <div className={`user-details user-details-${textClass}`}>
          <LazyLoadImage src={photoURL} className="user-img-avatar" />
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
