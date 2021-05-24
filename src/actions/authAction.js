import {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
  INVALID_CREDENCIAL,
  SEARCH_USER,
  RESET_RECOVERY_INFO,
  GET_OTP,
  TURN_OFF_LOADER,
} from "./types";
import api from "../api/api";
import history from "../history";
// import _ from "lodash";

export const signIn = (logInformValues) => async (dispatch) => {
  // api
  //   .post("user/token/", logInformValues)
  //   .then((response) => {
  //     console.log(response);
  //     dispatch({
  //       type: SIGNED_IN,
  //       payload: { ...response.data },
  //     });

  //     history.push("/dashboard");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     try {
  //       console.log(err.response.data.detail);
  //     } catch (error) {
  //       console.log(err.message);
  //     }
  //   });
  dispatch({ type: LOADING });

  try {
    const response = await api.post("user/token/", { ...logInformValues });

    if (response.status === 200) {
      dispatch({ type: SIGNED_IN, payload: { ...response.data } });

      if (!response.data.has_shop) {
        history.push("/shop/init");
      } else {
        history.push("/dashboard");
      }
    }
  } catch (error) {
    let errorMsg = "";
    switch (error.response.status) {
      case 400:
        errorMsg = "Couldn't find given username or password.";
        dispatch({ type: INVALID_CREDENCIAL, payload: errorMsg });
        break;

      default:
        errorMsg = "Something went wrong!";
        dispatch({ type: INVALID_CREDENCIAL, payload: errorMsg });
    }
  }
};

export const turnOffLoader = () => async (dispatch) => {
  dispatch({ type: TURN_OFF_LOADER });
};

export const signup = (signupformValues) => async (dispatch) => {
  signupformValues = { ...signupformValues, is_owner: true };

  try {
    const response = await api.post("user/create/", {
      ...signupformValues,
    });

    console.log(response);

    const { username, password } = signupformValues;

    dispatch(signIn({ username: username, password: password }));
  } catch (error) {
    console.log(error.response);
  }
};

export const searchByUsername = (username) => async (dispatch) => {
  try {
    const response = await api.get(`user/search/?search=${username}`);

    if (response.data) {
      const { email } = response.data[0];
      dispatch(getOTP(email));

      dispatch({ type: SEARCH_USER, payload: response.data[0] });
    } else {
      dispatch({ type: SEARCH_USER, payload: response.data });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getOTP = (email) => async (dispatch) => {
  try {
    const response = await api.post("user/otp/", { email });

    if (response.status === 201) {
      const { otp } = response.data;
      dispatch({ type: GET_OTP, payload: otp });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: SIGNED_OUT });
  history.push("/login");
};

export const resetRecoveryInfo = () => (dispatch) => {
  dispatch({ type: RESET_RECOVERY_INFO });
};
