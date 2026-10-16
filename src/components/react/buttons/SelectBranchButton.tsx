import type { Branch } from "../../../interfaces/branch.interface";
import { closeModal } from "../../../stores/modalStore";
import { switchBranch } from "../../../stores/branchStore";
import BranchOptionCard from "../cards/BranchOptionCard";

interface SelectBranchButtonProps {
  branch: Branch;
  isCurrent?: boolean;
}

const SelectBranchButton = ({
  branch,
  isCurrent = false,
}: SelectBranchButtonProps) => {
  const handleBranchSelection = (branch: Branch) => {
    // Re-picking the active branch: nothing changes, skip the reload.
    if (isCurrent) {
      closeModal();
      return;
    }
    closeModal();
    switchBranch({
      id: branch.id,
      name: branch.name,
    });
  };

  return (
    <BranchOptionCard
      branch={branch}
      action="select"
      isCurrent={isCurrent}
      onSelect={handleBranchSelection}
    />
  );
};

export default SelectBranchButton;
