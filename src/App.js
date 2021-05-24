import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";

import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Authfrom/Login";
import Signup from "./components/Authfrom/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesCreate from "./components/Transaction/Sales/SalesCreate";
import SalesUpdate from "./components/Transaction/Sales/SalesUpdate";
import SalesDelete from "./components/Transaction/Sales/SalesDelete";
import SalesDetail from "./components/Transaction/Sales/SalesDetail";
import SalesList from "./components/Transaction/Sales/SalesList";
import SalesDueList from "./components/Transaction/Sales/SalesDueList";
import OrderCreate from "./components/Transaction/Order/OrderCreate";
import OrderUpdate from "./components/Transaction/Order/OrderUpdate";
import OrderDelete from "./components/Transaction/Order/OrderDelete";
import OrderDetail from "./components/Transaction/Order/OrderDetail";
import OrderList from "./components/Transaction/Order/OrderList";
import OrderDueList from "./components/Transaction/Order/OrderDueList";
import ProductCreate from "./components/Product/ProductCreate";
import ProductDelete from "./components/Product/ProductDelete";
import ProductDetail from "./components/Product/ProductDetail";
import ProductStock from "./components/Product/ProductStock";
import ProductUpdate from "./components/Product/ProductUpdate";
import ProductMove from "./components/Product/ProductMove";
import UserCreate from "./components/User/UserCreate";
import UserDelete from "./components/User/UserDelete";
import UserUpdate from "./components/User/UserUpdate";
import UserDetail from "./components/User/UserDetail";
import UserProfile from "./components/User/UserProfile";
import UserList from "./components/User/UserList";
import ContactCreate from "./components/User/ContactCreate";
import WarehouseCreate from "./components/Warehouse/WarehouseCreate";
import WarehouseList from "./components/Warehouse/WarehouseList";
import WarehouseDelete from "./components/Warehouse/WarehouseDelete";
import WarehouseUpdate from "./components/Warehouse/WarehouseUpdate";
import WarehouseDetail from "./components/Warehouse/WarehouseDetail";
import PurchaseReport from "./components/Reports/PurchaseReport";
import SellingReport from "./components/Reports/SellingReport";
import ShopInit from "./components/Shop/ShopInit";
import SalesPayment from "./components/Transaction/Sales/SalesPayment";
import OrderPayment from "./components/Transaction/Order/OrderPayment";
import ShopExpense from "./components/Shop/ShopExpense";
import ProductMoveHistory from "./components/Product/ProductMoveHistory";
import Test from "./components/Test";
import ForgotPassword from "./components/Authfrom/PasswordRecover/ForgotPassword";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route exact path="/sales/create" component={SalesCreate} />
        <Route exact path="/sales/update" component={SalesUpdate} />
        <Route exact path="/sales/delete" component={SalesDelete} />
        <Route exact path="/sales/all" component={SalesList} />
        <Route exact path="/sales/due/all" component={SalesDueList} />
        <Route exact path="/sales/detail/:id" component={SalesDetail} />
        <Route exact path="/sales/payment" component={SalesPayment} />

        <Route exact path="/order/create" component={OrderCreate} />
        <Route exact path="/order/update" component={OrderUpdate} />
        <Route exact path="/order/delete" component={OrderDelete} />
        <Route exact path="/order/all" component={OrderList} />
        <Route exact path="/order/due/all" component={OrderDueList} />
        <Route exact path="/order/detail/:id" component={OrderDetail} />
        <Route exact path="/order/payment" component={OrderPayment} />

        <Route exact path="/product/create" component={ProductCreate} />
        <Route exact path="/product/delete" component={ProductDelete} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
        <Route exact path="/product/all" component={ProductStock} />
        <Route exact path="/product/update/:id" component={ProductUpdate} />
        <Route exact path="/product/move" component={ProductMove} />
        <Route
          exact
          path="/product/move/history"
          component={ProductMoveHistory}
        />
        <Route exact path="/user/contactcreate" component={ContactCreate} />
        <Route exact path="/user/create" component={UserCreate} />
        <Route exact path="/user/delete" component={UserDelete} />
        <Route exact path="/user/all/:usertype" component={UserList} />
        <Route exact path="/user/detail/:usertype/:id" component={UserDetail} />
        <Route exact path="/user/update/:usertype/:id" component={UserUpdate} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/password/recover" component={ForgotPassword} />

        <Route exact path="/warehouse/create" component={WarehouseCreate} />
        <Route exact path="/warehouse/delete" component={WarehouseDelete} />
        <Route exact path="/warehouse/detail/:id" component={WarehouseDetail} />
        <Route exact path="/warehouse/update" component={WarehouseUpdate} />
        <Route exact path="/warehouse/all" component={WarehouseList} />

        <Route exact path="/shop/init" component={ShopInit} />
        <Route exact path="/shop/expense" component={ShopExpense} />

        <Route exact path="/reports/purchase" component={PurchaseReport} />
        <Route exact path="/reports/selling" component={SellingReport} />
        <Route exact path="/test" component={Test} />
      </Router>
    );
  }
}
