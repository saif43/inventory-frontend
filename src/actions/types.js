export const LOADING = "LOADING";

//--------------------Authentication--------------------//
export const SIGNED_IN = "SIGNED_IN";
export const SIGNED_OUT = "SIGNED_OUT";
export const INVALID_CREDENCIAL = "INVALID_CREDENCIAL";
export const RESET_RECOVERY_INFO = "RESET_RECOVERY_INFO";
export const GET_OTP = "GET_OTP";
export const PASSWORD_CHANGED = "PASSWORD_CHANGED";
export const TURN_OFF_LOADER = "TURN_OFF_LOADER";
//------------------------------------------------------//

//------------------------Shop--------------------------//
export const CREATE_SHOP = "CREATE_SHOP";
export const GET_SHOP = "GET_SHOP";
export const GET_ACCOUNT_PAYABLE = "GET_ACCOUNT_PAYABLE";
export const GET_ACCOUNT_RECEIVABLE = "GET_ACCOUNT_RECEIVABLE";
export const GET_RECENT_TRANSACTIONS = "GET_RECENT_TRANSACTIONS";
export const GET_RECENT_EXPENSE = "GET_RECENT_EXPENSE";

//------------------------------------------------------//

//------------------------Sales--------------------------//
export const GET_TODAY_TOTAL_SALE = "GET_TODAY_TOTAL_SALE";
export const GET_ALL_SALES = "GET_ALL_SALES";
export const GET_SINGLE_SALE = "GET_SINGLE_SALE";
export const GET_SALES_DUE_LIST = "GET_SALES_DUE_LIST";
export const CREATE_SALE = "CREATE_SALE";
export const PAY_SALE_DUE = "PAY_SALE_DUE";
export const GET_SALES_REPORT = "GET_SALES_REPORT";
export const SET_SALES_STATUS = "SET_SALES_STATUS";
//------------------------------------------------------//

//------------------------Order--------------------------//
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_REPORT = "GET_ORDER_REPORT";
export const GET_SINGLE_ORDER = "GET_SINGLE_ORDER";
export const RESET_SINGLE_ORDER = "RESET_SINGLE_ORDER"; // For resetting transaction object in orderReducer
export const GET_ORDER_DUE_LIST = "GET_ORDER_DUE_LIST";
export const CREATE_ORDER = "CREATE_ORDER";
export const PAY_ORDER_DUE = "PAY_ORDER_DUE";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
//------------------------------------------------------//

//------------------------User--------------------------//
export const CREATE_USER = "CREATE_USER";
export const SEARCH_USER = "SEARCH_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_SPECIFIC_USER = "GET_SPECIFIC_USER";
//------------------------------------------------------//

//----------------------Warehouse-----------------------//
export const CREATE_WAREHOUSE = "CREATE_WAREHOUSE";
export const GET_WAREHOUSE = "GET_WAREHOUSE";
export const DELETE_WAREHOUSE = "DELETE_WAREHOUSE";
export const GET_ALL_WAREHOUSE = "GET_ALL_WAREHOUSE";
export const GET_WAREHOUSE_PRODUCTS = "GET_WAREHOUSE_PRODUCTS";
//------------------------------------------------------//

//----------------------Product-----------------------//
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_STOCK = "GET_STOCK";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE =
  "GET_PRODUCT_STOCK_IN_ALL_WAREHOUSE";
export const GET_MOVE_PRODUCT_HISTORY = "GET_MOVE_PRODUCT_HISTORY";
export const MOVE_PRODUCT = "MOVE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_LOW_STOCK_PRODUCTS = "GET_LOW_STOCK_PRODUCTS";
//------------------------------------------------------//

//----------------------Expense-----------------------//
export const GET_ALL_SHOP_EXPENSE = "GET_ALL_SHOP_EXPENSE";
export const CREATE_SHOP_EXPENSE = "CREATE_SHOP_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
//------------------------------------------------------//
