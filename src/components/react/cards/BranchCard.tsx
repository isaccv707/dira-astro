import type { Branch } from "../../../interfaces/branch.interface";
import { getCloudinaryUrl } from "../../../utils/cloudinary";

interface BranchCardProps {
    branch: Branch;
    onSelect: () => void;
    isSelected?: boolean;
}

const BranchCard = ({ branch, onSelect, isSelected }: BranchCardProps) => {
    if (!branch) return null;

    return (
        <article
            className={[
                "branch-card group relative overflow-hidden rounded-3xl border transition-all duration-300 p-6 shadow-sm",
                isSelected
                    ? "border-green-secondary/50 bg-green-50/10 ring-1 ring-green-secondary/20 shadow-md"
                    : "border-gray-100 bg-white hover:-translate-y-1 hover:shadow-lg"
            ].join(" ")}
        >
            <div className={[
                "pointer-events-none absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-yellow-50/20 transition-opacity duration-300",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            ].join(" ")}></div>

            <div className="relative">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-green-secondary/10 px-3 py-1 text-xs font-bold text-green-secondary ring-1 ring-green-secondary/20">
                                {branch.state.name}
                            </span>
                        </div>
                        <h3 className="mt-3 text-xl font-extrabold text-gray-900 leading-tight">
                            {branch.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-gray-700 leading-relaxed">
                            {branch.address.street}, {branch.address.extNumber}{branch.address.intNumber ? ` Int. ${branch.address.intNumber}` : ''}, {branch.address.neighborhood}, CP {branch.address.zipCode}, {branch.address.city}
                        </p>
                        {branch.address.references && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500 bg-gray-50/80 p-2 rounded-xl border border-gray-100/50">
                                <span className="font-bold text-gray-400">Ref:</span>
                                <span>{branch.address.references}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                        href={branch.urlResults}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <span>Resultados</span>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>

                    <button
                        onClick={onSelect}
                        type="button"
                        className={[
                            "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition-all duration-300 focus:ring-2 focus:ring-green-500",
                            isSelected
                                ? "bg-green-secondary text-white shadow-md"
                                : "bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300"
                        ].join(" ")}
                    >
                        {isSelected ? "Ubicación en mapa" : "Ver en mapa"}
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <a
                        href={`https://wa.me/${branch.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-50 px-4 py-2.5 text-xs font-bold text-green-800 ring-1 ring-green-100 transition-all hover:bg-green-100"
                    >
                        WhatsApp
                    </a>

                    <a
                        href={`tel:${branch.phone.replace(/\D/g, '')}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-800 ring-1 ring-gray-100 transition-all hover:bg-gray-100"
                    >
                        Llamar
                    </a>
                </div>
            </div>
        </article>
    );
};

export default BranchCard;
