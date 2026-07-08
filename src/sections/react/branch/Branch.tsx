import { useState, useEffect } from "react";
import { getOneBranch } from "../../../api/branchesApi/branchesApi";
import BranchCard from "../../../components/react/cards/BranchCard";
import MapCard from "../../../components/react/cards/MapCard";
import { getStoredBranchId } from "../../../stores/branchStore";

const BranchSection = () => {
  const [branchData, setBranchData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedBranchId = getStoredBranchId();
    if (savedBranchId) {
      getOneBranch(savedBranchId)
        .then((data) => {
          setBranchData(data);
        })
        .catch((err) => console.error("Error al traer la sucursal:", err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-400px items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-secondary"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <BranchCard branch={branchData} />
        </div>

        <div id="map-card-container" className="lg:sticky lg:top-24 h-fit">
          {branchData && <MapCard branch={branchData} />}
        </div>
      </div>
    </section>
  );
};

export default BranchSection;
