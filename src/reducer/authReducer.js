import {
  SIGNED_IN,
  SIGNED_OUT,
  LOADING,
  INVALID_CREDENCIAL,
  SEARCH_USER,
  RESET_RECOVERY_INFO,
  GET_OTP,
  PASSWORD_CHANGED,
  TURN_OFF_LOADER,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  token: "",
  user: {
    name: "",
  },
  loading: false,
  errorMsg: "",
  recover_user: {},
  recover_otp: "",
  password_changed: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
        loading: false,
        ...action.payload,
        errorMsg: "",
      };

    case SIGNED_OUT:
      return INITIAL_STATE;

    case TURN_OFF_LOADER:
      return { ...state, loading: false };

    case RESET_RECOVERY_INFO:
      return {
        ...state,
        recover_user: {},
        recover_otp: "",
        password_changed: null,
      };

    case GET_OTP:
      return { ...state, recover_otp: action.payload };

    case LOADING:
      return { ...state, loading: true };

    case SEARCH_USER:
      return { ...state, recover_user: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password_changed: action.payload };

    case INVALID_CREDENCIAL:
      return { ...state, loading: false, errorMsg: action.payload };

    default:
      return state;
  }
};

export default authReducer;
