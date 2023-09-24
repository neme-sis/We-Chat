import React from "react";
import "../styles/ThemeTogglerButton.scss";
import { LIGHT, DARK } from "../Types/AlertTypes";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reducer/globalNotificationsReducer";

const ThemeTogglerButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.globalNotifications.theme);
  return (
    <div
      className={`toggle toggle-${theme.toLowerCase()}`}
      onClick={() => {
        localStorage.setItem("theme", theme === LIGHT ? DARK : LIGHT);
        dispatch(toggleTheme());
      }}
    >
      <span className="toggle-button">
        <span className="crater crater-1"></span>
        <span className="crater crater-2"></span>
        <span className="crater crater-3"></span>
        <span className="crater crater-4"></span>
        <span className="crater crater-5"></span>
        <span className="crater crater-6"></span>
        <span className="crater crater-7"></span>
      </span>
      <span className="star star-1"></span>
      <span className="star star-2"></span>
      <span className="star star-3"></span>
      <span className="star star-4"></span>
      <span className="star star-5"></span>
      <span className="star star-6"></span>
      <span className="star star-7"></span>
      <span className="star star-8"></span>
    </div>
  );
};

export default ThemeTogglerButton;
