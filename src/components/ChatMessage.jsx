import React, { Fragment } from "react";
import { auth } from "../config/firebaseConfig";
import "../styles/ChatMessage.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ChatMessage = ({
  message,
  showDetail,
  isLastMessage,
  dropArrow,
  isSameDay,
}) => {
  const { text, uid, photoURL, displayName, createdAt } = message;
  let timeStamp = new Date(createdAt.seconds * 1000);
  let hour = timeStamp.getHours(),
    minute = timeStamp.getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
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

  const isShowUserDetail = !isSameDay || showDetail;

  if (uid === "spcltxt") return <></>; //testing

  return (
    <Fragment>
      {!isSameDay && (
        <div className="date-separator">
          <div className="line"></div>
          <div className="date">{timeStamp.toDateString()}</div>
          <div className="line"></div>
        </div>
      )}
      <div
        className={`chat chat-${textClass} ${
          isLastMessage ? "last-message" : ""
        }`}
        style={{ marginTop: isShowUserDetail ? "1.5rem" : "0.5rem" }}
        ref={(el) => {
          if (isLastMessage) lastMessageRef.current = el;
        }}
      >
        {isShowUserDetail && (
          <div className={`user-details user-details-${textClass}`}>
            <LazyLoadImage src={photoURL} className="user-img-avatar" />
            <p className={`user-name ${textClass}-user-name`}>
              ~{textClass === "sent" ? "You" : displayName}
            </p>
          </div>
        )}
        <div className={`user-message user-message-${textClass}`}>
          {text}
          <div className="timestamp">
            {hour}:{minute}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessage;
