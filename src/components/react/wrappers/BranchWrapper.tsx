
import BranchSection from "../../../sections/react/branch/Branch-section"
import ReduxProvider from "../providers/ReduxProvider"

const BranchWrapper = () => {
    
    return (
        <ReduxProvider>
            <BranchSection/>
        </ReduxProvider>
    )
}

export default BranchWrapper
