import axios from "axios";

export interface ParamsType {
  name?: string;
  authorId?: number;
  locationId?: number;
  from?: number;
  to?: number;
}

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

// export const getPaintings = async (
//   page: number,
//   limit: number,
//   filters?: ParamsType
// ) => {
//   const result = await client.get(`/paintings?_page=${page}&_limit=${limit}`, {
//     params: filters,
//   });
//   const totalPaintings = parseInt(result.headers["x-total-count"], 10);
//   return { data: result.data, totalPaintings };
// };

// export const getAllPaintings = async () => {
//   const result = await client.get("/paintings");
//   return result.data;
// };

// export const getPaintings = async (page: number, limit: number) => {

//   const result = await client.get(`/paintings?_page=${page}&_limit=${limit}`);
//   const totalPaintings = parseInt(result.headers["x-total-count"], 10);
//   return { data: result.data, totalPaintings };
// };
export const getPaintings = async (
  page: number,
  limit: number,
  filters?: ParamsType
) => {
  const { from, to, ...otherFilters } = filters || {};
  const queryParams: Record<string, any> = {
    _page: page,
    _limit: limit,
    ...otherFilters,
  };

  if (from) {
    queryParams["created_gte"] = from;
  }

  if (to) {
    queryParams["created_lte"] = to;
  }

  try {
    const result = await client.get("/paintings", {
      params: queryParams,
    });

    const totalPaintings = parseInt(result.headers["x-total-count"], 10);

    return { data: result.data, totalPaintings };
  } catch (error) {
    console.error("Error fetching paintings:", error);
    throw error;
  }
};
