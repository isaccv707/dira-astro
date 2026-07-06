import { useStore } from "@nanostores/react";
import { closeModal, modalStore } from "../../../stores/modalStore";
import Modal from "./Modal";
import type { Branch } from "../../../interfaces/branch.interface";
import BranchOptionCard from "../cards/BranchOptionCard";

const ModalBranches = () => {
  const { isOpen, payload, view } = useStore(modalStore);

  const { title = "", paragraph, data = [] } = payload || {};

  if (!isOpen || view !== "MODAL_BRANCHES") return null;

  const handleOpen = (branch: Branch) => {
    if (!branch.urlResults) return;
    closeModal();
    window.open(branch.urlResults, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      id={"MODAL_BRANCHES"}
      title={title}
      onClose={closeModal}
      open={isOpen}
    >
      <div className="p-5">
        <p className="text-sm text-gray-600">{paragraph}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.slice(0, 2).map((branch: Branch) => (
            <BranchOptionCard
              key={branch.id}
              branch={branch}
              action="consult"
              onSelect={handleOpen}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalBranches;
