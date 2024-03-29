import React from "react";
import { GrAttachment } from "react-icons/gr";
import { BsImageFill } from "react-icons/bs";
import useToggle from "../hooks/useToggle";
import "../styles/ImageUploader.scss";
import { useSelector } from "react-redux";
import { LIGHT } from "../Types/AlertTypes";

const ImageUploader = ({ uploadedImage, setUploadedImage }) => {
  const imageInput = React.useRef();
  const attachmentRef = React.useRef();
  const [isShowingOptions, toggleShowingOptions] = useToggle(attachmentRef);
  const theme = useSelector((state) => state.globalNotifications.theme);

  const options = [
    {
      name: "Upload Image",
      icon: <BsImageFill size={20} color={theme === LIGHT ? "#211f3b" : "#ffffff"} />,
      onClick: () => imageInput.current.click(),
    },
  ];

  React.useEffect(() => {
    if (!uploadedImage) imageInput.current.value = "";
  }, [uploadedImage]);

  return (
    <div className="attachment-uploader-handlers-wrapper">
      <input
        type="file"
        onChange={(e) => setUploadedImage(e.target.files[0])}
        accept="image/*"
        hidden
        ref={imageInput}
      />
      <div
        className={`attachment-options attachment-options-${theme}`}
        style={{ display: isShowingOptions ? "block" : "none" }}
      >
        {options.map((option, i) => (
          <div className="attachment-option" key={i} onClick={option.onClick}>
            {option.icon}
            <div>{option.name}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => toggleShowingOptions()}
        className={`attachment-uploader-button attachment-uploader-button-${theme}`}
        ref={attachmentRef}
      >
        <GrAttachment size={25} />
      </button>
    </div>
  );
};

export default ImageUploader;
