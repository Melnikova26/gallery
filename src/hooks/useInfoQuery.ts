import { useQuery } from "react-query";
import { getAuthors, getLocations, getPaintings } from "../services/fetcher";
import { useState } from "react";

const useInfoQuery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 12;

    const {data: authors}  = useQuery({
        queryFn: () => getAuthors(),
        queryKey: ['authors'],
        staleTime: 1000 * 5,
    });

    const {data: paintings, isLoading, isSuccess} = useQuery({
        queryFn: () => getPaintings(currentPage, limit),
        queryKey: ['paintings', currentPage],
        staleTime: 1000 * 5,
    });

    const {data: locations} = useQuery({
        queryFn: () => getLocations(),
        queryKey: ['locations'],
    });

    return({ authors, paintings: paintings?.data, totalPaintings: paintings?.totalPaintings, limit, locations, isLoading, isSuccess, currentPage, setCurrentPage});
}

export default useInfoQuery;