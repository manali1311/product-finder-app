import {
  ADD_PRODUCT,
  DELETE_MULTIPLE_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT,
} from "../constants";

const initialState = {
  products: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, [action.field]: action.value }
            : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case DELETE_MULTIPLE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          (product) => !action.payload.includes(product.id)
        ),
      };
    default:
      return state;
  }
};

export default ProductReducer;
