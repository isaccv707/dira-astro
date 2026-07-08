import { Icon } from "@iconify/react";
import { openModal } from "../../../stores/modalStore";
import { getAllBranches } from "../../../api/branchesApi/branchesApi";
import { useState } from "react";
import Button from "./Button";

interface QuickActionButtonProps {
  text: string;
  description?: string;
}

const QuickActionButton = ({ text, description }: QuickActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
    <Button
      type="button"
      onClick={handleOpenModal}
      disabled={isLoading}
      variant="tile"
      size="none"
      align="left"
      className="group w-full gap-4 p-5 md:w-80"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-secondary/10 text-2xl text-green-secondary transition-colors duration-300 group-hover:bg-green-secondary/20">
        {isLoading ? (
          <Icon icon="line-md:loading-twotone-loop" />
        ) : (
          <Icon icon="lucide:test-tube-diagonal" />
        )}
      </div>

      <div className="min-w-0">
        <span className="block text-base font-bold text-black-custom">
          {text}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs text-grey-custom">
            {description}
          </span>
        )}
      </div>
    </Button>
  );
};

export default QuickActionButton;
