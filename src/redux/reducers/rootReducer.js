import { combineReducers } from "redux";
import filters from "./filterReducer";
import pizzas from "./pizzaReducer";
import cart from "./cartReducer";

export const rootReducer = combineReducers({
  filters,
  pizzas,
  cart,
});
