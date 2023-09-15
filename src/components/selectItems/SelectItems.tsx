import { useQuery, useQueryClient } from "react-query";
import SelectItem from "../selectItem/SelectItem";
import st from "./SelectItems.module.scss";
import { getAuthors, getLocations, getPaintings } from "../../services/fetcher";
import SelectCreatedItem from "../selectCreatedItem/SelectCreatedItem";
import useInfoQuery from "../../hooks/useInfoQuery";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { IPaintingsType } from "../cards/Cards";
import Pagination from "../pagination/Pagination";
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
    paintings,
    currentPage,
    setCurrentPage,
  } = useInfoQuery();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(["paintings", currentPage, filters]);
    console.log("это с select", filters);
  }, [filters]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const paintingName: string = event.target.value.trim();
    const foundPainting = paintings.find(
      (painting: IPaintingsType) =>
        painting.name.toLowerCase() === paintingName.toLowerCase()
    );
    if (foundPainting) {
      setFilters((prevFilter) => ({
        ...prevFilter,
        name: foundPainting.name,
      }));
    }
  };

  const handleAuthorChange = (value: string) => {
    const selectedAuthorID: number = authors.find(
      (author: IAuthor) => author.name === value
    ).id;
    setFilters((prevFilter) => ({
      ...prevFilter,
      authorId: selectedAuthorID,
    }));
  };

  const handleLocationChange = (value: string) => {
    const selectedLocationID: number = locations.find(
      (location: ILocation) => location.location === value
    ).id;
    setFilters((prevFilter) => ({
      ...prevFilter,
      locationId: selectedLocationID,
    }));
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
      />
    </>
  );
};
export default SelectItems;
