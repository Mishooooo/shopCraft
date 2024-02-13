"use client";
import classes from "./SearchForm.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@heroicons/react/outline";
import useCustumSearchParam from "@/lib/useCustumSearchParam";
import { useState, useEffect } from "react";


const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams("search-value");
  const searchValueParams = searchParams.get("search-value");

  const authPage = pathname.includes("auth/sign");

  const { setQueryParam, deleteParam } = useCustumSearchParam();

  const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     // if (!searchValueParams) {
//     //   setSearchValue("");
//     // }
//         const delaySearch = setTimeout(() => {
          
//           setQueryParam("search-value", searchValue);
//           if (searchValue === "") {
//             deleteParam("search-value");
//           setSearchValue("");
//           }
//         }, 1500);
//  setTimeout(() => {
 
//    setSearchValue("");
//  }, 1000);
//     return  clearTimeout(delaySearch);
//      // Clear the timeout on component unmount or input change
//   }, [searchValueParams, setQueryParam, deleteParam]);

  const handleSearch =  (event) => {
        setSearchValue(event.target.value);

    if (!pathname.startsWith("/products-feed")) return router.push(`/products-feed?search-value=${event.target.value}`);

     const delaySearch = setTimeout(() => {
       setQueryParam("search-value", event.target.value);
      //  if (searchValue === "") {
      //    deleteParam("search-value");
      //    setSearchValue("");
      //  }
     }, 1500);

       const clearSearchValue = setTimeout(() => {
        
            setSearchValue("");
          }, 3000);

     return () => {
        clearTimeout(delaySearch);
        clearTimeout(clearSearchValue);
       };
  };

  return (
    <div className={`${classes.search} ${authPage ? classes.authPage : ""}`}>
      <SearchIcon />

      <input
        value={searchValue}
        type="text"
        className={classes["search__field"]}
        placeholder="search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchForm;
