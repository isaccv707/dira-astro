import type { Totals } from "../../../interfaces/quoter.interface"
import type { Study } from "../../../interfaces/study.interface"


interface TotalQuoteCardProps {
    totals: Totals
    selectedStudies: Study[]
}
const TotalQuoteCard = ({ totals, selectedStudies }: TotalQuoteCardProps) => {

    return (
        <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-center font-bold text-green-primary mb-3">
                Total de la cotizacion
            </h2>
            {
                selectedStudies.length > 0 ? (
                    <div className="text-sm leading-relaxed">
                        <p className="mb-1">
                            <span className="font-semibold text-green-secondary">Subtotal:</span>{" "}
                            <span className="text-gray-800">{totals.subtotal.toFixed(2)}</span>
                        </p>
                        <p className="mb-1">
                            <span className="font-semibold text-green-secondary">IVA:</span>{" "}
                            <span className="text-gray-800">
                                {totals.tax.toFixed(2)}
                            </span>
                        </p>
                        <p className="mb-1">
                            <span className="font-semibold text-green-secondary">Total:</span>{" "}
                            <span className="text-gray-800">{totals.total.toFixed(2)}</span>
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500 italic text-sm text-center">
                        Sin estudios seleccionados.
                    </p>
                )
            }
        </div>
    )
}

export default TotalQuoteCard
