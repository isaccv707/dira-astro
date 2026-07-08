import { ToastContainer } from "react-toastify";
import { QuoterProvider } from "../../../contexts/QuoterContext";
import QuoteDetails from "../../../sections/react/quoter/QuoteDetails";
import Quoter from "../../../sections/react/quoter/Quoter";

import "react-toastify/dist/ReactToastify.css";

const QuoterWrapper = () => {
  return (
    <QuoterProvider>
      <section className="w-full py-6 sm:py-10">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)] items-start">
          {/* Form */}
          <section className="w-full">
            <div className="h-full rounded-clinical-lg shadow-xl overflow-hidden">
              <Quoter />
            </div>
          </section>

          {/* Details */}
          <section className="w-full lg:sticky lg:top-6">
            <div className="h-full rounded-clinical-lg shadow-xl overflow-hidden">
              <QuoteDetails />
            </div>
          </section>
        </div>
      </section>
    </QuoterProvider>
  );
};

export default QuoterWrapper;
