import { useEffect } from "react";
import useModalManager from "../../hooks/useModalManager";
import { useGetAllBranchesQuery } from "../../api/branchesApi/branchesApi";

export const BranchSelectorSection = () => {
  const { open } = useModalManager();
  const { data: branches, isLoading } = useGetAllBranchesQuery();

  useEffect(() => {
    console.log("BranchSelector Hook ejecutado");
    console.log("Branches:", branches);
    console.log("Loading:", isLoading);

    const savedBranch = localStorage.getItem("dyra_branch_id");
    console.log("Saved Branch:", savedBranch);

    if (!savedBranch && !isLoading && branches) {
      console.log("Intentando abrir modal...");
      open("MODAL_SELECT_BRANCH", {
        title: "Elige la sucursal de tu preferencia",
        data: branches,
      });
    }
  }, [branches, isLoading, open]); // Asegúrate de incluir 'open'

  return <></>;
};
