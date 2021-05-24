import {
  CREATE_SHOP,
  GET_ALL_SHOP_EXPENSE,
  CREATE_SHOP_EXPENSE,
  GET_SHOP,
  SIGNED_OUT,
  DELETE_EXPENSE,
  GET_ACCOUNT_PAYABLE,
  GET_ACCOUNT_RECEIVABLE,
  GET_RECENT_TRANSACTIONS,
  GET_RECENT_EXPENSE,
} from "../actions/types";

const INITIAL_STATE = {
  shopExpenselist: [],
  shopDetail: { shopname: "" },
  accountPayable: 0,
  accountReceivable: 0,
  recentTransactions: [],
  today_expense: 0,
  this_month_expense: 0,
};

export const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SHOP:
      return { ...state, shopDetail: action.payload };

    case SIGNED_OUT:
      return INITIAL_STATE;

    case GET_SHOP:
      return { ...state, shopDetail: action.payload };

    case GET_ACCOUNT_PAYABLE:
      return { ...state, accountPayable: action.payload };

    case GET_ACCOUNT_RECEIVABLE:
      return { ...state, accountReceivable: action.payload };

    case GET_RECENT_TRANSACTIONS:
      return { ...state, recentTransactions: action.payload };

    case GET_ALL_SHOP_EXPENSE:
      return { ...state, shopExpenselist: action.payload };

    case GET_RECENT_EXPENSE:
      return {
        ...state,
        today_expense: action.payload.today_expense,
        this_month_expense: action.payload.this_month_expense,
      };

    case CREATE_SHOP_EXPENSE:
      return {
        ...state,
        ...state.shopExpenselist.unshift(action.payload),
      };

    case DELETE_EXPENSE:
      const newShopExpenselist = state.shopExpenselist.filter(
        (x) => x.id !== action.payload
      );

      return {
        ...state,
        shopExpenselist: newShopExpenselist,
      };

    default:
      return state;
  }
};
