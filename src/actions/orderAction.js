import api from "../api/api";
import {
  CREATE_ORDER,
  GET_ALL_ORDERS,
  GET_ORDER_DUE_LIST,
  GET_ORDER_REPORT,
  GET_SINGLE_ORDER,
  RESET_SINGLE_ORDER,
  PAY_ORDER_DUE,
  RECEIVE_ORDER,
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

export const getAllOrders = () => async (dispatch) => {
  try {
    const response = await api.get("shop/vendor_transactions/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ALL_ORDERS, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSpecificVendorTransactions = (id) => async (dispatch) => {
  try {
    const response = await api.get(
      `shop/vendor_transactions/?search=${id}`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: GET_ALL_ORDERS, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getOrderReport = (type) => async (dispatch) => {
  try {
    const response = await api.get(
      `shop/purchase_report/${type}/`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: GET_ORDER_REPORT, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const receiveOrder = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `shop/vendor_transactions/${id}/`,
      { product_received: true },
      getConfig()
    );

    if (response.status === 200) {
      dispatch({
        type: RECEIVE_ORDER,
        payload: { product_received: response.data.product_received },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSingleOrder = (id) => async (dispatch) => {
  dispatch({ type: RESET_SINGLE_ORDER });

  try {
    const cart_response = await api.get(
      `shop/vendor_transactions_detail/?search=${id}`,
      getConfig()
    );

    const bill_response = await api.get(
      `shop/vendor_bill/?search=${id}`,
      getConfig()
    );

    const transaction = await api.get(
      `shop/vendor_transactions/${id}/`,
      getConfig()
    );

    if (
      cart_response.status === 200 &&
      bill_response.status === 200 &&
      transaction.status === 200
    ) {
      dispatch({
        type: GET_SINGLE_ORDER,
        payload: {
          cart: Object.values(cart_response.data),
          bill: bill_response.data[0],
          product_received: transaction.data.product_received,
        },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createOrder = (vendor_id, cart, paid, warehouse) => async (
  dispatch
) => {
  try {
    const transaction_init_response = await api.post(
      "shop/vendor_transactions/",
      { vendor: vendor_id },
      getConfig()
    );

    if (transaction_init_response.status === 201) {
      const order_id = transaction_init_response.data.id;

      cart.forEach(async (product) => {
        let data = {
          order: order_id,
          product: product.id,
          custom_buying_price: product.buying_price,
          quantity: parseInt(product.quantity),
        };

        data.delivery_warehouse = warehouse.id;

        await api.post("shop/vendor_transactions_detail/", data, getConfig());
      });

      const bill = await api.get(
        `shop/vendor_bill/?search=${order_id}`,
        getConfig()
      );

      const bill_id = bill.data[0].id;

      const response = await api.put(
        `shop/vendor_bill/${bill_id}/`,
        { paid: paid },
        getConfig()
      );

      if (response.status === 200) {
        dispatch({ type: CREATE_ORDER });
        history.push("/order/all");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const payDue = (bill_id, paid) => async (dispatch) => {
  try {
    const response = await api.put(
      `shop/vendor_bill/${bill_id}/`,
      { paid },
      getConfig()
    );

    if (response.status === 200) {
      dispatch({ type: PAY_ORDER_DUE, payload: { ...response.data } });
      history.push("/order/all/");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getDueList = () => async (dispatch) => {
  try {
    const response = await api.get("shop/vendor_bill_due/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ORDER_DUE_LIST, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};
