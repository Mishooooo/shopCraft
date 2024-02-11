"use client";
import classes from "./SearchForm.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@heroicons/react/outline";
import useCustumSearchParam from "@/lib/useCustumSearchParam";

const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const authPage = pathname.includes("auth/sign");

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search-value");
  const { setQueryParam, deleteParam } = useCustumSearchParam();

  const handleSearch = (event) => {
    const searchValue = event.target?.value;
    console.log("thesearch", searchValue);

    const delaySearch = setTimeout(() => {
      if (pathname.startsWith("/products-feed")) {
        // this approach avoids reseting other searchParams
        setQueryParam("search-value", searchValue);
        if (searchValue === "") deleteParam("search-value");

        return;                         
      }

      router.push(`/products-feed?search-value=${searchValue}`);
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
