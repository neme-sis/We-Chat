import React from "react";
import "../styles/ImagePreviewer.scss";
import { GrClose } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";
import { v4 } from "uuid";

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
  function downloadUsingAnchorElement() {
    const anchor = document.createElement("a");
    anchor.href = img;
    anchor.download = "wechat_media" + v4() + ".jpg";
    anchor.target = "_blank";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  if (!img) return null;
  return (
    <div className="image-previewer-wrapper">
      {!senderMode && (
        <div
          className="image-previewer-download"
          onClick={downloadUsingAnchorElement}
        >
          <MdOpenInNew size={30} />
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
        <form onSubmit={onSubmit} className="send-image-wrapper">
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
