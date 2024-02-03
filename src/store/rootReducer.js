import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import overlayReducer from "./overlaySlice";


const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  overlay: overlayReducer,
});

export default rootReducer;
