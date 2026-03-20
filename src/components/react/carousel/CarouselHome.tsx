import { useGetActiveBannersQuery } from "../../../api/bannersApi/bannerApi";
import CarouselSkeleton from "./CarouselSkeleton";
import Carousel from "./Carousel";
import { SwiperSlide } from "swiper/react";

const CarouselHome = () => {
    const { data: banners, isLoading, isError } = useGetActiveBannersQuery('HOME');

    if (isLoading) return <CarouselSkeleton />
    if (isError) return null

    return (
        <Carousel>
            {banners?.map(({ imageUrl }, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={imageUrl}
                        alt={imageUrl}
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
