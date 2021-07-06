import { SET_SORT_BY, SET_CATEGORY } from "../types";

export const setSortBy = ({ type, order }) => {
  return {
    type: SET_SORT_BY,
    payload: { type, order },
  };
};
export const setCategory = (catIndex) => {
  return {
    type: SET_CATEGORY,
    payload: catIndex,
  };
};
