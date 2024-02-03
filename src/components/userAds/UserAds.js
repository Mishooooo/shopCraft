"use client";
import classes from './UserAds.module.css';
import { useState } from "react";
import PostFeed from "../post-feed/PostFeed";
import { useParams, useSearchParams } from "next/navigation";
import Container from "../UI/Container";
import Link from "next/link";
import NavigationAndSortDropdown from "../NavigationAndSortDropdown/NavigationAndSortDropdown";
import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";

export default function UserAds() {
  const searchParams = useSearchParams();
  const params = useParams();

  const sortOption = searchParams.get("sortOption");

  const userId = params.userId;

  const [displayVertically, setDisplayVertically] = useState(true);

  const apiUrl = `/api/user-ads?userId=${userId}&sortOption=${sortOption || 1}`;
  const { data: userProducts, error } = useSWR(apiUrl, fetchFunction);

if (error) throw error;

  const handleDisplayChange = () => {
    setDisplayVertically(!displayVertically);
  };
  
  return (
    <main className={classes.main}>
      <Container >
        <NavigationAndSortDropdown
          onDisplayChange={handleDisplayChange}
          displayVertically={displayVertically}
        >
          <li>
            <Link href="./user-ads">user advertisment</Link>
          </li>
        </NavigationAndSortDropdown>

        <div className={displayVertically ? classes.feedContainer : ""}>
          <PostFeed
            products={userProducts}
            displayVertically={displayVertically}
          />
        </div>
      </Container>
    </main>
  );
}
