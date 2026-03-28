import { QuoterProvider } from "../../../contexts/QuoterContext"
import type { Study } from "../../../interfaces/study.interface"
import CardStudy from "../cards/CardStudy"
import ReduxProvider from "../providers/ReduxProvider"

interface CardStudyWrapperProps {
    study: Study
}
const CardStudyWrapper = ({ study }: CardStudyWrapperProps) => {
    return (
        <ReduxProvider>
            <QuoterProvider>
                <CardStudy study={study} />
            </QuoterProvider>
        </ReduxProvider>
    )
}

export default CardStudyWrapper
