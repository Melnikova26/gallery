import { useQuery } from "react-query";
import { useState } from "react";
import {
  getAllPaintings,
  getAuthors,
  getLocations,
  getPaintings,
} from "../services/fetcher";
import { ParamsType } from "../types";

const useInfoQuery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ParamsType>();

  const limit = 12;

  const { data: authors } = useQuery({
    queryFn: () => getAuthors(),
    queryKey: ["authors"],
    staleTime: 1000 * 5,
  });

  const { data: paintings, isPreviousData } = useQuery({
    queryFn: () => getPaintings(currentPage, limit, filters),
    queryKey: ["paintings", filters, currentPage],
    staleTime: 1000 * 5,
    keepPreviousData: true,
  });

  const { data: allPaintings } = useQuery({
    queryFn: () => getAllPaintings(),
    queryKey: "allPaintings",
    staleTime: 1000 * 5,
    keepPreviousData: true,
  });

  const { data: locations } = useQuery({
    queryFn: () => getLocations(),
    queryKey: ["locations"],
  });

  return {
    authors,
    limit,
    locations,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    allPaintings,
  };
};

export default useInfoQuery;
