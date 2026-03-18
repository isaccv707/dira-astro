import { useGetAllStudiesQuery } from "../../../../api/studiesApi/StudyApi";


interface useGetAllStudiesProps {
    page: number;
    limit: number;
    search?: string;
}

const useGetAllStudies = ({ limit, page, search }: useGetAllStudiesProps) => {

    const { data, isLoading, isFetching, isError, error } = useGetAllStudiesQuery({ page, limit, search }, {
        refetchOnMountOrArgChange: true,
    });

    const studies = data?.items ?? [];
    const meta = data?.meta;

    const totalStudies = meta?.total ?? 1

    return {
        studies,
        meta,
        totalPages: meta?.totalPages ?? 1,
        totalStudies,
        isLoading,
        isFetching,
        isError,
        error,
    }
}

export default useGetAllStudies
