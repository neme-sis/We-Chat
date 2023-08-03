import firebase from "firebase/compat/app"; //sdk import
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import { useAuthState } from "react-firebase-hooks/auth"; //auth hook
import { getAuth } from "firebase/auth";

const firebaseConfigOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "671810641127",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-956ZM5MKF3",
};

firebase.initializeApp(firebaseConfigOptions);

export const auth = getAuth();

export const useFirebaseSignUp = () => {
  const [user] = useAuthState(auth);

  return user;
};
