import { UserIcon } from "@heroicons/react/outline";
import classes from "./AuthInput.module.css";
import { ErrorMessage, Field } from "formik";
export default function FirstNameInput () {
  return (
    <>
      <div className={classes.inputLabel}>
        <UserIcon className={classes.userIcon} />
        <label htmlFor="user_name">Name</label>
      </div>
      <ErrorMessage
        className={classes.error}
        name="user_name"
        component="div"
      />
      <Field
        type="text"
        name="user_name"
        id="user_name"
        placeholder="Enter first name"
        className={classes.input}
      />
    </>
  );
}
