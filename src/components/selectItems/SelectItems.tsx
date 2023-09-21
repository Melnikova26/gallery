import { useQuery } from "react-query";
import { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import SelectItem from "../selectItem/SelectItem";
import { getPaintings } from "../../services/fetcher";
import SelectCreatedItem from "../selectCreatedItem/SelectCreatedItem";
import useInfoQuery from "../../hooks/useInfoQuery";
import { IAuthor, IPaintingsType } from "../../types";
import Pagination from "../pagination/Pagination";
import { Theme, useTheme } from "../../context/ThemeContext";

import st from "./SelectItems.module.scss";

function SelectItems() {
  const {
    authors,
    locations,
    setFilters,
    filters,
    currentPage,
    setCurrentPage,
    limit,
    allPaintings,
  } = useInfoQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { theme } = useTheme();

  const { data: paintings } = useQuery({
    queryFn: () => getPaintings(currentPage, limit, filters),
    queryKey: ["paintings", filters],
    staleTime: 1000 * 5,
    keepPreviousData: true,
  });

  const totalPaintings = paintings?.totalPaintings || 0;

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const paintingName: string = event.target.value.trim();
      const foundPainting = allPaintings?.find(
        (painting: IPaintingsType) =>
          painting.name.toLowerCase() === paintingName.toLowerCase(),
      );

      if (foundPainting) {
        setFilters((prevFilter) => ({
          ...prevFilter,
          name: foundPainting.name,
        }));
      }
      if (paintingName.trim().length === 0) {
        setFilters((prevFilter) => ({
          ...prevFilter,
          name: undefined,
        }));
      }
    },
    [filters, currentPage],
  );

  const handleAuthorChange = useCallback(
    (value: string | null) => {
      if (value !== null) {
        const selectedAuthorID: number | undefined = authors?.find(
          (author: IAuthor) => author.name === value,
        )?.id;

        setFilters((prevFilter) => ({
          ...prevFilter,
          authorId: selectedAuthorID,
        }));
      } else {
        setFilters((prevFilter) => ({
          ...prevFilter,
          authorId: undefined,
        }));
      }
    },
    [authors, filters, currentPage],
  );

  const handleLocationChange = useCallback(
    (value: string | null) => {
      if (value !== null) {
        const selectedLocationID: number | undefined = locations?.find(
          (location) => location.location === value,
        )?.id;

        setFilters((prevFilter) => ({
          ...prevFilter,
          locationId: selectedLocationID,
        }));
        setCurrentPage(1);
      } else {
        setFilters((prevFilter) => ({
          ...prevFilter,
          locationId: undefined,
        }));
      }
    },
    [locations, filters, currentPage],
  );

  const authorsArray = useMemo(
    () =>
      authors?.map((author) => ({
        value: author.name,
        label: author.name,
      })) || [],
    [authors],
  );

  const locationsArray = useMemo(
    () =>
      locations?.map((location) => ({
        value: location.location,
        label: location.location,
      })) || [],
    [locations],
  );

  return (
    <div className={st.wrapper}>
      <div className={st.selectsDisplay}>
        <input
          className={`${st.input} ${
            theme === Theme.light ? st.light : st.dark
          }`}
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
        />
        <SelectItem
          name="Author"
          options={authorsArray}
          handleChangeFunc={(value) => handleAuthorChange(value)}
        />
        <SelectItem
          name="Location"
          options={locationsArray}
          handleChangeFunc={(value) => handleLocationChange(value)}
        />
        <SelectCreatedItem nameValue="Created" setFilters={setFilters} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filters={filters}
        totalPaintings={totalPaintings}
      />
    </div>
  );
}
export default SelectItems;
