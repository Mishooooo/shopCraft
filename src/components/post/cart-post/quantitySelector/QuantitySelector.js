'use client'
import React, { useState } from "react";
import styles from "./QuantitySelector.module.css";

const QuantitySelector = ({ quantity, onQuantityChange }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity) => {
    setCurrentQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 1) {
      handleQuantityChange(currentQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    handleQuantityChange(currentQuantity + 1);
  };

  return (
    <div className={styles.quantitySelector}>
      <button onClick={decreaseQuantity} disabled={true}>
        -
      </button>
      <span>{currentQuantity}</span>
      <button onClick={increaseQuantity} disabled={true}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
