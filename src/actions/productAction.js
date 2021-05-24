import api from "../api/api";
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_STOCK,
  GET_PRODUCT,
  DELETE_PRODUCT,
  GET_MOVE_PRODUCT_HISTORY,
  MOVE_PRODUCT,
  GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE,
  GET_LOW_STOCK_PRODUCTS,
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

const getFormDataConfig = () => {
  let config = getConfig();
  let header = config.headers;
  header = { ...header, "content-type": "multipart/form-data" };
  config.headers = header;

  return config;
};

export const createProduct = (
  name,
  stock,
  buying_price,
  selling_price,
  image
) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("buying_price", buying_price);
    formData.append("selling_price", selling_price);
    if (image?.file) {
      formData.append("image", image.file);
    }

    const response = await api.post(
      "/shop/product/",
      formData,
      getFormDataConfig()
    );

    console.log(response);

    if (response.status === 201) {
      dispatch({ type: CREATE_PRODUCT, payload: { ...response.data } });
      history.push("/product/all");
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export const updateProduct = (
  id,
  name,
  stock,
  buying_price,
  selling_price,
  image,
  stock_alert_amount
) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("buying_price", buying_price);
    formData.append("selling_price", selling_price);
    formData.append("stock_alert_amount", stock_alert_amount);
    if (image?.file) {
      formData.append("image", image.file);
    }

    const response = await api.patch(
      `/shop/product/${id}/`,
      formData,
      getFormDataConfig()
    );

    console.log(response);

    if (response.status === 200) {
      dispatch({ type: UPDATE_PRODUCT, payload: { ...response.data } });
      history.push(`/product/detail/${id}`);
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getStock = () => async (dispatch) => {
  try {
    const response = await api.get("/shop/product/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_STOCK, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const moveProduct = (info) => async (dispatch) => {
  try {
    const response = await api.post("/shop/move_product/", info, getConfig());

    if (response.status === 201) {
      dispatch({
        type: MOVE_PRODUCT,
        payload: { ...response.data },
      });

      history.push("/product/move/history");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getMoveProductHistory = () => async (dispatch) => {
  try {
    const response = await api.get("/shop/move_product/", getConfig());

    if (response.status === 200) {
      dispatch({
        type: GET_MOVE_PRODUCT_HISTORY,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/shop/product/${id}/`, getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_PRODUCT, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getLowStockProducts = () => async (dispatch) => {
  try {
    const response = await api.get("/shop/low_stock/", getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_LOW_STOCK_PRODUCTS, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/shop/product/${id}/`, getConfig());

    console.log(response.status);

    if (response.status === 204) {
      dispatch({ type: DELETE_PRODUCT, payload: { ...response.data } });
      history.push("/product/all");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getProductStockInAllWarehouse = (id) => async (dispatch) => {
  try {
    const response = await api.get(
      `shop/warehouse_products/?warehouse=&product=${id}`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({
        type: GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
