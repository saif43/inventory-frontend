import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALES_DUE_LIST,
  GET_SALES_REPORT,
  GET_SINGLE_SALE,
  PAY_SALE_DUE,
  SIGNED_OUT,
  SET_SALES_STATUS,
  GET_TODAY_TOTAL_SALE,
} from "../actions/types";

const INITIAL_STATE = {
  saleslist: [],
  report: [],
  salesDueList: [],
  today_total_sale: 0,
};

export const salesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SINGLE_SALE:
      return { ...state, transaction: action.payload };

    case SET_SALES_STATUS:
      return { ...state, transaction: action.payload };

    case GET_SALES_REPORT:
      return { ...state, report: action.payload };

    case SIGNED_OUT:
      return INITIAL_STATE;

    case GET_ALL_SALES:
      return { ...state, saleslist: action.payload };

    case GET_TODAY_TOTAL_SALE:
      return { ...state, today_total_sale: action.payload };

    case PAY_SALE_DUE:
      return { ...state, bill: action.payload };

    case CREATE_SALE:
      return { ...state };

    case GET_SALES_DUE_LIST:
      return { ...state, salesDueList: action.payload };

    default:
      return state;
  }
};
