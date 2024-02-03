"use client";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import ShopPost from "../post/ShopPost";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import classes from "./CarouselContainer.module.css";

const CarouselContainer = ({
  suggestionData,
  images,
  showIndicators,
  feed,
  active,
  emulateTouch,
  showArrows
}) => {
  const [activeIndex, setActiveIndex] = useState(active || 0);
  const itemsPerPage = 5;

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const renderShopPosts = () => {
    const start = activeIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return suggestionData
      ?.slice(start, end)
      .map((data, index) => (
      <ShopPost
      key={index}
      forRecommendationSection={true}
          postData={data}
        />
    ));
  };

  return (
    <Carousel
      className={classes.carouselContainer}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={(event) => {
              onClickHandler();
              event.preventDefault(); // Prevents triggering, because the ShopPost is inside an anchor - Link element.
            }}
            className={`${classes.arrowButtonLeft} ${
              feed ? classes.suggestionsArrowButton : ""
            } `}
          >
            <ChevronLeftIcon />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={(event) => {
              onClickHandler();
              event.preventDefault(); // Prevents triggering, because the ShopPost is inside an anchor - Link element.
            }}
            className={`${classes.arrowButtonRight} ${
              feed ? classes.suggestionsArrowButton : ""
            }`}
          >
            <ChevronRightIcon />
          </button>
        )
      }
      showStatus={false}
      showArrows={showArrows}
      emulateTouch={emulateTouch ? true : false}
      showIndicators={showIndicators ? true : false}
      showThumbs={false}
      selectedItem={activeIndex} // Set the selectedItem to active for emulation
      onChange={handleSlideChange}
    >
      {feed
        ? Array.from({
            length: Math.ceil(suggestionData?.length / itemsPerPage),
          }).map((_, index) => (
            <ul key={index} className={classes.feedItems}>
              {renderShopPosts()}
            </ul>
          ))
        : images?.map((_, index) => {
            return (
              <img
                key={index}
                src={images[activeIndex]}
                alt="product photo"
          
              />
            );
          })}
    </Carousel>
  );
};

export default CarouselContainer;
