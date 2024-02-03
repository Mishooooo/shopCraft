import classes from './WindowContent.module.css'
import { closeOverlay } from "@/store/overlaySlice";
import { useDispatch } from "react-redux";

export default function WindowContent({ text, onConfirm }) {
  const dispatch = useDispatch();

  function handleCloseOverlay() {
    dispatch(closeOverlay());
  }
  function handleConfirm() {
    onConfirm();
    handleCloseOverlay();
  }
  return (
    <>
      <p className={classes.text}>{text}</p>
      {onConfirm && (
        <div className={classes.buttons}>
          <button onClick={handleCloseOverlay}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </>
  );
}
