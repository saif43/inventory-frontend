import {
  CREATE_ORDER,
  GET_ALL_ORDERS,
  GET_ORDER_DUE_LIST,
  GET_ORDER_REPORT,
  GET_SINGLE_ORDER,
  RESET_SINGLE_ORDER,
  PAY_ORDER_DUE,
  RECEIVE_ORDER,
  SIGNED_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  transaction: {
    cart: [],
    bill: 0,
    product_received: null,
  },
  report: [],
  orderlist: [],
  orderDueList: [],
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return { ...state, transaction: action.payload };

    case RESET_SINGLE_ORDER:
      return {
        ...state,
        transaction: {
          cart: [],
          bill: 0,
          product_received: null,
        },
      };

    case GET_ORDER_REPORT:
      return { ...state, report: action.payload };

    case RECEIVE_ORDER:
      return {
        ...state,
        transaction: { ...state.transaction, ...action.payload },
      };

    case GET_ALL_ORDERS:
      return { ...state, orderlist: action.payload };

    case PAY_ORDER_DUE:
      return { ...state, bill: action.payload };

    case CREATE_ORDER:
      return { ...state };

    case GET_ORDER_DUE_LIST:
      return { ...state, orderDueList: action.payload };

    case SIGNED_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
