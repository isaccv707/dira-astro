
const CarouselSkeleton = () => {
    return (
        <div className="w-full animate-pulse" aria-hidden="true">
            <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] md:aspect-[16/7]">
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-300/50 to-transparent" />
            </div>

            <div className="flex justify-center gap-2 mt-4">
                <div className="h-2 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    )
}

export default CarouselSkeleton
