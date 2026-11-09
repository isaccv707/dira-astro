import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  /** Real URL of each page, so crawlers and "open in new tab" work. */
  getHref: (page: number) => string;
  onNavigate: (page: number) => void;
}

const MAX_VISIBLE = 5;

const pageWindow = (current: number, total: number): number[] => {
  const half = Math.floor(MAX_VISIBLE / 2);
  const end = Math.min(total, Math.max(current + half, MAX_VISIBLE));
  const start = Math.max(1, end - MAX_VISIBLE + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const linkBase =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-clinical-sm px-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary";

/** Link-based pagination: plain <a href> enhanced with client-side navigation. */
const CatalogPagination = ({
  currentPage,
  totalPages,
  getHref,
  onNavigate,
}: CatalogPaginationProps) => {
  if (totalPages <= 1) return null;

  const go = (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(page);
  };

  const step = (page: number, label: string, children: React.ReactNode) =>
    page < 1 || page > totalPages ? (
      <span aria-disabled="true" className={clsx(linkBase, "text-ink-subtle/60")}>
        {children}
      </span>
    ) : (
      <a
        href={getHref(page)}
        onClick={go(page)}
        rel={label === "Anterior" ? "prev" : "next"}
        className={clsx(linkBase, "text-ink hover:bg-green-primary/8 hover:text-brand-ink")}
      >
        {children}
      </a>
    );

  return (
    <nav
      aria-label="Páginas del catálogo"
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-sm text-ink-muted tabular-nums">
        Página {currentPage} de {totalPages}
      </p>
      <ul className="flex items-center gap-1">
        <li>
          {step(
            currentPage - 1,
            "Anterior",
            <>
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Anterior</span>
            </>,
          )}
        </li>
        {pageWindow(currentPage, totalPages).map((page) => (
          <li key={page}>
            <a
              href={getHref(page)}
              onClick={go(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Página ${page}`}
              className={clsx(
                linkBase,
                "tabular-nums",
                page === currentPage
                  ? "bg-green-secondary text-black-custom"
                  : "text-ink hover:bg-green-primary/8 hover:text-brand-ink",
              )}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          {step(
            currentPage + 1,
            "Siguiente",
            <>
              <span className="sr-only sm:not-sr-only">Siguiente</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </>,
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CatalogPagination;
