"use client";
import { useDispatch, useSelector } from "react-redux";
import classes from "./WindowOverlay.module.css";
import { closeOverlay, setOverlayContent } from "@/store/overlaySlice";
import WindowOverlay from "../UI/Overlay/WindowOverlay";

const Window = function () {
  const { showOverlay, overlayText, onConfirm } = useSelector(
    (state) => state.overlay
  );

  const dispatch = useDispatch();

  function handleCloseOverlay() {
    dispatch(closeOverlay());
  }

  function handleConfirm() {
    onConfirm();
    handleCloseOverlay();
  }

  if (!showOverlay) return null;

  return (
    <WindowOverlay>
      <div className={classes["btn--close-modal"]} onClick={handleCloseOverlay}>
        &times;
      </div>
      <p className={classes.text}>{overlayText}</p>
      {onConfirm ? (
        <div className={classes.buttons}>
          <button onClick={handleCloseOverlay}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : null}
    </WindowOverlay>
  );
};

export default Window;
