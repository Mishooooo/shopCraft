import React from 'react'
import classes from './Container.module.css'
export default function Container({children, width}) {
  return (
    <div className={classes.container} style={{width: `${width}`}}>{children}</div>
  )
}
