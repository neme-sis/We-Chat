import React, { Fragment, memo } from "react";
import { auth } from "../config/firebaseConfig";
import "../styles/ChatMessage.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCopy as CopyIcon } from "react-icons/ai";
import { RiDeleteBin6Fill as DeleteIcon } from "react-icons/ri";
import { MdOutlineAddReaction as ReactIcon } from "react-icons/md";
import useToggle from "../hooks/useToggle";
import { GlobalContext } from "../App";
import { SUCCESS } from "../Types/AlertTypes";

function copyToClipboard(text, setAlertData) {
  navigator.clipboard.writeText(text);
  // setAlertData({
  //   type: SUCCESS,
  //   title: "Successfully copied to clipboard",
  //   isShowing: true,
  // });
}

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

  const messageOptionsMenuToggler = React.useRef(null);
  const [messageOptions, toggleMessageOptions] = useToggle(
    messageOptionsMenuToggler
  );
  const { setAlertData } = React.useContext(GlobalContext);

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
  const optionsForMessage = [
    {
      name: <p>Copy</p>,
      icon: <CopyIcon size={20} />,
      onClick: () => copyToClipboard(text, setAlertData),
    },
    {
      name: <p style={{ color: "#d00" }}>Delete</p>,
      icon: <DeleteIcon size={20} color="#d00" />,
      onClick: () => {},
    },
    {
      name: <p>React</p>,
      icon: <ReactIcon size={20} />,
      onClick: () => {},
    },
  ];

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
        style={{ marginTop: isShowUserDetail ? "1.25rem" : "0.25rem" }}
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
          <div className="message-content">
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
          </div>
          <div className="timestamp">
            {hour}:{minute}
          </div>
          <div
            className="three-dot"
            onClick={toggleMessageOptions}
            ref={messageOptionsMenuToggler}
          >
            <BsThreeDotsVertical />
          </div>
          {messageOptions && (
            <div className="message-handling-options">
              {optionsForMessage.map((opt, _) => (
                <div
                  className="message-handling-option"
                  key={_}
                  onClick={opt.onClick}
                >
                  {opt.icon && (
                    <div className="message-option-icon">{opt.icon}</div>
                  )}
                  <div className="message-option-name">{opt.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessage;
