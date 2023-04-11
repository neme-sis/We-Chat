import React from "react";
import "./styles/App.css";

import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import { useAuthState } from "react-firebase-hooks/auth"; //auth hook
import SignOut from "./components/SignOut";

firebase.initializeApp({
  apiKey: "AIzaSyDDp_Kf6fcm5uPYWtET9C98ZRuGpcLnXfo",
  authDomain: "worldchat-demo.firebaseapp.com",
  projectId: "worldchat-demo",
  storageBucket: "worldchat-demo.appspot.com",
  messagingSenderId: "671810641127",
  appId: "1:671810641127:web:64f8665408fa7085b15642",
  measurementId: "G-956ZM5MKF3",
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user && (
        <header className="App-header">
          <h2>
            We Chat
            <img src={firebase.auth().currentUser.photoURL} alt="" />
            <span>
              <SignOut />
            </span>
          </h2>
        </header>
      )}

      {user ? <Chat /> : <SignIn />}
    </div>
  );
}

export default App;
