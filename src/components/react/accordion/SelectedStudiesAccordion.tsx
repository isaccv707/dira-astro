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
  return (
    <ul className="divide-y divide-ui-border">
      {selectedStudies.length > 0 ? (
        selectedStudies.map((study) => (
          <li
            key={study.id}
            className="py-2 flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="text-green-light truncate">{study.name}</p>
              <p className="font-semibold text-green-primary text-xs sm:text-sm">
                ${study.priceInfo.price}
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
        ))
      ) : (
        <p className="text-grey-custom italic text-sm">
          No has seleccionado estudios todavía.
        </p>
      )}
    </ul>
  );
};

export default SelectedStudiesAccordion;
