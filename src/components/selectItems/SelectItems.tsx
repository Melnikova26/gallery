import { useQuery, useQueryClient } from "react-query";
import SelectItem from "../selectItem/SelectItem";
import st from "./SelectItems.module.scss";
import {
  getAllPaintings,
  getAuthors,
  getLocations,
  getPaintings,
} from "../../services/fetcher";
import SelectCreatedItem from "../selectCreatedItem/SelectCreatedItem";
import useInfoQuery from "../../hooks/useInfoQuery";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { IPaintingsType } from "../cards/Cards";
import Pagination from "../pagination/Pagination";
import ClearSelect from "../customClearIndicator/CustomClearIndicator";
export interface ISelectValues {
  value: string;
  label: string;
}
export interface IAuthor {
  id: number;
  name: string;
}
export interface ILocation {
  id: number;
  location: string;
}

interface newFilterType {
  name?: string | undefined;
  author?: string | undefined;
  location?: string | undefined;
}

const SelectItems = () => {
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

  const { data: paintings } = useQuery({
    queryFn: () => getPaintings(currentPage, limit, filters),
    queryKey: ["paintings", filters],
    staleTime: 1000 * 5,
    keepPreviousData: true,
  });

  const totalPaintings = paintings?.totalPaintings || 0;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const paintingName: string = event.target.value.trim();
    const foundPainting = allPaintings.find(
      (painting: IPaintingsType) =>
        painting.name.toLowerCase() === paintingName.toLowerCase()
    );
    if (foundPainting) {
      setFilters((prevFilter) => ({
        ...prevFilter,
        name: foundPainting.name,
      }));
      setCurrentPage(1);
    }
    if (paintingName.trim().length === 0) {
      setFilters((prevFilter) => ({
        ...prevFilter,
        name: undefined,
      }));
    }
  };

  const handleAuthorChange = (value: string | null) => {
    if (value !== null) {
      const selectedAuthorID: number = authors.find(
        (author: IAuthor) => author.name === value
      ).id;
      setFilters((prevFilter) => ({
        ...prevFilter,
        authorId: selectedAuthorID,
      }));
      setCurrentPage(1);
    } else {
      setFilters((prevFilter) => ({
        ...prevFilter,
        authorId: undefined,
      }));
    }
  };

  const handleLocationChange = (value: string | null) => {
    if (value !== null) {
      const selectedLocationID: number = locations.find(
        (location: ILocation) => location.location === value
      ).id;
      setFilters((prevFilter) => ({
        ...prevFilter,
        locationId: selectedLocationID,
      }));
    } else {
      setFilters((prevFilter) => ({
        ...prevFilter,
        locationId: undefined,
      }));
    }
  };

  const authorsArray =
    authors?.map((author: IAuthor) => {
      return { value: author.name, label: author.name };
    }) || [];

  const locationsArray =
    locations?.map((location: ILocation) => {
      return { value: location.location, label: location.location };
    }) || [];

  return (
    <>
      <div className={st.selectsDisplay}>
        <input
          className={st.input}
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
        />
        <SelectItem
          name={"Author"}
          options={authorsArray}
          handleChangeFunc={(value) => handleAuthorChange(value)}
        />
        <SelectItem
          name={"Location"}
          options={locationsArray}
          handleChangeFunc={(value) => handleLocationChange(value)}
        />
        <SelectCreatedItem name={"Created"} setFilters={setFilters} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filters={filters}
        totalPaintings={totalPaintings}
      />
    </>
  );
};
export default SelectItems;
