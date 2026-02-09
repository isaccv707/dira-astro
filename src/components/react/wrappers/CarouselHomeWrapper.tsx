import CarouselHome from "../carousel/CarouselHome"
import ReduxProvider from "../providers/ReduxProvider"


const CarouselHomeWrapper = () => {
  return (
    <ReduxProvider>
      <CarouselHome/>
    </ReduxProvider>
  )
}

export default CarouselHomeWrapper
