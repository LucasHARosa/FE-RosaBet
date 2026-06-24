"use client";
import MultiCarousel from "react-multi-carousel";

export default function Carousel({ children, infinite = false, autoPlay = false }: CarouselProps) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1226 },
      items: 7,
      // partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 1226, min: 830 },
      items: 4,
      // partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 830, min: 464 },
      items: 2,
      // partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 30
    },
  };

  return (
    <>
      {children && (
        <MultiCarousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={infinite}
          autoPlay={autoPlay}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          // customTransition="all .5"
          transitionDuration={500}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          centerMode={true}
          partialVisible={false}
          pauseOnHover={true}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          itemClass="carousel-item-mt"
          // customLeftArrow={<CustomLeftArrow />}
          // customRightArrow={<CustomRightArrow />}
        >
          {children}
        </MultiCarousel>
      )}
    </>
  );
}

interface CarouselProps {
  children: any;
  infinite?: boolean;
  autoPlay?: boolean;
}
