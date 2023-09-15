import { useQuery } from "react-query";
import { getAuthors, getLocations, getPaintings } from "../services/fetcher";
import { useEffect, useState } from "react";
import { ParamsType } from "../services/fetcher";

const useInfoQuery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ParamsType>();

  useEffect(() => {
    console.log("хук", filters);
  }, [filters]);

  const limit = 12;

  const { data: authors } = useQuery({
    queryFn: () => getAuthors(),
    queryKey: ["authors"],
    staleTime: 1000 * 5,
  });

  const {
    data: paintings,
    isLoading,
    isSuccess,
    isPreviousData,
  } = useQuery({
    queryFn: () => getPaintings(currentPage, limit, filters),
    queryKey: ["paintings", filters, currentPage],
    staleTime: 1000 * 5,
    keepPreviousData: true,
  });

  const { data: locations } = useQuery({
    queryFn: () => getLocations(),
    queryKey: ["locations"],
  });

  return {
    authors,
    paintings: paintings?.data,
    totalPaintings: paintings?.totalPaintings,
    limit,
    locations,
    isLoading,
    isSuccess,
    currentPage,
    setCurrentPage,
    isPreviousData,
    filters,
    setFilters,
  };
};

export default useInfoQuery;
