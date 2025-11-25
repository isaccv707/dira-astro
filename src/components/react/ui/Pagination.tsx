import clsx from "clsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    prevPage: () => void;
    nextPage: () => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange, nextPage, prevPage }: PaginationProps) => {
    if (totalPages < 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-between items-center mt-6 select-none">

            <nav aria-label="Pagination">
                <ul className="inline-flex items-center gap-1 text-sm">

                    <li>
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={clsx(
                                "flex items-center justify-center px-3 h-8 rounded-lg font-medium transition-all duration-200",
                                currentPage === 1
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-yellow-secondary text-white hover:bg-yellow-primary hover:scale-105"
                            )}
                        >
                            Previo
                        </button>
                    </li>

                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                aria-current={page === currentPage ? "page" : undefined}
                                className={clsx(
                                    "flex items-center justify-center px-3 h-8 rounded-md font-semibold transition-all duration-200",
                                    page === currentPage
                                        ? "bg-green-primary text-white shadow-sm scale-105"
                                        : "bg-yellow-primary text-white hover:bg-yellow-secondary hover:scale-105"
                                )}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={clsx(
                                "flex items-center justify-center px-3 h-8 rounded-lg font-medium transition-all duration-200",
                                currentPage === totalPages
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-green-primary text-white hover:bg-green-secondary hover:scale-105"
                            )}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>

            {/* 🔹 Indicador de progreso */}
            <div className="bg-green-secondary text-white font-semibold px-3 py-1 rounded-2xl text-sm shadow-inner">
                {`${currentPage} / ${totalPages}`}
            </div>
        </div>
    );
};

export default Pagination;
