import { QuoterProvider } from "../../../contexts/QuoterContext";
import ReduxProvider from "../providers/ReduxProvider";


interface GlobalWrapper {
    children: React.ReactNode;
}
const GlobalWrapper = ({ children }: GlobalWrapper) => {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}

export default GlobalWrapper
