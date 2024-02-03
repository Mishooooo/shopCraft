import React from "react";
import classes from "./NavigationAndSortDropdown.module.css";
import Sort from "./Sort";
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline";
import Navigation from "../Navigation/Navigation";

export default function NavigationAndSortDropdown({
  children,
  onDisplayChange,
  displayVertically,

}) {
  
  return (
    <div className={classes.container}>
      <Navigation >  
        {children}
          </Navigation >
      <div >
        {displayVertically ? (
          <ViewGridIcon
            className={classes.displayIcon}
            onClick={onDisplayChange}
          />
        ) : (
          <ViewListIcon
            className={classes.displayIcon}
            onClick={onDisplayChange}
          />
        )}
        <Sort />
      </div>
    </div>
  );
}
