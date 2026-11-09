import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import PostCard from "../../../components/react/cards/PostCard";
import PostCardSkeleton from "../../../components/react/skeleton/PostCardSkeleton";
import CatalogPagination from "../../../components/react/study/CatalogPagination";
import usePagination from "../../../hooks/usePagination";
import { useGetAllPosts } from "../../../hooks/useGetAllPosts";
import { Buttonstyles } from "../../../styles/buttonsStyles";

const LIMIT = 12;

const Posts = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { currentPage, setPage } = usePagination({
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

  const goToPage = (page: number) => {
    setPage(page);
    document.getElementById("articulos")?.scrollIntoView({ block: "start" });
  };

  if (isLoading) {
    return (
      <ul aria-busy="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <PostCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="rounded-clinical-md border border-ui-border bg-white px-6 py-12 text-center">
        <p className="font-semibold text-ink">No pudimos cargar los artículos.</p>
        <p className="mt-1 text-sm text-ink-muted">Revisa tu conexión e inténtalo de nuevo.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={`${Buttonstyles({ variant: "outline", size: "sm" })} mt-4`}
        >
          <RotateCw aria-hidden="true" className="h-4 w-4" />
          Reintentar
        </button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="rounded-clinical-md border border-dashed border-ui-border bg-white px-6 py-12 text-center text-ink-muted">
        Aún no hay artículos publicados. Vuelve pronto.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPagesForHook}
        getHref={() => "#articulos"}
        onNavigate={goToPage}
      />
    </div>
  );
};

export default Posts;
