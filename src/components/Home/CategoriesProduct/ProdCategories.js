import React from "react";
import classes from "./ProdCategories.module.css";
import Image from "next/image";
import watchIcon from "@/../public/images/watch.jpg";
import fridgeIcon from "@/../public/images/fridge.jpg";
import computerIcon from "@/../public/images/computer.jpg";
import bookIcon from "@/../public/images/book.jpg";
import shirtIcon from "@/../public/images/shirt.jpg";
import Link from "next/link";

export default function ProdCategories() {
  return (
    <ul className={classes.container}>
      <li>
        <Link href="products-feed?dep=electronics">
          <div className={classes.imageContainer}>
            <Image
              src={computerIcon}
              alt="some product"
              width={100}
              height={100}
            />
          </div>

          <h6>Electronics</h6>
        </Link>
      </li>
      <li>
        <Link href="products-feed?dep=clothing">
          <div className={classes.imageContainer}>
            <Image
              src={shirtIcon}
              alt="some product"
              width={100}
              height={100}
            />
          </div>
          <h6>Clothing</h6>
        </Link>
      </li>

      <li>
        <Link href="products-feed?dep=home+and+kitchen">
          <div className={classes.imageContainer}>
            <Image
              src={fridgeIcon}
              alt="some product"
              width={100}
              height={100}
            />
          </div>
          <h6>Home And Kitchen</h6>
        </Link>
      </li>

      <li>
        <Link href="products-feed?dep=watches+and+jewelry">
          <div className={classes.imageContainer}>
            <Image
              src={watchIcon}
              alt="some product"
              width={100}
              height={100}
            />{" "}
          </div>
          <h6>Watches And Jewelry</h6>
        </Link>
      </li>

      <li>
        <Link href="products-feed?dep=books+and+stationery">
          <div className={classes.imageContainer}>
            <Image src={bookIcon} alt="some product" width={100} height={100} />
          </div>
          <h6>Books And Stationery</h6>
        </Link>
      </li>
    </ul>
  );
}
