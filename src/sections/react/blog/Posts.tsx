import { useEffect, useState } from "react";
import PostCard from "../../../components/react/cards/PostCard";
import Pagination from "../../../components/react/ui/Pagination";
import usePagination from "../../../hooks/usePagination";
import { useGetAllPosts } from "../../../hooks/useGetAllPosts";

const LIMIT = 5;

const Posts = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { currentPage, nextPage, prevPage, setCurrentPage, setPage } =
    usePagination({
      totalPages: totalPagesForHook,
      initialPage: 1,
    });

  const { posts, totalPages } = useGetAllPosts({
    page: currentPage,
    limit: LIMIT,
  });

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  return (
    <div className="container">
      <div
        className="grid gap-6 
              sm:grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3
              xl:grid-cols-4"
      >
        {posts.map((post, index) => (
          <div key={index} className="h-full">
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <div className="self-end bg-green-light px-3 py-1 text-sm font-semibold text-white shadow-inner rounded-2xl sm:self-auto">
          {`${currentPage} / ${totalPages || 1}`}
        </div>
      </div>
    </div>
  );
};

export default Posts;
