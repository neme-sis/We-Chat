import { useEffect, useState } from "react";

/**
 * @description Hook to toggle the component, specially if outside click
 * @param {Ref} ref
 * @returns [visible, toggle]
 */
const useToggle = (ref) => {
  const [visible, toggle] = useState(false);
  function handleClick(e) {
    if (!visible) return;
    if (
      !(ref && ref.current && ref.current.contains(e.target))
    ) {
      toggle(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  function togglable() {
    if (visible) toggle(false);
    else toggle(true);
  }

  return [visible, togglable];
};

export default useToggle;
