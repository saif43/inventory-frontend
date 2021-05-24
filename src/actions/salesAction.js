import api from "../api/api";
import {
  CREATE_SALE,
  GET_ALL_SALES,
  GET_SALES_DUE_LIST,
  GET_SALES_REPORT,
  GET_SINGLE_SALE,
  PAY_SALE_DUE,
  SET_SALES_STATUS,
  GET_TODAY_TOTAL_SALE,
} from "./types";
import history from "../history";

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

export const getAllSales = () => async (dispatch) => {
  try {
    const response = await api.get("shop/customer_transactions/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ALL_SALES, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSpecificCustomerTransactions = (id) => async (dispatch) => {
  try {
    const response = await api.get(
      `shop/customer_transactions/?search=${id}`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: GET_ALL_SALES, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSalesReport = (type) => async (dispatch) => {
  try {
    const response = await api.get(`shop/sell_report/${type}/`, getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_SALES_REPORT, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSingleSale = (id) => async (dispatch) => {
  try {
    const cart_response = await api.get(
      `shop/customer_transactions_detail/?search=${id}`,
      getConfig()
    );

    const bill_response = await api.get(
      `shop/customer_bill/?search=${id}`,
      getConfig()
    );

    if (cart_response.status === 200 && bill_response.status === 200) {
      dispatch({
        type: GET_SINGLE_SALE,
        payload: {
          cart: Object.values(cart_response.data),
          bill: bill_response.data[0],
        },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getDueList = () => async (dispatch) => {
  try {
    const response = await api.get("shop/customer_bill_due/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_SALES_DUE_LIST, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getTodayTotalSale = () => async (dispatch) => {
  try {
    const response = await api.get("shop/sale_amount_today/", getConfig());

    if (response.status === 200) {
      dispatch({
        type: GET_TODAY_TOTAL_SALE,
        payload: response.data.total_sale,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const setSalesStatus = (id, status) => async (dispatch) => {
  try {
    const response = await api.patch(
      `shop/customer_transactions/${id}/`,
      { status },
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: SET_SALES_STATUS, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const payDue = (bill_id, paid) => async (dispatch) => {
  try {
    const response = await api.put(
      `shop/customer_bill/${bill_id}/`,
      { paid },
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: PAY_SALE_DUE, payload: { ...response.data } });
      history.push("/sales/all/");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createSale = (customer_id, cart, paid) => async (dispatch) => {
  try {
    const transaction_init_response = await api.post(
      "shop/customer_transactions/",
      { customer: customer_id },
      getConfig()
    );

    if (transaction_init_response.status === 201) {
      const order_id = transaction_init_response.data.id;

      cart.forEach(async (product) => {
        let data = {
          order: order_id,
          product: product.id,
          custom_selling_price: product.selling_price,
          quantity: parseInt(product.quantity),
        };

        await api.post("shop/customer_transactions_detail/", data, getConfig());
      });

      const bill = await api.get(
        `shop/customer_bill/?search=${order_id}`,
        getConfig()
      );

      const bill_id = bill.data[0].id;

      const response = await api.put(
        `shop/customer_bill/${bill_id}/`,
        { paid: paid },
        getConfig()
      );

      if (response.status === 200) {
        dispatch({ type: CREATE_SALE });
        history.push("/sales/all");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
