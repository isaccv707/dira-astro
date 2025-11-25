import { ToastContainer } from "react-toastify"
import { QuoterProvider } from "../../../contexts/QuoterContext"
import QuotationDetailsSection from "../../../sections/react/quoter/QuotationDetails-section"
import QuoterFormSection from "../../../sections/react/quoter/QuoterForm-section"
import ReduxProvider from "../providers/ReduxProvider"
import 'react-toastify/dist/ReactToastify.css';

const QuoterWrapper = () => {
    return (
        <ReduxProvider>
            <ToastContainer />
            <QuoterProvider>
                <div
                    className="w-full h-auto flex justify-center gap-10 p-11 place-items-center"
                >
                    <section className="w-8/12 p-10">
                        <QuoterFormSection />
                    </section>
                    <section className="w-4/12 bg-white p-10 rounded-2xl shadow-2xl">
                        <QuotationDetailsSection />
                    </section>
                </div>
            </QuoterProvider>
        </ReduxProvider>
    )
}

export default QuoterWrapper
