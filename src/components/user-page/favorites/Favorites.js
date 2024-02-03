'use client' 
import classes from "./Favorites.module.css";

import PostFeed from "@/components/post-feed/PostFeed";
import { selectFavoritesAndCart } from "@/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Favorites() {
  const { favorites } = useSelector(selectFavoritesAndCart);



if (!favorites || favorites.length === 0)
  return (
    <div className={classes.emptyFavorites}>
      <h2>You have no favorite products yet.</h2>
      <p>Find your favorite products and add them to your favorites list.</p>
      <Link href="/products-feed">Find your favorite product</Link>
    </div>
  );

  return (
    <>
      <h2>Favorites</h2>
      <PostFeed products={favorites} displayVertically={true} />
    </>
  );
}
