import { LockClosedIcon } from "@heroicons/react/outline";
import classes from "./AuthInput.module.css";
import { ErrorMessage, Field } from "formik";
export default function PasswordInput() {
  return (
    <>
      <div className={classes.inputLabel}>
        <LockClosedIcon className={classes.userIcon} />
        <label htmlFor="password">Password</label>
      </div>
      <ErrorMessage className={classes.error} name="password" component="div" />

      <Field
        type="password"
        name="password"
        id="password"
        placeholder={`Enter password`}
        className={classes.input}
      />
    </>
  );
}
