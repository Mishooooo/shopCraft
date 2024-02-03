import classes from "./AttributesForm.module.css";
import CompContainer from "@/components/UI/addProduct/CompContainer";
import ConditionSelector from "../../selector/optionsSelector";
import { Field, useFormikContext } from "formik";

const AttributesForm = () => {
  const {  setFieldValue } = useFormikContext();


  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.textContent;
    setFieldValue('description', descriptionValue);
  };

  return (
    <CompContainer>
      <h2 className={classes.formName}>Attributes</h2>

      <div className={classes.formGroup}>
        <div className={classes.formField}>
          <label htmlFor="title" className={classes.formLabel}>
            Title
          </label>
          <Field
            maxLength={60}
            name="title"
            type="text"
            className={`${classes.titleInput} ${classes.formInput}`}
          />
        </div>
        <div className={classes.formField}>
          <label htmlFor="description" className={classes.formLabel}>
            Description
          </label>
       
          <Field
            as="div"
            type="text"
            className={`${classes.descriptionInput} ${classes.formInput}`}
            contentEditable
            name="description"
            value={'values.description'}
            placeholder="Add a description for the item hsere..."
            onInput={handleDescriptionChange}
          />
        </div>
      </div>
      <ConditionSelector
        selectorName={"Condition"}
        labelsName={["new", "used"]}
      />
    </CompContainer>
  );
};

export default AttributesForm;
