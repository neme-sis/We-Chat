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
  allMessageContainer,
  lastMessageRef,
}) => {
  const { text, uid, photoURL, displayName, createdAt } = message;
  const textLimit = 400;
  const [textLengthLimit, setTextLengthLimit] = React.useState(textLimit);
  let timeStamp = new Date(createdAt.seconds * 1000);
  let hour = timeStamp.getHours(),
    minute = timeStamp.getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  const textClass = auth.currentUser.uid === uid ? "sent" : "recieved";

  function createObserver() {
    let options = {
      root: allMessageContainer,
      rootMargin: "200px 0px 0px 0px",
      threshold: 0.1,
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
          {text.length < textLengthLimit
            ? text
            : text.slice(0, textLengthLimit)}
          {text.length > textLengthLimit && (
            <span
              className="read-more"
              onClick={() => setTextLengthLimit((prev) => prev + textLimit)}
            >
              ...Read More
            </span>
          )}
          <div className="timestamp">
            {hour}:{minute}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessage;
