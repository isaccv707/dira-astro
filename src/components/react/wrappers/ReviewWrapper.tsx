import { ToastContainer } from "react-toastify"
import { ModalProvider } from "../../../contexts/ModalContext"
import ReviewSection from "../../../sections/react/review/Review-section"
import ReduxProvider from "../../../store/providers/ReduxProvider"
import Carousel from "../carousel/Carousel"


const ReviewWrapper = () => {
    return (
        <ReduxProvider>
            <ModalProvider>
                <ToastContainer position="top-right" autoClose={3000} />
                <ReviewSection />
            </ModalProvider>
        </ReduxProvider>
    )
}

export default ReviewWrapper
