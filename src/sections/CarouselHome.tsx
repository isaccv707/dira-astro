import { SwiperSlide } from "swiper/react";
import Carousel from "../components/carousel/Carousel";
import { carouselHomeData } from "../data/carousel-home/carouselHomeData";

const CarouselHome = () => {
    return (
        <Carousel>
            {carouselHomeData.map(({ text, img }, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-[500px]">
                        <img
                            src={img?.src}
                            alt={text}
                            className="w-full h-full object-cover rounded-lg"
                        />

                        
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/70 via-white/40 to-transparent rounded-b-lg pointer-events-none" />
                    </div>
                </SwiperSlide>
            ))}
        </Carousel>
    );
};

export default CarouselHome;
