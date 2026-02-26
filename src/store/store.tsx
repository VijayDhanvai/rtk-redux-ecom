import { configureStore } from "@reduxjs/toolkit";
 import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from "../services/productsApi";
import cartReducer from './cartSlice';
import filtersReducer from './filtersSlice';
import productSlice from "./productSlice";

function loadCart() {
  try {
    const json = localStorage.getItem("cart");
    if (json === null) return undefined;
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

function saveCart(cartState: unknown) {
  try {
    const json = JSON.stringify(cartState);
    localStorage.setItem("cart", json);
  } catch {
    // ignore write errors
  }
}
 const preloadedCart = loadCart();
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),

  preloadedState: {
    cart: preloadedCart,
  },
})

store.subscribe(() => {
  // only persist the cart slice
  saveCart(store.getState().cart);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch)
 