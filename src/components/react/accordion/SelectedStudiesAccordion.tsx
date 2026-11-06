import { formatMXN } from "../../../utils/currency";
import { PackageOpen } from "lucide-react";
import NumberInput from "../form/NumberInput";
import type { Study } from "../../../interfaces/study.interface";
import { MdDelete } from "react-icons/md";
import Button from "../buttons/Button";

interface SelectedStudiesAccordionProps {
  selectedStudies: Study[];
  removeStudy: (studyId: string) => void;
  updateStudyQuantity: (id: string, quantity: number) => void;
}
const SelectedStudiesAccordion = ({
  selectedStudies,
  removeStudy,
  updateStudyQuantity,
}: SelectedStudiesAccordionProps) => {
  if (selectedStudies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <PackageOpen
          className="h-6 w-6 text-ink-subtle"
          strokeWidth={1.5}
        />
        <p className="text-sm text-ink-muted leading-relaxed">
          No has seleccionado estudios todavía.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-ui-border">
      {selectedStudies.map((study) => (
        <li
          key={study.id}
          className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm"
        >
          <div className="min-w-0 flex-1 basis-32">
            <p className="text-ink truncate">{study.name}</p>
            <p className="font-semibold text-brand-ink text-xs sm:text-sm">
              {study.priceInfo.showPrice
                ? formatMXN(study.priceInfo.price)
                : study.priceInfo.message}
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

            <Button
              type="button"
              variant="icon"
              size="icon"
              className="text-red-custom hover:bg-red-custom/10"
              ariaLabel="Eliminar estudio"
              onClick={() => removeStudy(study.id)}
            >
              <MdDelete />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectedStudiesAccordion;
