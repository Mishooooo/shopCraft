"use client";
import { useRef } from "react";
import classes from "./SearchForm.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@heroicons/react/outline";
import useCustumSearchParam from "@/lib/useCustumSearchParam";

const SearchForm = () => {
  const searchValueRef = useRef();
  const router = useRouter();
  const pathname = usePathname();

  const authPage = pathname.includes('auth/sign')

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search-value')
  const { setQueryParam, deleteParam } = useCustumSearchParam();

  const handleSearch = (event) => {
    searchValueRef.current = event.target.value;

    const delaySearch = setTimeout(() => {
      if (!searchValueRef.current) {
        searchValueRef.current = "";
       return deleteParam("search-value");
      }
      if (searchValue || pathname.startsWith("/products-feed")){
        // this approach avoids reseting other searchParams 
        return setQueryParam("search-value", searchValueRef.current);
      } 

      router.push(`/products-feed?search-value=${searchValueRef.current}`);
    }, 1500);

    return () => clearTimeout(delaySearch); // Clear the timeout on component unmount or input change
  };

  return (
    <div className={`${classes.search} ${authPage ? classes.authPage : ""}`}>
      <SearchIcon />

      <input
        type="text"
        className={classes["search__field"]}
        placeholder="search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchForm;
