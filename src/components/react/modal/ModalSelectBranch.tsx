import { useState } from "react";
import useModalManager from "../../../hooks/useModalManager";
import type { Branch } from "../../../interfaces/branch.interface";
import Modal from "./Modal";

interface ModalBranchesProps {
  id: string;
  title: string;
  data: Branch[];
  paragraph?: string;
}

const ModalSelectBranch = ({
  data: branches,
  id,
  title,
  paragraph = "Selecciona la sucursal de tu preferencia.",
}: ModalBranchesProps) => {
  const { close } = useModalManager();

  const handleBranchSelection = (branch: Branch) => {
    localStorage.setItem("dyra_branch_id", branch.id);
    localStorage.setItem("dyra_branch_name", branch.name);
    close(id);
    window.location.reload();
  };

  return (
    <Modal id={id} title={title} onClose={() => {}} open>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {branches.slice(0, 2).map((branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() => handleBranchSelection(branch)}
              className="group rounded-2xl border border-gray-200 p-4 text-left shadow-sm transition hover:border-green-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-green-ligth group-hover:text-green-700">
                    {branch.state.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-green-ligth">
                    {branch.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {`
                    ${branch.address.street} 
                    #${branch.address.extNumber}, 
                    ${branch.address.neighborhood},
                    ${branch.address.city},
                    ${branch.state.name}.
                    `}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectBranch;
