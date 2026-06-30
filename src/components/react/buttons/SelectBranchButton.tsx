import type { Branch } from "../../../interfaces/branch.interface";
import { closeModal } from "../../../stores/modalStore";

interface SelectBranchButtonProps {
  branch: Branch;
}

const SelectBranchButton = ({ branch }: SelectBranchButtonProps) => {
  const handleBranchSelection = (branch: Branch) => {
    localStorage.setItem("dyra_branch_id", branch.id);
    localStorage.setItem("dyra_branch_name", branch.name);
    localStorage.setItem("dyra_price_sheet_id", branch.priceSheetId);
    document.cookie = `dyra_branch_id=${branch.id};path=/;max-age=31536000;SameSite=Lax`;
    closeModal();
    window.location.reload();
  };

  return (
    <button
      key={branch.id}
      type="button"
      onClick={() => handleBranchSelection(branch)}
      className="group rounded-2xl border border-gray-200 p-4 text-left shadow-sm transition hover:border-green-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-green-light group-hover:text-green-700">
            {branch.state?.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-green-light">
            {branch.name}
          </p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            {`${branch.address?.street} #${branch.address?.extNumber}, ${branch.address?.neighborhood}, ${branch.address?.city}, ${branch.state?.name}.`}
          </p>
        </div>
      </div>
    </button>
  );
};

export default SelectBranchButton;
