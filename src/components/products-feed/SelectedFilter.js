import React from "react";
import classes from "./SelectedFilter.module.css";
import { useSearchParams } from "next/navigation";
import { XIcon } from "@heroicons/react/outline";
import useCustumSearchParam from "@/lib/useCustumSearchParam";

export default function SelectedFilter() {
  const { setQueryParam, deleteParam } = useCustumSearchParam();

  const searchParams = useSearchParams();

  // Get the parameters from the URL
  const priceParam = searchParams.get("price");
  const conditionParam = searchParams.get("condition");
  const searchValue = searchParams.get("search-value");


  // Parse parameters into arrays
  const price = priceParam ? priceParam.split("-") : [];
  const condition = conditionParam ? conditionParam.split(".") : [];
  
  const removeSelectedFilter = (removeSelectedFilter, deleteSearchParam) => {
    const delSelectedFilter = (searchPar, searchParName) => {
      if (searchPar.includes(removeSelectedFilter)) {
        const filteredValue = searchPar
          .filter((value) => value !== removeSelectedFilter)
          .join(".")
          .replace(" ", "-");
        setQueryParam(searchParName, filteredValue);
      }
    };

    if (removeSelectedFilter) {
      return delSelectedFilter(condition, 'condition');
    }

   deleteParam(deleteSearchParam);
  };

  const selectedFilters = condition; 


  return (
    <ul className={classes.container}>
      {price.length > 0 && (
        <li className={classes.selected_filter}>
          <XIcon onClick={() => removeSelectedFilter(null, "price")} />
          <p>
            {price[0]}$ to {price[1]}$
          </p>
        </li>
      )}
      {searchValue && (
        <li className={classes.selected_filter}>
          <XIcon onClick={() => removeSelectedFilter(null, "search-value")} />
          <p>
           {searchValue}
          </p>
        </li>
      )}

      {selectedFilters.map((filterName, i) => {
        return (
          <li className={classes.selected_filter} key={i}>
            <XIcon onClick={() => removeSelectedFilter(filterName)} />
            <p>{filterName}</p>
          </li>
        );
      })}
    </ul>
  );
}
