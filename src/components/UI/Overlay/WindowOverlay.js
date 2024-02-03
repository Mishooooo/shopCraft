import classes from "./WindowOverlay.module.css";

const WindowOverlay = function ({children}) {


  return (
    <div className={classes.backdrop} >
    <div className={classes["add-recipe-window"]}>
{children}
    </div>
    </div>
  );
};

export default WindowOverlay;
