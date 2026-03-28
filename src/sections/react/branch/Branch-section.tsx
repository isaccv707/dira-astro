import { useState, useEffect } from "react";
import { useGetAllBranchesQuery } from "../../../api/branchesApi/branchesApi";
import BranchCard from "../../../components/react/cards/BranchCard";
import MapCard from "../../../components/react/cards/MapCard";
import type { Branch } from "../../../interfaces/branch.interface";

const BranchSection = () => {
    const { data: branches, isLoading } = useGetAllBranchesQuery();
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    useEffect(() => {
        if (branches && branches.length > 0 && !selectedBranch) {
            setSelectedBranch(branches[0]);
        }
    }, [branches, selectedBranch]);

    const handleSelectBranch = (branch: Branch) => {
        setSelectedBranch(branch);
        // Scroll to map on mobile if needed
        if (window.innerWidth < 1024) {
            const mapElement = document.getElementById('map-card-container');
            if (mapElement) {
                mapElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-secondary"></div>
            </div>
        );
    }

    return (
        <section className="">
            <header className="mb-14">
                <p className="inline-flex items-center gap-2 rounded-full border border-green-secondary/60 bg-green-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-green-secondary">
                    Ubicaciones
                    <span className="h-1 w-1 rounded-full bg-green-secondary"></span>
                    DYRA Laboratorio
                </p>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-yellow-secondary sm:text-4xl lg:text-5xl">
                    Nuestras sucursales a
                    <span className="block bg-gradient-to-r from-green-primary via-green-secondary to-yellow-primary bg-clip-text text-transparent">
                        tu alcance en todo momento.
                    </span>
                </h1>

                <p className="mt-4 max-w-xl text-pretty text-sm text-gray-600 sm:text-base">
                    Contamos con múltiples puntos de atención para tu comodidad. Cada una de nuestras sucursales cumple con los más altos estándares de calidad y tecnología.
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    {branches?.map((branch: Branch) => (
                        <BranchCard 
                            key={branch.id} 
                            branch={branch} 
                            onSelect={() => handleSelectBranch(branch)}
                            isSelected={selectedBranch?.id === branch.id}
                        />
                    ))}
                </div>

                <div id="map-card-container" className="lg:sticky lg:top-24 h-fit">
                    {selectedBranch && <MapCard branch={selectedBranch} />}
                </div>
            </div>
        </section>
    );
};

export default BranchSection;
