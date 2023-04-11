import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import { useAuthState } from "react-firebase-hooks/auth"; //auth hook

const firebaseConfigOptions = {
  apiKey: "AIzaSyDDp_Kf6fcm5uPYWtET9C98ZRuGpcLnXfo",
  authDomain: "worldchat-demo.firebaseapp.com",
  projectId: "worldchat-demo",
  storageBucket: "worldchat-demo.appspot.com",
  messagingSenderId: "671810641127",
  appId: "1:671810641127:web:64f8665408fa7085b15642",
  measurementId: "G-956ZM5MKF3",
};

firebase.initializeApp(firebaseConfigOptions);

export const useFirebaseSignUp = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return user;
};
