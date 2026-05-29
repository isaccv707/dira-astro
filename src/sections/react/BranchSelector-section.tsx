import { useEffect, useState } from "react";
import { openModal } from "../../stores/modalStore";
import { getAllBranches } from "../../api/branchesApi/branchesApi";
import type { Branch } from "../../interfaces/branch.interface";

export const BranchSelectorSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBranchAndOpenModal = async () => {
      try {
        const savedBranch = localStorage.getItem("dyra_branch_id");

        if (savedBranch) {
          setIsLoading(false);
          return;
        }

        const branchesData = await getAllBranches();
        console.log(branchesData);
        if (branchesData && branchesData.length > 0) {
          openModal("MODAL_SELECT_BRANCH", {
            title: "Elige la sucursal de tu preferencia",
            data: branchesData,
          });
        }
      } catch (error) {
        console.error("Error al cargar las sucursales en el selector:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBranchAndOpenModal();
  }, []);

  return null;
};

export default BranchSelectorSection;
