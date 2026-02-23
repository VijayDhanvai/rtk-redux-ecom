import { configureStore } from "@reduxjs/toolkit";
 import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from "../services/productsApi";

 
export const store = configureStore({
  reducer: {
    // products : productSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})


setupListeners(store.dispatch)
 