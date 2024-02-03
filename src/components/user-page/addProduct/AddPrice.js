"use client";
import React, { useState } from "react";
import classes from "./AddPrice.module.css";
import CompContainer from "@/components/UI/addProduct/CompContainer";
import { Field, useFormikContext } from "formik";

export default function AddPrice() {
  const { values, setFieldValue } = useFormikContext();
  const [cents, setCents] = useState("00");

  const handleDollarsChange = (value) => {
    if (value === "") {
      setFieldValue("price", "");
      setCents("00");
      return;
    }

    const dollars = parseFloat(value);
    if (isNaN(dollars) || dollars > 1000000) {
      setCents("00");
      return;
    }
    setFieldValue("price", dollars);
  };

  const handleCentsChange = (newCents) => {
    if (/^\d*$/.test(newCents)) {
      const centsValue = parseInt(newCents, 10);
      if (centsValue >= 0 && centsValue <= 99) {
        setCents(
          centsValue === 0 ? "00" : centsValue.toString().padStart(2, "0")
        );
      }
      if (newCents === "") {
        setCents("00");
      }
    }
  };

  return (
    <CompContainer>
      <div className={classes.container}>
        <h2 className={classes.formName}>Price</h2>
        <div className={classes.price}>
          <span>$</span>
          <div className={classes.priceValue}>
            <Field
              className={classes.priceInDollars}
              type="text"
              name="price"
              placeholder="Enter your price"
              onChange={(e) => handleDollarsChange(e.target.value)}
              style={{ width: values.price ? "5rem" : "7rem" }}
            />

            {values.price && (
              <div className={classes.priceInCents}>
                <span>.</span>
                <Field
                  type="number"
                  name="cents"
                  value={cents}
                  onChange={(e) => handleCentsChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </CompContainer>
  );
}
