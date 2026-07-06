import { useEffect, useState } from "react";
import {
  getStoredBranchId,
  openBranchSelectorModal,
} from "../../../stores/branchStore";

export const BranchSelectorManager = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBranchAndOpenModal = async () => {
      try {
        const savedBranch = getStoredBranchId();

        if (savedBranch) {
          setIsLoading(false);
          return;
        }

        await openBranchSelectorModal();
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

export default BranchSelectorManager;
