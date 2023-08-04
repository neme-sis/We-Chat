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
import SendMessageBox from "../components/SendMessageBox";
import { GlobalContext } from "../App";

const Chat = () => {
  /* The code is setting up a connection to the Firestore database and retrieving a collection of
  messages. */
  const messageCollection = firebase.firestore().collection("messages");
  const query = messageCollection.orderBy("createdAt");
  const end = useRef();
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  const goLast = () => end.current.scrollIntoView({ behaviour: "smooth" });
  const { setIsGloballyLoading } = React.useContext(GlobalContext);

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is
  used to scroll to the last message in the chat whenever the `messages` array changes. */
  useEffect(() => {
    if (!messages) setIsGloballyLoading(true);
    else setIsGloballyLoading(false);
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
      <SendMessageBox />
    </div>
  );
};

export default Chat;
