import { useEffect, useState } from "react";
import PostCard from "../../../components/react/cards/PostCard";
import PostCardSkeleton from "../../../components/react/skeleton/PostCardSkeleton";
import Pagination from "../../../components/react/ui/Pagination";
import Button from "../../../components/react/buttons/Button";
import usePagination from "../../../hooks/usePagination";
import { useGetAllPosts } from "../../../hooks/useGetAllPosts";

const LIMIT = 12;

const Posts = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });

  const { posts, totalPages, isLoading, error } = useGetAllPosts({
    page: currentPage,
    limit: LIMIT,
  });

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: LIMIT }).map((_, index) => (
            <div key={`skeleton-${index}`} className="h-full">
              <PostCardSkeleton />
            </div>
          ))
        ) : error ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-clinical-lg border-2 border-dashed border-ui-border bg-ui-bg/50 py-32 text-center">
            <div className="mb-6 rounded-full bg-white p-6 shadow-sm shadow-ui-border/50">
              <svg
                className="h-16 w-16 text-ui-border"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-8.25 3h.008v.008h-.008V12z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-green-light">
              No pudimos cargar los artículos
            </h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-grey-custom">
              Ocurrió un error al conectar con el servidor. Intenta de nuevo
              en unos momentos.
            </p>
            <Button
              type="button"
              onClick={() => window.location.reload()}
              variant="primary"
              text="Reintentar"
              className="mt-8"
            />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post.id}
              className="h-full motion-safe:animate-fade-up"
              style={{ animationDelay: `${(index % 4) * 100}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-clinical-lg border-2 border-dashed border-ui-border bg-ui-bg/50 py-32 text-center">
            <div className="mb-6 rounded-full bg-white p-6 shadow-sm shadow-ui-border/50">
              <svg
                className="h-16 w-16 text-ui-border"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-green-light">
              Aún no hay artículos publicados
            </h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-grey-custom">
              Estamos preparando contenido sobre salud y diagnóstico clínico.
              Vuelve pronto.
            </p>
          </div>
        )}
      </div>

      {!isLoading && !error && posts && posts.length > 0 && (
        <div className="mt-8 flex flex-col items-center justify-between gap-8 rounded-clinical-lg border border-ui-border bg-ui-bg/50 p-8 sm:flex-row">
          <div className="order-2 sm:order-1">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPagesForHook}
              onPageChange={setPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>

          <div className="order-1 flex items-center gap-3 rounded-clinical-md border border-ui-border bg-white px-5 py-2.5 shadow-xs sm:order-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-custom">
              Página
            </span>
            <span className="text-sm font-black text-green-light">
              {currentPage}
            </span>
            <span className="text-grey-custom/50">/</span>
            <span className="text-sm font-black text-grey-custom">
              {totalPagesForHook}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
