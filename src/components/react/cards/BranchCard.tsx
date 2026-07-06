import type { Branch } from "../../../interfaces/branch.interface";
import { getFullAddress } from "../../../utils/maps.utils";
import NavLinkButton from "../navigation/NavLinkButton";
import Button from "../buttons/Button";
import { openBranchSelectorModal } from "../../../stores/branchStore";

interface BranchCardProps {
  branch: Branch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  if (!branch) return null;
  const {
    name,
    address: { references },
    urlResults,
  } = branch;

  const fullAddress = getFullAddress(branch);

  const handleOpenModal = async () => {
    try {
      await openBranchSelectorModal();
    } catch (error) {
      console.log("Error al abrir el modal");
    }
  };

  return (
    <article className="branch-card group relative overflow-hidden rounded-3xl border transition-all duration-300 p-6 shadow-sm border-gray-100 bg-white hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-green-secondary/10 px-3 py-1 text-xs font-bold text-green-secondary ring-1 ring-green-secondary/20">
                {name}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-yellow-primary leading-tight">
              {name}
            </h3>
            <p className="mt-2 text-sm font-medium text-green-light leading-relaxed">
              {fullAddress}
            </p>
            {references && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500 bg-green-secondary/10 p-2 rounded-xl border border-gray-100/50">
                <span className="font-bold text-green-primary">Ref:</span>
                <span className="font-bold text-green-secondary">
                  {references}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NavLinkButton
            path={urlResults}
            target="_blank"
            text="Consulta Resultados"
            icon="lucide:test-tube-diagonal"
          />
          <Button
            text="Cambiar de sucursal"
            icon="lucide:store"
            onClick={handleOpenModal}
          />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
