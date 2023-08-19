import React, { Fragment } from "react";
import { auth } from "../config/firebaseConfig";
import "../styles/ChatMessage.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCopy as CopyIcon } from "react-icons/ai";
import { RiDeleteBin6Fill as DeleteIcon } from "react-icons/ri";
import { MdOutlineAddReaction as ReactIcon } from "react-icons/md";
import useToggle from "../hooks/useToggle";
import { SUCCESS } from "../Types/AlertTypes";
import { useDispatch } from "react-redux";
import { showAlert } from "../reducer/globalNotificationsReducer";
import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import Linkify from "../helper/Linkify";
import ImagePreviewer from "./ImagePreviewer";

function copyToClipboard(text, setAlertData) {
  navigator.clipboard.writeText(text);
  setAlertData({
    type: SUCCESS,
    title: "Successfully copied to clipboard",
  });
}

async function deleteMessage(messageId, setAlertData) {
  try {
    const messageCollection = firebase.firestore().collection("messages");
    const query = messageCollection.where("messageId", "==", messageId);

    const querySnapshot = await query.get();
    querySnapshot.forEach(async (doc) => {
      await doc.ref.delete();
      setAlertData({ type: SUCCESS, title: `Message deleted successfully.` });
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    setAlertData({
      type: DANGER,
      title: "Error deleting message",
      description: "Please try again later",
    });
  }
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
  const { text, uid, photoURL, displayName, createdAt, image } = message;
  const dispatch = useDispatch();
  const textLimit = 400;
  const [textLengthLimit, setTextLengthLimit] = React.useState(textLimit);
  let timeStamp = new Date(createdAt.seconds * 1000);
  let hour = timeStamp.getHours(),
    minute = timeStamp.getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  const textClass = auth.currentUser.uid === uid ? "sent" : "recieved";

  const messageOptionsMenuToggler = React.useRef(null);
  const messageOptionsRef = React.useRef(null);
  const [messageOptions, toggleMessageOptions] = useToggle(
    messageOptionsMenuToggler
  );
  const [previewImage, setPreviewImage] = React.useState(null);

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

  function messageOptionsHandler() {
    const threeDot =
      window.innerHeight -
      messageOptionsMenuToggler.current.getBoundingClientRect().top;
    if (threeDot >= 240) {
      messageOptionsRef.current.style.top = "35px";
      messageOptionsRef.current.style.transform = "translateY(0)";
    } else {
      messageOptionsRef.current.style.top = "0px";
      messageOptionsRef.current.style.transform = "translateY(-95%)";
    }
    toggleMessageOptions();
  }

  React.useEffect(() => {
    if (lastMessageRef.current) createObserver();
  }, [lastMessageRef.current]);

  const isShowUserDetail = !isSameDay || showDetail;
  const optionsForMessage = [
    {
      name: <p>Copy</p>,
      icon: <CopyIcon size={20} />,
      onClick: () => copyToClipboard(text, (data) => dispatch(showAlert(data))),
    },
    {
      name: <p style={{ color: "#d00" }}>Delete</p>,
      icon: <DeleteIcon size={20} color="#d00" />,
      onClick: () =>
        deleteMessage(message.messageId, (data) => dispatch(showAlert(data))),
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
      {previewImage && (
        <ImagePreviewer
          img={previewImage}
          onClose={() => setPreviewImage(null)}
        />
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
            {image && (
              <div
                className="message-image-wrapper"
                onClick={() => setPreviewImage(image)}
              >
                <LazyLoadImage
                  src={image}
                  className="message-image"
                  alt="message-image"
                />
              </div>
            )}
            {text && (
              <div>
                <Linkify>
                  {text.length < textLengthLimit
                    ? text
                    : text.slice(0, textLengthLimit)}
                </Linkify>
                {text.length > textLengthLimit && (
                  <span
                    className="read-more"
                    onClick={() =>
                      setTextLengthLimit((prev) => prev + textLimit)
                    }
                  >
                    {" ...Read More"}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="timestamp">
            {hour}:{minute}
          </div>
          <div
            className="three-dot"
            onClick={messageOptionsHandler}
            ref={messageOptionsMenuToggler}
          >
            <BsThreeDotsVertical color="#fff" />
          </div>
          <div
            className="message-handling-options"
            ref={messageOptionsRef}
            style={{ display: messageOptions ? "block" : "none" }}
          >
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
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessage;
