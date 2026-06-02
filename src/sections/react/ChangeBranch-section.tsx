import { useEffect, useState } from "react";
import useModalManager from "../../hooks/useModalManager";

const ChangeBranchSection = () => {
  const [branchName, setBranchName] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("dyra_branch_name");
    if (name) setBranchName(name);
  }, []);

  const handleChange = () => {};

  return (
    <button
      onClick={handleChange}
      className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full hover:bg-green-100 transition-colors group"
    >
      <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold block leading-none">
        Sucursal
      </span>
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-green-900">
          {branchName || "Seleccionar..."}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-green-600 group-hover:translate-y-0.5 transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
};

export default ChangeBranchSection;
