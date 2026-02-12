import { ToastContainer } from "react-toastify"
import { QuoterProvider } from "../../../contexts/QuoterContext"
import QuoteDetails from "../../../sections/react/quoter/QuoteDetails-section"
import Quoter from "../../../sections/react/quoter/Quoter-section"
import ReduxProvider from "../providers/ReduxProvider"
import 'react-toastify/dist/ReactToastify.css';

const QuoterWrapper = () => {
    return (
        <ReduxProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <QuoterProvider>
                <section className="w-full bg-gray-50 py-6 sm:py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)] items-start">
                            {/* Form */}
                            <section className="w-full">
                                <div className="h-full rounded-3xl shadow-xl overflow-hidden">
                                    <Quoter />
                                </div>
                            </section>

                            {/* Details */}
                            <section className="w-full lg:sticky lg:top-6">
                                <div className="h-full rounded-3xl shadow-xl overflow-hidden">
                                    <QuoteDetails />
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

            </QuoterProvider>
        </ReduxProvider>
    )
}

export default QuoterWrapper
