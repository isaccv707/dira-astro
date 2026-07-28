import { Receipt } from "lucide-react";
import type { Totals } from "../../../interfaces/quoter.interface";
import type { Study } from "../../../interfaces/study.interface";

interface TotalQuoteCardProps {
  totals: Totals;
  selectedStudies: Study[];
}
const TotalQuoteCard = ({ totals, selectedStudies }: TotalQuoteCardProps) => {
  const hasStudies = selectedStudies.length > 0;
  return (
    <div className="bg-white rounded-clinical-md p-5 sm:p-6 shadow-xs border border-ui-border">
      <h2 className="font-black tracking-tight text-green-light mb-4 pb-2 border-b border-green-secondary/30">
        Total de la cotización
      </h2>
      {hasStudies ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-green-secondary">
              Subtotal
            </span>
            <span className="text-grey-custom">
              ${totals.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-green-secondary">IVA</span>
            <span className="text-grey-custom">${totals.tax.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-clinical-sm bg-green-primary/8 px-4 py-3">
            <span className="flex items-center gap-2 font-black text-green-primary">
              <Receipt className="h-4 w-4" strokeWidth={2.25} />
              Total
            </span>
            <span className="text-lg font-black text-green-primary">
              ${totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-grey-custom text-sm py-4 text-center leading-relaxed">
          Sin estudios seleccionados.
        </p>
      )}
    </div>
  );
};

export default TotalQuoteCard;
