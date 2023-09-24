import React from "react";
import "./styles/App.scss";
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import Layout from "./Layout";
import { Provider, useSelector } from "react-redux";
import { store } from "./reducer/reducer";

const MainApp = () => {
  const theme = useSelector((state) => state.globalNotifications.theme);
  return (
    <div className={`App App-${theme}`}>
      <Layout />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
