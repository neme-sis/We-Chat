import React, { Fragment } from "react";
import "../styles/SendMessageBox.scss";
import firebase from "firebase/compat/app"; //sdk import
import { IoSend } from "react-icons/io5";
import { DANGER } from "../Types/AlertTypes";
import { useDispatch } from "react-redux";
import { showAlert } from "../reducer/globalNotificationsReducer";
import { v4 } from "uuid";
import ImageUploader from "./ImageUploader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import ImagePreviewer from "./ImagePreviewer";

const SendMessageBox = ({ goLast, messageCollection, dropArrow }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [isMessageUploading, setIsMessageUploading] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const sendBox = React.useRef();
  const sendInputBox = React.useRef();
  const dispatch = useDispatch();

  async function uploadImageHandler(e) {
    e.preventDefault();
    if (!uploadedImage) return;
    const uid = v4();
    const imageRef = ref(storage, `images/${uploadedImage.name + uid}`);
    try {
      await uploadBytes(imageRef, uploadedImage, {
        contentType: uploadedImage.type,
      });
      const downloadURL = await getDownloadURL(imageRef);
      setIsUploading(false);
      return downloadURL;
    } catch (err) {
      console.log(err);
      dispatch(
        showAlert({
          type: DANGER,
          title: "Unable to upload image",
          description: "Please try again later.",
        })
      );
    }
  }

  /**
   * The `send` function sends a message to a message collection in Firebase Firestore, including the
   * text, timestamp, and user information.
   * @returns The function `send` is not returning anything explicitly.
   */
  const send = async (e, downloadURL) => {
    if (e) e.preventDefault();
    const msg = inputValue.trim();
    if (!msg && !downloadURL) return;

    const { uid, photoURL, displayName } = firebase.auth().currentUser;
    setInputValue("");
    const inputBox = downloadURL ? sendInputBox.current : sendBox.current;
    inputBox.style.height = "auto";
    const uuid = v4();
    setIsMessageUploading(true);
    const data = {
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      messageId: uuid,
    };
    if (downloadURL) data.image = downloadURL;
    try {
      await messageCollection.add(data);
    } catch (err) {
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

  async function submitImage(e) {
    e.preventDefault();
    setIsUploading(true);
    const downloadURL = await uploadImageHandler(e);
    await send(e, downloadURL);
    setIsUploading(false);
    setUploadedImage(null);
  }

  function autoResize() {
    sendBox.current.style.height = "auto";
    let scrollHeight = sendBox.current.scrollHeight;
    scrollHeight = scrollHeight > 150 ? 150 : scrollHeight;
    sendBox.current.style.height = scrollHeight + "px";
    if (dropArrow.style.display === "none") goLast();
  }

  React.useEffect(() => {
    if (sendBox.current) sendBox.current.addEventListener("input", autoResize);

    return () => {
      if (sendBox.current)
        sendBox.current.removeEventListener("input", autoResize);
    };
  }, [sendBox.current]);

  return (
    <Fragment>
      <ImagePreviewer
        img={uploadedImage}
        onClose={() => setUploadedImage(null)}
        isUploading={isUploading}
        senderMode
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendBox={sendInputBox}
        onSubmit={(e) => submitImage(e)}
      />
      <form onSubmit={send} className="send-message-wrapper">
        <ImageUploader
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
        />
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
        >
          <IoSend color="#4d38a2" size={25} />
        </button>
      </form>
    </Fragment>
  );
};

export default SendMessageBox;
