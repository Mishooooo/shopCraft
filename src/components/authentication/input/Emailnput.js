import { MailIcon } from "@heroicons/react/outline";
import classes from "./AuthInput.module.css";
import { ErrorMessage, Field } from "formik";
export default function EmailInput({}) {
  return (
    <>
      <div className={classes.inputLabel}>
        <MailIcon className={classes.userIcon} />
        <label htmlFor="email">Email</label>
      </div>
      <ErrorMessage className={classes.error} name="email" component="div" />
      <Field
        type="email"
        name="email"
        id="email"
        placeholder={`Enter email`}
        className={classes.input}
      />
    </>
  );
}
