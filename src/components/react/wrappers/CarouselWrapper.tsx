import ReduxProvider from "../../../store/providers/ReduxProvider"
import CarouselHome from "../carousel/CarouselHome"


const CarouselWrapper = () => {
  return (
    <ReduxProvider>
      <CarouselHome />
    </ReduxProvider>
  )
}

export default CarouselWrapper
