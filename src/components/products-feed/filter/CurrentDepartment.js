import useCustumSearchParam from "@/lib/useCustumSearchParam";
import classes from "./CurrentDepartment.module.css";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/outline";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CurrentDepartment() {
  const { setQueryParam, deleteParam } = useCustumSearchParam();
  const searchParams = useSearchParams();
  const departmentsPath = searchParams.get("dep");
  const selectedDepartment = departmentsPath?.split(".");

  const handleGoBack = (e) => {
    const selectedReturnDep = e.target.value;
    const selectedDepIndex = selectedDepartment.findIndex(
      (dept) => dept === selectedReturnDep
    );

    const returnDepPath = selectedDepartment.slice(0, selectedDepIndex + 1);

    if (selectedReturnDep) {
      setQueryParam("dep", returnDepPath.join("."));
    } else {
      deleteParam("dep");
    }

  };

  return (
    <ul
      className={classes.department}  
    >

        <button onClick={handleGoBack} value={null}>
          <HomeIcon className={classes.HomeIcon} />
        </button>
     

      {selectedDepartment?.map((depName, i) => {
        return (
          <li key={i}>
            <ChevronRightIcon className={classes.rightIcon} />

            <button onClick={handleGoBack} value={depName}>
              {depName.replace("-", " ")}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
