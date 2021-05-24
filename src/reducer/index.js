import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import { orderReducer } from "./orderReducer";
import { productReducer } from "./productReducer";
import { salesReducer } from "./salesReducer";
import { shopReducer } from "./shopReducer";
import userReducer from "./userReducer";
import warehouseReducer from "./warehouseReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  shop: shopReducer,
  sales: salesReducer,
  order: orderReducer,
  warehouse: warehouseReducer,
  product: productReducer,
});
