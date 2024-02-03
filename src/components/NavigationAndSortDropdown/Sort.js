'use client'
import React, { useState } from "react";
import styles from "./Sort.module.css";
import { useSearchParams } from "next/navigation";
import useCustumSearchParam from "@/lib/useCustumSearchParam";

const Sort = () => {
    const { setQueryParam } = useCustumSearchParam();
    const searchParams = useSearchParams()
  const sortOption = searchParams.get("sortOption");
  const [selectedOption, setSelectedOption] = useState(sortOption || "1");


  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);

   setQueryParam("sortOption", newValue);
 
  };

  return (
    <select
      className={styles.container}
      value={selectedOption}
      onChange={handleDropdownChange}
    >
      <option value="" disabled hidden>
        Sort
      </option>
      <option value="1">Sort by Date</option>
      <option value="2">Price: Low to High</option>
      <option value="3">Price: High to Low</option>
    </select>
  );
};

export default Sort;
