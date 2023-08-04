import React from "react";

import { v4 } from "uuid";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import SignOut from "../components/SignOut";
import ChatMessage from "../components/ChatMessage";

const invalid = (e) => {
  e.target.setCustomValidity("Please Enter a Message To Send");
};
const notInvalid = (e) => {
  e.target.setCustomValidity("");
};

const Chat = () => {
  /* The code is setting up a connection to the Firestore database and retrieving a collection of
  messages. */
  const messageCollection = firebase.firestore().collection("messages");
  const query = messageCollection.orderBy("createdAt");
  const end = useRef();
  const [messages] = useCollectionData(query, { idField: "id" });

  const goLast = () => end.current.scrollIntoView({ behaviour: "smooth" });

  const [inputValue, setInputValue] = React.useState("");
  const [isMessageUploading, setIsMessageUploading] = React.useState(false);

  /**
   * The `send` function sends a message to a message collection in Firebase Firestore, including the
   * text, timestamp, and user information.
   * @returns The function `send` is not returning anything explicitly.
   */
  const send = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = firebase.auth().currentUser;
    const msg = inputValue.trim();

    if (!msg) return;
    setIsMessageUploading(true);
    await messageCollection.add({
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
    setInputValue("");
    goLast();
    setIsMessageUploading(false);
  };

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is
  used to scroll to the last message in the chat whenever the `messages` array changes. */
  useEffect(() => {
    goLast();
  }, [messages]);

  let prevUID = "";

  return (
    <div>
      <header className="App-header">
        <h2>
          We Chat
          <img src={firebase.auth().currentUser.photoURL} alt="" />
          <span>
            <SignOut />
          </span>
        </h2>
      </header>
      <div className="chat-all">
        {messages &&
          messages.map((message) => {
            const uuid = v4();
            const isSameUser = prevUID === message.uid;
            prevUID = message.uid;
            return (
              <ChatMessage
                key={uuid}
                message={message}
                showDetail={!isSameUser}
              />
            );
          })}
      </div>
      <span ref={end}></span>
      <form onSubmit={send} className="form">
        <input
          type="text"
          placeholder="Send Text..."
          required
          onInvalid={invalid}
          onInput={notInvalid}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="send-text"
          disabled={isMessageUploading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
