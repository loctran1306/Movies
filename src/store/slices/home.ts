import { createSlice } from "@reduxjs/toolkit";
import { homeMovieType } from "../../@types/home";
import fetchDataFromAPI from "../../utils/api";
import { dispatch } from "../store";

const initialState: homeMovieType = {
  page: 0,
  homeMoviesList: [],
  totalPage: 0,
  totalResult: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getHomeMoviesList(state, action) {
      state.homeMoviesList = action.payload;
    },
    getPage(state, action) {
      state.page = action.payload;
    },
    getTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    getTotalResult(state, action) {
      state.totalResult = action.payload;
    },
  },
});

export function getHomeMoviesList() {
  fetchDataFromAPI("/movie/popular").then((response) => {
    if (response) {
      dispatch(homeSlice.actions.getHomeMoviesList(response.results));
      dispatch(homeSlice.actions.getPage(response.page));
      dispatch(homeSlice.actions.getTotalPage(response.total_pages));
      dispatch(homeSlice.actions.getTotalResult(response.total_results));
    }
  });
}

export default homeSlice.reducer;
