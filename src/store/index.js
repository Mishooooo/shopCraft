import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { createSelector } from "reselect";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore warning about onConfirm, because those passed functions already handles possible errors by themselves.
        ignoredActions: ["overlay/setOverlay"],
        ignoredActionPaths: ["payload.onConfirm"],
        ignoredPaths: ["overlay.onConfirm"],
      },
    }),
});

export default store;

const selectFavorites = (state) => state.favorites.favorites;
const selectCart = (state) => state.cart.cart;

export const selectFavoritesAndCart = createSelector(
  selectFavorites,
  selectCart,
  (favorites, cart) => ({favorites, cart})
);
