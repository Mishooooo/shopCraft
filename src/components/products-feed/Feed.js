"use client";

import { useState } from "react";
import classes from "./Feed.module.css";
import Filter from "./filter/Filter";
import NavigationAndSortDropdown from "../NavigationAndSortDropdown/NavigationAndSortDropdown";
import SelectedFilter from "./SelectedFilter";
import PostFeed from "../post-feed/PostFeed";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";

const Feed = () => {
  const [displayVertically, setDisplayVertically] = useState(false);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const searchParams = useSearchParams();
  const dep = searchParams.get("dep");
  const price = searchParams.get("price");
  const condition = searchParams.get("condition");
  const sortOption = searchParams.get("sortOption");
  const searchValue = searchParams.get("search-value");

  let apiUrl = "/api/products-feed?";

  if (dep) apiUrl += `dep=${dep}&`;
  if (price) apiUrl += `price=${price}&`;
  if (condition) apiUrl += `condition=${condition}&`;
  if (sortOption) apiUrl += `sortOption=${sortOption}&`;
  if (searchValue) apiUrl += `searchValue=${searchValue}&`;

  const { data, error } = useSWR(apiUrl, fetchFunction);

  if (error) throw error;

  const products = data?.products;

  if (data && data.maxPrice !== maxPrice) setMaxPrice(data.maxPrice);

  const onDisplayChange = () => {
    setDisplayVertically(!displayVertically);
  };

  return (
    <div className={classes.container}>
      <NavigationAndSortDropdown
        onDisplayChange={onDisplayChange}
        displayVertically={displayVertically}
      >
        <li>
          <Link href="./products-feed">products feed</Link>
        </li>
      </NavigationAndSortDropdown>

      <div className={classes.feed_container}>
        <Filter maxPrice={maxPrice} />
        <div className={classes.post_container}>
          <SelectedFilter />
          <PostFeed products={products} displayVertically={displayVertically} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
