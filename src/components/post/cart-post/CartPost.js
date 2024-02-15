"use client";
import React, { useState } from "react";
import classes from "./CartPost.module.css";
import QuantitySelector from "./quantitySelector/QuantitySelector";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

const CartPost = ({
  product,
  selectedItems,
  onItemSelect
}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleRemoveProduct = () => {
    fetchFunction(
      `/api/user-page/cart?productId=${data?._id}`,
      "DELETE"
    );
   dispatch(removeFromCart(product));

  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };


  return (
    <div className={classes.container}>
      <input
        type="checkbox"
        checked={selectedItems.includes(product._id)}
        // onChange={(e) => onSelectChange(e.target.checked)}\
        onChange={(event) =>
          onItemSelect(product._id, event.target.checked)
        }
      />
      <img
        src={product.images ? product.images[0] : ""}
        alt="Product"
        className={classes.productImg}
      />
      <div className={classes.productInfo}>
        <h2 className={classes.title}>{product.title}</h2>
        <p className={classes.price}>{product.price}$</p>
      </div>
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
      />
      <TrashIcon
        className={classes.trashIcon}
        onClick={
        handleRemoveProduct}
      />
    </div>
  );
};

export default CartPost;
