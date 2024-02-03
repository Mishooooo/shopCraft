"use client";
import { useRef } from "react";
import classes from "./Search.module.css";

import { SearchIcon } from "@heroicons/react/outline";

export default function Search({ onSearch }) {
  const searchValueRef = useRef("");

  const handleSearch = async (event) => {
    searchValueRef.current = event.target.value;
      const response = await fetch(
        `/api/user-page/messages/search?searchValue=${searchValueRef.current}`
      );

 if (!response.ok || !(response.status >= 200 && response.status < 300)) {
   const errorText = `Sorry, error occured while searching users! Status: ${response.status}`;
   return dispatch(setOverlay({ text: errorText }));
 }

      const data = await response.json();
      if (data.error) return onSearch([]);

      onSearch(data);
   
  };

  return (
    <form className={classes["search"]}>
      <SearchIcon />

      <input
        type="text"
        className={classes["search__field"]}
        placeholder="Search user"
        // value={searchValueRef.current.va}
        onChange={handleSearch}
      />
    </form>
  );
}
