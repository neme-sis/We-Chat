import React from "react";
import "../styles/AlertComponent.scss";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillWarning } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { DANGER, SUCCESS } from "../Types/AlertTypes";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../reducer/globalNotificationsReducer";

const AlertComponent = () => {
  const { isShowing, type, title, description } = useSelector(
    (state) => state.globalNotifications.alertComponent
  );
  const dispatch = useDispatch();

  let alertClosingTimeout = null;

  React.useEffect(() => {
    if (isShowing) {
      alertClosingTimeout = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }

    return () => {
      clearTimeout(alertClosingTimeout);
    };
  }, [isShowing]);

  const closeAlert = () => {
    dispatch(hideAlert());
    clearTimeout(alertClosingTimeout);
  };

  return (
    <div
      className={`alert-component ${
        isShowing ? `alert-component-show` : `alert-component-close`
      } ${type ? `alert-component-${type}` : ""}`}
    >
      <div style={{ display: "flex" }}>
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
          {description && <p>{description}</p>}
        </div>
      </div>
      <div className="cross-icon" onClick={closeAlert}>
        <IoCloseOutline size={25} />
      </div>
    </div>
  );
};

export default AlertComponent;
