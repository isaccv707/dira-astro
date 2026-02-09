import { useCallback, useState } from "react";

interface UseSearchStudiesParams {
    setPage: (page: number) => void
}
const useSearchStudies = ({ setPage }: UseSearchStudiesParams) => {
    const [search, setSearch] = useState("");

    const normalize = (v: string) => v.trim().replace(/\s+/g, " ");
    const handleSearchChange = useCallback((value: string) => {
        const next = normalize(value);

        setSearch((prev) => {
            const prevNorm = normalize(prev);
            if (prevNorm === next) return prev;
            return next;
        });

        setPage(1);
    }, [setPage]);
    return {
        search,
        handleSearchChange
    }
}

export default useSearchStudies
