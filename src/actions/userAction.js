import api from "../api/api";
import {
  CREATE_USER,
  GET_ALL_USER,
  PASSWORD_CHANGED,
  GET_SPECIFIC_USER,
  UPDATE_USER,
  DELETE_USER,
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

const getSuperAdminConfig = () => {
  const config = {
    headers: {
      Authorization: "Token 268f4062310afddb763fb4d0f9168ea930254f31",
    },
  };

  return config;
};

export const createUser = (formValues) => async (dispatch) => {
  let api_url = "";
  let redirect_url = "";

  switch (formValues.usertype) {
    case "customer":
      api_url = "shop/customer/";
      redirect_url = "/user/all/customer";
      break;

    case "vendor":
      api_url = "shop/vendor/";
      redirect_url = "/user/all/vendor";
      break;

    case "manager":
      alert(formValues.username);
      api_url = "user/create/";
      redirect_url = "/user/all/manager";
      formValues = { ...formValues, is_manager: true };
      break;

    case "salesman":
      api_url = "user/create/";
      redirect_url = "/user/all/salesman";
      formValues = { ...formValues, is_salesman: true };
      break;

    default:
      break;
  }

  try {
    const response = await api.post(api_url, { ...formValues }, getConfig());
    console.log(response);

    if (response.status === 201) {
      dispatch({ type: CREATE_USER, payload: { ...response.data } });
      history.push(redirect_url);
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getUserList = (usertype) => async (dispatch) => {
  let api_url = "";

  switch (usertype) {
    case "customer":
      api_url = "shop/customer/";
      break;

    case "vendor":
      api_url = "shop/vendor/";
      break;

    case "manager":
      api_url = "shop/manager/";
      break;

    case "salesman":
      api_url = "shop/salesman/";
      break;

    default:
      break;
  }

  try {
    const response = await api.get(api_url, getConfig());

    if (response.status === 200) {
      dispatch({ type: GET_ALL_USER, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSpecificUser = (id, usertype) => async (dispatch) => {
  let api_url = "";

  switch (usertype) {
    case "customer":
      api_url = `shop/customer/${id}/`;
      break;

    case "vendor":
      api_url = `shop/vendor/${id}/`;
      break;

    case "salesman":
      api_url = `user/profile/${id}/`;
      break;

    case "manager":
      api_url = `user/profile/${id}/`;
      break;

    default:
      break;
  }

  try {
    const response = await api.get(api_url, getConfig());
    if (response.status === 200) {
      dispatch({ type: GET_SPECIFIC_USER, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const response = await api.get("user/me/", getConfig());
    if (response.status === 200) {
      dispatch({ type: GET_SPECIFIC_USER, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const changePassword = (id, formValues) => async (dispatch) => {
  try {
    const response = await api.put(
      `user/profile/${id}/`,
      { ...formValues },
      getSuperAdminConfig()
    );

    if (response.status === 200) {
      dispatch({ type: PASSWORD_CHANGED, payload: true });
    }
  } catch (error) {
    dispatch({ type: PASSWORD_CHANGED, payload: false });
    console.log(error.response);
  }
};

export const updateUser = (id, formValues, usertype) => async (dispatch) => {
  let api_url = "";

  switch (usertype) {
    case "customer":
      api_url = `shop/customer/${id}/`;
      break;

    case "vendor":
      api_url = `shop/vendor/${id}/`;
      break;

    case "salesman":
      api_url = `user/profile/${id}/`;
      break;

    case "manager":
      api_url = `user/profile/${id}/`;
      break;

    case "owner":
      api_url = `user/profile/${id}/`;
      break;

    default:
      break;
  }

  try {
    const response = await api.patch(api_url, formValues, getConfig());

    if (response.status === 200) {
      dispatch({ type: UPDATE_USER, payload: { ...response.data } });

      if (usertype === "customer" || usertype === "vendor") {
        history.push(`/user/detail/${usertype}/${id}`);
      }
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteUser = (id, usertype) => async (dispatch) => {
  let api_url = "";

  switch (usertype) {
    case "customer":
      api_url = `shop/customer/${id}/`;
      break;

    case "vendor":
      api_url = `shop/vendor/${id}/`;
      break;

    case "salesman":
      api_url = `user/profile/${id}/`;
      break;

    case "manager":
      api_url = `user/profile/${id}/`;
      break;

    default:
      break;
  }

  try {
    const response = await api.delete(api_url, getConfig());

    if (response.status === 204) {
      dispatch({ type: DELETE_USER });

      history.push(`/user/all/${usertype}`);
    }
  } catch (error) {
    console.log(error.response);
  }
};
