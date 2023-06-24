import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  TypedUseSelectorHook,
  useSelector as useSelectorApp,
  useDispatch as useDispatchApp,
} from "react-redux";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

// Selector
export type RootState = ReturnType<typeof rootReducer>;
const useSelector: TypedUseSelectorHook<RootState> = useSelectorApp;

// Dispatch and useDispatch
const { dispatch } = store;

export type AppDispatch = typeof store.dispatch;
const useDispatch = () => useDispatchApp<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
