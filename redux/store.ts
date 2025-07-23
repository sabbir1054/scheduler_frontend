import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// 🔥 Create and export store + persistor for use in your app
export const { store, persistor } = makeStore();

// 🔁 Type exports
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
