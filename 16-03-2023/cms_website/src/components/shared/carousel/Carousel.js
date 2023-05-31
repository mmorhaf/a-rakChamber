import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import useStyles from "../../../styles/components/shared/carousel/carousel";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { uid } from "react-uid";

export default function SharedCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const classes = useStyles();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={uid(item)}
      >
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      className={classes.sharedCarouselRoot}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      {items.length > 1 && (
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
      )}
      {slides}
      {items.length > 1 && (
        <CarouselControl
          direction="prev"
          directionText={<GrPrevious />}
          onClickHandler={previous}
        />
      )}
      {items.length > 1 && (
        <CarouselControl
          direction="next"
          directionText={<GrNext />}
          onClickHandler={next}
        />
      )}
    </Carousel>
  );
}
