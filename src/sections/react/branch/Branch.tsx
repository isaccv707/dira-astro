import { useState, useEffect } from "react";
import { Store, MapPin } from "lucide-react";
import { getOneBranch } from "../../../api/branchesApi/branchesApi";
import BranchCard from "../../../components/react/cards/BranchCard";
import MapCard from "../../../components/react/cards/MapCard";
import Button from "../../../components/react/buttons/Button";
import {
  getStoredBranchId,
  openBranchSelectorModal,
} from "../../../stores/branchStore";
import type { Branch } from "../../../interfaces/branch.interface";

const BranchSection = () => {
  const [branchData, setBranchData] = useState<Branch | null>(null);

  useEffect(() => {
    const savedBranchId = getStoredBranchId();

    if (savedBranchId) {
      getOneBranch(savedBranchId)
        .then((data) => {
          setBranchData(data);
        })
        .catch((err) => console.error("Error al traer la sucursal:", err));
    }
  }, []);

  const handleOpenModal = async () => {
    try {
      await openBranchSelectorModal();
    } catch (error) {
      console.error("Error al abrir el selector de sucursales:", error);
    }
  };


  return (
    <section className="space-y-8">
      {/* Switch-branch module */}
      <div className="flex flex-col items-start gap-5 rounded-clinical-md border border-ui-border bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-clinical-md bg-green-primary/8 text-brand-ink">
            {branchData ? (
              <Store className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <MapPin className="h-6 w-6" strokeWidth={1.75} />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-ink">
              {branchData
                ? "Sucursal seleccionada"
                : "Ninguna sucursal seleccionada"}
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-ink">
              {branchData
                ? branchData.name
                : "Elige la sucursal más cercana a ti"}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {branchData
                ? "Precios, estudios y resultados se ajustan a esta sucursal."
                : "Así verás precios, estudios y resultados de tu zona."}
            </p>
          </div>
        </div>

        <Button
          type="button"
          text={branchData ? "Cambiar de sucursal" : "Elegir sucursal"}
          icon="lucide:store"
          onClick={handleOpenModal}
          width="auto"
          className="shrink-0"
        />
      </div>

      {/* Selected branch detail */}
      {branchData && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-6">
            <BranchCard branch={branchData} />
          </div>

          <div id="map-card-container" className="h-fit min-w-0 lg:sticky lg:top-24">
            <MapCard branch={branchData} />
          </div>
        </div>
      )}
    </section>
  );
};

export default BranchSection;
