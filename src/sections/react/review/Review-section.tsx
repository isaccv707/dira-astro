import { SwiperSlide } from "swiper/react";
import { useGetAllApprovedReviewsQuery } from "../../../api/reviewsApi/reviewsApi";
import ReviewCard from "../../../components/react/cards/ReviewCard";
import Carousel from "../../../components/react/carousel/Carousel";
import ReviewCardSkeleton from "../../../components/react/skeleton/ReviewCardSkeleton";
import Button from "../../../components/react/ui/Button";
import useModalManager from "../../../hooks/useModalManager";


const ReviewSection = () => {

    const { data: reviews, isLoading } = useGetAllApprovedReviewsQuery();
    const { open } = useModalManager();

    const handleOpen = () => {
        open("MODA_REVIEW_FROM", {
            title: 'Cuéntanos tu experiencia',
            data: []
        })
    }

    return (
        <section>

            {
                isLoading ?
                    (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[...Array(3)].map((_, i) => <ReviewCardSkeleton key={i} />)}
                        </div>
                    ) :
                    (
                        <Carousel
                            slidesPreview={1}
                            swipperOptions={{
                                slidesPerGroup: 1,
                                spaceBetween: 20,
                                breakpoints: {
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 }
                                },
                                className: "pb-12"
                            }}
                        >
                            {reviews?.map((review) => (
                                <SwiperSlide key={review.id}>
                                    <div className="h-full pb-4"> {/* Padding para que la sombra no se corte */}
                                        <ReviewCard review={review} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    )
            }
            <div className="mt-8">
                <Button
                    type="button"
                    text="Agregar Reseña"
                    variant={"primary"}
                    onClick={handleOpen}
                />
            </div>
        </section>
    )
}

export default ReviewSection;
