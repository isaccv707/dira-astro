import { Swiper, type SwiperProps } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

interface CarouselProps {
    children: React.ReactNode;
    swipperOptions?: SwiperProps
}

const Carousel = ({ children, swipperOptions = {} }: CarouselProps) => {
    return (
        <div>
            <Swiper
                modules={[Pagination, Autoplay]}
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
