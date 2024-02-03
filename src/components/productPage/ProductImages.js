"use client";
import React, { useState } from "react";
import classes from "./ProductImages.module.css";
import CarouselContainer from "../slider/CarouselContainer";



const ProductImages = ({images}) => {

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const handleMouseOver = (index) => {
    setHovering(true);
    setActive(index);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <div className={classes.container}>
      <ul className={classes["key-images"]}>
        {images?.map((imgSrc, i) => (
          <li
            key={i}
            className={classes.images}
            onMouseOver={() => handleMouseOver(i)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={imgSrc} alt='product photo' />
          </li>
        ))}
      </ul>
      <div className={classes["prod-image"]}>
        {hovering && (
          <img
            src={images[active]}
            alt='product photo'
      
          />
        )}
        {!hovering && (
          <CarouselContainer
            showArrows={false}
            emulateTouch={true}
            images={images}
            active={active}
    
          />
        )}
      </div>
    </div>
  );
};

export default ProductImages;
