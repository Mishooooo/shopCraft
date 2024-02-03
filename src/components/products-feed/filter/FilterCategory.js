"use client";
import React, { useEffect, useReducer } from "react";
import classes from "./FilterCategory.module.css";
import { useSearchParams } from "next/navigation";
import useCustumSearchParam from "@/lib/useCustumSearchParam";

const categoryReducer = (state, action) => {
  const configedState = Array.from(new Set(state));


  if (action.payload === "all") {
    return ["all"];
  }

  if (configedState.includes(action.payload) && configedState.length > 1)
    return configedState.filter(
      (selectedCategory) => selectedCategory !== action.payload
    );
  if (configedState.includes(action.payload)) return configedState;
  if (state.includes("all")) return [action.payload];
  return [...configedState, action.payload];
};

export default function FilterCategory({ filterName, categoriesToSelect }) {
  const { setQueryParam, deleteParam } = useCustumSearchParam();

  const filterCategory = filterName.replace(" ", "-");

  const searchParams = useSearchParams();
  const selectedFilterCategory = searchParams.get(filterName);

  const [selectedCategory, dispatch] = useReducer(
    categoryReducer,
    selectedFilterCategory ? selectedFilterCategory.split(".") : ["all"]
  );

  useEffect(() => {
    if (selectedCategory.includes("all")) return deleteParam(filterName);

    const selectedFilter = selectedCategory.join(".").replace(" ", "-");
    setQueryParam(filterCategory, selectedFilter);
  }, [selectedCategory]);
  

  const handleCategoryChange = (category) => {
    dispatch({ type: "SELECT_CATEGORY", payload: category });
  };

  return (
    <div className={classes.container}>
      <h4>{filterName}</h4>
      <ul className={classes.costum_control}>
        <li>
          <input
            type="checkbox"
            checked={selectedCategory[0] === "all"}
            onChange={() =>
              dispatch({ type: "SELECT_CATEGORY", payload: "all" })
            }
          />
          <label>all</label>
        </li>
        {categoriesToSelect.map((categoryName, i) => {
          return (
            <li key={i}>
              <input
                type="checkbox"
                checked={selectedCategory.includes(categoryName)}
                id={`category-${i}`}
                onChange={() => handleCategoryChange(categoryName)}
              />
              <label htmlFor={`category-${i}`}>{categoryName}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
