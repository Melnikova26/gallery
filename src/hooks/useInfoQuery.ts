import { useQuery } from "react-query";
import { getAuthors, getLocations, getPaintings } from "../services/fetcher";

const useInfoQuery = () => {
    const {data: authors} = useQuery({
        queryFn: () => getAuthors(),
        queryKey: ['authors'],
        staleTime: 1000 * 5,
    });

    const {data: paintings, isLoading, isSuccess} = useQuery({
        queryFn: () => getPaintings(),
        queryKey: ['paintings'],
        staleTime: 1000 * 5,
    });

    const {data: locations} = useQuery({
        queryFn: () => getLocations(),
        queryKey: ['locations'],
    });

    return({ authors, paintings, locations, isLoading, isSuccess});
}

export default useInfoQuery;