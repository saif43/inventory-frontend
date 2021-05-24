import {
  CREATE_PRODUCT,
  GET_MOVE_PRODUCT_HISTORY,
  GET_PRODUCT,
  GET_STOCK,
  SIGNED_OUT,
  GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE,
  GET_LOW_STOCK_PRODUCTS,
} from "../actions/types";

const INITIAL_STATE = {
  movehistory: [],
  stock: [],
  productInAllWarehouse: [],
  low_stock_products: [],
  detail: {
    image: null,
    name: "",
    stock: 0,
    buying_price: 0,
    selling_price: 0,
  },
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return state;

    case SIGNED_OUT:
      return INITIAL_STATE;

    case GET_STOCK:
      return { ...state, stock: action.payload };

    case GET_LOW_STOCK_PRODUCTS:
      return { ...state, low_stock_products: action.payload };

    case GET_PRODUCT:
      return { ...state, detail: action.payload };

    case GET_MOVE_PRODUCT_HISTORY:
      return { ...state, movehistory: action.payload };

    case GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE:
      return { ...state, productInAllWarehouse: action.payload };

    default:
      return state;
  }
};
