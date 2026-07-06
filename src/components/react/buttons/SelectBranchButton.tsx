import type { Branch } from "../../../interfaces/branch.interface";
import { closeModal } from "../../../stores/modalStore";
import { setSelectedBranch } from "../../../stores/branchStore";
import BranchOptionCard from "../cards/BranchOptionCard";

interface SelectBranchButtonProps {
  branch: Branch;
}

const SelectBranchButton = ({ branch }: SelectBranchButtonProps) => {
  const handleBranchSelection = (branch: Branch) => {
    setSelectedBranch({
      id: branch.id,
      name: branch.name,
      priceSheetId: branch.priceSheetId,
    });
    closeModal();
    window.location.reload();
  };

  return (
    <BranchOptionCard
      branch={branch}
      action="select"
      onSelect={handleBranchSelection}
    />
  );
};

export default SelectBranchButton;
