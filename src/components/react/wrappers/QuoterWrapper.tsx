import { ToastContainer } from "react-toastify"
import { QuoterProvider } from "../../../contexts/QuoterContext"
import QuotationDetailsSection from "../../../sections/react/quoter/QuotationDetails-section"
import QuoterFormSection from "../../../sections/react/quoter/QuoterForm-section"
import ReduxProvider from "../providers/ReduxProvider"
import 'react-toastify/dist/ReactToastify.css';

const QuoterWrapper = () => {
    return (
        <ReduxProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <QuoterProvider>
                <section className="w-full bg-gray-50 py-10">
                    <div className="max-w-7xl mx-auto px-4 lg:px-0">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] items-start">
                            <section className="h-full shadow-xl">
                                <QuoterFormSection />
                            </section>

                            <section className="h-full shadow-xl">
                                <QuotationDetailsSection />
                            </section>
                        </div>
                    </div>
                </section>
            </QuoterProvider>
        </ReduxProvider>
    )
}

export default QuoterWrapper
