import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Simple product type from API; we only care about id/title/price in cart
// but the slice is permissive to allow extra fields that may be displayed.

type Product = { id: number; title?: string; price?: number | string } &
  Record<string, any>;

type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      // const existing = state.items.find((i) => i.id === product.id);
      // if (existing) {
      //   existing.quantity += 1;
      // } else {
        state.items.push({ ...product, quantity: 1 });
      // }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity = Math.max(0, item.quantity - 1);
      }
      item?.quantity === 0 && (
        state.items = state.items.filter(i => i.id !== action.payload)
      )
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
