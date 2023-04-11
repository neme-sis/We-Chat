import React from "react";

import { v4 } from "uuid";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import { useEffect } from "react";

const Chat = () => {
  const messageCollection = firebase.firestore().collection("messages");
  const query = messageCollection.orderBy("createdAt");
  const end = useRef();

  const goLast = () => end.current.scrollIntoView({ behaviour: "smooth" });
  const [messages] = useCollectionData(query, { idField: "id" });
  const sendText = useRef(null);
  const send = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = firebase.auth().currentUser;

    const msg = sendText.current.value;
    sendText.current.value = "";

    const msgArray = msg.split("");
    const allSpace = msgArray.every((e) => e === " ");

    if (!msg || allSpace) return;
    await messageCollection.add({
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
    end.current.scrollIntoView({ behaviour: "smooth" });
  };
  useEffect(() => {
    goLast();
  });

  const invalid = (e) => {
    e.target.setCustomValidity("Please Enter a Message To Send");
  };
  const notInvalid = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <div>
      <div className="chat-all">
        {messages &&
          messages.map((text) => {
            // console.log(text.idField);
            const uuid = v4();
            return <ChatMessage key={uuid} message={text} />;
          })}
      </div>
      <span ref={end}></span>
      <form onSubmit={send} className="form">
        <input
          type="text"
          name=""
          id=""
          ref={sendText}
          placeholder="Send Text..."
          required
          onInvalid={invalid}
          onInput={notInvalid}
        />
        <button type="submit" className="send-text">
          Send
        </button>
      </form>
    </div>
  );
};

const ChatMessage = ({ message }) => {
  // console.log(message);
  const { text, uid, photoURL, displayName } = message;
  const textClass =
    firebase.auth().currentUser.uid === uid ? "sent" : "recieved";
  return (
    <div className={`chat ${textClass}`}>
      <section className="user-details">
        <img src={photoURL} alt="" />
        {textClass === "recieved" ? (
          <p className="recieve-name">{displayName}</p>
        ) : (
          <p className="recieve-name">You</p>
        )}
      </section>
      <p className="text">{text}</p>
    </div>
  );
};

export default Chat;
