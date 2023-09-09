import axios from "axios";

export const baseURL = "https://test-front.framework.team";
const client = axios.create({baseURL});

export const getAuthors = async () => {
    const result = await client.get('authors');
    return result.data;
};

export const getLocations = async () => {
    const result = await client.get('/locations');
    return result.data;
};

export const getPaintings = async () => {
    const result = await client.get('paintings');
    return result.data;
};