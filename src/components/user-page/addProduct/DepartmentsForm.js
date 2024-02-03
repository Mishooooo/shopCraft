import React, {  useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import CompContainer from "@/components/UI/addProduct/CompContainer";
import classes from "./DepartmentsForm.module.css";
import { departments } from "@/lib/config";
import { Field, useFormikContext } from "formik";

const DepartmentsForm = () => {
  const { setFieldValue } = useFormikContext();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(departments);

 const handleDepartmentChange = (e) => {
   const selectedDep = e.target.value;
   const selectedDept = currentDepartment.find(
     (dept) => dept.name === selectedDep
   );

   const alreadySelected = selectedDepartments.find(
     (dep) => dep.name === selectedDep
   );

   if (alreadySelected) return;

   setSelectedDepartments((prevSelected) => {
     const updatedSelection = !prevSelected[prevSelected.length - 1]
       ?.subDepartments
       ? [...prevSelected.slice(0, prevSelected.length - 1), selectedDept]
       : [...prevSelected, selectedDept];

     if (selectedDept && selectedDept.subDepartments) {
       setCurrentDepartment(selectedDept.subDepartments || selectedDept);
     }

     const departmentArray = updatedSelection.map(
       (department) => department.name
     );

     return updatedSelection;
   });
 };

 useEffect(() => {
   // Perform Formik state update here
   const departmentArray = selectedDepartments.map(
     (department) => department.name
   );
   setFieldValue("departments", departmentArray);
 }, [selectedDepartments]);

  const handleNavigateToDepartment = (deptIndex) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.slice(0, deptIndex + 1)
    );
    setCurrentDepartment((prevDepartment) => {
      if (deptIndex === -1) {
        return departments; // Reset to the root departments
      }

      const selectedDept = selectedDepartments[deptIndex];
      if (selectedDept && selectedDept.subDepartments) {
        return selectedDept.subDepartments;
      }
      return prevDepartment;
    });
  };

  const handleGoBack = () => {
       setFieldValue("departments", []);
    setSelectedDepartments([]);
    setCurrentDepartment(departments);
  };

  return (
    <CompContainer>
      <div className={classes.container}>
        <h2>Department</h2>

        {selectedDepartments && selectedDepartments.length > 0 && (
          <div className={classes.selectedDepartments}>
            <button onClick={handleGoBack} className={classes.goBackButton}>
              &times;
            </button>
            {selectedDepartments.map((dept, index) => {
              return (
                <div
                  className={classes.departments}
                  onClick={() => handleNavigateToDepartment(index)}
                  key={index}
                >
                  <p> {dept?.name} </p>
                  <button className={classes.arrowButton}>
                    <ChevronRightIcon
                      alt={"icon"}
                      className={classes.arrowIcon}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Field
          as="select"
          className={classes.departmentSelect}
          name="selectedDepartments"
          onChange={handleDepartmentChange}
          value=""
        >
          <option value="" disabled hidden>
            Select Department
          </option>
          {currentDepartment.map((department, i) => (
            <option key={i} value={department.name}>
              {department.name}
            </option>
          ))}
        </Field>
      </div>
    </CompContainer>
  );
};

export default DepartmentsForm;
