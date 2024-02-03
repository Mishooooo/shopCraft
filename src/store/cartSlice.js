import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = state.cart.concat(action.payload);
    },
    removeFromCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        // Remove products with IDs present in action.payload
        state.cart = state.cart.filter(
          (prod) => !action.payload.includes(prod._id)
        );
        return;
      }
      state.cart = state.cart.filter((prod) => prod._id !== action.payload._id);
    },
    resetCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
