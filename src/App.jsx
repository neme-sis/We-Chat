import React from "react";
import "./styles/App.scss";
import "firebase/compat/firestore"; //for the database
import "firebase/compat/auth"; //for user authentication
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store } from "./reducer/reducer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout />
      </div>
    </Provider>
  );
}

export default App;
