import React from "react";
import "./styles/App.css";
import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import SignOut from "./components/SignOut";
import { useFirebaseSignUp } from "./config/firebaseConfig";

function App() {
  const user = useFirebaseSignUp()
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
