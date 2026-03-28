import { useGetActiveBannersQuery } from "../../../api/bannersApi/bannerApi";
import CarouselSkeleton from "./CarouselSkeleton";
import Carousel from "./Carousel";
import { SwiperSlide } from "swiper/react";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../../utils/cloudinary";

const CarouselHome = () => {
    const { data: banners, isLoading, isError } = useGetActiveBannersQuery('HOME');

    if (isLoading) return <CarouselSkeleton />
    if (isError) return null

    return (
        <Carousel>
            {banners?.map(({ imageUrl }, index) => {
                const isLCP = index === 0;
                
                return (
                    <SwiperSlide key={index}>
                        <img
                            src={getCloudinaryUrl(imageUrl, { width: 1280, height: 560 })}
                            srcSet={getCloudinarySrcSet(imageUrl)}
                            sizes="(max-width: 768px) 100vw, 1280px"
                            alt={`Banner DYRA ${index + 1}`}
                            className="w-full h-auto aspect-[4/5] md:aspect-[16/7] object-cover rounded-2xl"
                            loading={isLCP ? "eager" : "lazy"}
                            fetchPriority={isLCP ? "high" : "auto"}
                            decoding={isLCP ? "sync" : "async"}
                            width={1280}
                            height={560}
                        />

                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/70 via-white/40 to-transparent pointer-events-none" />
                    </SwiperSlide>
                );
            })}
        </Carousel>
    );
};

export default CarouselHome;
