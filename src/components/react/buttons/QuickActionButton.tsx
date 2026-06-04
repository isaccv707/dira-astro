import { Icon } from "@iconify/react";
import { modalStore, openModal } from "../../../stores/modalStore";
import { getAllBranches } from "../../../api/branchesApi/branchesApi";
import { useState } from "react";
import ModalBranches from "../modal/ModalBranches";
import { useStore } from "@nanostores/react";

interface QuickActionButtonProps {
  text: string;
  bgColor?: string;
}

const QuickActionButton = ({
  text,
  bgColor = "bg-green-secondary",
}: QuickActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = useStore(modalStore);
  const handleOpenModal = async () => {
    setIsLoading(true);
    try {
      const branches = await getAllBranches();
      openModal("MODAL_BRANCHES", {
        data: branches,
        title: "Consulta de Resultados",
        paragraph:
          "Selecciona tu sucursal para consultar tus resultados en línea.",
      });
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        disabled={isLoading}
        className={`flex items-center justify-center gap-4 text-white font-semibold rounded-xl shadow-md 
          transition-all duration-300 ${bgColor} hover:brightness-110 w-full h-10 p-10 md:w-80 md:h-auto md:p-6 cursor-pointer disabled:opacity-70`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-2xl">
          {isLoading ? (
            <Icon icon="line-md:loading-twotone-loop" />
          ) : (
            <Icon icon={"lucide:test-tube-diagonal"} />
          )}
        </div>
        <span className="text-lg text-center">{text}</span>
      </button>
    </>
  );
};

export default QuickActionButton;
