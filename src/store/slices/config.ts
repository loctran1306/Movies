import { createSlice } from "@reduxjs/toolkit";
import fetchDataFromAPI from "../../utils/api";
import { dispatch } from "../store";

type urlConfigType = {
  url: {
    backdrop: string;
    poster: string;
    profile: string;
  };
  genres: any;
};

const initialState: urlConfigType = {
  url: {
    backdrop: "",
    poster: "",
    profile: "",
  },
  genres: {},
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    getUrlConfig(state, action) {
      state.url = action.payload;
    },
    getGenres(state, action) {
      state.genres = action.payload;
    },
  },
});

export function getConfigUrlApi() {
  fetchDataFromAPI("/configuration").then((response) => {
    if (response) {
      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original",
      };
      dispatch(configSlice.actions.getUrlConfig(url));
    }
  });
}
export const getGenresMovies = async () => {
  const promises: any = [];
  const endPoints = ["tv", "movie"];
  const allGenres: any = {};
  endPoints.forEach((url) => {
    promises.push(fetchDataFromAPI(`/genre/${url}/list`));
  });
  const data = await Promise.all(promises);
  data.map(({ genres }) => {
    return genres.map((item: any) => (allGenres[item.id] = item));
  });
  dispatch(configSlice.actions.getGenres(allGenres));
};
export default configSlice.reducer;
