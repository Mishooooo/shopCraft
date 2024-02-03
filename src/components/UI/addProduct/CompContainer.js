import React from "react";
import classes from "./CompContainer.module.css";
export default function compContainer({ children }) {
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
}
