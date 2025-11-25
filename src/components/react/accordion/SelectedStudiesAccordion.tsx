import { MdDelete } from "react-icons/md";
import type { Study } from "../../../interfaces/study.interface";
import NumberInput from "../form/NumberInput";

interface SelectedStudiesAccordionProps {
    selectedStudies: Study[]
    removeStudy: (studyId: string) => void
    updateStudyQuantity: (id: string, quantity: number) => void
}
const SelectedStudiesAccordion = ({ selectedStudies, removeStudy, updateStudyQuantity }: SelectedStudiesAccordionProps) => {

    return (
        <ul className="divide-y divide-gray-200">
            {
                selectedStudies.length > 0 ? (
                    selectedStudies.map((study) => (
                        <li
                            key={study.id}
                            className="py-2 flex items-center justify-between gap-3 text-sm"
                        >
                            {/* Nombre + precio */}
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-800 truncate">{study.name}</p>
                                <p className="font-semibold text-green-primary text-xs sm:text-sm">
                                    ${study.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Cantidad + eliminar */}
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="w-20">
                                    <NumberInput
                                        id={`quantity-${study.id}`}
                                        name={`quantity-${study.id}`}
                                        placeholder="Cantidad"
                                        type="number"
                                        value={String(study.quantity ?? 1)}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            if (Number.isNaN(value)) return;
                                            updateStudyQuantity(study.id, value);
                                        }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="text-red-500 cursor-pointer p-1 rounded-full hover:bg-red-50"
                                    onClick={() => removeStudy(study.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </li>

                    ))
                ) : (
                    <p className="text-gray-500 italic text-sm">
                        No has seleccionado estudios todavía.
                    </p>
                )
            }
        </ul>
    )
}

export default SelectedStudiesAccordion
