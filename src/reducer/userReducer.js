import {
  GET_ALL_USER,
  SIGNED_OUT,
  GET_SPECIFIC_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/types";

const INITIAL_STATE = { userlist: [], specificUser: [] };

const userlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, userlist: Object.values(action.payload) };
    case GET_SPECIFIC_USER:
      return { ...state, specificUser: action.payload };
    case UPDATE_USER:
      return { ...state, specificUser: action.payload };
    case DELETE_USER:
      return { ...state, specificUser: [] };
    case SIGNED_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userlist;
