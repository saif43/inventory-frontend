import {
  CREATE_WAREHOUSE,
  GET_ALL_WAREHOUSE,
  GET_WAREHOUSE,
  GET_WAREHOUSE_PRODUCTS,
  DELETE_WAREHOUSE,
  SIGNED_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  warehouseList: [],
  warehouseProducts: [],
  warehouse: { name: "" },
};

const warehouseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_WAREHOUSE:
      // console.log(state.warehouseList);

      return {
        ...state,
        warehouseList: {
          ...state.warehouseList,
          [action.payload.id]: action.payload,
        },
      };

    case GET_ALL_WAREHOUSE:
      return { ...state, warehouseList: action.payload };

    case GET_WAREHOUSE:
      return { ...state, warehouse: action.payload };

    case DELETE_WAREHOUSE:
      const warehouseList = Object.values(state.warehouseList).filter(
        (warehouse) => warehouse.id !== action.payload
      );

      return { ...state, warehouseList };

    case SIGNED_OUT:
      return INITIAL_STATE;

    case GET_WAREHOUSE_PRODUCTS:
      return { ...state, warehouseProducts: action.payload };

    default:
      return state;
  }
};

export default warehouseReducer;
