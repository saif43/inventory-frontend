import api from "../api/api";
import {
  CREATE_SHOP,
  SIGNED_IN,
  GET_SHOP,
  GET_ALL_SHOP_EXPENSE,
  CREATE_SHOP_EXPENSE,
  DELETE_EXPENSE,
  GET_ACCOUNT_PAYABLE,
  GET_ACCOUNT_RECEIVABLE,
  GET_RECENT_TRANSACTIONS,
  GET_RECENT_EXPENSE,
} from "./types";
import history from "./../history";

import { store } from "../store";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const createShop = (formValues) => async (dispatch) => {
  try {
    const response = await api.post(
      "shop/shop/",
      { ...formValues },
      getConfig()
    );

    if (response.status === 201) {
      dispatch({ type: SIGNED_IN, payload: { has_shop: true } });
      dispatch({ type: CREATE_SHOP, payload: { ...response.data } });
      history.push("/dashboard");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getShop = () => async (dispatch) => {
  try {
    const response = await api.get("shop/shop/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_SHOP, payload: { ...response.data[0] } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getRecentExpense = () => async (dispatch) => {
  try {
    const response = await api.get("shop/recent_expense/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_RECENT_EXPENSE, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getAccountPayable = () => async (dispatch) => {
  try {
    const response = await api.get("shop/account_payable/", getConfig());

    if (response.status === 200) {
      dispatch({
        type: GET_ACCOUNT_PAYABLE,
        payload: response.data.payable,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getAccountReceivable = () => async (dispatch) => {
  try {
    const response = await api.get("shop/account_receivable/", getConfig());

    if (response.status === 200) {
      dispatch({
        type: GET_ACCOUNT_RECEIVABLE,
        payload: response.data.receivable,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getRecentTransactions = (number) => async (dispatch) => {
  try {
    const response = await api.get(`shop/transaction/${number}`, getConfig());

    if (response.status === 200) {
      dispatch({
        type: GET_RECENT_TRANSACTIONS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createShopExpense = (formValues) => async (dispatch) => {
  try {
    const response = await api.post(
      "shop/expense/",
      { ...formValues },
      getConfig()
    );

    if (response.status === 201) {
      dispatch({ type: CREATE_SHOP_EXPENSE, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const GetAllShopExpense = () => async (dispatch) => {
  try {
    const response = await api.get("shop/expense/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ALL_SHOP_EXPENSE, payload: response.data });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/shop/expense/${id}/`, getConfig());

    if (response.status === 204) {
      dispatch({ type: DELETE_EXPENSE, payload: id });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const updateExpense = (id, updateset) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/shop/expense/${id}/`,
      { ...updateset },
      getConfig()
    );

    if (response.status === 200) {
      history.push("/shop/expense");
    }
  } catch (error) {
    console.log(error.response);
  }
};
