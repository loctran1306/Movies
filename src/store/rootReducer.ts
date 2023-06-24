import { combineReducers } from "@reduxjs/toolkit";
import homeMoviesReducer from "./slices/home";
import configUrlReducer from "./slices/config";

import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  homeMovies: homeMoviesReducer,
  configUrl: configUrlReducer,
});

export { rootPersistConfig, rootReducer };
