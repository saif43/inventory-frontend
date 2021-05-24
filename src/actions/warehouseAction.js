import api from "../api/api";
import {
  CREATE_WAREHOUSE,
  GET_WAREHOUSE,
  GET_ALL_WAREHOUSE,
  GET_WAREHOUSE_PRODUCTS,
  DELETE_WAREHOUSE,
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

export const createWarehouse = (formValues) => async (dispatch) => {
  try {
    const response = await api.post(
      "/shop/warehouse/",
      { ...formValues },
      getConfig()
    );

    if (response.status === 201) {
      dispatch({ type: CREATE_WAREHOUSE, payload: { ...response.data } });
      history.push("/warehouse/all");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getAllWarehouse = () => async (dispatch) => {
  try {
    const response = await api.get("/shop/warehouse/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ALL_WAREHOUSE, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getWarehouse = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/shop/warehouse/${id}/`, getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_WAREHOUSE, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteWarehouse = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/shop/warehouse/${id}/`, getConfig());

    if (response.status === 204) {
      dispatch({ type: DELETE_WAREHOUSE, payload: id });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export const getWarehouseProducts = (id) => async (dispatch) => {
  try {
    let config = getConfig();
    config.params = { warehouse: id };

    const response = await api.get(`/shop/warehouse_products/`, config);

    if (response.status === 200) {
      dispatch({ type: GET_WAREHOUSE_PRODUCTS, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};
