import { useStore } from "@nanostores/react";
import { closeModal, modalStore } from "../../../stores/modalStore";
import Modal from "./Modal";
import type { Branch } from "../../../interfaces/branch.interface";

const ModalBranches = () => {
  const { isOpen, payload, view } = useStore(modalStore);

  const { title = "", paragraph, data } = payload || {};

  if (!isOpen || view !== "MODAL_BRANCHES") return null;

  const handleOpen = (branch: any) => {
    if (!branch.urlResults) return;
    closeModal();
    window.open(branch.urlResults, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      id={"modal-branches"}
      title={title}
      onClose={closeModal}
      open={isOpen}
    >
      <div className="p-5">
        <p className="text-sm text-gray-600">{paragraph}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.slice(0, 2).map((branch: Branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() => handleOpen(branch)}
              className="group rounded-2xl border border-gray-200 p-4 text-left shadow-sm transition hover:border-green-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-gray-900 group-hover:text-green-700">
                    {branch.state.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-700">
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

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Consultar
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-green-light">
                Referencia: {`${branch.address.references}`}
              </p>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalBranches;
