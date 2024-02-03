import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites = state.favorites.concat(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (prod) => prod._id !== action.payload._id
      );
    },
    resetFavorites: () => {
      return initialState;
    },
  },
});

export const { addToFavorites, removeFromFavorites, resetFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
