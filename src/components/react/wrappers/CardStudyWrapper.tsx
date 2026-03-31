import { QuoterProvider } from "../../../contexts/QuoterContext"
import type { Study } from "../../../interfaces/study.interface"
import ReduxProvider from "../../../store/providers/ReduxProvider"
import CardStudy from "../cards/CardStudy"


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
