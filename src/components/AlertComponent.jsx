import React from "react";
import "../styles/AlertComponent.scss";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillWarning } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { DANGER, SUCCESS } from "../Types/AlertTypes";

const AlertComponent = ({
  isShowing,
  title = "This is not allowed",
  description = "This is not allowed because Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  type = "",
  onClose = () => {},
}) => {
  return (
    <div
      className={`alert-component ${
        isShowing ? `alert-component-show` : `alert-component-close`
      } ${type ? `alert-component-${type}` : ""}`}
    >
      <div style={{ display: "flex"}}>
        <div
          style={{
            display: "flex",
            marginRight: "0.5rem",
            marginTop: "0.2rem",
          }}
        >
          {type === DANGER ? (
            <MdDangerous size={20} color={"#9d2935"} />
          ) : type === SUCCESS ? (
            <FaCheckCircle size={20} color="#155724" />
          ) : (
            <AiFillWarning size={20} color="#856404" />
          )}
        </div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="cross-icon" onClick={onClose}>
        <IoCloseOutline size={25} />
      </div>
    </div>
  );
};

export default AlertComponent;
