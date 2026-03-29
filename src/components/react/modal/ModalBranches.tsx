
import useModalManager from "../../../hooks/useModalManager";
import type { Branch } from "../../../interfaces/branch.interface";
import Modal from "./Modal";

interface ModalBranchesProps {
  id: string;
  title: string;
  data: Branch[];
  paragraph?: string;
  openInNewTab?: boolean;
}

const ModalBranches = ({
  data: branches,
  id,
  title,
  paragraph = 'Selecciona la sucursal de tu preferencia.',
  openInNewTab = true,
}: ModalBranchesProps) => {
  const { close } = useModalManager();

  const handleOpen = (branch: Branch) => {
    const url = branch.urlResults;
    if (!url) return;

    close(id);

    if (openInNewTab) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = url;
  };

  return (
    <Modal id={id} title={title} onClose={() => close(id)} open>
      <div className="p-5">
        <p className="text-sm text-gray-600">
          {paragraph}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {branches.slice(0, 2).map((branch) => (
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

              <p className="mt-3 text-sm font-bold text-green-ligth">
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
