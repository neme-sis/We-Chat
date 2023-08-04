import React, { Fragment } from "react";

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
import { AiOutlineArrowDown } from "react-icons/ai";

import "../styles/Chat.scss";
import TopBar from "../components/TopBar";

function isSameDate(date1, date2) {
  return (
    date1 &&
    date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const Chat = () => {
  /* The code is setting up a connection to the Firestore database and retrieving a collection of
  messages. */
  const messageCollection = firebase.firestore().collection("messages");
  const query = messageCollection.orderBy("createdAt");
  const end = useRef();
  const [messages] = useCollectionData(query, { idField: "id" });

  const goLast = () => end.current.scrollIntoView({ behaviour: "smooth" });
  const { setIsGloballyLoading } = React.useContext(GlobalContext);

  const dropArrow = React.useRef(null);
  const allMessageContainer = React.useRef(null);
  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is
  used to scroll to the last message in the chat whenever the `messages` array changes. */
  useEffect(() => {
    if (!messages) setIsGloballyLoading(true);
    else setIsGloballyLoading(false);
    goLast();
  }, [messages]);

  let prevUID = "",
    prevDate = "";

  return (
    <Fragment>
      <TopBar />
      <div className="chat-all" ref={allMessageContainer}>
        <div className="drop-arrow" ref={dropArrow} onClick={goLast}>
          <AiOutlineArrowDown className="drop-arrow-icon" size={25} />
        </div>
        <div className="disclaimer-text">
          Disclaimer: "Please note that all messages sent through this chat
          application are confidential and intended solely for the recipient. If
          you have received this message in error, kindly notify the sender and
          delete it immediately. Thank you."
        </div>
        {messages &&
          messages.map((message, i) => {
            const uuid = v4();
            const isSameUser = prevUID === message.uid;
            prevUID = message.uid;

            const timeStamp = new Date(message.createdAt.seconds * 1000);
            const isSameDay = isSameDate(prevDate, timeStamp);
            prevDate = timeStamp;

            return (
              <ChatMessage
                key={uuid}
                message={message}
                showDetail={!isSameUser}
                isLastMessage={i === messages.length - 1}
                dropArrow={dropArrow.current}
                isSameDay={isSameDay}
                allMessageContainer={allMessageContainer.current}
                lastMessageRef={end}
              />
            );
          })}
        <span ref={end}></span>
      </div>
      <SendMessageBox goLast={goLast} messageCollection={messageCollection} />
    </Fragment>
  );
};

export default Chat;
