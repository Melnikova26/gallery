import axios from "axios";
import { ParamsType } from "../types";

export const baseURL = "https://test-front.framework.team";
const client = axios.create({ baseURL });

export const getAuthors = async () => {
  const result = await client.get("authors");
  return result.data;
};

export const getLocations = async () => {
  const result = await client.get("locations");
  return result.data;
};

export const getAllPaintings = async () => {
  const result = await client.get("/paintings");
  return result.data;
};

export const getPaintings = async (
  page: number,
  limit: number,
  filters?: ParamsType,
) => {
  const { from, to, ...otherFilters }: ParamsType = filters || {};
  const queryParams: Record<string, any> = {
    _page: page,
    _limit: limit,
    ...otherFilters,
  };

  if (from) {
    queryParams.created_gte = from;
  }

  if (to) {
    queryParams.created_lte = to;
  }
  const otherFiltersKeys = Object.keys(otherFilters) as (keyof Omit<
    ParamsType,
    "from" | "to"
  >)[];

  otherFiltersKeys.forEach((otherFilter) => {
    if (!otherFilters[otherFilter]) {
      delete queryParams[otherFilter];
    }
  });

  const result = await client.get("/paintings", {
    params: queryParams,
  });

  const totalPaintings = parseInt(result.headers["x-total-count"], 10);
  return { data: result.data, totalPaintings };
};
