"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import styles from "./PriceSlider.module.css";
import useCustumSearchParam from "@/lib/useCustumSearchParam";
import { useSearchParams } from "next/navigation";
const PriceSlider = ({ maxPrice }) => {
  const { setQueryParam } = useCustumSearchParam();
 const searchParams = useSearchParams();

  const price = searchParams.get("price"); 


  const [priceValue, setPriceValue] = useState(
    price ? price.split("-").map((val) => +val) : [0, maxPrice || 1000]
  );


  // update maxPrice mannualy using useEffect.
  useEffect(()=>{
    
  setPriceValue([priceValue[0], maxPrice || 1000]);
  }, [maxPrice]) 

  const handleChange = (newValues) => {
    const [minValue, maxValue] = newValues.map((val) => +val);

    if (
      isNaN(minValue) ||
      isNaN(maxValue) ||
      minValue > maxPrice ||
      maxValue < 0 ||
      maxValue > maxPrice
    ) {
      setPriceValue([0, maxPrice]);

        setQueryParam("price", 0 + "-" + maxPrice);
    } else {
      setPriceValue(newValues);
       setQueryParam("price", minValue + "-" + maxValue);
    }
  };

  return (
    <>
      <div className={styles.price_label}>
        <label>Price Range</label>
      </div>
      <Slider
        className={styles.slider}
        value={priceValue}
        onChange={handleChange}
        min={0}
        max={maxPrice}
        renderThumb={(props, state, i) => {
          const key = props.key;
          delete props.key; // key can't be passed with spread - (...) operator
          return (
            <li key={key} {...props} className={styles.thumb_value}>
              {state.valueNow}
              <span>$</span>
            </li>
          );
        }}
      />
      <div className={styles.display_price}>
        <div className={styles.price}>
          <span>MIN:</span>
          <div className={styles.price_value}>
            <input
              // type="number"
              id="minPrice"
              value={priceValue[0]}
              onChange={(e) => handleChange([+e.target.value, priceValue[1]])}
            />
            <span>$</span>
          </div>
        </div>
        <div className={styles.price}>
          <span>Max:</span>
          <div className={styles.price_value}>
            <input
              // type="number"
              id="maxPrice"
              value={priceValue[1]}
              onChange={(e) => handleChange([priceValue[0], +e.target.value])}
            />
            <span>$</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceSlider;
