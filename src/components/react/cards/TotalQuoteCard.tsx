
import type { Totals } from "../../../interfaces/quoter.interface";
import type { Study } from "../../../interfaces/study.interface"


interface TotalQuoteCardProps {
    totals: Totals
    selectedStudies: Study[]
}
const TotalQuoteCard = ({ totals, selectedStudies }: TotalQuoteCardProps) => {
    const hasStudies = selectedStudies.length > 0;
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-center font-extrabold text-green-primary mb-4 pb-2 border-b border-green-secondary/30">
                Total de la cotizacion
            </h2>
            {
                hasStudies || !hasStudies ? (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-green-secondary">Subtotal:</span>{" "}
                            <span className="text-gray-700">${totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-green-secondary">IVA:</span>{" "}
                            <span className="text-gray-700">${totals.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                            <span className="font-extrabold text-green-primary">Total:</span>{" "}
                            <span className="font-extrabold text-green-primary">${totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 text-base py-4 text-center">
                        Sin estudios seleccionados.
                    </p>
                )
            }
        </div>
    )
}

export default TotalQuoteCard
