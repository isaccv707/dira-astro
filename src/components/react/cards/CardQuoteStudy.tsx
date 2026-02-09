import ButtonAddStudy from "../ui/ButtonAddStudy";
import type { Study } from "../../../interfaces/study.interface";

interface CardQuoteStudyProps {
    study: Study;
    isAdded: boolean;
    handleAddStudy: (study: Study) => void;
    handleDeletStudy: (studyId: string) => void;
}

const CardQuoteStudy = ({
    handleAddStudy,
    handleDeletStudy,
    isAdded,
    study,
}: CardQuoteStudyProps) => {
    return (
        <div
            className="
        group h-full min-h-[168px]
        rounded-2xl bg-white
                    p-4 sm:p-5 lg:p-6        ring-1 ring-black/5
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md hover:ring-black/10
        focus-within:ring-black/15
      "
        >
            <div className="flex flex-col h-full">
                <div className="min-w-0">
                    <h3
                        className="
              text-sm sm:text-[15px] md:text-base
              font-semibold text-gray-900
              leading-snug
              line-clamp-2
              group-hover:text-gray-900
            "
                        title={study.name}
                    >
                        {study.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-center gap-3">
                        <span
                            className="
                inline-flex items-center
                rounded-full
                bg-green-secondary/15
                px-3 py-1
                text-sm font-bold
                text-green-primary
                whitespace-nowrap
              "
                        >
                            ${study.price}
                        </span>

                        <span
                            className={`
                inline-flex items-center gap-2
                text-xs font-semibold
                ${isAdded ? "text-green-primary" : "text-black/50"}
              `}
                        >
                            <span
                                className={`
                  h-2 w-2 rounded-full
                  ${isAdded ? "bg-green-primary" : "bg-black/20"}
                `}
                            />
                            {isAdded ? "Agregado" : "Disponible"}
                        </span>
                    </div>
                </div>

                <div className="my-4 h-px w-full bg-black/5" />

                <div className="mt-auto">
                    <div className="w-full">
                        <ButtonAddStudy
                            isAdded={isAdded}
                            handleAddStudy={handleAddStudy}
                            handleDeletStudy={handleDeletStudy}
                            study={study}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardQuoteStudy;
