import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const headers = {
  accept: "application/json",
  Authorization: "Bearer " + TMDB_TOKEN,
};

const fetchDataFromAPI = async (url: string, params?: any) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default fetchDataFromAPI;
