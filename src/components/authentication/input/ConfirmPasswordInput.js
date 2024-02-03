import { LockClosedIcon } from "@heroicons/react/outline";
import classes from "./AuthInput.module.css";
import { ErrorMessage, Field } from "formik";
export default function ConfirmPasswordInput() {
  return (
    <>
      <div className={classes.inputLabel}>
        <LockClosedIcon className={classes.userIcon} />
        <label htmlFor="confirm_password">Confirm password</label>
      </div>
      <ErrorMessage className={classes.error} name="confirm_password" component="div" />

      <Field
        type="password"
        name="confirm_password"
        id="confirm_password"
        placeholder={`Enter confirm password`}
        className={classes.input}
      />
    </>
  );
}
