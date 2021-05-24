import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import {
  getShop,
  getAccountPayable,
  getAccountReceivable,
  getRecentTransactions,
  getRecentExpense,
} from "../../actions/shopAction";
import { getOrderReport } from "../../actions/orderAction";
import { getTodayTotalSale, getSalesReport } from "../../actions/salesAction";
import Navbar from "../../Reuseable-component/Navbar";
import Animation from "../../Reuseable-component/Animation";
import { getLowStockProducts } from "../../actions/productAction";
import Canvas from "../../Reuseable-component/Canvas";
// import Spinner from "../../Reuseable-component/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getOrderReport("daily");
    this.props.getSalesReport("daily");
    this.props.getTodayTotalSale();
    this.props.getAccountPayable();
    this.props.getAccountReceivable();
    this.props.getRecentTransactions(10);
    this.props.getLowStockProducts();
    this.props.getRecentExpense();
  }

  renderShopInfo(query) {
    if (this.props.shop) {
      switch (query) {
        case "name":
          return this.props.shop.shopname;
        case "money":
          return this.props.shop.money;

        default:
          break;
      }
    }
  }
  renderInvoices() {
    return this.props.recentTransactions.map((x) => {
      return (
        <tr key={x.id} className="table-row">
          <td>Invoice #{x.id}</td>
          <td> {x.customer ? "Sale" : "Purchase"}</td>
          <td>
            {" "}
            <b>{x.bill}</b>
          </td>
        </tr>
      );
    });
  }

  renderContent() {
    return (
      <div className="row dashboard">
        <div className="col-md-4 main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Total Sales &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-primary rounded-pill badge-dashboard mt-1">
                {this.props.today_total_sale} tk
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4 main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Account Payable &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-danger rounded-pill badge-dashboard mt-1">
                {this.props.accountPayable} tk
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Account Receivable &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-success rounded-pill badge-dashboard mt-1">
                {this.props.accountReceivable} tk
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4 main-body-dashboard ">
          <h5>Recent Invoices &mdash; </h5>
          <table className="table">
            <tbody>{this.renderInvoices()}</tbody>
          </table>
        </div>
        <div className="col-md-4 main-body-dashboard ">
          <h5>Purchase Order &mdash; </h5>
          <Canvas
            report={this.props.order_report}
            id="myChart"
            chartstyle="line"
            charttype="purchase"
          />
        </div>
        <div className="col-md-4 main-body-dashboard">
          <h5>Sale Order &mdash; </h5>
          <Canvas
            report={this.props.sales_report}
            id="myChart2"
            chartstyle="bar"
            charttype="sales"
          />
        </div>
        <div className="col-md-4 main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Low Stock &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-danger rounded-pill badge-dashboard mt-1">
                {Object.keys(this.props.low_stock_products).length} items
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4  main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Today's Expense &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-primary rounded-pill badge-dashboard mt-1">
                {this.props.today_expense} tk
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 main-body-dashboard ">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <h5>Monthly Expense &mdash; </h5>
            </div>
            <div className="col-md-4 col-sm-6 text-end">
              <span className="badge bg-primary rounded-pill badge-dashboard mt-1">
                {this.props.this_month_expense} tk
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    // return (
    //   <div
    //     className="d-flex justify-content-center align-items-center"
    //     style={{ height: "100vh" }}
    //   >
    //     <Spinner />
    //   </div>
    // );
  }

  render() {
    return (
      <Navbar>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Animation>
          <main className="col-md-9 ms-sm-auto col-lg-10 mt-3">
            {this.renderContent()}
          </main>
        </Animation>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop.shopDetail,
    today_total_sale: state.sales.today_total_sale,
    accountPayable: state.shop.accountPayable,
    accountReceivable: state.shop.accountReceivable,
    recentTransactions: state.shop.recentTransactions, // Sadik
    low_stock_products: state.product.low_stock_products, // Sadik
    today_expense: state.shop.today_expense,
    this_month_expense: state.shop.this_month_expense,
    order_report: Object.values(state.order.report),
    sales_report: Object.values(state.sales.report),
  };
};

export default connect(mapStateToProps, {
  getShop,
  getTodayTotalSale,
  getAccountPayable,
  getAccountReceivable,
  getRecentTransactions,
  getLowStockProducts,
  getRecentExpense,
  getOrderReport,
  getSalesReport,
})(Dashboard);
