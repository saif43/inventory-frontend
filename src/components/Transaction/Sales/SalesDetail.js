import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleSale, payDue } from "../../../actions/salesAction";
import Navbar from "../../../Reuseable-component/Navbar";

import dateformat from "dateformat";

class SalesDetail extends Component {
  state = { paid: 0 };

  componentDidMount() {
    this.props.getSingleSale(this.props.match.params.id);
  }

  renderInformation(query) {
    if (this.props.transaction)
      switch (query) {
        case "date":
          return dateformat(
            this.props.transaction.bill.created_timestamp,
            "dddd, mmmm dS, yyyy, h:MM:ss TT"
          );

        case "order_id":
          return this.props.transaction.bill.order;

        case "customer_name":
          return this.props.transaction.bill.customer.name;

        case "customer_contact":
          return this.props.transaction.bill.customer.contact;

        case "subTotal":
          return this.props.transaction.bill.bill;

        case "due":
          return this.props.transaction.bill.due;

        case "paid":
          return this.props.transaction.bill.paid;
        default:
          return null;
      }
  }

  renderInvoice() {
    if (this.props.transaction)
      return this.props.transaction.cart.map(
        ({ id, product, custom_selling_price, quantity, bill }) => {
          return (
            <tr key={id}>
              <td>{product.name}</td>
              <td>{custom_selling_price}</td>
              <td>{quantity}</td>
              <td>{bill}</td>
            </tr>
          );
        }
      );
  }

  onPayment = (amount) => {
    if (amount <= this.renderInformation("due")) {
      this.setState({ paid: amount });
    }
  };

  onFormSubmit = () => {
    this.props.payDue(this.props.transaction.bill.id, this.state.paid);
  };

  renderPayment() {
    if (this.renderInformation("due"))
      return (
        <div className="row">
          <div className="col-md-6 col-sm-12 text-end"></div>
          <div className="col-md-3 col-sm-12 mt-2 text-end"></div>
          <div className="col-md-2 col-sm-12 text-end"></div>
          <div className="col-md-1 col-sm-12 text-end">
            <button
              onClick={() => this.onFormSubmit()}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </div>
      );
  }
  renderinput() {
    if (this.renderInformation("due"))
      return (
        <>
          <div className="col-6 p-2">
            <h6 className="muted mt-2">New Payment</h6>
          </div>
          <div className="col-6 p-2 text-center">
            <input
              onChange={(e) => this.onPayment(e.target.value)}
              value={this.state.paid}
              type="number"
              className="form-control input-center"
              min="0"
            />
          </div>
        </>
      );
  }

  render() {
    return (
      <Navbar>
        <main className="col-md-9 ms-sm-auto col-lg-10 ">
          <div className="row mb-3">
            <div className="col-md-12 col-sm-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-3">
                <h4>Order details</h4>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">{this.renderPayment()}</div>
          </div>
          <div className="row g-0 main-body">
            <div className="col-md-12 p-4">
              <div className="row mb-2 ">
                <div className="col-md-8">
                  <table>
                    <tbody>
                      <tr>
                        <th className="p-2">Order #</th>
                        <td>{this.renderInformation("order_id")}</td>
                      </tr>
                      <tr>
                        <th className="p-2">Order date</th>
                        <td>{this.renderInformation("date")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4 p-2 text-end">
                  <h6>Billing address</h6>
                  <p>
                    {this.renderInformation("customer_name")}
                    <br />
                    {this.renderInformation("customer_contact")}
                  </p>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="table-white">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total(BDT)</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderInvoice()}</tbody>
                </table>
              </div>
              <div className="row mb-4 g-0">
                <div className="col-md-6 p-2"></div>
                <div className="col-md-6 p-2">
                  <div className="row mb-4 g-0 text-end">
                    <div className="col-6 p-2">
                      <h6> Sub Total</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("subTotal")}
                    </div>
                    <div className="col-6 p-2">
                      <h6 className="muted">Paid</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("paid")}
                    </div>
                    <div className="col-6 p-2">
                      <h6 className="muted">Due</h6>
                    </div>
                    <div className="col-6 p-2 text-center">
                      {this.renderInformation("due")}
                    </div>
                    {this.renderinput()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  let transaction = null;
  if (state.sales.transaction) {
    transaction = state.sales.transaction;
    return { transaction: state.sales.transaction };
  }

  if (state.sales.bill) {
    transaction.bill = state.sales.bill;

    return { transaction: transaction };
  }

  return { transaction: null };
};

export default connect(mapStateToProps, { getSingleSale, payDue })(SalesDetail);
