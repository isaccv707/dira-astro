import type { ReactNode } from "react"
import { QuoterProvider } from "../../../contexts/QuoterContext"
import QuotationDetailsSection from "../../../sections/QuotationDetails-section"
import QuoterFormSection from "../../../sections/QuoterForm-section"


const QuoterWrapper = () => {
    return (
        <QuoterProvider>
            <div
                className="w-full h-auto flex justify-center gap-10 p-11 items-stretch"
            >
                <section className="w-8/12 p-10">
                    <QuoterFormSection />
                </section>
                <section className="w-4/12 bg-white p-10 rounded-2xl shadow-2xl">
                    <QuotationDetailsSection />
                </section>
            </div>
        </QuoterProvider>
    )
}

export default QuoterWrapper
