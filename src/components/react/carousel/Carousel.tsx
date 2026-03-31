import { Swiper, type SwiperProps } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

interface CarouselProps {
    children: React.ReactNode;
    swipperOptions?: SwiperProps
    slidesPreview?: number;
}

const Carousel = ({ children, swipperOptions = {}, slidesPreview = 1 }: CarouselProps) => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={slidesPreview}
                direction="horizontal"
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
                {...swipperOptions}
            >
                {children}
            </Swiper>
        </div>
    )
}

export default Carousel;
