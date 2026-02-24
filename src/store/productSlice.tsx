import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  // Add other product properties as needed
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as Product[],
    filters: {
      category: "All",
      priceRange: [0, 100],
      rating: 0,
    },
  },
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
  },
});
 
export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
