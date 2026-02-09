import { SwiperSlide } from "swiper/react";
import { carouselHomeData } from "../../../data/carousel/carouselHome-data";
import Carousel from "./Carousel";

const CarouselHome = () => {
    return (
        <Carousel>
            {carouselHomeData.map(({ img }, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={img?.src}
                        alt={img.src}
                        className="w-full h-auto aspect-16/7 object-cover rounded-2xl"
                        loading="lazy"
                    />

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/70 via-white/40 to-transparent pointer-events-none" />
                </SwiperSlide>

            ))}
        </Carousel>
    );
};

export default CarouselHome;
