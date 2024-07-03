import {
  ADD_PRODUCT,
  DELETE_MULTIPLE_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT,
} from "../constants";

export const getProduct = (product) => ({
  type: GET_PRODUCT,
  payload: product,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const editProduct = (id, field, value) => ({
  type: EDIT_PRODUCT,
  id,
  field,
  value,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const deleteMultipleProducts = (ids) => ({
  type: DELETE_MULTIPLE_PRODUCTS,
  payload: ids,
});
