"use client";
import PostFeed from "@/components/post-feed/PostFeed";
import fetchFunction from "@/lib/fetch/fetchFunction";
import useSWR, { mutate } from "swr";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/store/overlaySlice";
import classes from "./MyAds.module.css";
import Link from "next/link";
export default function MyyAds() {
  const dispatch = useDispatch();

  const apiUrl = "/api/user-page/my-ads";

  mutate(apiUrl); // Make sure to fetch updated 'data

  const { data, error } = useSWR(
   apiUrl,
    fetchFunction
  );
  
if (error) throw error;



  if (data?.length === 0) {
    return (
      <div className={classes.noProduct}>
        <h2>You have no ads yet.</h2>
        <p>Add your first product to start selling.</p>
        <Link href="/user-page/add-product">
          Add your first product for free!
        </Link>
      </div>
    );
  }

  const handleDeleteProduct = async (productId) => {
    try {
      dispatch(setOverlay({ text: "Deleting product" }));
      const response = await fetch(
        `/api/user-page/my-ads?productId=${productId}`,
        {
          method: "DELETE",
        }
      );

       if (!response.ok || !(response.status >= 200 && response.status < 300)) {
         throw new Error(response.status);
       }
      mutate(apiUrl);
      dispatch(setOverlay({ text: "Product was succesfully deleted!" }));
    } catch (error) {
      const errorText = `Sorry, there was a problem uploading your product. Please try again later." HTTP error! Status: ${error.message}`;
      dispatch(setOverlay({ text: errorText }));
    }
  };

  return (
    <>
      <h2>Your advertismnets</h2>
      <PostFeed
        displayVertically={true}
        products={data}
        myAds={true}
        onProductDelete={handleDeleteProduct}
      />
    </>
  );
}
