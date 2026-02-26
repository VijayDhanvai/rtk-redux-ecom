import { createSlice } from "@reduxjs/toolkit";

 

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    loadProduct(state, action) {
      state.items = action.payload;
    },
  },
});
 
export const { loadProduct } = productSlice.actions;
export default productSlice.reducer;
