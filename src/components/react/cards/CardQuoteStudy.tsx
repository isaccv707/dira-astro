import { motion } from "framer-motion";
import ButtonAddStudy from "../ui/ButtonAddStudy";
import type { Study } from "../../../interfaces/study.interface";

interface CardQuoteStudyProps {
    study: Study
    isAdded: boolean
    handleAddStudy: (study: Study) => void
    handleDeletStudy: (studyId: string) => void;
}
const CardQuoteStudy = ({ handleAddStudy, handleDeletStudy, isAdded, study }: CardQuoteStudyProps) => {
    return (
        <div
            key={study.id}
            className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between bg-gradient-to-b from-white to-green-50"
        >
            <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {study.name}
                </h3>
                <p className="text-green-primary font-bold text-sm mb-2">
                    ${study.price}
                </p>
            </div>

            <ButtonAddStudy
                isAdded={isAdded}
                handleAddStudy={handleAddStudy}
                handleDeletStudy={handleDeletStudy}
                study={study}
            />
        </div>
    )
}

export default CardQuoteStudy
