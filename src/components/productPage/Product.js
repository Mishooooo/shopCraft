"use client";
import ProductImages from "./ProductImages.js";
import styles from "./Product.module.css";

import AboutProduct from "./AboutProduct.js";
import Review from "./reviews/Review.js";
import { useParams } from "next/navigation";
import Recomendations from "../Recommendations.js";
import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction.js";
import { useSearchParams } from "next/navigation";

export default function Product() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = params.productId;

  const apiUrl = `/api/product?productId=${productId}`;

  const { data, error } = useSWR(apiUrl, fetchFunction);

  if (error) throw error;

  const marginStyle = {
    margin: "8rem 0 6rem 0",
  };

  return (
    <div className={styles.container}>
      <div className={styles["product-container"]}>
        <ProductImages images={data?.images} />
        <AboutProduct data={data} productId={productId} />
      </div>
      <Review review={data?.review || []} />
      <Recomendations
        header={"Simmilar products"}
        marginStyle={marginStyle}
        productId={productId}
        searchParams={searchParams}
      />
    </div>
  );
}
