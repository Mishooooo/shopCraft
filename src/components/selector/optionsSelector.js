import React from "react";
import { Field, useFormikContext } from "formik";
import classes from "./optionsSelector.module.css";

export default function ConditionSelector({ selectorName, labelsName }) {
  const { values, setFieldValue } = useFormikContext(); 

const firstOption = labelsName[0];
const secondOption = labelsName[1];
  const handleCheckboxChange = (labelName) => {
    setFieldValue("condition", labelName);
  };

  return (
    <div className={classes.container}>
      <h2>{selectorName}</h2>
      <ul className={classes.custom_control}>
        <li onClick={() => handleCheckboxChange(firstOption)}>
          <Field
            id="checkbox1"
            type="checkbox"
            name="condition" // Add a name attribute
            value={firstOption} // Specify the value
            checked={values.condition === firstOption}
            onChange={()=>{}}
          />
          <label htmlFor="checkbox1">{firstOption}</label>
        </li>
        <li onClick={() => handleCheckboxChange(secondOption)}>
          <Field
            id="checkbox2"
            type="checkbox"
            name="condition" // Add a name attribute
            value={secondOption} // Specify the value
            checked={values.condition === secondOption}
            onChange={()=>{}}
          />
          <label htmlFor="checkbox2">{secondOption}</label>
        </li>
      </ul>
    </div>
  );
} 
