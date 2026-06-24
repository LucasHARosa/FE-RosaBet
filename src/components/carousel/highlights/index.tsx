"use client";
import MultiCarousel from "react-multi-carousel";

export default function CarouselBanner({ children }: CarouselProps) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1226 },
      items: 1,
      partialVisibilityGutter: 240,
    },
    desktop: {
      breakpoint: { max: 1226, min: 1024 },
      items: 1,
      partialVisibilityGutter: 220,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  return (
    <>
      {children && (
        <MultiCarousel
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          partialVisible={true}
          className=""
          containerClass="container-padding-bottom"
          dotListClass=""
          draggable
          focusOnSelect
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
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
