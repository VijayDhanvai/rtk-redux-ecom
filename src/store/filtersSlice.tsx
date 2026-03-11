import { createSlice } from "@reduxjs/toolkit";

 interface FiltersState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  search: string;
  sortBy: string;
}

const initialState: FiltersState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 10000,
  rating: null,
  search: "",
  sortBy: "latest",
};

 const filtersSlice = createSlice({
    name : "filters",
    initialState,
    reducers : {
        filterByCategory(state, action) {
            state.category = action.payload;
        }, 
        filterByRating(state, action) {
            state.rating = action.payload;
        },
        filterByPriceRange(state, action) {
            state.minPrice = action.payload.min;
            state.maxPrice = action.payload.max;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        
    }

 })

export const { filterByCategory, filterByRating, filterByPriceRange, setSortBy} = filtersSlice.actions;
export default filtersSlice.reducer;