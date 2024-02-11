"use client";
import classes from "./Department.module.css";
import { useSearchParams } from "next/navigation";
import { departments } from "@/lib/config";
import { useState, useEffect } from "react";
import useCustumSearchParam from "@/lib/useCustumSearchParam";
import CurrentDepartment from "./CurrentDepartment";

const Department = () => {
  const { setQueryParam } = useCustumSearchParam();
  const searchParams = useSearchParams();
  const departmentsPath = searchParams.get("dep");
  const department = departmentsPath?.split(".");

  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState([]);

  const depToSelect = () => {
    if (!departmentsPath) return departments; // If there is no selected department, return default departments to select

    return department.reduce((acc, depName) => {
      const dep = acc.find((dep) => dep.name === depName);
      if (dep) {
        return dep.subDepartments || [];
      }

      return acc;
    }, departments);
  };

  useEffect(() => {
    setSelectedDepartment(department || []);
    const selectDep = depToSelect();
    setCurrentDepartment(selectDep);
  }, [departmentsPath]);

  const handleDepartmentChange = (e) => {
    const selectedDepName = e.target.value;
    const selectedDep = currentDepartment.find(
      (dept) => dept.name === selectedDepName
    );

    if (!selectedDep) return;

    setQueryParam(
      "dep",
      `${department ? department.join(".") + "." : ""}${selectedDepName}`
    );

    setSelectedDepartment((prevSelected) =>
      prevSelected.concat(selectedDep.name)
    );

    setCurrentDepartment(selectedDep.subDepartments || []);
  };

  return (
    <div className={classes.container}>
      <hr />
      {selectedDepartment.length !== 0 && <CurrentDepartment />}

      <ul className={classes.costum_control}>
        {currentDepartment
          ? currentDepartment.map((dep, i) => (
              <li key={i} className={classes.selectDepsList}>
                <button onClick={handleDepartmentChange} value={dep.name}>
                  {dep.name.replace("-", " ")}
                </button>
              </li>
            ))
          : null}
      </ul>
      <hr />
    </div>
  );
};

export default Department;