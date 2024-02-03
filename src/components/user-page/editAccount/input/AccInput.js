import { PencilIcon } from "@heroicons/react/outline";
import classes from "./AccInput.module.css";
import { useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
export default function AccInput({ inputName, type}) {
  const { setFieldValue } = useFormikContext();


  const [readOnlyMode, setReadOnlyMode] = useState(true);

  const handleChange = (e) => {
    setFieldValue(inputName, e.target.textContent);
  };


  return (
    <div className={classes.container}>
      <ErrorMessage
        name={inputName}
        component="p"
        className={classes.error}
      />
      <label
        className={classes.inputLabel}
      >
        {inputName.split("_").join(" ")}
      </label>
      <div>
        <Field
          type={type || "text"}
          name={inputName}
          readOnly={readOnlyMode}
          onInput={handleChange}
          placeholder={`Enter ${inputName.split("_").join(" ")}`}
          className={`${classes.input} ${
            !readOnlyMode ? classes.activeInput : ""
          }`}
        />
        <PencilIcon onClick={() => setReadOnlyMode(!readOnlyMode)} />
      </div>
    </div>
  );
}


