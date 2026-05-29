// src/components/react/carousel/Carousel.tsx
import React, { useMemo } from "react";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";

interface CarouselProps {
  children: React.ReactNode;
  swipperOptions?: SwiperProps;
  slidesPreview?: number;
}

const Carousel = ({
  children,
  swipperOptions = {},
  slidesPreview = 1,
}: CarouselProps) => {
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  if (slides.length === 0) return null;

  return (
    <div className="w-full h-full block relative group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={slidesPreview}
        spaceBetween={swipperOptions.spaceBetween ?? 20}
        direction="horizontal"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // Only loop if we have enough slides to actually loop
        loop={slides.length > slidesPreview}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        grabCursor={true}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        className="w-full h-full !pb-12"
        {...swipperOptions}
      >
        {slides.map((child, index) => (
          <SwiperSlide key={`slide-${index}`} className="!h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
