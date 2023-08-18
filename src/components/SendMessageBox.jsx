import React from "react";
import "../styles/SendMessageBox.scss";
import firebase from "firebase/compat/app"; //sdk import
import { IoSend } from "react-icons/io5";
import { DANGER } from "../Types/AlertTypes";
import { useDispatch } from "react-redux";
import { showAlert } from "../reducer/globalNotificationsReducer";
import { v4 } from "uuid";

const SendMessageBox = ({ goLast, messageCollection }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [isMessageUploading, setIsMessageUploading] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const sendBox = React.useRef();
  const dispatch = useDispatch();

  /**
   * The `send` function sends a message to a message collection in Firebase Firestore, including the
   * text, timestamp, and user information.
   * @returns The function `send` is not returning anything explicitly.
   */
  const send = async (e) => {
    e.preventDefault();
    const msg = inputValue.trim();
    if (!msg) return;

    const { uid, photoURL, displayName } = firebase.auth().currentUser;
    setInputValue("");
    sendBox.current.style.height = "auto";
    const uuid = v4();
    setIsMessageUploading(true);
    try {
      await messageCollection.add({
        text: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
        messageId: uuid,
      });
    } catch (err) {
      console.log(err);
      dispatch(
        showAlert({
          isShowing: true,
          type: DANGER,
          title: "Unable to send message",
          description: "Please try again later.",
        })
      );
    }
    goLast();
    setIsMessageUploading(false);
  };

  function autoResize() {
    sendBox.current.style.height = "auto";
    let scrollHeight = sendBox.current.scrollHeight;
    scrollHeight = scrollHeight > 150 ? 150 : scrollHeight;
    sendBox.current.style.height = scrollHeight + "px";
    goLast()
  }

  React.useEffect(() => {
    if (sendBox.current) sendBox.current.addEventListener("input", autoResize);

    return () => {
      if (sendBox.current)
        sendBox.current.removeEventListener("input", autoResize);
    };
  }, [sendBox.current]);

  return (
    <form onSubmit={send} className="send-message-wrapper">
      <textarea
        type="text"
        placeholder="Write a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={sendBox}
        rows={1}
      />
      <button
        type="submit"
        className="send-text"
        disabled={isMessageUploading}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IoSend
          color="#4d38a2"
          size={25}
          style={{ opacity: isHovered ? 0.7 : 1 }}
        />
      </button>
    </form>
  );
};

export default SendMessageBox;
