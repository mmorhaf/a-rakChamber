import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";
import useStyles from "../../../styles/components/shared/carousel/carousel";

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
        key={item.id}
      >
        <img
          src={`/api/file/download/${item.uuid}?size=medium`}
          alt={item.alt}
        />
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
    </Carousel>
  );
}
