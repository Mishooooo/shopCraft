'use client'

import ErrorPage from "@/components/error/ErrorPage";
import Link from "next/link";
import classes from './error.module.css';
import Navigation from "@/components/Navigation/Navigation";

export default function Error({ error, reset }) {
  return (
    <main className={classes.mainContainer}>
      <Navigation>
        <li>
          <Link href="./products-feed">products feed</Link>
        </li>
      </Navigation>

   
    
          <ErrorPage error={error} reset={reset} />
    </main>
  );
}
