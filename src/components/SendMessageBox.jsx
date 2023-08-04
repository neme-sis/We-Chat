import React from "react";

const invalid = (e) => {
  e.target.setCustomValidity("Please Enter a Message To Send");
};
const notInvalid = (e) => {
  e.target.setCustomValidity("");
};

const SendMessageBox = ({  }) => {
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

  return (
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
      <button type="submit" className="send-text" disabled={isMessageUploading}>
        Send
      </button>
    </form>
  );
};

export default SendMessageBox;
