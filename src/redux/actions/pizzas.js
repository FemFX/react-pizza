import axios from "axios";
import { SET_LOADED, SET_PIZZAS } from "../types";

export const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : ""}&_sort=${
        sortBy.type
      }&_order=${sortBy.order}`
    )
    .then((res) => {
      dispatch(setPizzas(res.data));
      dispatch(setLoaded(true));
    });
};

export const setPizzas = (items) => {
  return {
    type: SET_PIZZAS,
    payload: items,
  };
};
