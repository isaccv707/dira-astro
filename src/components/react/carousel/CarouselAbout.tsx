import { SwiperSlide } from "swiper/react";
import { carouselHomeData } from "../../../data/carousel/carouselHome-data";
import Carousel from "./Carousel";

interface CarouselAboutProps {}

const CarouselAbout = () => {
  return (
    <Carousel>
      {carouselHomeData.map(({ img }, index) => (
        <div className="aspect-16/7 w-full object-cover" key={index}>
          <img
            src={img?.src}
            alt="Equipo de laboratorio DYRA trabajando con tecnología avanzada"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselAbout;
