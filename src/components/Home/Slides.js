"use client";
import React from "react";
import BackgroundImageCarousel from "../slider/BackgroundImageContainer.js";
export default function Slides() {
  const slides = [
    "/images/slider-1.jpg",
    "/images/slider-2.jpg",
    "/images/slider-3.jpg",
    "/images/slider-4.jpg",
    "/images/slider-5.jpg",
    "/images/slider-6.jpg",
    "/images/slider-7.jpg",
    "/images/slider-8.jpg"
  ];
  return (
      <BackgroundImageCarousel images={slides} />
  );
}
