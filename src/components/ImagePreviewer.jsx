import React from "react";
import "../styles/ImagePreviewer.scss";
import { GrClose } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

const ImagePreviewer = ({
  senderMode,
  img,
  onClose,
  onSubmit,
  isUploading,
  inputValue,
  setInputValue,
  sendBox,
}) => {
  async function downloadFile() {
    try {
      const response = await fetch(img);
      const blob = await response.blob();
      const uuid = v4();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `we-chat-media-${uuid}.jpeg`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.log(err);
    }
  }

  const theme = useSelector((state) => state.globalNotifications.theme);

  if (!img) return null;
  return (
    <div className={`image-previewer-wrapper image-previewer-wrapper-${theme}`}>
      {!senderMode && (
        <div className="image-previewer-download" onClick={downloadFile}>
          <BsDownload size={30} />
        </div>
      )}
      <div className="image-previewer-close" onClick={onClose}>
        <GrClose size={30} />
      </div>
      <div className="image-previewer-container">
        <div className="image-previewer">
          <img
            src={typeof img === "string" ? img : URL.createObjectURL(img)}
            alt=""
          />
        </div>
      </div>
      {senderMode && (
        <form onSubmit={onSubmit} className={`send-image-wrapper send-image-wrapper-${theme}`}>
          <textarea
            type="text"
            placeholder="Write a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={sendBox}
            rows={1}
          />
          <button type="submit" className="send-image" disabled={isUploading}>
            <IoSend color="#4d38a2" size={25} />
          </button>
        </form>
      )}
    </div>
  );
};

export default ImagePreviewer;
