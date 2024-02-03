import { Carousel } from "react-responsive-carousel";
import classes from "./BackgroundImage.module.css";

export default function BackgroundImageCarousel({ images }) {
  return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        emulateTouch={true}
        showArrows={false}
        autoPlay={true}
        interval={8000}
        className={classes.carousel}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={classes.backgroundImageSlider}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </Carousel>
  );
}