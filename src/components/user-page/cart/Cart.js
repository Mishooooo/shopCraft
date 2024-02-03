"use client";

import React, { useState } from "react";
import classes from "./Cart.module.css";
import CartPost from "@/components/post/cart-post/CartPost";
import Checkout from "./checkout/Checkout";
import CartHeader from "./CartHeader";
import { useSelector } from "react-redux";
import { selectFavoritesAndCart } from "@/store";

function groupAndSortSellers(products) {
  const groupedProducts = [];

  products.map((product) => {
    const sellerId = product?.userId?._id;

    if (!groupedProducts[sellerId]) {
      groupedProducts[sellerId] = {
        seller: product?.userId,
        products: [product],
      };
    } else {
      groupedProducts[sellerId].products.push(product);
    }
  });

  // Convert the grouped products object to an array and sort it by the number of products
  const sortedSellers = Object.values(groupedProducts).sort(
    (a, b) => b.products.length - a.products.length
  );

  return sortedSellers;
}

const Cart = () => {
  const { cart } = useSelector(selectFavoritesAndCart);
  const [selectedItems, setSelectedItems] = useState([]);
  const sellersProducts = groupAndSortSellers(cart);
  const productsId = cart.map((product) => product._id);
  const totalPrice = cart.reduce((acc, seller) => {
    return acc + seller.price;
  }, 0);

  const handleItemSelectChange = (item, isSelected, unSelectAll) => {
    if (isSelected) {
      setSelectedItems((prevSelected) => prevSelected.concat(item));
    } else {
      if (unSelectAll) setSelectedItems([]);
      else
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem !== item)
        );
    }
  };

  return (
    <>
      <h2>Cart</h2>
      <div className={classes.container}>
        <div className={classes.productsToBuyContainer}>
          <CartHeader
            productsId={productsId}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelectChange}
          />
          {sellersProducts && sellersProducts.length !== 0 ? (
            sellersProducts.map((seller, index2) => (
              <div className={classes.productList} key={index2}>
                <label>
                  {seller.seller?.userName} <span>{seller.seller?.phone}</span>
                </label>

                {seller.products.map((prod, index) => (
                  <CartPost
                    key={index}
                    product={prod}
                    selectedItems={selectedItems}
                    onItemSelect={handleItemSelectChange}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="warning">The cart is empty!</div>
          )}
        </div>
        <Checkout totalPrice={totalPrice} />
      </div>
    </>
  );
};

export default Cart;
