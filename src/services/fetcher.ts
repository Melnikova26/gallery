import axios from "axios";

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

export const getPaintings = async (page: number, limit: number) => {
  const result = await client.get(`/paintings?_page=${page}&_limit=${limit}`);
  const totalPaintings = parseInt(result.headers["x-total-count"], 10);
  return { data: result.data, totalPaintings };
};
