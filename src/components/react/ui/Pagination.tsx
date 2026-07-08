import Button from "../buttons/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  nextPage,
  prevPage,
}: PaginationProps) => {
  if (totalPages < 1) return null;

  const MAX_VISIBLE = 7;
  const half = Math.floor(MAX_VISIBLE / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + MAX_VISIBLE - 1);

  // reajuste si estamos cerca del final
  start = Math.max(1, end - MAX_VISIBLE + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav aria-label="Pagination" className="select-none">
      <ul className="inline-flex items-center gap-1 text-sm">
        <li>
          <Button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="outline"
            size="xs"
            text="Previo"
          />
        </li>

        {pages.map((page) => (
          <li key={page}>
            <Button
              type="button"
              onClick={() => onPageChange(page)}
              ariaCurrent={page === currentPage ? "page" : undefined}
              variant={page === currentPage ? "primary" : "outline"}
              size="xs"
              text={String(page)}
            />
          </li>
        ))}

        <li>
          <Button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            variant="primary"
            size="xs"
            text="Siguiente"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
