import CarouselHome from "../carousel/CarouselHome"
import ReduxProvider from "../providers/ReduxProvider"

const CarouselWrapper = () => {
  return (
    <ReduxProvider>
      <CarouselHome />
    </ReduxProvider>
  )
}

export default CarouselWrapper
