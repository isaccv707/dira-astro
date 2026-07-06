import { useStore } from "@nanostores/react";
import { modalStore, closeModal } from "../../../stores/modalStore";
import type { Branch } from "../../../interfaces/branch.interface";
import Modal from "./Modal";
import SelectBranchButton from "../buttons/SelectBranchButton";

interface ModalSelectBranchProps {
  id?: string;
}

const ModalSelectBranch = ({
  id = "MODAL_SELECT_BRANCH",
}: ModalSelectBranchProps) => {
  const { isOpen, view, payload } = useStore(modalStore);

  if (!isOpen || view !== id) return null;

  const title = payload?.title || "Elige la sucursal de tu preferencia";
  const branches: Branch[] = payload?.data || [];

  return (
    <Modal id={id} title={title} onClose={closeModal} open={isOpen}>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {branches.map((branch) => (
            <SelectBranchButton key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectBranch;
